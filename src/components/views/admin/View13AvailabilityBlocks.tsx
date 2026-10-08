import React, { useState } from 'react';
import { BlockedTime, Barber, ViewId } from '../../../types';
import { Clock, ShieldAlert, Plus, Trash2, Calendar, Check, AlertCircle } from 'lucide-react';

interface Props {
  blockedTimes: BlockedTime[];
  barbers: Barber[];
  onAddBlock: (block: BlockedTime) => void;
  onRemoveBlock: (id: string) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View13AvailabilityBlocks: React.FC<Props> = ({
  blockedTimes,
  barbers,
  onAddBlock,
  onRemoveBlock,
  onNavigate,
}) => {
  const [barberId, setBarberId] = useState<string>('all');
  const [date, setDate] = useState('2026-10-07');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('15:00');
  const [reason, setReason] = useState('Pausa para almuerzo del equipo');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Business hours schedule state
  const [schedule, setSchedule] = useState([
    { day: 'Lunes a Viernes', hours: '09:30 - 20:30', active: true },
    { day: 'Sábados', hours: '09:00 - 19:00', active: true },
    { day: 'Domingos y Feriados', hours: 'Cerrado', active: false },
  ]);

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();

    const barberObj = barbers.find((b) => b.id === barberId);
    const barberName = barberId === 'all' ? 'Todos los barberos' : barberObj?.name || 'Barbero';

    const newBlock: BlockedTime = {
      id: `blk-${Date.now()}`,
      barberId,
      barberName,
      date,
      startTime,
      endTime,
      reason,
    };

    onAddBlock(newBlock);
    setFeedback(`Franja horaria ${startTime}-${endTime} bloqueada correctamente.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="w-full bg-[#11111A] text-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#2C2C3E]">
          <div>
            <div className="text-[11px] font-semibold text-[#D4A574] uppercase tracking-[2px] mb-1">
              Configuración de Turnos
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] text-white font-normal"
            >
              Control de Disponibilidad & Bloqueos de Horario
            </h1>
            <p className="text-[13px] text-[#A4A4B5] mt-1">
              Inhabilita franjas horarias específicas para evitar que los clientes agenden durante pausas o descansos.
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
            <Check className="w-4 h-4" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* New block creation form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C2C3E]">
                <ShieldAlert className="w-4 h-4 text-[#FBBF24]" />
                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[20px] text-white font-normal"
                >
                  Registrar Nuevo Bloqueo
                </h3>
              </div>

              <form onSubmit={handleCreateBlock} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                    Profesional o Sillón Afectado
                  </label>
                  <select
                    value={barberId}
                    onChange={(e) => setBarberId(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white text-[13px] rounded px-3 py-2 outline-none"
                  >
                    <option value="all">Todos los barberos (Bloqueo general)</option>
                    {barbers.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.title})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                    Fecha del Bloqueo
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white text-[13px] rounded px-3 py-2 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                      Hora Inicio
                    </label>
                    <input
                      type="time"
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white text-[13px] rounded px-3 py-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                      Hora Fin
                    </label>
                    <input
                      type="time"
                      required
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white text-[13px] rounded px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                    Motivo de la Pausa
                  </label>
                  <input
                    type="text"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Ej: Almuerzo, reunión técnica, imprevisto"
                    className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white text-[13px] rounded px-3 py-2 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[13px] font-semibold rounded inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm mt-2"
                >
                  <Plus className="w-4 h-4 text-[#161622]" />
                  <span>Aplicar Bloqueo a la Agenda</span>
                </button>
              </form>
            </div>

            {/* General hours */}
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-5 space-y-3">
              <h4 className="text-[13px] font-semibold text-white uppercase tracking-wider text-[#A4A4B5]">
                Jornada Laboral General
              </h4>
              <div className="space-y-2 text-[12px]">
                {schedule.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1.5 border-b border-[#2C2C3E] last:border-b-0">
                    <span className="text-white">{item.day}</span>
                    <span className={item.active ? 'text-[#D4A574] font-medium' : 'text-[#F87171] font-medium'}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active blocks list (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between pb-4 border-b border-[#2C2C3E] mb-5">
                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[20px] text-white font-normal"
                >
                  Bloqueos Registrados Activos
                </h3>
                <span className="text-[12px] text-[#A4A4B5]">
                  {blockedTimes.length} bloqueos vigentes
                </span>
              </div>

              {blockedTimes.length === 0 ? (
                <div className="py-12 text-center text-[#A4A4B5] text-[13px]">
                  No existen bloqueos activos actualmente. Todos los horarios están abiertos para reserva.
                </div>
              ) : (
                <div className="space-y-3">
                  {blockedTimes.map((blk) => (
                    <div
                      key={blk.id}
                      className="p-4 rounded bg-[#161622] border border-[#2C2C3E] flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-semibold text-white">
                            {blk.reason}
                          </span>
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#E65100]/25 text-[#FFB74D] border border-[#FFB74D]/30">
                            Bloqueado
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[12px] text-[#A4A4B5]">
                          <span>{blk.date}</span>
                          <span>·</span>
                          <span className="text-[#D4A574] font-medium tabular-nums">{blk.startTime} - {blk.endTime} hs</span>
                          <span>·</span>
                          <span>{blk.barberName}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveBlock(blk.id)}
                        className="p-2 text-[#F87171] hover:bg-[#B71C1C]/20 border border-[#F87171]/20 rounded transition-colors"
                        title="Liberar horario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
