import { Appointment, BlockedTime } from '../../types';
import { IAvailabilityChecker } from '../contracts/IAvailabilityChecker';

export class AvailabilityService implements IAvailabilityChecker {
  // Horarios de apertura estándar de Blade & Co
  private readonly standardSlots: string[] = [
    '09:30', '10:15', '11:00', '11:45', '12:30',
    '13:15', '15:00', '15:45', '16:30', '17:15',
    '18:00', '18:45', '19:30'
  ];

  constructor(
    private readonly getAppointments: () => Promise<Appointment[]>,
    private readonly getBlockedTimes: () => Promise<BlockedTime[]>
  ) {}

  public async isSlotFree(
    barberId: string,
    date: string,
    startTime: string,
    _durationMinutes: number
  ): Promise<boolean> {
    const appointments = await this.getAppointments();
    const blockedTimes = await this.getBlockedTimes();

    // 1. Validar si existe cita activa en el mismo horario para ese barbero (RN-02)
    const hasConflict = appointments.some((a) => {
      if (a.date !== date) return false;
      if (a.status === 'cancelada') return false; // Cita cancelada libera el slot (RN-08)
      if (barberId && a.barberId !== barberId) return false;
      return a.time === startTime;
    });

    if (hasConflict) return false;

    // 2. Validar si existe un bloqueo administrativo que cubra ese slot (RN-06)
    const isBlocked = blockedTimes.some((blk) => {
      if (blk.date !== date) return false;
      if (blk.barberId !== 'all' && barberId && blk.barberId !== barberId) return false;
      return startTime >= blk.startTime && startTime < blk.endTime;
    });

    return !isBlocked;
  }

  public async getAvailableSlots(
    barberId: string,
    date: string,
    durationMinutes: number
  ): Promise<string[]> {
    const available: string[] = [];

    for (const slot of this.standardSlots) {
      const free = await this.isSlotFree(barberId, date, slot, durationMinutes);
      if (free) {
        available.push(slot);
      }
    }

    return available;
  }
}
