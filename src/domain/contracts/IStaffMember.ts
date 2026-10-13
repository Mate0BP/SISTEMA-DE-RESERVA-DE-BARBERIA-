import { StaffRole } from '../../types';

export interface IStaffMember {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: StaffRole;
  readonly active: boolean;

  /**
   * Método de comportamiento de la clase base que cualquier rol de staff puede cumplir (LSP).
   */
  canAccessSystem(): boolean;
  getPermissions(): string[];
}

export interface IBarberOperations extends IStaffMember {
  readonly specialties: string[];
  readonly rating: number;
  readonly experienceYears: number;
  canPerformService(category: string): boolean;
}

export interface IReceptionistOperations extends IStaffMember {
  canUpdateAppointmentStatus(): boolean;
  canRegisterClient(): boolean;
}
