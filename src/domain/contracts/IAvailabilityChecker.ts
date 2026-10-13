export interface IAvailabilityChecker {
  /**
   * Verifica si un intervalo continuo está completamente disponible para un barbero específico.
   * Cruza citas vigentes (no canceladas) y franjas de bloqueo administrativo (RN-01, RN-06).
   */
  isSlotFree(
    barberId: string,
    date: string,
    startTime: string,
    durationMinutes: number
  ): Promise<boolean>;

  /**
   * Obtiene la lista de horarios disponibles para una fecha, barbero y duración dados.
   */
  getAvailableSlots(
    barberId: string,
    date: string,
    durationMinutes: number
  ): Promise<string[]>;
}
