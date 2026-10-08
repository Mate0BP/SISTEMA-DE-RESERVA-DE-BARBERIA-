import React, { useState } from 'react';
import { Appointment, AppointmentStatus, ViewId } from '../../../types';
import { StatusBadge } from '../../common/StatusBadge';
import { CheckCircle2, Clock, Calendar, User, Scissors, Check, X, AlertCircle } from 'lucide-react';

interface Props {
  appointments: Appointment[];
  onUpdateStatus: (appointmentId: string, newStatus: AppointmentStatus) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View16AppointmentStatusControl: React.FC<Props> = ({
  appointments,
  onUpdateStatus,
  onNavigate,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(appointments[0] || null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [feedback, setFeedback] = useState<string | null>(null);

  const STATUS_OPTIONS: { id: AppointmentStatus; label: string; desc: string; color: string; bg: string }[] = [
    {
      id: 'pendiente',
      label: 'Pendiente',
      desc: 'Cita reservada pendiente de confirmación telefónica o llegada.',
      color: 'text-[#FBBF24]',
      bg: 'bg-[#E65100]/25 border-[#FBBF24]/30',
    },
    {
      id: 'confirmada',
      label: 'Confirmada',
      desc: 'El cliente confirmó asistencia o turno afianzado en agenda.',
      color: 'text-[#4ADE80]',
      bg: 'bg-[#1B5E20]/25 border-[#4ADE80]/30',
    },
    {
      id: 'atendida',
      label: 'Atendida',
      desc: 'Servicio concluido y cobrado satisfactoriamente en el salón.',
      color: 'text-[#64B5F6]',
      bg: 'bg-[#0D47A1]/25 border-[#64B5F6]/30',
    },
    {
      id: 'cancelada',
      label: 'Cancelada',
      desc: 'Cita anulada por el cliente o el salón antes del servicio.',
      color: 'text-[#F87171]',
      bg: 'bg-[#B71C1C]/25 border-[#F87171]/30',
    },
    {
      id: 'no_asistio',
      label: 'No Asistió (No Show)',
      desc: 'El cliente no se presentó a su turno sin avisar.',
      color: 'text-[#E57373]',
      bg: 'bg-[#B71C1C]/20 border-[#E57373]/30',
    },
  ];

  const filteredAppointments = appointments.filter((a) => {
    if (filterStatus === 'all') return true;
    return a.status === filterStatus;
  });

  const handleApplyStatus = (statusId: AppointmentStatus) => {
    if (!selectedAppointment) return;
    onUpdateStatus(selectedAppointment.id, statusId);
    setSelectedAppointment({
      ...selectedAppointment,
      status: statusId,
    });
    setFeedback(`Estado de la cita ${selectedAppointment.code} actualizado a "${statusId.toUpperCase()}".`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="w-full bg-[#11111A] text-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#2C2C3E]">
          <div>
            <div className="text-[11px] font-semibold text-[#D4A574] uppercase tracking-[2px] mb-1">
              Flujo Operativo
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] text-white font-normal"
            >
              Control & Cambio de Estados de la Cita
            </h1>
            <p className="text-[13px] text-[#A4A4B5] mt-1">
              Modifica en tiempo real el ciclo de vida de cada reserva: Pendiente, Confirmada, Atendida, Cancelada o No Asistió.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate('v17_analitica')}
              className="px-4 py-2 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] font-semibold text-[13px] rounded transition-colors shadow-sm cursor-pointer"
            >
              ← Volver al Dashboard
            </button>
            <button
              onClick={() => onNavigate('v12_agenda')}
              className="px-3.5 py-2 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-white text-[13px] rounded transition-colors"
            >
              Ver Agenda
            </button>
          </div>
        </div>

        {feedback && (
          <div className="p-4 rounded bg-[#1B5E20]/25 border border-[#4ADE80]/30 text-[#4ADE80] text-[13px] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Status Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[{ id: 'all', label: 'Todas las Citas' }, ...STATUS_OPTIONS].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilterStatus(opt.id)}
              className={`px-3 py-1.5 rounded text-[12px] font-semibold transition-colors whitespace-nowrap ${
                filterStatus === opt.id
                  ? 'bg-[#D4A574] text-[#161622]'
                  : 'bg-[#20202F] text-[#A4A4B5] hover:text-white border border-[#2C2C3E]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* 2 columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Appointment list (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <h3
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[20px] text-white font-normal mb-2"
            >
              Citas Disponibles ({filteredAppointments.length})
            </h3>

            {filteredAppointments.map((apt) => {
              const isSelected = selectedAppointment?.id === apt.id;
              return (
                <div
                  key={apt.id}
                  onClick={() => setSelectedAppointment(apt)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#20202F] border-[#D4A574] shadow-lg ring-1 ring-[#D4A574]/40'
                      : 'bg-[#20202F] border border-[#2C2C3E] hover:border-[#D4A574]/50 hover:bg-[#252538]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[14px] font-bold text-white">{apt.clientName}</span>
                      <span className="text-[11px] text-[#D4A574] font-semibold">{apt.code}</span>
                    </div>
                    <div className="text-[12px] text-[#A4A4B5] flex items-center gap-2">
                      <span>{apt.serviceName}</span>
                      <span>·</span>
                      <span>{apt.date} {apt.time} hs</span>
                      <span>·</span>
                      <span>{apt.barberName}</span>
                    </div>
                  </div>

                  <StatusBadge status={apt.status} size="sm" />
                </div>
              );
            })}
          </div>

          {/* Status Changer Control Panel (5 cols) */}
          <div className="lg:col-span-5">
            {selectedAppointment ? (
              <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 shadow-xl space-y-6 sticky top-6">
                <div className="pb-4 border-b border-[#2C2C3E]">
                  <span className="text-[10px] text-[#626275] uppercase block font-semibold">Cita Seleccionada</span>
                  <div className="flex items-center justify-between mt-1">
                    <h3
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                      className="text-[24px] text-white font-normal"
                    >
                      {selectedAppointment.clientName}
                    </h3>
                    <span className="text-[14px] font-bold text-[#D4A574]">{selectedAppointment.code}</span>
                  </div>
                  <div className="text-[12px] text-[#A4A4B5] mt-1">
                    {selectedAppointment.serviceName} · {selectedAppointment.date} a las {selectedAppointment.time} hs
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] text-[#A4A4B5]">Estado actual:</span>
                    <StatusBadge status={selectedAppointment.status} size="sm" />
                  </div>
                </div>

                {/* Status action buttons list */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-semibold uppercase text-[#A4A4B5] tracking-wider block">
                    Seleccionar Nuevo Estado
                  </span>

                  {STATUS_OPTIONS.map((opt) => {
                    const isCurrent = selectedAppointment.status === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleApplyStatus(opt.id)}
                        className={`w-full p-3.5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isCurrent
                            ? `${opt.bg} ring-2 ring-[#D4A574]/40`
                            : 'bg-[#161622] border-[#2C2C3E] hover:border-[#D4A574]/40'
                        }`}
                      >
                        <div>
                          <div className={`text-[13px] font-bold ${opt.color}`}>
                            {opt.label}
                          </div>
                          <div className="text-[11px] text-[#A4A4B5] mt-0.5">
                            {opt.desc}
                          </div>
                        </div>

                        {isCurrent && (
                          <div className="w-5 h-5 rounded-full bg-[#D4A574] text-[#161622] flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-[#20202F] border border-[#2C2C3E] rounded-lg text-[#A4A4B5] text-[13px]">
                Selecciona una cita para cambiar su estado operativo.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
