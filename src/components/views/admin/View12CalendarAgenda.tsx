import React, { useState } from 'react';
import { Appointment, Barber, ViewId, BlockedTime } from '../../../types';
import { StatusBadge } from '../../common/StatusBadge';
import { Calendar, Clock, Filter, ChevronLeft, ChevronRight, User, PlusCircle, CheckCircle, MoreHorizontal, ArrowLeft } from 'lucide-react';

interface Props {
  appointments: Appointment[];
  barbers: Barber[];
  blockedTimes: BlockedTime[];
  onOpenStatusModal: (appointment: Appointment) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View12CalendarAgenda: React.FC<Props> = ({
  appointments,
  barbers,
  blockedTimes,
  onOpenStatusModal,
  onNavigate,
}) => {
  const [calendarView, setCalendarView] = useState<'dia' | 'semana' | 'mes'>('dia');
  const [selectedDate, setSelectedDate] = useState('2026-10-07');
  const [barberFilter, setBarberFilter] = useState<string>('all');

  const HOURS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  // Filtered barbers to display
  const activeBarbers = barberFilter === 'all'
    ? barbers
    : barbers.filter((b) => b.id === barberFilter);

  // Appointments for this date
  const dateAppointments = appointments.filter((a) => a.date === selectedDate);

  return (
    <div className="w-full bg-[#11111A] text-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Operational Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#2C2C3E]">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#D4A574] uppercase tracking-[2px] mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Control Operativo de Agenda</span>
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] text-white font-normal"
            >
              Agenda de Citas & Calendario en Tiempo Real
            </h1>
          </div>

          {/* Quick Admin Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('v17_analitica')}
              className="px-4 py-2 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[13px] font-semibold rounded inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Dashboard</span>
            </button>
            <button
              onClick={() => onNavigate('v13_bloqueos')}
              className="px-3.5 py-2 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-[13px] text-white rounded inline-flex items-center gap-1.5 transition-colors"
            >
              <Clock className="w-4 h-4 text-[#FBBF24]" />
              <span>Añadir Bloqueo</span>
            </button>
            <button
              onClick={() => onNavigate('v16_estados_cita')}
              className="px-3.5 py-2 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-[13px] text-white rounded inline-flex items-center gap-1.5 transition-colors"
            >
              <CheckCircle className="w-4 h-4 text-[#4ADE80]" />
              <span>Control de Estados</span>
            </button>
          </div>
        </div>

        {/* View Switchers & Date controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#20202F] p-4 rounded-lg border border-[#2C2C3E]">
          {/* Day / Week / Month switch */}
          <div className="flex items-center gap-1 bg-[#161622] p-1 rounded border border-[#2C2C3E]">
            {(['dia', 'semana', 'mes'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setCalendarView(view)}
                className={`px-4 py-1.5 text-[12px] font-semibold rounded capitalize transition-colors ${
                  calendarView === view
                    ? 'bg-[#D4A574] text-[#161622]'
                    : 'text-[#A4A4B5] hover:text-white'
                }`}
              >
                Vista {view}
              </button>
            ))}
          </div>

