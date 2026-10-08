import React from 'react';
import { ViewId } from '../../../types';
import { Scissors, MapPin, Clock, Phone, Instagram, Calendar, ArrowRight, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface Props {
  onNavigate: (viewId: ViewId) => void;
}

export const View1Landing: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#161622] text-white">
      {/* Top Bar according to design contract: Brand title - Nav links - Action */}
      <header className="border-b border-[#2C2C3E] bg-[#161622]/90 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Brand Zone: Instrument Serif Regular · 28-38px · tracking 2-3px */}
          <div className="flex items-center gap-3">
            <span
              style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: '2.5px' }}
              className="text-[32px] sm:text-[38px] text-white leading-none font-normal"
            >
              Blade & Co.
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-[#A4A4B5]">
            <button
              onClick={() => onNavigate('v3_servicios')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Servicios
            </button>
            <button
              onClick={() => onNavigate('v4_barbero')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Maestros Barberos
            </button>
            <button
              onClick={() => onNavigate('v8_mis_citas')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mis Citas
            </button>
            <button
              onClick={() => onNavigate('v10_perfil')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Mi Perfil
            </button>
            <button
              onClick={() => onNavigate('v11_admin_login')}
              className="hover:text-[#D4A574] transition-colors cursor-pointer text-[#A4A4B5]"
            >
              Portal Barberos
            </button>
          </nav>

          {/* Action button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('v2_auth')}
              className="hidden sm:inline-flex px-3.5 py-2 text-[13px] font-medium text-[#A4A4B5] hover:text-white border border-[#2C2C3E] rounded hover:border-[#D4A574]/40 transition-colors"
            >
              Acceso Clientes
            </button>
            <button
              onClick={() => onNavigate('v3_servicios')}
              className="px-5 py-2.5 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[14px] font-semibold rounded transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#161622]" />
              <span>Agendar Cita</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#2C2C3E] py-16 sm:py-24 bg-gradient-to-b from-[#161622] via-[#20202F]/40 to-[#161622]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[2px] text-[#D4A574] font-semibold">
                <Scissors className="w-3.5 h-3.5 text-[#D4A574]" />
                <span>Barbería & Grooming Tradicional Masculino</span>
              </div>

              {/* Título principal escritorio: Instrument Serif Regular · 32-44px */}
              <h1
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[40px] sm:text-[56px] lg:text-[60px] text-white font-normal leading-[1.08] tracking-tight"
              >
                El arte del corte clásico y el cuidado impecable de la barba.
              </h1>

              <p className="text-[14px] sm:text-[15px] text-[#A4A4B5] leading-[1.6] max-w-xl">
                En Blade & Co combinamos las técnicas puras de la sastrería capilar con el ritual relajante de toallas al vapor, espumas tibias y un ambiente reservado para caballeros en Colombia. Cortes artesanales desde $20.000 COP.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('v3_servicios')}
                  className="px-7 py-3.5 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[14px] font-semibold rounded transition-colors inline-flex items-center gap-2.5 shadow-md cursor-pointer"
                >
                  <span>Reservar Turno Ahora</span>
                  <ArrowRight className="w-4 h-4 text-[#161622]" />
                </button>
                <button
                  onClick={() => onNavigate('v4_barbero')}
                  className="px-5 py-3.5 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-white text-[14px] font-medium rounded transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Conocer a los Barberos</span>
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#2C2C3E]/80 max-w-lg">
                <div>
                  <div className="text-[28px] font-bold text-white tabular-nums">4.9★</div>
                  <div className="text-[12px] text-[#A4A4B5]">Calificación promedio</div>
                </div>
                <div>
                  <div className="text-[28px] font-bold text-[#D4A574] tabular-nums">+1.2k</div>
                  <div className="text-[12px] text-[#A4A4B5]">Clientes asiduos</div>
                </div>
                <div>
                  <div className="text-[28px] font-bold text-white tabular-nums">100%</div>
                  <div className="text-[12px] text-[#A4A4B5]">Garantía artesanal</div>
                </div>
              </div>
            </div>

            {/* Visual showcase card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg border border-[#2C2C3E] bg-[#20202F] p-6 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-[#D4A574]/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Decorative header */}
                <div className="flex items-center justify-between pb-5 border-b border-[#2C2C3E]">
                  <div>
                    <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-[#D4A574]">
                      Club Exclusivo
                    </span>
                    <h3
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                      className="text-[22px] text-white font-normal"
                    >
                      Experiencia Blade & Co
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded bg-[#2D2D3F] border border-[#2C2C3E] flex items-center justify-center text-[#D4A574]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                <div className="py-5 space-y-4">
                  <div className="p-3.5 rounded bg-[#161622] border border-[#2C2C3E] flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#2D2D3F] flex items-center justify-center text-[#D4A574] shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white">Toalla Caliente & Aromaterapia</div>
                      <div className="text-[12px] text-[#A4A4B5]">Infusiones de eucalipto para relajar y abrir los poros antes del afeitado.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-[#161622] border border-[#2C2C3E] flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#2D2D3F] flex items-center justify-center text-[#D4A574] shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white">Navajas Japonesas Desechables</div>
                      <div className="text-[12px] text-[#A4A4B5]">Higiene médica certificada con filo nuevo para cada cliente.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-[#161622] border border-[#2C2C3E] flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#2D2D3F] flex items-center justify-center text-[#D4A574] shrink-0">
                      <Scissors className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white">Bar de Cortesía</div>
                      <div className="text-[12px] text-[#A4A4B5]">Café especial 100% colombiano de origen o whisky añejo durante tu sesión.</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('v3_servicios')}
                    className="w-full py-3 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[13px] font-semibold rounded transition-colors text-center"
                  >
                    Seleccionar Servicio & Horario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Cards: Ubicación, Horarios y Redes (RU-21) */}
      <section className="py-16 border-b border-[#2C2C3E] bg-[#11111A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#D4A574]">
              Visítanos & Contacto
            </span>
            <h2
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] text-white font-normal mt-1"
            >
              Ubicación y Horarios de Atención
            </h2>
            <p className="text-[13px] text-[#A4A4B5] mt-2">
              Atención preferencial con reserva previa para asegurar tu tiempo sin esperas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ubicación Física */}
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6">
              <div className="w-10 h-10 rounded bg-[#2D2D3F] border border-[#2C2C3E] flex items-center justify-center text-[#D4A574] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[20px] text-white font-normal"
              >
                Ubicación Física
              </h3>
              <p className="text-[13px] text-[#A4A4B5] mt-2 leading-relaxed">
                Carrera 11 # 85-32, Zona Rosa / Chapinero<br />
                Bogotá D.C., Colombia
              </p>
              <div className="mt-4 pt-4 border-t border-[#2C2C3E] flex items-center gap-2 text-[12px] text-[#D4A574]">
                <span>A 2 cuadras de C.C. Andino y Calle 85</span>
              </div>
            </div>

            {/* Horarios de Atención General */}
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6">
              <div className="w-10 h-10 rounded bg-[#2D2D3F] border border-[#2C2C3E] flex items-center justify-center text-[#D4A574] mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[20px] text-white font-normal"
              >
                Horarios de Atención
              </h3>
              <div className="text-[13px] text-[#A4A4B5] mt-2 space-y-1.5">
                <div className="flex justify-between">
                  <span>Lunes a Viernes:</span>
                  <span className="text-white font-medium">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span className="text-white font-medium">08:30 - 19:30</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos y Festivos:</span>
                  <span className="text-[#F87171] font-medium">Cerrado</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#2C2C3E] text-[12px] text-[#4ADE80] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                <span>Salón abierto hoy en Bogotá</span>
              </div>
            </div>

            {/* Enlaces y Canales */}
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6">
              <div className="w-10 h-10 rounded bg-[#2D2D3F] border border-[#2C2C3E] flex items-center justify-center text-[#D4A574] mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[20px] text-white font-normal"
              >
                Contacto & Redes
              </h3>
              <p className="text-[13px] text-[#A4A4B5] mt-2 leading-relaxed">
                PBX Bogotá: +57 (601) 745 6789<br />
                WhatsApp: +57 312 345 6789
              </p>
              <div className="mt-4 pt-4 border-t border-[#2C2C3E] flex items-center gap-3">
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="px-3 py-1.5 rounded bg-[#2D2D3F] hover:bg-[#38384f] text-[12px] text-white border border-[#2C2C3E] flex items-center gap-1.5 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#D4A574]" />
                  <span>@bladeandco.colombia</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2C2C3E] bg-[#11111A] py-8 text-center">
        <div className="max-w-7xl mx-auto px-4 text-[12px] text-[#626275]">
          <span
            style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: '2px' }}
            className="text-[22px] text-white block mb-1 font-normal"
          >
            Blade & Co.
          </span>
          <p>© 2026 Blade & Co Gentlemen's Barbershop. Todos los derechos reservados.</p>
          <div className="mt-3">
            <button
              onClick={() => onNavigate('v11_admin_login')}
              className="text-[#626275] hover:text-[#D4A574] text-[11px] underline transition-colors cursor-pointer"
            >
              Acceso a Portal Administrativo & Equipo de Barberos
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
