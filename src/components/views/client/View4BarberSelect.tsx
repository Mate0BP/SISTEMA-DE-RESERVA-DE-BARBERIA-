import React from 'react';
import { Barber, ViewId } from '../../../types';
import { Users, Star, ArrowLeft, ArrowRight, Check, Award, Sparkles } from 'lucide-react';

interface Props {
  barbers: Barber[];
  selectedBarberId: string | null;
  onSelectBarber: (barberId: string | null) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View4BarberSelect: React.FC<Props> = ({
  barbers,
  selectedBarberId,
  onSelectBarber,
  onNavigate,
}) => {
  const handleSelect = (barberId: string | null) => {
    onSelectBarber(barberId);
    onNavigate('v5_horarios');
  };

  return (
    <div className="w-full bg-[#161622] text-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header navigation and titles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2C2C3E]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => onNavigate('v3_servicios')}
                className="text-[12px] text-[#A4A4B5] hover:text-white inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a Servicios</span>
              </button>
              <span className="text-[#626275]">·</span>
              <span className="text-[11px] uppercase tracking-[2px] text-[#D4A574] font-semibold">
                Selección de Profesional
              </span>
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] sm:text-[38px] text-white font-normal"
            >
              Selección de Barbero o Especialista
            </h1>
            <p className="text-[13px] text-[#A4A4B5] mt-1 max-w-2xl">
              Elige a tu maestro barbero de confianza o déjanos asignarte el primer profesional disponible para máxima rapidez.
            </p>
          </div>

          <button
            onClick={() => handleSelect(null)}
            className="px-5 py-2.5 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-white text-[13px] font-medium rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4 text-[#D4A574]" />
            <span>Cualquier Barbero Disponible</span>
          </button>
        </div>

        {/* Any Barber Card (Special option RU-23) */}
        <div className="mt-8 mb-6">
          <div
            onClick={() => handleSelect(null)}
            className={`p-5 rounded-lg transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              selectedBarberId === null
                ? 'bg-[#20202F] border-2 border-[#D4A574] ring-1 ring-[#D4A574]/30'
                : 'bg-[#20202F]/70 border border-[#2C2C3E] hover:border-[#D4A574]/40 hover:bg-[#20202F]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4A574] to-[#8B5CF6] flex items-center justify-center text-[#161622] font-bold text-lg shadow-inner">
                <Users className="w-7 h-7 text-[#161622]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-[22px] text-white font-normal"
                  >
                    Cualquier Barbero Disponible
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-[#4ADE80]/15 border border-[#4ADE80]/30 text-[#4ADE80]">
                    Mayor Disponibilidad
                  </span>
                </div>
                <p className="text-[13px] text-[#A4A4B5] mt-0.5">
                  Te asignaremos automáticamente al primer profesional libre en el horario que elijas.
                </p>
              </div>
            </div>

            <button
              type="button"
              className={`px-5 py-2.5 rounded text-[13px] font-semibold inline-flex items-center gap-2 self-start sm:self-center transition-colors ${
                selectedBarberId === null
                  ? 'bg-[#D4A574] text-[#161622]'
                  : 'bg-[#161622] text-white border border-[#2C2C3E]'
              }`}
            >
              {selectedBarberId === null ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Seleccionado</span>
                </>
              ) : (
                <>
                  <span>Elegir esta opción</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {barbers.map((barber) => {
            const isSelected = selectedBarberId === barber.id;
            return (
              <div
                key={barber.id}
                onClick={() => handleSelect(barber.id)}
                className={`group rounded-lg p-6 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#20202F] border-2 border-[#D4A574] shadow-lg ring-1 ring-[#D4A574]/40'
                    : 'bg-[#20202F] border border-[#2C2C3E] hover:border-[#D4A574]/50 hover:bg-[#2D2D3F]/40'
                }`}
              >
                <div>
                  {/* Barber Header Avatar & Status */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-[#2D2D3F] border-2 border-[#2C2C3E] group-hover:border-[#D4A574] flex items-center justify-center text-[20px] font-bold text-[#D4A574] shadow-md transition-colors">
                        {barber.avatarInitial}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1B5E20] border-2 border-[#20202F] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#161622] border border-[#2C2C3E]">
                      <Star className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />
                      <span className="text-[13px] font-bold text-white tabular-nums">
                        {barber.rating}
                      </span>
                    </div>
                  </div>

                  {/* Title & Role */}
                  <h3
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-[22px] text-white font-normal group-hover:text-[#D4A574] transition-colors leading-tight"
                  >
                    {barber.name}
                  </h3>
                  <div className="text-[12px] font-medium text-[#D4A574] mt-1">
                    {barber.title}
                  </div>

                  <p className="text-[12px] text-[#A4A4B5] mt-3 leading-relaxed line-clamp-3">
                    {barber.bio}
                  </p>

                  {/* Experience & Specialties */}
                  <div className="mt-4 pt-4 border-t border-[#2C2C3E] space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#A4A4B5]">
                      <Award className="w-3.5 h-3.5 text-[#D4A574]" />
                      <span>{barber.experienceYears} años de experiencia</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {barber.specialties.map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] text-[#A4A4B5] bg-[#161622] px-2 py-0.5 rounded border border-[#2C2C3E]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selection Action */}
                <div className="pt-6 mt-6 border-t border-[#2C2C3E]">
                  <button
                    type="button"
                    className={`w-full py-2.5 rounded text-[13px] font-semibold inline-flex items-center justify-center gap-2 transition-colors ${
                      isSelected
                        ? 'bg-[#D4A574] text-[#161622]'
                        : 'bg-[#161622] text-white border border-[#2C2C3E] group-hover:bg-[#D4A574] group-hover:text-[#161622]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Barbero Seleccionado</span>
                      </>
                    ) : (
                      <>
                        <span>Seleccionar Horarios</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
