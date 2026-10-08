import React, { useState } from 'react';
import { Service, ViewId } from '../../../types';
import { formatCOP, formatCOPShort } from '../../../utils/formatCurrency';
import { Clock, Scissors, Sparkles, Check, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  services: Service[];
  selectedServiceId: string | null;
  onSelectService: (service: Service) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View3Services: React.FC<Props> = ({
  services,
  selectedServiceId,
  onSelectService,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos los Servicios' },
    { id: 'Corte', label: 'Cortes' },
    { id: 'Barba', label: 'Cuidado de Barba' },
    { id: 'Combos', label: 'Combos Signature' },
    { id: 'Tratamientos', label: 'Tratamientos & Spa' },
  ];

  const filteredServices = services
    .filter((s) => s.enabled)
    .filter((s) => (activeCategory === 'all' ? true : s.category === activeCategory));

  const handleChooseService = (service: Service) => {
    onSelectService(service);
    onNavigate('v4_barbero');
  };

  return (
    <div className="w-full bg-[#161622] text-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#2C2C3E]">
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
                Selección de Experiencia
              </span>
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] sm:text-[38px] text-white font-normal"
            >
              Catálogo de Servicios Exclusivos
            </h1>
            <p className="text-[13px] text-[#A4A4B5] mt-1 max-w-2xl">
              Cortes artesanales desde $20.000 COP y rituales de barbería tradicional en Colombia. La duración fijará el tiempo exacto en la agenda del barbero.
            </p>
          </div>

          {selectedServiceId && (
            <button
              onClick={() => onNavigate('v4_barbero')}
              className="px-5 py-2.5 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[14px] font-semibold rounded inline-flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
            >
              <span>Continuar con Barbero</span>
              <ArrowRight className="w-4 h-4 text-[#161622]" />
            </button>
          )}
        </div>

        {/* Category Filters (Segmented control) */}
        <div className="py-6 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-[13px] font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#D4A574] text-[#161622]'
                  : 'bg-[#20202F] text-[#A4A4B5] hover:text-white border border-[#2C2C3E]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredServices.map((service) => {
            const isSelected = selectedServiceId === service.id;
            return (
              <div
                key={service.id}
                onClick={() => handleChooseService(service)}
                className={`group relative rounded-lg p-6 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#20202F] border-2 border-[#D4A574] shadow-lg ring-1 ring-[#D4A574]/40'
                    : 'bg-[#20202F] border border-[#2C2C3E] hover:border-[#D4A574]/50 hover:bg-[#2D2D3F]/40'
                }`}
              >
                <div>
                  {/* Category and duration header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[1px] text-[#A4A4B5]">
                      {service.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[12px] text-[#D4A574] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.durationMinutes} min</span>
                    </div>
                  </div>

                  {/* Title: Instrument Serif Regular · 18-20px */}
                  <h3
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-[22px] text-white font-normal group-hover:text-[#D4A574] transition-colors leading-tight"
                  >
                    {service.name}
                  </h3>

                  {/* Description: Geist Regular · 12-14px */}
                  <p className="text-[13px] text-[#A4A4B5] mt-2.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Footer with Price and Selection Button */}
                <div className="pt-6 mt-6 border-t border-[#2C2C3E] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#626275] block uppercase">Precio</span>
                    {/* Price: Geist Bold · 18px */}
                    <span className="text-[20px] font-bold text-white tabular-nums">
                      {formatCOPShort(service.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`px-4 py-2 rounded text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors ${
                      isSelected
                        ? 'bg-[#D4A574] text-[#161622]'
                        : 'bg-[#161622] text-white border border-[#2C2C3E] group-hover:border-[#D4A574]/60 group-hover:bg-[#D4A574] group-hover:text-[#161622]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Seleccionado</span>
                      </>
                    ) : (
                      <>
                        <span>Elegir servicio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative footer */}
        <div className="mt-12 p-4 rounded-lg bg-[#20202F]/60 border border-[#2C2C3E] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#A4A4B5]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4A574] shrink-0" />
            <span>Todos los servicios incluyen toalla caliente aromática y café especial colombiano de cortesía.</span>
          </div>
          <span className="text-[#626275]">Tarifas en pesos colombianos (COP) · Sin cargos ocultos</span>
        </div>
      </div>
    </div>
  );
};
