import React, { useState } from 'react';
import { Appointment, ViewId } from '../../../types';
import { formatCOPShort } from '../../../utils/formatCurrency';
import { StatusBadge } from '../../common/StatusBadge';
import { Calendar, Clock, User, Scissors, AlertTriangle, X, Check, ArrowRight, ArrowLeft, PlusCircle, History } from 'lucide-react';

interface Props {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string, newDate: string, newTime: string) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View8MyAppointments: React.FC<Props> = ({
  appointments,
  onCancelAppointment,
  onRescheduleAppointment,
  onNavigate,
}) => {
  const [cancellingAptId, setCancellingAptId] = useState<string | null>(null);
  const [reschedulingApt, setReschedulingApt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('2026-10-09');
  const [newTime, setNewTime] = useState('16:30');
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  // Active appointments (not cancelled and not yet completed)
  const activeAppointments = appointments.filter(
    (a) => a.status === 'confirmada' || a.status === 'pendiente'
  );

  const handleConfirmCancel = () => {
    if (cancellingAptId) {
      onCancelAppointment(cancellingAptId);
      setCancellingAptId(null);
      setFeedbackNotice('La cita ha sido cancelada conforme a las políticas del salón.');
      setTimeout(() => setFeedbackNotice(null), 3000);
    }
  };

  const handleConfirmReschedule = () => {
    if (reschedulingApt) {
      onRescheduleAppointment(reschedulingApt.id, newDate, newTime);
      setReschedulingApt(null);
      setFeedbackNotice('¡Cita reprogramada exitosamente!');
      setTimeout(() => setFeedbackNotice(null), 3000);
    }
  };

  return (
    <div className="w-full bg-[#161622] text-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#2C2C3E]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => onNavigate('v1_bienvenida')}
                className="text-[12px] text-[#A4A4B5] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Inicio</span>
              </button>
              <span className="text-[#626275]">·</span>
              <span className="text-[11px] uppercase tracking-[2px] text-[#D4A574] font-semibold">
                Gestión de Reservas del Cliente
              </span>
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] sm:text-[38px] text-white font-normal"
            >
              Mis Citas y Próximas Visitas
            </h1>
            <p className="text-[13px] text-[#A4A4B5] mt-1">
              Consulta el estado de tus citas agendadas, reprograma horarios o cancela con antelación.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('v9_historial')}
              className="px-4 py-2.5 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-[13px] text-[#A4A4B5] hover:text-white rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <History className="w-4 h-4 text-[#D4A574]" />
              <span>Ver Historial Pasado</span>
            </button>

            <button
              onClick={() => onNavigate('v3_servicios')}
              className="px-5 py-2.5 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[13px] font-semibold rounded inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-[#161622]" />
              <span>Agendar Nueva Cita</span>
            </button>
          </div>
        </div>

        {/* Notice alert */}
        {feedbackNotice && (
          <div className="mt-6 p-4 rounded-lg bg-[#1B5E20]/25 border border-[#4ADE80]/30 text-[#4ADE80] text-[13px] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#4ADE80]" />
              <span>{feedbackNotice}</span>
            </div>
            <button onClick={() => setFeedbackNotice(null)} className="text-[#A4A4B5] hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Appointments List */}
        <div className="mt-8">
          {activeAppointments.length === 0 ? (
            <div className="p-12 text-center rounded-lg bg-[#20202F] border border-[#2C2C3E] max-w-lg mx-auto">
              <Calendar className="w-12 h-12 text-[#626275] mx-auto mb-3" />
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[22px] text-white font-normal"
              >
                No tienes citas activas
              </h3>
              <p className="text-[13px] text-[#A4A4B5] mt-1 mb-6">
                Actualmente no tienes ninguna reserva programada. Elige un servicio para consentirte.
              </p>
              <button
                onClick={() => onNavigate('v3_servicios')}
                className="px-6 py-2.5 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[13px] font-semibold rounded transition-colors"
              >
                Explorar Catálogo y Agendar
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="rounded-lg bg-[#20202F] border border-[#2C2C3E] p-6 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    {/* Top Row: Code & Status */}
                    <div className="flex items-center justify-between pb-4 border-b border-[#2C2C3E]">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#626275] uppercase">Reserva:</span>
                        <span className="text-[14px] font-bold text-[#D4A574] tracking-wide">{apt.code}</span>
                      </div>
                      <StatusBadge status={apt.status} />
                    </div>

                    {/* Middle: Service & Details */}
                    <div className="py-4 space-y-3">
                      <div>
                        <h3
                          style={{ fontFamily: "'Instrument Serif', serif" }}
                          className="text-[22px] text-white font-normal"
                        >
                          {apt.serviceName}
                        </h3>
                        <div className="flex items-center gap-2 text-[12px] text-[#A4A4B5] mt-0.5">
                          <span>{apt.durationMinutes} min</span>
                          <span>·</span>
                          <span className="text-white font-bold tabular-nums">{formatCOPShort(apt.price)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2 text-[13px] bg-[#161622] p-3 rounded border border-[#2C2C3E]">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-[#626275] uppercase font-semibold">Barbero</span>
                          <div className="flex items-center gap-1.5 text-white">
                            <User className="w-3.5 h-3.5 text-[#D4A574]" />
                            <span className="truncate">{apt.barberName}</span>
                          </div>
                        </div>

                        <div className="space-y-0.5">
                          <span className="text-[10px] text-[#626275] uppercase font-semibold">Fecha y Hora</span>
                          <div className="flex items-center gap-1.5 text-[#D4A574] font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{apt.date} · {apt.time} hs</span>
                          </div>
                        </div>
                      </div>

                      {apt.notes && (
                        <p className="text-[11px] text-[#A4A4B5] italic">
                          Nota: "{apt.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions: Modificar o Cancelar (RU-08, RU-09, RU-10) */}
                  <div className="pt-4 border-t border-[#2C2C3E] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setCancellingAptId(apt.id)}
                      className="px-3.5 py-2 text-[12px] font-medium text-[#F87171] hover:bg-[#B71C1C]/20 border border-[#F87171]/30 rounded transition-colors cursor-pointer"
                    >
                      Cancelar Cita
                    </button>

                    <button
                      type="button"
                      onClick={() => setReschedulingApt(apt)}
                      className="px-4 py-2 text-[12px] font-semibold text-white bg-[#2D2D3F] hover:bg-[#38384f] border border-[#2C2C3E] rounded transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Modificar Fecha u Hora</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4A574]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal: Confirm Cancel (RU-10) */}
        {cancellingAptId && (
          <div className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#20202F] border border-[#2C2C3E] rounded-xl p-6 shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#B71C1C]/25 text-[#F87171] flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[22px] text-white font-normal"
                >
                  ¿Deseas cancelar esta cita?
                </h3>
                <p className="text-[13px] text-[#A4A4B5] mt-1">
                  Tu reserva será anulada y el turno se liberará en el calendario del barbero. Puedes cancelar sin costo hasta 2 horas antes de la hora fijada.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setCancellingAptId(null)}
                  className="py-2.5 bg-[#161622] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-white text-[13px] font-medium rounded transition-colors"
                >
                  Mantener Cita
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="py-2.5 bg-[#B71C1C] hover:bg-[#c92a2a] text-white text-[13px] font-semibold rounded transition-colors"
                >
                  Confirmar Cancelación
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Reschedule (RU-09) */}
        {reschedulingApt && (
          <div className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#20202F] border border-[#2C2C3E] rounded-xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#2C2C3E]">
                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[22px] text-white font-normal"
                >
                  Modificar Fecha u Hora de Reserva
                </h3>
                <button
                  onClick={() => setReschedulingApt(null)}
                  className="text-[#A4A4B5] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-[13px] text-[#A4A4B5]">
                Cita actual: <strong className="text-white">{reschedulingApt.serviceName}</strong> con <strong className="text-[#D4A574]">{reschedulingApt.barberName}</strong> ({reschedulingApt.date} · {reschedulingApt.time} hs).
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                    Nueva Fecha
                  </label>
                  <select
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white text-[13px] rounded px-3 py-2 outline-none"
                  >
                    <option value="2026-10-08">Jueves, 08 de Octubre 2026</option>
                    <option value="2026-10-09">Viernes, 09 de Octubre 2026</option>
                    <option value="2026-10-10">Sábado, 10 de Octubre 2026</option>
                    <option value="2026-10-12">Lunes, 12 de Octubre 2026</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                    Nueva Franja Horaria
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10:15', '11:45', '13:00', '15:30', '16:30', '18:15'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setNewTime(slot)}
                        className={`py-2 text-[13px] rounded border transition-colors ${
                          newTime === slot
                            ? 'bg-[#D4A574] text-[#161622] font-bold border-[#D4A574]'
                            : 'bg-[#161622] text-white border-[#2C2C3E] hover:border-[#D4A574]/40'
                        }`}
                      >
                        {slot} hs
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#2C2C3E]">
                <button
                  type="button"
                  onClick={() => setReschedulingApt(null)}
                  className="px-4 py-2 bg-[#161622] text-[#A4A4B5] hover:text-white rounded text-[13px] border border-[#2C2C3E]"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReschedule}
                  className="px-5 py-2 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] font-semibold rounded text-[13px]"
                >
                  Guardar Nuevo Horario
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
