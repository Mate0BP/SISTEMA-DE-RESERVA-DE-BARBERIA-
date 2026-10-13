import { Appointment, AppointmentStatus } from '../../types';
import { IAppointmentRepository } from '../../domain/contracts/IAppointmentRepository';

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[];

  constructor(initialData: Appointment[] = []) {
    this.appointments = [...initialData];
  }

  public async findById(id: string): Promise<Appointment | null> {
    const found = this.appointments.find((a) => a.id === id);
    return found ? { ...found } : null;
  }

  public async findByCode(code: string): Promise<Appointment | null> {
    const found = this.appointments.find((a) => a.code.toUpperCase() === code.toUpperCase());
    return found ? { ...found } : null;
  }

  public async findByDateAndBarber(date: string, barberId: string): Promise<Appointment[]> {
    return this.appointments.filter((a) => a.date === date && a.barberId === barberId);
  }

  public async findByClient(clientId: string): Promise<Appointment[]> {
    return this.appointments.filter((a) => a.clientId === clientId);
  }

  public async findAll(): Promise<Appointment[]> {
    return [...this.appointments];
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    const index = this.appointments.findIndex((a) => a.id === appointment.id);
    if (index >= 0) {
      this.appointments[index] = { ...appointment };
    } else {
      this.appointments.unshift({ ...appointment });
    }
    return { ...appointment };
  }

  public async updateStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    const appointment = this.appointments.find((a) => a.id === id);
    if (!appointment) throw new Error(`Cita con id ${id} no encontrada`);
    appointment.status = status;
    return { ...appointment };
  }

  public async reschedule(id: string, newDate: string, newTime: string): Promise<Appointment> {
    const appointment = this.appointments.find((a) => a.id === id);
    if (!appointment) throw new Error(`Cita con id ${id} no encontrada`);
    appointment.date = newDate;
    appointment.time = newTime;
    return { ...appointment };
  }

  public async delete(id: string): Promise<boolean> {
    const initialLen = this.appointments.length;
    this.appointments = this.appointments.filter((a) => a.id !== id);
    return this.appointments.length < initialLen;
  }
}
