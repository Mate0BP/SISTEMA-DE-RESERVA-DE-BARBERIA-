import React, { useState } from 'react';
import { ViewId, Service, Barber, Appointment, BlockedTime } from '../../../types';
import { Calendar as CalendarIcon, Clock, ArrowLeft, ArrowRight, Check, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  selectedService: Service | null;
  selectedBarber: Barber | null;
  selectedDate: string;
  selectedTime: string | null;
  appointments: Appointment[];
  blockedTimes: BlockedTime[];
  onSelectDateTime: (date: string, time: string) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View5Schedule: React.FC<Props> = ({
  selectedService,
  selectedBarber,
  selectedDate,
  selectedTime,
  appointments,
  blockedTimes,
  onSelectDateTime,
  onNavigate,
}) => {
  const [currentDate, setCurrentDate] = useState<string>(selectedDate || '2026-10-07');
  const [currentTimeSlot, setCurrentTimeSlot] = useState<string | null>(selectedTime);

  // Available slots for Blade & Co
  const ALL_SLOTS = [
    '09:30', '10:15', '11:00', '11:45', '12:30',
    '13:15', '15:00', '15:45', '16:30', '17:15',
    '18:00', '18:45', '19:30'
  ];

  // Quick next 7 days generator
  const daysList = [
    { date: '2026-10-07', dayName: 'Mié', dayNumber: '07', isAvailable: true },
    { date: '2026-10-08', dayName: 'Jue', dayNumber: '08', isAvailable: true },
    { date: '2026-10-09', dayName: 'Vie', dayNumber: '09', isAvailable: true },
    { date: '2026-10-10', dayName: 'Sáb', dayNumber: '10', isAvailable: true },
    { date: '2026-10-11', dayName: 'Dom', dayNumber: '11', isAvailable: false, label: 'Cerrado' },
    { date: '2026-10-12', dayName: 'Lun', dayNumber: '12', isAvailable: true },
    { date: '2026-10-13', dayName: 'Mar', dayNumber: '13', isAvailable: true },
  ];

  // Helper to determine if a slot is blocked by appointment or admin block (RN-01, RN-06)
  const isSlotOccupied = (slot: string) => {
    // Check existing appointments on this date
    const hasApt = appointments.some((apt) => {
      if (apt.date !== currentDate) return false;
      if (apt.status === 'cancelada') return false; // Cancelled appointments free up the slot
      if (selectedBarber && apt.barberId !== selectedBarber.id) return false;
      return apt.time === slot;
    });

    if (hasApt) return true;

    // Check admin blocked times
    const isBlocked = blockedTimes.some((blk) => {
      if (blk.date !== currentDate) return false;
      if (blk.barberId !== 'all' && selectedBarber && blk.barberId !== selectedBarber.id) return false;
      return slot >= blk.startTime && slot < blk.endTime;
    });

    return isBlocked;
  };

  const handleSlotSelect = (slot: string) => {
    setCurrentTimeSlot(slot);
    onSelectDateTime(currentDate, slot);
  };

  const handleContinue = () => {
    if (!currentTimeSlot) return;
    onSelectDateTime(currentDate, currentTimeSlot);
    onNavigate('v6_resumen');
  };

  return (
    <div className="w-full bg-[#161622] text-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header navigation and progress */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2C2C3E]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => onNavigate('v4_barbero')}
                className="text-[12px] text-[#A4A4B5] hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a Barbero</span>
              </button>
              <span className="text-[#626275]">·</span>
              <span className="text-[11px] uppercase tracking-[2px] text-[#D4A574] font-semibold">
                Fecha y Horario
              </span>
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] sm:text-[38px] text-white font-normal"
            >
              Calendario y Franjas Disponibles
            </h1>
            <p className="text-[13px] text-[#A4A4B5] mt-1 max-w-2xl">
              Selecciona el día y la hora que mejor se adapte a tu agenda. Las horas no disponibles se calculan en tiempo real según la duración del servicio ({selectedService?.durationMinutes || 45} min).
            </p>
          </div>

          {/* Active selection summary badge */}
          <div className="p-3.5 rounded-lg bg-[#20202F] border border-[#2C2C3E] flex items-center gap-4 text-xs">
            <div>
              <span className="text-[#626275] block text-[10px] uppercase font-semibold">Servicio</span>
              <span className="text-white font-medium">{selectedService?.name || 'Corte Clásico'}</span>
            </div>
            <div className="h-6 w-px bg-[#2C2C3E]" />
            <div>
              <span className="text-[#626275] block text-[10px] uppercase font-semibold">Barbero</span>
              <span className="text-[#D4A574] font-medium">{selectedBarber?.name || 'Cualquier disponible'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Calendar Day Picker (Left column 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#A4A4B5]">
                  Octubre 2026
                </span>
                <span className="text-[12px] text-[#D4A574] font-medium">Horario de Otoño</span>
              </div>

              {/* Day selector carousel/strip */}
              <div className="grid grid-cols-7 gap-1.5">
                {daysList.map((day) => {
                  const isSelected = currentDate === day.date;
                  return (
                    <button
                      key={day.date}
                      disabled={!day.isAvailable}
                      onClick={() => {
                        setCurrentDate(day.date);
                        setCurrentTimeSlot(null);
                      }}
                      className={`p-2.5 rounded flex flex-col items-center justify-center transition-all ${
                        !day.isAvailable
                          ? 'opacity-30 bg-[#161622] cursor-not-allowed border border-[#2C2C3E]/50'
                          : isSelected
                          ? 'bg-[#D4A574] text-[#161622] font-semibold shadow-md'
                          : 'bg-[#161622] text-white hover:bg-[#2D2D3F] border border-[#2C2C3E]'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider">{day.dayName}</span>
                      <span className="text-[16px] font-bold tabular-nums mt-0.5">{day.dayNumber}</span>
                      {day.label && <span className="text-[8px] mt-0.5">{day.label}</span>}
                    </button>
                  );
                })}
              </div>

              {/* Day Details Card */}
              <div className="mt-6 pt-5 border-t border-[#2C2C3E] space-y-2 text-[12px] text-[#A4A4B5]">
                <div className="flex justify-between">
                  <span>Jornada de apertura:</span>
                  <span className="text-white font-medium">09:30 – 20:30</span>
                </div>
                <div className="flex justify-between">
                  <span>Tiempo estimado de cita:</span>
                  <span className="text-white font-medium">{selectedService?.durationMinutes || 45} minutos</span>
                </div>
                <div className="flex justify-between">
                  <span>Política de cancelación:</span>
                  <span className="text-[#4ADE80] font-medium">Gratis hasta 2h antes</span>
                </div>
              </div>
            </div>

            {/* Legend for slots */}
            <div className="p-4 rounded-lg bg-[#20202F]/60 border border-[#2C2C3E] space-y-2 text-[12px]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#161622] border border-[#2C2C3E]" />
                <span className="text-[#A4A4B5]">Turno disponible para reserva inmediata</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#D4A574]" />
                <span className="text-[#D4A574] font-medium">Tu horario seleccionado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#161622]/40 opacity-40 border border-[#B71C1C]/40" />
                <span className="text-[#626275]">Ocupado o bloqueado por pausa del personal</span>
              </div>
            </div>
          </div>

          {/* Time Slots Grid (Right column 7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#2C2C3E] mb-6">
                <div>
                  <h3
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-[20px] text-white font-normal"
                  >
                    Franjas Horarias para el {currentDate}
                  </h3>
                  <span className="text-[12px] text-[#A4A4B5]">
                    Elige el bloque que deseas reservar
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-[#D4A574]">
                  <Clock className="w-4 h-4" />
                  <span>Zona Horaria: Colombia (COT / UTC-5)</span>
                </div>
              </div>

              {/* Slots buttons grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {ALL_SLOTS.map((slot) => {
                  const occupied = isSlotOccupied(slot);
                  const isSelected = currentTimeSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={occupied}
                      onClick={() => handleSlotSelect(slot)}
                      className={`py-3 px-3 rounded flex flex-col items-center justify-center transition-all cursor-pointer ${
                        occupied
                          ? 'opacity-35 bg-[#161622] border border-[#2C2C3E] cursor-not-allowed text-[#626275]'
                          : isSelected
                          ? 'bg-[#D4A574] text-[#161622] font-bold shadow-md ring-2 ring-[#D4A574]/40 scale-102'
                          : 'bg-[#161622] hover:bg-[#2D2D3F] border border-[#2C2C3E] hover:border-[#D4A574]/50 text-white'
                      }`}
                    >
                      <span className="text-[15px] font-semibold tabular-nums">{slot}</span>
                      <span className="text-[10px] mt-0.5 opacity-80">
                        {occupied ? 'No disponible' : isSelected ? 'Elegido' : 'Disponible'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action Continue */}
              <div className="mt-8 pt-6 border-t border-[#2C2C3E] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[13px] text-[#A4A4B5]">
                  {currentTimeSlot ? (
                    <span className="text-white">
                      Cita programada para: <strong className="text-[#D4A574]">{currentDate} a las {currentTimeSlot} hs</strong>
                    </span>
                  ) : (
                    <span>Por favor selecciona una franja horaria para continuar.</span>
                  )}
                </div>

                <button
                  type="button"
                  disabled={!currentTimeSlot}
                  onClick={handleContinue}
                  className={`w-full sm:w-auto px-7 py-3 rounded text-[14px] font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm ${
                    currentTimeSlot
                      ? 'bg-[#D4A574] hover:bg-[#e0b587] text-[#161622]'
                      : 'bg-[#2D2D3F] text-[#626275] cursor-not-allowed border border-[#2C2C3E]'
                  }`}
                >
                  <span>Revisar Resumen de Reserva</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
