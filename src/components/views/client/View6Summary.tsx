import React, { useState } from 'react';
import { ViewId, Service, Barber, Appointment } from '../../../types';
import { formatCOP, formatCOPShort } from '../../../utils/formatCurrency';
import { Calendar, Clock, User, Scissors, CheckCircle, ArrowLeft, ShieldCheck, Tag, FileText } from 'lucide-react';

interface Props {
  selectedService: Service | null;
  selectedBarber: Barber | null;
  selectedDate: string;
  selectedTime: string | null;
  clientInfo: { name: string; phone: string; email: string };
  onConfirmAppointment: (newAppointment: Appointment) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View6Summary: React.FC<Props> = ({
  selectedService,
  selectedBarber,
  selectedDate,
  selectedTime,
  clientInfo,
  onConfirmAppointment,
  onNavigate,
}) => {
  const [name, setName] = useState(clientInfo.name || 'Rodrigo Méndez');
  const [phone, setPhone] = useState(clientInfo.phone || '+57 312 345 6789');
  const [email, setEmail] = useState(clientInfo.email || 'rodrigo.m@gmail.com');
  const [notes, setNotes] = useState('Por favor prestar atención a la línea de la barba.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Defaults fallback
  const service = selectedService || {
    id: 'srv-1',
    name: 'Corte Clásico Signature',
    description: 'Corte artesanal a tijera y máquina con lavado purificante.',
    durationMinutes: 45,
    price: 20000,
    category: 'Corte',
    enabled: true,
  };

  const barberName = selectedBarber ? selectedBarber.name : 'Cualquier Barbero Disponible';
  const barberId = selectedBarber ? selectedBarber.id : 'barber-1';
  const dateStr = selectedDate || '2026-10-07';
  const timeStr = selectedTime || '11:00';

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      code: `BC-${randomSuffix}`,
      clientId: 'cli-1',
      clientName: name,
      clientPhone: phone,
      clientEmail: email,
      serviceId: service.id,
      serviceName: service.name,
      barberId: barberId,
      barberName: barberName,
      date: dateStr,
      time: timeStr,
      durationMinutes: service.durationMinutes,
      price: service.price,
      status: 'confirmada',
      notes: notes,
      createdAt: '2026-10-06',
    };

    setTimeout(() => {
      onConfirmAppointment(newAppointment);
      onNavigate('v7_comprobante');
    }, 500);
  };

  return (
    <div className="w-full bg-[#161622] text-white py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header navigation */}
        <div className="pb-8 border-b border-[#2C2C3E]">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => onNavigate('v5_horarios')}
              className="text-[12px] text-[#A4A4B5] hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Modificar Horario</span>
            </button>
            <span className="text-[#626275]">·</span>
            <span className="text-[11px] uppercase tracking-[2px] text-[#D4A574] font-semibold">
              Verificación Final
            </span>
          </div>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[32px] sm:text-[38px] text-white font-normal"
          >
            Resumen y Confirmación de Reserva
          </h1>
          <p className="text-[13px] text-[#A4A4B5] mt-1">
            Por favor revisa el desglose detallado de tu reserva antes de confirmar.
          </p>
        </div>

        <form onSubmit={handleConfirm} className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          {/* Left summary card (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#2C2C3E]">
                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[20px] text-white font-normal"
                >
                  Detalles del Servicio
                </h3>
                <span className="text-[11px] font-semibold text-[#D4A574] uppercase tracking-wider">
                  Blade & Co Salon
                </span>
              </div>

              {/* Service breakdown */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-[#2D2D3F] border border-[#2C2C3E] flex items-center justify-center text-[#D4A574] shrink-0">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-white">{service.name}</h4>
                    <p className="text-[12px] text-[#A4A4B5] mt-0.5">{service.description}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[18px] font-bold text-white tabular-nums">{formatCOPShort(service.price)}</span>
                </div>
              </div>

              {/* Specific metadata breakdown */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2C2C3E] text-[13px]">
                <div className="space-y-1">
                  <span className="text-[11px] text-[#626275] uppercase block font-semibold">Barbero Asignado</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <User className="w-4 h-4 text-[#D4A574]" />
                    <span>{barberName}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-[#626275] uppercase block font-semibold">Duración Estimada</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <Clock className="w-4 h-4 text-[#D4A574]" />
                    <span>{service.durationMinutes} minutos</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-[#626275] uppercase block font-semibold">Fecha Reservada</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <Calendar className="w-4 h-4 text-[#D4A574]" />
                    <span>{dateStr}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-[#626275] uppercase block font-semibold">Hora de Cita</span>
                  <div className="flex items-center gap-1.5 text-white font-medium">
                    <Clock className="w-4 h-4 text-[#D4A574]" />
                    <span className="tabular-nums font-bold text-[#D4A574]">{timeStr} hs</span>
                  </div>
                </div>
              </div>

              {/* Price total calculation */}
              <div className="pt-4 border-t border-[#2C2C3E] space-y-2">
                <div className="flex justify-between text-[13px] text-[#A4A4B5]">
                  <span>Subtotal del servicio:</span>
                  <span className="tabular-nums font-medium text-white">{formatCOPShort(service.price)}</span>
                </div>
                <div className="flex justify-between text-[13px] text-[#A4A4B5]">
                  <span>Toalla de vapor & café colombiano de origen:</span>
                  <span className="text-[#4ADE80] font-medium">Incluido</span>
                </div>
                <div className="pt-3 border-t border-[#2C2C3E] flex justify-between items-baseline">
                  <span className="text-[15px] font-semibold text-white">Total a pagar en salón:</span>
                  <span className="text-[26px] font-bold text-[#D4A574] tabular-nums">{formatCOP(service.price)}</span>
                </div>
                <span className="text-[11px] text-[#626275] block text-right">
                  Pago presencial en efectivo, Nequi, Daviplata o tarjeta tras finalizar tu sesión.
                </span>
              </div>
            </div>
          </div>

          {/* Right customer inputs & confirm (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 space-y-4">
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[20px] text-white font-normal pb-3 border-b border-[#2C2C3E]"
              >
                Datos del Titular
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-[#A4A4B5] uppercase mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3 py-2 text-[13px] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#A4A4B5] uppercase mb-1">
                  Teléfono Móvil (Avisos WhatsApp)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3 py-2 text-[13px] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#A4A4B5] uppercase mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3 py-2 text-[13px] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#A4A4B5] uppercase mb-1">
                  Instrucciones o Preferencias (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej: piel sensible, corte a tijera arriba, etc."
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3 py-2 text-[12px] text-white outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[14px] font-semibold rounded transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <CheckCircle className="w-4 h-4 text-[#161622]" />
                  <span>{isSubmitting ? 'Agendando...' : 'Confirmar Cita'}</span>
                </button>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-[#A4A4B5]">
                <ShieldCheck className="w-4 h-4 text-[#4ADE80] shrink-0" />
                <span>Confirmación instantánea sin cargos de reserva por adelantado.</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
