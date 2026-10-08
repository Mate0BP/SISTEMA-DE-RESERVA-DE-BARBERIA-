import React, { useState } from 'react';
import { ViewId, Appointment } from '../../../types';
import { formatCOP, formatCOPShort } from '../../../utils/formatCurrency';
import { CheckCircle2, Calendar, Clock, MapPin, User, Scissors, Download, ArrowRight, ArrowLeft, Share2, Copy, Check } from 'lucide-react';

interface Props {
  latestAppointment: Appointment | null;
  onNavigate: (viewId: ViewId) => void;
}

export const View7Confirmation: React.FC<Props> = ({
  latestAppointment,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);

  // Fallback demo appointment if accessed directly
  const apt: Appointment = latestAppointment || {
    id: 'apt-demo-latest',
    code: 'BC-8492',
    clientId: 'cli-1',
    clientName: 'Rodrigo Méndez',
    clientPhone: '+57 312 345 6789',
    clientEmail: 'rodrigo.m@gmail.com',
    serviceId: 'srv-1',
    serviceName: 'Corte Clásico Signature',
    barberId: 'barber-1',
    barberName: 'Mateo Velásquez',
    date: '2026-10-07',
    time: '11:00',
    durationMinutes: 45,
    price: 20000,
    status: 'confirmada',
    notes: 'Degradado medio en laterales.',
    createdAt: '2026-10-06',
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(apt.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = () => {
    // Generate simple Google Calendar URL
    const title = encodeURIComponent(`Cita en Blade & Co - ${apt.serviceName}`);
    const details = encodeURIComponent(`Cita con ${apt.barberName}. Código de reserva: ${apt.code}. Carrera 11 # 85-32, Bogotá D.C., Colombia.`);
    const location = encodeURIComponent('Blade & Co Barbershop, Carrera 11 # 85-32, Bogotá D.C., Colombia');
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-[#161622] text-white py-12 px-4 sm:px-8 flex items-center justify-center min-h-[calc(100vh-160px)]">
      <div className="w-full max-w-2xl bg-[#20202F] border border-[#2C2C3E] rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#D4A574]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Success Badge */}
        <div className="text-center pb-6 border-b border-[#2C2C3E]">
          <div className="w-16 h-16 rounded-full bg-[#1B5E20]/30 border-2 border-[#4ADE80] text-[#4ADE80] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#4ADE80]">
            Reserva Confirmada Exitosamente
          </span>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[34px] sm:text-[40px] text-white font-normal mt-1"
          >
            ¡Te esperamos en Blade & Co!
          </h1>
          <p className="text-[13px] text-[#A4A4B5] mt-1 max-w-md mx-auto">
            Hemos enviado una copia del comprobante a <strong>{apt.clientEmail}</strong> y un SMS recordatorio a tu móvil.
          </p>
        </div>

        {/* Ticket Box */}
        <div className="my-6 p-6 rounded-lg bg-[#161622] border border-[#2C2C3E] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#2C2C3E]/80">
            <div>
              <span className="text-[10px] text-[#626275] uppercase tracking-wider block">Código de Reserva</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[20px] font-bold text-[#D4A574] tracking-wider">{apt.code}</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-1 rounded hover:bg-[#20202F] text-[#A4A4B5] hover:text-white transition-colors"
                  title="Copiar código"
                >
                  {copied ? <Check className="w-4 h-4 text-[#4ADE80]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#626275] uppercase tracking-wider block">Estado</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#4ADE80] bg-[#1B5E20]/25 px-2.5 py-0.5 rounded border border-[#4ADE80]/30 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                Confirmada
              </span>
            </div>
          </div>

          {/* Details 2 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13px]">
            <div className="flex items-start gap-3">
              <Scissors className="w-4 h-4 text-[#D4A574] mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-[#626275] block uppercase">Servicio</span>
                <span className="font-medium text-white">{apt.serviceName}</span>
                <span className="text-[11px] text-[#A4A4B5] block">{apt.durationMinutes} minutos</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-[#D4A574] mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-[#626275] block uppercase">Maestro Barbero</span>
                <span className="font-medium text-white">{apt.barberName}</span>
                <span className="text-[11px] text-[#A4A4B5] block">Sillón preferencial</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#D4A574] mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-[#626275] block uppercase">Fecha y Hora</span>
                <span className="font-medium text-white">{apt.date}</span>
                <span className="text-[12px] font-bold text-[#D4A574] block">{apt.time} horas</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#D4A574] mt-0.5 shrink-0" />
              <div>
                <span className="text-[11px] text-[#626275] block uppercase">Lugar</span>
                <span className="font-medium text-white">Carrera 11 # 85-32</span>
                <span className="text-[11px] text-[#A4A4B5] block">Zona Rosa, Bogotá D.C.</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#2C2C3E]/80 flex justify-between items-baseline">
            <span className="text-[12px] text-[#A4A4B5]">Total a pagar en salón:</span>
            <span className="text-[20px] font-bold text-white tabular-nums">{formatCOP(apt.price)}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleAddToCalendar}
              className="py-3 px-4 bg-[#2D2D3F] hover:bg-[#39394f] border border-[#2C2C3E] text-white text-[13px] font-medium rounded transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#D4A574]" />
              <span>Añadir a mi Calendario</span>
            </button>

            <button
              onClick={() => onNavigate('v8_mis_citas')}
              className="py-3 px-4 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[13px] font-semibold rounded transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Ir a Mis Citas Activas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('v1_bienvenida')}
              className="px-4 py-2 bg-[#161622] hover:bg-[#20202F] border border-[#2C2C3E] text-white hover:text-[#D4A574] text-[13px] font-medium rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Página Principal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
