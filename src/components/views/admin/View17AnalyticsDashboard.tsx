import React from 'react';
import { ViewId, Appointment, Service, Barber } from '../../../types';
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  XCircle,
  CheckCircle,
  Award,
  BarChart3,
  Clock,
  Scissors,
  CheckCircle2,
  Lock,
  ArrowRight,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface Props {
  appointments: Appointment[];
  services: Service[];
  barbers: Barber[];
  onNavigate: (viewId: ViewId) => void;
}

export const View17AnalyticsDashboard: React.FC<Props> = ({
  appointments,
  services,
  barbers,
  onNavigate,
}) => {
  // Analytical metrics en Pesos Colombianos (COP)
  const totalReservations = 142;
  const projectedRevenue = '$3.860.000 COP';
  const averageTicket = '$27.180 COP';
  const cancellationRate = 4.8;
  const attendanceRate = 95.2;

  const topServices = [
    { name: 'Combo Signature Blade (Corte + Barba)', count: 58, percentage: 41, revenue: '$1.856.000' },
    { name: 'Corte Clásico Signature ($20.000)', count: 51, percentage: 36, revenue: '$1.020.000' },
    { name: 'Arreglo de Barba Royale', count: 23, percentage: 16, revenue: '$368.000' },
    { name: 'Afeitado Tradicional Toalla Caliente', count: 10, percentage: 7, revenue: '$180.000' },
  ];

  const barberPerformance = [
    {
      name: 'Mateo Velásquez',
      role: 'Master Barber',
      appointments: 62,
      revenue: '$1.640.000',
      rating: '4.9★',
      occupancy: '94%',
    },
    {
      name: "Carlos 'Silver' Mendoza",
      role: 'Especialista Barbas',
      appointments: 44,
      revenue: '$1.220.000',
      rating: '4.8★',
      occupancy: '88%',
    },
    {
      name: 'Alejandro Cruz',
      role: 'Fade Specialist',
      appointments: 36,
      revenue: '$1.000.000',
      rating: '4.9★',
      occupancy: '85%',
    },
  ];

  // The 5 administrative modules to navigate to
  const adminModules = [
    {
      id: 'v12_agenda' as ViewId,
      title: 'Agenda de Citas & Calendario',
      description: 'Línea de tiempo diaria y semanal con bloques horarios asignados a cada barbero en tiempo real.',
      icon: Calendar,
      buttonText: 'Ir a Agenda Operativa',
      badge: 'Agenda',
      color: 'text-[#3B82F6]',
      borderHover: 'hover:border-[#3B82F6]/60',
    },
    {
      id: 'v13_bloqueos' as ViewId,
      title: 'Control de Disponibilidad & Bloqueos',
      description: 'Configura horarios de atención y bloquea franjas para almuerzo, descansos o contingencias.',
      icon: Clock,
      buttonText: 'Gestionar Bloqueos',
      badge: 'Turnos',
      color: 'text-[#FBBF24]',
      borderHover: 'hover:border-[#FBBF24]/60',
    },
    {
      id: 'v14_gestion_servicios' as ViewId,
      title: 'Gestión de Servicios & Precios (CRUD)',
      description: 'Registra nuevos cortes, edita descripciones, fija tarifas en pesos colombianos y duraciones.',
      icon: Scissors,
      buttonText: 'Administrar Servicios',
      badge: 'Servicios',
      color: 'text-[#D4A574]',
      borderHover: 'hover:border-[#D4A574]/60',
    },
    {
      id: 'v15_directorio_clientes' as ViewId,
      title: 'Directorio de Clientes & Historial',
      description: 'Búsqueda por teléfono/correo, datos de contacto e historial de atenciones individuales.',
      icon: Users,
      buttonText: 'Ver Directorio Clientes',
      badge: 'Directorio',
      color: 'text-[#8B5CF6]',
      borderHover: 'hover:border-[#8B5CF6]/60',
    },
    {
      id: 'v16_estados_cita' as ViewId,
      title: 'Control de Estados de la Cita',
      description: 'Actualiza citas en tiempo real: Pendiente, Confirmada, Atendida, Cancelada o No Asistió.',
      icon: CheckCircle2,
      buttonText: 'Controlar Estados',
      badge: 'Estados',
      color: 'text-[#4ADE80]',
      borderHover: 'hover:border-[#4ADE80]/60',
    },
  ];

  return (
    <div className="w-full bg-[#11111A] text-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header without duplicate buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#2C2C3E]">
          <div>
            <div className="text-[11px] font-semibold text-[#D4A574] uppercase tracking-[2px] mb-1">
              Centro de Mando Administrativo
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] sm:text-[36px] text-white font-normal"
            >
              Dashboard General & Módulos de Administración
            </h1>
            <p className="text-[13px] text-[#A4A4B5] mt-1 max-w-2xl">
              Panel central de control para Blade & Co Colombia. Selecciona cualquiera de los 5 módulos para operar o supervisa las métricas clave.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('v18_perfil_admin_equipo')}
              className="px-3.5 py-1.5 bg-[#161622] hover:bg-[#20202F] border border-[#D4A574]/50 hover:border-[#D4A574] text-[#D4A574] hover:text-white text-[12px] font-semibold rounded inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#D4A574]" />
              <span>Perfil de Administrador & Personal</span>
            </button>
            <span className="text-[12px] text-[#A4A4B5] bg-[#20202F] px-3 py-1.5 rounded border border-[#2C2C3E]">
              Octubre 2026 · Bogotá D.C.
            </span>
            <button
              onClick={() => onNavigate('v11_admin_login')}
              className="px-3.5 py-1.5 bg-[#20202F] hover:bg-[#B71C1C]/30 hover:text-[#F87171] border border-[#2C2C3E] text-[#A4A4B5] text-[12px] font-medium rounded inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#F87171]" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Banner destacado: Perfil de Administrador & CRUD de Barberos y Recepcionistas */}
        <div className="bg-gradient-to-r from-[#20202F] via-[#1a1a28] to-[#20202F] border border-[#D4A574]/40 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#161622] border border-[#D4A574] flex items-center justify-center text-[#D4A574] shadow-inner shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#D4A574]">
                <span>Gestión de Personal & Credenciales</span>
              </div>
              <h3 style={{ fontFamily: "'Instrument Serif', serif" }} className="text-[22px] text-white font-normal">
                Perfil de Administrador · CRUD de Barberos & Recepcionistas
              </h3>
              <p className="text-[12px] text-[#A4A4B5]">
                Administra altas, modificaciones y bajas de barberos y equipo de recepción con nombre, correo, contraseña y foto.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('v18_perfil_admin_equipo')}
            className="px-4 py-2.5 bg-[#D4A574] hover:bg-[#e0b585] text-[#161622] text-[13px] font-bold rounded-lg inline-flex items-center gap-2 transition-all shrink-0 shadow-md cursor-pointer hover:scale-[1.02]"
          >
            <span>Abrir Perfil & Gestión de Personal</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 🌟 NAVEGACIÓN DIRECTA A LOS 5 MÓDULOS DE ADMINISTRACIÓN (SIN REDUNDANCIA) */}
        <section className="bg-[#20202F] border border-[#2C2C3E] rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#2C2C3E]">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#D4A574]">
                <Layers className="w-3.5 h-3.5 text-[#D4A574]" />
                <span>Módulos de Gestión Administrativa</span>
              </div>
              <h2
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[22px] text-white font-normal mt-0.5"
              >
                Módulos de Control Operativo
              </h2>
            </div>
            <span className="text-[12px] text-[#A4A4B5]">
              5 módulos integrados en tiempo real
            </span>
          </div>

          {/* Grid limpio de exactamente 5 módulos de administración */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
            {adminModules.map((mod) => {
              const IconComp = mod.icon;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => onNavigate(mod.id)}
                  className={`bg-[#161622] hover:bg-[#1f1f2e] border border-[#2C2C3E] ${mod.borderHover} rounded-lg p-4 flex flex-col justify-between text-left transition-all group shadow-sm cursor-pointer hover:scale-[1.02]`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-lg bg-[#20202F] border border-[#2C2C3E] flex items-center justify-center">
                        <IconComp className={`w-4 h-4 ${mod.color}`} />
                      </div>
                      <span className="text-[10px] font-bold text-[#A4A4B5] bg-[#20202F] px-1.5 py-0.5 rounded border border-[#2C2C3E]">
                        {mod.badge}
                      </span>
                    </div>

                    <div>
                      <h3
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                        className="text-[18px] text-white font-normal group-hover:text-[#D4A574] transition-colors leading-tight"
                      >
                        {mod.title}
                      </h3>
                      <p className="text-[11px] text-[#A4A4B5] mt-1 leading-relaxed line-clamp-2">
                        {mod.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#2C2C3E] flex items-center justify-between text-[12px] font-semibold text-[#D4A574] group-hover:text-white transition-colors">
                    <span>{mod.buttonText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4 Main KPIs strip (Geist Bold · 28px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Reservas */}
          <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-5">
            <div className="flex items-center justify-between text-[#A4A4B5] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Total Reservas</span>
              <Calendar className="w-4 h-4 text-[#D4A574]" />
            </div>
            <div className="text-[28px] font-bold text-white tabular-nums tracking-tight">
              {totalReservations}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#4ADE80] mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs mes anterior</span>
            </div>
          </div>

          {/* Ingresos Proyectados */}
          <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-5">
            <div className="flex items-center justify-between text-[#A4A4B5] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Ingresos Proyectados</span>
              <DollarSign className="w-4 h-4 text-[#D4A574]" />
            </div>
            <div className="text-[28px] font-bold text-[#D4A574] tabular-nums tracking-tight">
              {projectedRevenue}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#4ADE80] mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Ticket promedio: {averageTicket}</span>
            </div>
          </div>

          {/* Índice de Cancelaciones */}
          <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-5">
            <div className="flex items-center justify-between text-[#A4A4B5] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Índice Cancelaciones</span>
              <XCircle className="w-4 h-4 text-[#F87171]" />
            </div>
            <div className="text-[28px] font-bold text-white tabular-nums tracking-tight">
              {cancellationRate}%
            </div>
            <div className="text-[12px] text-[#A4A4B5] mt-1">
              Óptimo (por debajo de la meta del 6%)
            </div>
          </div>

          {/* Tasa de Asistencia */}
          <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-5">
            <div className="flex items-center justify-between text-[#A4A4B5] mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Tasa de Cumplimiento</span>
              <CheckCircle className="w-4 h-4 text-[#4ADE80]" />
            </div>
            <div className="text-[28px] font-bold text-[#4ADE80] tabular-nums tracking-tight">
              {attendanceRate}%
            </div>
            <div className="text-[12px] text-[#A4A4B5] mt-1">
              Recordatorios por WhatsApp activos
            </div>
          </div>
        </div>

        {/* 2 Middle Analytics Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Most popular services (7 cols) */}
          <div className="lg:col-span-7 bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C2C3E]">
              <div>
                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[20px] text-white font-normal"
                >
                  Servicios Más Cotizados & Facturación
                </h3>
                <span className="text-[12px] text-[#A4A4B5]">
                  Distribución de demanda por ritual en Colombia
                </span>
              </div>
              <BarChart3 className="w-5 h-5 text-[#D4A574]" />
            </div>

            <div className="space-y-4">
              {topServices.map((srv, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-baseline text-[13px]">
                    <span className="font-semibold text-white">{srv.name}</span>
                    <div className="text-right">
                      <span className="font-bold text-[#D4A574] tabular-nums mr-2">{srv.revenue}</span>
                      <span className="text-[11px] text-[#A4A4B5]">({srv.count} citas · {srv.percentage}%)</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-[#161622] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#D4A574] to-[#e0b587]"
                      style={{ width: `${srv.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Barber productivity (5 cols) */}
          <div className="lg:col-span-5 bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2C2C3E]">
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[20px] text-white font-normal"
              >
                Rendimiento por Sillón
              </h3>
              <span className="text-[11px] font-semibold text-[#D4A574] uppercase">3 Barberos</span>
            </div>

            <div className="space-y-3">
              {barberPerformance.map((bp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded bg-[#161622] border border-[#2C2C3E] flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-semibold text-white text-[13px]">{bp.name}</div>
                    <div className="text-[11px] text-[#A4A4B5]">{bp.role} · {bp.rating}</div>
                    <div className="text-[11px] text-[#4ADE80] mt-0.5">Ocupación: {bp.occupancy}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#D4A574] block tabular-nums">
                      {bp.revenue}
                    </span>
                    <span className="text-[11px] text-[#A4A4B5]">{bp.appointments} citas</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

