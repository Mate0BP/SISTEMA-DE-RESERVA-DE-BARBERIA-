import { Barber, Appointment } from '../../types';

export interface IBarberAssignmentStrategy {
  /**
   * Nombre identificador de la estrategia de asignación
   */
  readonly name: string;

  /**
   * Determina cuál barbero debe ser asignado para una solicitud de cita.
   * Permite extensión sin modificar el servicio de agendamiento (Cumplimiento OCP).
   */
  selectBarber(
    candidates: Barber[],
    date: string,
    time: string,
    existingAppointments: Appointment[]
  ): Barber | null;
}