          {/* Date Selector Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedDate('2026-10-06')}
              className="p-1.5 rounded bg-[#161622] border border-[#2C2C3E] text-[#A4A4B5] hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[14px] font-semibold text-white px-2">
              {selectedDate === '2026-10-07' ? 'Miércoles, 07 de Octubre 2026' : `Fecha: ${selectedDate}`}
            </span>
            <button
              onClick={() => setSelectedDate('2026-10-08')}
              className="p-1.5 rounded bg-[#161622] border border-[#2C2C3E] text-[#A4A4B5] hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Barber filter dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#D4A574]" />
            <select
              value={barberFilter}
              onChange={(e) => setBarberFilter(e.target.value)}
              className="bg-[#161622] border border-[#2C2C3E] text-white text-[12px] font-medium rounded px-3 py-1.5 outline-none"
            >
              <option value="all">Todos los Sillones / Barberos</option>
              {barbers.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timeline Grid (Format requested: Timeline column per barber) */}
        <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg overflow-x-auto shadow-xl">
          <div className="min-w-[760px]">
            {/* Table Header: Barber columns */}
            <div className="grid border-b border-[#2C2C3E] bg-[#161622]" style={{ gridTemplateColumns: `100px repeat(${activeBarbers.length}, 1fr)` }}>
              <div className="p-3.5 text-[11px] font-semibold text-[#626275] uppercase border-r border-[#2C2C3E] text-center">
                Horario
              </div>
              {activeBarbers.map((barber) => (
                <div key={barber.id} className="p-3.5 border-r border-[#2C2C3E] last:border-r-0 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#2D2D3F] border border-[#2C2C3E] flex items-center justify-center text-[11px] font-bold text-[#D4A574]">
                      {barber.avatarInitial}
                    </div>
                    <div>
                      <span className="text-[13px] font-semibold text-white block leading-tight">{barber.name}</span>
                      <span className="text-[10px] text-[#A4A4B5] block">{barber.title}</span>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80]" title="En turno activo" />
                </div>
              ))}
            </div>

            {/* Timeline Rows */}
            <div className="divide-y divide-[#2C2C3E]">
              {HOURS.map((hour) => {
                const hourNum = parseInt(hour.split(':')[0], 10);
                return (
                  <div
                    key={hour}
                    className="grid min-h-[76px] transition-colors hover:bg-[#252537]/50"
                    style={{ gridTemplateColumns: `100px repeat(${activeBarbers.length}, 1fr)` }}
                  >
                    {/* Hour Column */}
                    <div className="p-3 text-[12px] font-bold text-[#A4A4B5] border-r border-[#2C2C3E] flex items-start justify-center tabular-nums bg-[#161622]/40">
                      {hour}
                    </div>

                    {/* Barber slot cells */}
                    {activeBarbers.map((barber) => {
                      // Find appointment starting around this hour
                      const apt = dateAppointments.find((a) => {
                        if (a.barberId !== barber.id) return false;
                        const aptHour = parseInt(a.time.split(':')[0], 10);
                        return aptHour === hourNum;
                      });

                      // Find block
                      const block = blockedTimes.find((b) => {
                        if (b.date !== selectedDate) return false;
                        if (b.barberId !== 'all' && b.barberId !== barber.id) return false;
                        const blkHour = parseInt(b.startTime.split(':')[0], 10);
                        return blkHour === hourNum;
                      });

                      return (
                        <div
                          key={barber.id}
                          className="p-2 border-r border-[#2C2C3E] last:border-r-0 relative flex flex-col justify-center"
                        >
                          {apt && (
                            <div
                              onClick={() => onOpenStatusModal(apt)}
                              className="rounded p-2.5 transition-transform hover:scale-[1.01] cursor-pointer shadow-sm border border-[#3B82F6]/40 bg-[#3B82F6]/20 flex flex-col justify-between"
                            >
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[12px] font-bold text-white truncate">
                                  {apt.clientName}
                                </span>
                                <span className="text-[10px] font-bold text-[#D4A574] tabular-nums">
                                  {apt.time} ({apt.durationMinutes}m)
                                </span>
                              </div>
                              <div className="flex items-center justify-between gap-1 text-[11px] text-[#A4A4B5]">
                                <span className="truncate">{apt.serviceName}</span>
                                <StatusBadge status={apt.status} size="sm" />
                              </div>
                            </div>
                          )}

                          {block && !apt && (
                            <div className="rounded p-2 border border-[#FBBF24]/40 bg-[#E65100]/20 text-[#FFB74D]">
                              <div className="text-[11px] font-semibold flex items-center justify-between">
                                <span>Bloqueo: {block.reason}</span>
                                <span className="text-[10px]">{block.startTime} - {block.endTime}</span>
                              </div>
                            </div>
                          )}

                          {!apt && !block && (
                            <div className="h-full w-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <span className="text-[10px] text-[#626275] border border-dashed border-[#2C2C3E] px-2 py-1 rounded">
                                + Turno Libre
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 p-4 rounded-lg bg-[#20202F] border border-[#2C2C3E] text-[12px] text-[#A4A4B5]">
          <span className="text-white font-semibold">Convención de Agenda:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#3B82F6]/20 border border-[#3B82F6]" />
            <span>Cita Activa (Fondo 20% Azul)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#8B5CF6]/20 border border-[#8B5CF6]" />
            <span>Servicio Especial (Fondo 20% Violeta)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#E65100]/20 border border-[#FBBF24]" />
            <span>Pausa / Bloqueo Técnico</span>
          </div>
        </div>
      </div>
    </div>
  );
};
