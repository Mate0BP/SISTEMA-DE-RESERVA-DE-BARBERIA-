import { Barber, Appointment } from '../../types';
import { IBarberAssignmentStrategy } from '../contracts/IBarberAssignmentStrategy';

/**
 * Estrategia de asignación directa cuando el cliente elige un barbero puntual.
 */
export class DirectBarberStrategy implements IBarberAssignmentStrategy {
  public readonly name = 'DirectBarber';

  constructor(private readonly targetBarberId: string) {}

  public selectBarber(
    candidates: Barber[],
    date: string,
    time: string,
    existingAppointments: Appointment[]
  ): Barber | null {
    const barber = candidates.find((b) => b.id === this.targetBarberId && b.available);
    if (!barber) return null;

    // Verificar si el barbero ya tiene cita en ese horario
    const isOccupied = existingAppointments.some(
      (a) => a.barberId === barber.id && a.date === date && a.time === time && a.status !== 'cancelada'
    );

    return isOccupied ? null : barber;
  }
}

/**
 * Estrategia 'Cualquier Barbero Disponible' (RF-23 / RN-07).
 * Selecciona al barbero con menor carga de trabajo en la fecha solicitada.
 * Puede extenderse sin modificar el código de agendamiento (Cumplimiento OCP).
 */
export class AnyAvailableBarberStrategy implements IBarberAssignmentStrategy {
  public readonly name = 'AnyAvailableLeastBusy';

  public selectBarber(
    candidates: Barber[],
    date: string,
    time: string,
    existingAppointments: Appointment[]
  ): Barber | null {
    // Filtrar barberos activos que no tengan cita a la misma hora
    const availableAtSlot = candidates.filter((barber) => {
      if (!barber.available) return false;
      const hasConflict = existingAppointments.some(
        (a) => a.barberId === barber.id && a.date === date && a.time === time && a.status !== 'cancelada'
      );
      return !hasConflict;
    });

    if (availableAtSlot.length === 0) return null;

    // Asignar al barbero con menor cantidad de citas acumuladas ese día (Round-robin / equidad)
    return availableAtSlot.reduce((leastBusy, current) => {
      const countCurrent = existingAppointments.filter(
        (a) => a.barberId === current.id && a.date === date && a.status !== 'cancelada'
      ).length;
      const countLeast = existingAppointments.filter(
        (a) => a.barberId === leastBusy.id && a.date === date && a.status !== 'cancelada'
      ).length;

      return countCurrent < countLeast ? current : leastBusy;
    });
  }
}
