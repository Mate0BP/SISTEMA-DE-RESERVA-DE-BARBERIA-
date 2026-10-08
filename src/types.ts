export type ViewId =
  | 'v1_bienvenida'
  | 'v2_auth'
  | 'v3_servicios'
  | 'v4_barbero'
  | 'v5_horarios'
  | 'v6_resumen'
  | 'v7_comprobante'
  | 'v8_mis_citas'
  | 'v9_historial'
  | 'v10_perfil'
  | 'v11_admin_login'
  | 'v12_agenda'
  | 'v13_bloqueos'
  | 'v14_gestion_servicios'
  | 'v15_directorio_clientes'
  | 'v16_estados_cita'
  | 'v17_analitica'
  | 'v18_perfil_admin_equipo';

export type StaffRole = 'barbero' | 'recepcionista' | 'administrador';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  password?: string;
  photo: string;
  role: StaffRole;
  phone?: string;
  active: boolean;
  specialty?: string;
}

export type AppointmentStatus =
  | 'pendiente'
  | 'confirmada'
  | 'atendida'
  | 'cancelada'
  | 'no_asistio';

export interface Service {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  category: string;
  enabled: boolean;
}

export interface Barber {
  id: string;
  name: string;
  title: string;
  rating: number;
  experienceYears: number;
  specialties: string[];
  avatarInitial: string;
  bio: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  code: string;
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
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

export interface BlockedTime {
  id: string;
  barberId: string; // 'all' or specific barber id
  barberName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  reason: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalVisits: number;
  lastVisit: string;
  preferredBarberId?: string;
  notes?: string;
}

export interface BookingState {
  serviceId: string | null;
  barberId: string | null; // null means 'cualquier barbero'
  date: string; // YYYY-MM-DD
  time: string | null; // HH:mm
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes: string;
}
