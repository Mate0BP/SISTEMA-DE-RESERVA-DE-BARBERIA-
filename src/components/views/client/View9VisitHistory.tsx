import React from 'react';
import { Appointment, ViewId } from '../../../types';
import { formatCOP, formatCOPShort } from '../../../utils/formatCurrency';
import { StatusBadge } from '../../common/StatusBadge';
import { History, Calendar, User, Scissors, ArrowRight, ArrowLeft, RotateCcw, Award } from 'lucide-react';

interface Props {
  appointments: Appointment[];
  onRepeatAppointment: (serviceId: string, barberId: string) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View9VisitHistory: React.FC<Props> = ({
  appointments,
  onRepeatAppointment,
  onNavigate,
}) => {
  // Past completed visits
  const pastAppointments = appointments.filter((a) => a.status === 'atendida');

  const totalSpent = pastAppointments.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="w-full bg-[#161622] text-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#2C2C3E]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => onNavigate('v8_mis_citas')}
                className="text-[12px] text-[#A4A4B5] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a Mis Citas</span>
              </button>
              <span className="text-[#626275]">·</span>
              <span className="text-[11px] uppercase tracking-[2px] text-[#D4A574] font-semibold">
                Registro Histórico del Cliente
              </span>
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] sm:text-[38px] text-white font-normal"
            >
              Historial de Visitas y Atenciones
            </h1>
            <p className="text-[13px] text-[#A4A4B5] mt-1">
              Consulta todas tus sesiones anteriores completadas en Blade & Co y repite tu corte favorito con un solo clic.
            </p>
          </div>

          <button
            onClick={() => onNavigate('v8_mis_citas')}
            className="px-4 py-2.5 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-[13px] text-white rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Ver Citas Activas</span>
            <ArrowRight className="w-4 h-4 text-[#D4A574]" />
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          <div className="p-5 rounded-lg bg-[#20202F] border border-[#2C2C3E]">
            <span className="text-[11px] text-[#626275] uppercase font-semibold block">Visitas Completadas</span>
            <span className="text-[28px] font-bold text-white tabular-nums mt-1 block">
              {pastAppointments.length}
            </span>
            <span className="text-[12px] text-[#4ADE80]">Registro al día en el salón</span>
          </div>

          <div className="p-5 rounded-lg bg-[#20202F] border border-[#2C2C3E]">
            <span className="text-[11px] text-[#626275] uppercase font-semibold block">Total Invertido en Grooming</span>
            <span className="text-[26px] font-bold text-[#D4A574] tabular-nums mt-1 block">
              {formatCOP(totalSpent)}
            </span>
            <span className="text-[12px] text-[#A4A4B5]">Servicios en Colombia</span>
          </div>

          <div className="p-5 rounded-lg bg-[#20202F] border border-[#2C2C3E]">
            <span className="text-[11px] text-[#626275] uppercase font-semibold block">Nivel de Fidelidad</span>
            <div className="flex items-center gap-2 mt-1">
              <Award className="w-6 h-6 text-[#D4A574]" />
              <span className="text-[20px] font-bold text-white">Cliente Preferente</span>
            </div>
            <span className="text-[12px] text-[#D4A574]">Café colombiano y bar de cortesía en cada visita</span>
          </div>
        </div>

        {/* List of past visits */}
        <div className="space-y-4">
          <h2
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[24px] text-white font-normal mb-4"
          >
            Sesiones Anteriores
          </h2>

          {pastAppointments.length === 0 ? (
            <div className="p-8 text-center bg-[#20202F] border border-[#2C2C3E] rounded-lg text-[#A4A4B5] text-[13px]">
              No hay historial de visitas registradas previamente.
            </div>
          ) : (
            pastAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-5 rounded-lg bg-[#20202F] border border-[#2C2C3E] flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#D4A574]/40 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded bg-[#161622] border border-[#2C2C3E] flex items-center justify-center text-[#D4A574] shrink-0">
                    <Scissors className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3
                        style={{ fontFamily: "'Instrument Serif', serif" }}
                        className="text-[20px] text-white font-normal"
                      >
                        {apt.serviceName}
                      </h3>
                      <StatusBadge status={apt.status} size="sm" />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#A4A4B5] mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#D4A574]" />
                        {apt.date} a las {apt.time} hs
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#D4A574]" />
                        Atendido por: <strong className="text-white font-medium ml-1">{apt.barberName}</strong>
                      </span>
                      <span>·</span>
                      <span className="text-white font-bold tabular-nums">{formatCOPShort(apt.price)}</span>
                    </div>

                    {apt.notes && (
                      <p className="text-[11px] text-[#626275] mt-1">
                        Detalle: {apt.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Repeat Appointment CTA */}
                <button
                  type="button"
                  onClick={() => {
                    onRepeatAppointment(apt.serviceId, apt.barberId);
                    onNavigate('v5_horarios');
                  }}
                  className="px-4 py-2 bg-[#161622] hover:bg-[#D4A574] text-white hover:text-[#161622] border border-[#2C2C3E] hover:border-[#D4A574] rounded text-[13px] font-semibold transition-all inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repetir este Corte</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
