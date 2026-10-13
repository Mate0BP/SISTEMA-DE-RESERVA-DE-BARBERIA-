import { StaffRole } from '../../types';
import { IStaffMember, IBarberOperations, IReceptionistOperations } from '../contracts/IStaffMember';

/**
 * Clase base que define el contrato común para cualquier trabajador (LSP).
 */
export abstract class StaffMemberBase implements IStaffMember {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: StaffRole,
    public readonly active: boolean
  ) {}

  public canAccessSystem(): boolean {
    return this.active;
  }

  public abstract getPermissions(): string[];
}

/**
 * Subclase BarberStaff: respeta íntegramente a StaffMemberBase y añade capacidades específicas.
 */
export class BarberStaff extends StaffMemberBase implements IBarberOperations {
  constructor(
    id: string,
    name: string,
    email: string,
    active: boolean,
    public readonly specialties: string[] = ['Corte Clásico', 'Barba'],
    public readonly rating: number = 4.8,
    public readonly experienceYears: number = 5
  ) {
    super(id, name, email, 'barbero', active);
  }

  public override getPermissions(): string[] {
    return ['view_own_agenda', 'update_own_status', 'add_technical_notes'];
  }

  public canPerformService(category: string): boolean {
    if (!this.active) return false;
    return this.specialties.some((spec) => spec.toLowerCase().includes(category.toLowerCase()));
  }
}

/**
 * Subclase ReceptionistStaff: sustituible como StaffMemberBase.
 */
export class ReceptionistStaff extends StaffMemberBase implements IReceptionistOperations {
  constructor(id: string, name: string, email: string, active: boolean) {
    super(id, name, email, 'recepcionista', active);
  }

  public override getPermissions(): string[] {
    return ['view_all_agendas', 'update_appointment_status', 'register_clients', 'manage_blocks'];
  }

  public canUpdateAppointmentStatus(): boolean {
    return this.active;
  }

  public canRegisterClient(): boolean {
    return this.active;
  }
}

/**
 * Subclase AdminStaff: sustituible como StaffMemberBase.
 */
export class AdminStaff extends StaffMemberBase {
  constructor(id: string, name: string, email: string, active: boolean) {
    super(id, name, email, 'administrador', active);
  }

  public override getPermissions(): string[] {
    return ['all_permissions', 'manage_services', 'manage_team', 'view_analytics'];
  }
}
