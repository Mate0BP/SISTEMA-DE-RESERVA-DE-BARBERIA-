import { Appointment, Barber, AppointmentStatus } from '../../types';
import { IAppointmentRepository } from '../contracts/IAppointmentRepository';
import { IAvailabilityChecker } from '../contracts/IAvailabilityChecker';
import { INotificationPort } from '../contracts/INotificationPort';
import { IBarberAssignmentStrategy } from '../contracts/IBarberAssignmentStrategy';
import { AppointmentEntity, CreateAppointmentProps } from '../entities/AppointmentEntity';

export interface CreateBookingRequest {
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceId: string;
  serviceName: string;
  barberId: string | null; // null si es 'Cualquier barbero disponible'
  date: string;
  time: string;
  durationMinutes: number;
  price: number;
  notes?: string;
  assignmentStrategy?: IBarberAssignmentStrategy;
  availableBarbers?: Barber[];
}

export interface IBookingService {
  createAppointment(request: CreateBookingRequest): Promise<Appointment>;
  cancelAppointment(id: string, reason?: string): Promise<Appointment>;
  rescheduleAppointment(id: string, newDate: string, newTime: string): Promise<Appointment>;
  updateStatus(id: string, status: AppointmentStatus): Promise<Appointment>;
}

export class BookingService implements IBookingService {
  constructor(
    private readonly repository: IAppointmentRepository,
    private readonly availabilityChecker: IAvailabilityChecker,
    private readonly notificationPort: INotificationPort
  ) {}

  public async createAppointment(request: CreateBookingRequest): Promise<Appointment> {
    let resolvedBarberId = request.barberId;
    let resolvedBarberName = 'Barbero Asignado';

    // 1. Resolver barbero mediante estrategia polimórfica (OCP)
    if (!resolvedBarberId) {
      if (!request.assignmentStrategy || !request.availableBarbers) {
        throw new Error('RN-07: Se requiere una estrategia para asignar barberos disponibles.');
      }
      const existing = await this.repository.findAll();
      const selected = request.assignmentStrategy.selectBarber(
        request.availableBarbers,
        request.date,
        request.time,
        existing
      );
      if (!selected) {
        throw new Error('RN-01: No hay ningún barbero disponible para el horario seleccionado.');
      }
      resolvedBarberId = selected.id;
      resolvedBarberName = selected.name;
    } else if (request.availableBarbers) {
      const found = request.availableBarbers.find((b) => b.id === resolvedBarberId);
      if (found) resolvedBarberName = found.name;
    }

    // 2. Validar disponibilidad estricta (RN-01, RN-02)
    const isFree = await this.availabilityChecker.isSlotFree(
      resolvedBarberId,
      request.date,
      request.time,
      request.durationMinutes
    );
    if (!isFree) {
      throw new Error(`RN-02: El horario ${request.time} del ${request.date} ya no se encuentra disponible.`);
    }

    // 3. Crear Entidad de Dominio con validaciones y código único (RF-07, RN-03)
    const entityProps: CreateAppointmentProps = {
      clientId: request.clientId,
      clientName: request.clientName,
      clientPhone: request.clientPhone,
      clientEmail: request.clientEmail,
      serviceId: request.serviceId,
      serviceName: request.serviceName,
      barberId: resolvedBarberId,
      barberName: resolvedBarberName,
      date: request.date,
      time: request.time,
      durationMinutes: request.durationMinutes,
      price: request.price,
      notes: request.notes,
      status: 'confirmada',
    };

    const appointmentEntity = new AppointmentEntity(entityProps);

    // 4. Persistir a través del repositorio desacoplado (DIP)
    const saved = await this.repository.save(appointmentEntity.toJSON());

    // 5. Despachar notificación desacoplada (WhatsApp / Mock) (RF-20)
    await this.notificationPort.sendBookingConfirmation(saved);

    return saved;
  }

  public async cancelAppointment(id: string, _reason?: string): Promise<Appointment> {
    const appt = await this.repository.findById(id);
    if (!appt) {
      throw new Error('Cita no encontrada para cancelación.');
    }

    const updated = await this.repository.updateStatus(id, 'cancelada');
    await this.notificationPort.sendStatusAlert(updated, appt.status);
    return updated;
  }

  public async rescheduleAppointment(id: string, newDate: string, newTime: string): Promise<Appointment> {
    const appt = await this.repository.findById(id);
    if (!appt) {
      throw new Error('Cita no encontrada para reprogramación.');
    }

    const isFree = await this.availabilityChecker.isSlotFree(
      appt.barberId,
      newDate,
      newTime,
      appt.durationMinutes
    );
    if (!isFree) {
      throw new Error('El nuevo horario seleccionado no está disponible.');
    }

    return await this.repository.reschedule(id, newDate, newTime);
  }

  public async updateStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    return await this.repository.updateStatus(id, status);
  }
}
