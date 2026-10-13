import { Appointment, AppointmentStatus } from '../../types';

export interface IAppointmentRepository {
  findById(id: string): Promise<Appointment | null>;
  findByCode(code: string): Promise<Appointment | null>;
  findByDateAndBarber(date: string, barberId: string): Promise<Appointment[]>;
  findByClient(clientId: string): Promise<Appointment[]>;
  findAll(): Promise<Appointment[]>;
  save(appointment: Appointment): Promise<Appointment>;
  updateStatus(id: string, status: AppointmentStatus): Promise<Appointment>;
  reschedule(id: string, newDate: string, newTime: string): Promise<Appointment>;
  delete(id: string): Promise<boolean>;
}
