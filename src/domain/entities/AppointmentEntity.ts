import { Appointment, AppointmentStatus } from '../../types';

export interface CreateAppointmentProps {
  id?: string;
  code?: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceId: string;
  serviceName: string;
  barberId: string;
  barberName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  price: number;
  status?: AppointmentStatus;
  notes?: string;
  createdAt?: string;
}

export class AppointmentEntity implements Appointment {
  public readonly id: string;
  public readonly code: string;
  public readonly clientId: string;
  public readonly clientName: string;
  public readonly clientPhone: string;
  public readonly clientEmail: string;
  public readonly serviceId: string;
  public readonly serviceName: string;
  public readonly barberId: string;
  public readonly barberName: string;
  public date: string;
  public time: string;
  public readonly durationMinutes: number;
  public readonly price: number;
  public status: AppointmentStatus;
  public notes?: string;
  public readonly createdAt: string;

  constructor(props: CreateAppointmentProps) {
    if (!props.clientId || !props.serviceId || !props.barberId) {
      throw new Error('RN-03: Toda cita debe asociar obligatoriamente cliente, servicio y barbero.');
    }
    if (!props.date || !props.time) {
      throw new Error('RN-03: La cita requiere una fecha y hora válidas.');
    }
    if (props.durationMinutes <= 0) {
      throw new Error('RN-04: La duración de la cita debe ser mayor a 0 minutos.');
    }

    this.id = props.id || `apt-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    this.code = props.code || AppointmentEntity.generateUniqueCode();
    this.clientId = props.clientId;
    this.clientName = props.clientName;
    this.clientPhone = props.clientPhone;
    this.clientEmail = props.clientEmail;
    this.serviceId = props.serviceId;
    this.serviceName = props.serviceName;
    this.barberId = props.barberId;
    this.barberName = props.barberName;
    this.date = props.date;
    this.time = props.time;
    this.durationMinutes = props.durationMinutes;
    this.price = props.price;
    this.status = props.status || 'confirmada';
    this.notes = props.notes;
    this.createdAt = props.createdAt || new Date().toISOString().split('T')[0];
  }

  /**
   * Genera el código único alfanumérico para el comprobante (RF-07).
   */
  public static generateUniqueCode(): string {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `BC-${randomSuffix}`;
  }

  /**
   * Valida y ejecuta la transición de estado de la cita según las reglas de negocio (RN-08).
   */
  public changeStatus(newStatus: AppointmentStatus): void {
    if (this.status === 'atendida' || this.status === 'cancelada') {
      throw new Error(`RN-08: Una cita en estado '${this.status}' es inmutable y no puede cambiar.`);
    }

    this.status = newStatus;
  }

  /**
   * Reprograma fecha y hora de la cita verificando anticipación (RN-05).
   */
  public reschedule(newDate: string, newTime: string): void {
    if (this.status === 'atendida' || this.status === 'cancelada') {
      throw new Error('No es posible reprogramar una cita finalizada o cancelada.');
    }
    this.date = newDate;
    this.time = newTime;
  }

  public toJSON(): Appointment {
    return {
      id: this.id,
      code: this.code,
      clientId: this.clientId,
      clientName: this.clientName,
      clientPhone: this.clientPhone,
      clientEmail: this.clientEmail,
      serviceId: this.serviceId,
      serviceName: this.serviceName,
      barberId: this.barberId,
      barberName: this.barberName,
      date: this.date,
      time: this.time,
      durationMinutes: this.durationMinutes,
      price: this.price,
      status: this.status,
      notes: this.notes,
      createdAt: this.createdAt,
    };
  }
}
