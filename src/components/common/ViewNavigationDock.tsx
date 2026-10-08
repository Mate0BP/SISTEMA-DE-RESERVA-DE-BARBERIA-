import React, { useState } from 'react';
import { ViewId } from '../../types';
import { Layers, X, ShieldCheck, User, Sparkles, ChevronRight } from 'lucide-react';

interface Props {
  currentView: ViewId;
  onNavigate: (viewId: ViewId) => void;
}

export interface ViewItem {
  id: ViewId;
  name: string;
  module: 'cliente' | 'admin';
  description: string;
}

export const VIEW_METADATA: ViewItem[] = [
  // Módulo Cliente
  {
    id: 'v1_bienvenida',
    name: 'Inicio y Bienvenida',
    module: 'cliente',
    description: 'Identidad Blade & Co, ubicación, horarios de atención y botón para agendar.',
  },
  {
    id: 'v2_auth',
    name: 'Registro e Inicio de Sesión',
    module: 'cliente',
    description: 'Formulario con pestañas para autenticar o registrar al cliente.',
  },
  {
    id: 'v3_servicios',
    name: 'Catálogo de Servicios',
    module: 'cliente',
    description: 'Servicios disponibles, duración estimada y tarifas en pesos colombianos.',
  },
  {
    id: 'v4_barbero',
    name: 'Selección de Barbero',
    module: 'cliente',
    description: 'Maestros barberos del establecimiento u opción de barbero disponible.',
  },
  {
    id: 'v5_horarios',
    name: 'Calendario y Horarios',
    module: 'cliente',
    description: 'Selector de fecha y cuadrícula de franjas horarias disponibles.',
  },
  {
    id: 'v6_resumen',
    name: 'Resumen de Reserva',
    module: 'cliente',
    description: 'Desglose detallado del servicio, profesional, fecha, hora y total.',
  },
  {
    id: 'v7_comprobante',
    name: 'Comprobante de Cita',
    module: 'cliente',
    description: 'Confirmación exitosa, código de reserva y añadir al calendario.',
  },
  {
    id: 'v8_mis_citas',
    name: 'Mis Citas Activas',
    module: 'cliente',
    description: 'Listado de reservas activas con reprogramación y cancelación.',
  },
  {
    id: 'v9_historial',
    name: 'Historial de Visitas',
    module: 'cliente',
    description: 'Registro histórico de citas pasadas completadas con repetición rápida.',
  },
  {
    id: 'v10_perfil',
    name: 'Mi Perfil de Cliente',
    module: 'cliente',
    description: 'Gestión de datos de contacto y preferencias personales de estilo.',
  },

  // Módulo Administrador o Barbero
  {
    id: 'v11_admin_login',
    name: 'Acceso Personal (Login)',
    module: 'admin',
    description: 'Acceso restringido para el equipo con selector por roles.',
  },
  {
    id: 'v17_analitica',
    name: 'Dashboard General Administrativo',
    module: 'admin',
    description: 'Panel central con accesos a los 5 módulos operativos e indicadores clave.',
  },
  {
    id: 'v12_agenda',
    name: 'Agenda de Citas & Calendario',
    module: 'admin',
    description: 'Línea de tiempo de agenda con vista por día, semana o mes.',
  },
  {
    id: 'v13_bloqueos',
    name: 'Control de Disponibilidad y Bloqueos',
    module: 'admin',
    description: 'Gestión de pausas, almuerzos, descansos y contingencias horarias.',
  },
  {
    id: 'v14_gestion_servicios',
    name: 'Gestión de Servicios & Precios (CRUD)',
    module: 'admin',
    description: 'Creación, edición y activación de cortes y tarifas en pesos.',
  },
  {
    id: 'v15_directorio_clientes',
    name: 'Directorio de Clientes & Fichas',
    module: 'admin',
    description: 'Búsqueda por teléfono/correo, historial individual y recurrencia.',
  },
  {
    id: 'v16_estados_cita',
    name: 'Control de Estados de Citas',
    module: 'admin',
    description: 'Actualización en tiempo real: confirmada, atendida, cancelada o no asistió.',
  },
  {
    id: 'v18_perfil_admin_equipo',
    name: 'Perfil de Administrador & Personal (CRUD)',
    module: 'admin',
    description: 'Gestión y credenciales de barberos y recepcionistas: nombre, correo, contraseña y foto.',
  },
];

export const ViewNavigationDock: React.FC<Props> = ({ currentView, onNavigate }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const clientViews = VIEW_METADATA.filter((v) => v.module === 'cliente');
  const adminViews = VIEW_METADATA.filter((v) => v.module === 'admin');

  return (
    <>
      {/* Botón flotante discreto en esquina inferior derecha para navegación de pruebas sin estorbar el diseño final */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setIsOpenMenu(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#20202F]/90 hover:bg-[#2D2D3F] backdrop-blur-md border border-[#D4A574]/40 text-[#D4A574] hover:text-white shadow-2xl text-[12px] font-semibold transition-all cursor-pointer hover:scale-105"
          title="Navegar entre pantallas de la aplicación"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Navegar Pantallas</span>
        </button>
      </div>

      {/* Modal / Cajón elegante y limpio sin numeraciones */}
      {isOpenMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161622] border border-[#2C2C3E] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-[#2C2C3E] flex items-center justify-between bg-[#11111A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#20202F] border border-[#2C2C3E] flex items-center justify-center text-[#D4A574]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                    className="text-[24px] text-white font-normal leading-tight"
                  >
                    Navegación de Pantallas · Blade & Co
                  </h3>
                  <p className="text-[12px] text-[#A4A4B5] mt-0.5">
                    Selecciona cualquier módulo para explorar su flujo operativo.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpenMenu(false)}
                className="w-9 h-9 rounded-lg bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-[#A4A4B5] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable list of views */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Cliente */}
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#2C2C3E]">
                  <User className="w-4 h-4 text-[#D4A574]" />
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-white">
                    Portal del Cliente
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {clientViews.map((v) => {
                    const isCurrent = currentView === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          onNavigate(v.id);
                          setIsOpenMenu(false);
                        }}
                        className={`p-3 rounded-lg border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                          isCurrent
                            ? 'bg-[#20202F] border-[#D4A574] text-white'
                            : 'bg-[#11111A] border-[#2C2C3E] hover:border-[#D4A574]/40 hover:bg-[#20202F]/60 text-[#A4A4B5] hover:text-white'
                        }`}
                      >
                        <div>
                          <div className={`text-[13px] font-semibold ${isCurrent ? 'text-[#D4A574]' : 'text-white'}`}>
                            {v.name}
                          </div>
                          <div className="text-[11px] text-[#A4A4B5] mt-0.5 leading-snug line-clamp-1">
                            {v.description}
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${isCurrent ? 'text-[#D4A574]' : 'text-[#626275]'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Administrador */}
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#2C2C3E]">
                  <ShieldCheck className="w-4 h-4 text-[#4ADE80]" />
                  <span className="text-[12px] font-semibold uppercase tracking-wider text-white">
                    Portal de Administración & Barberos
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {adminViews.map((v) => {
                    const isCurrent = currentView === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          onNavigate(v.id);
                          setIsOpenMenu(false);
                        }}
                        className={`p-3 rounded-lg border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                          isCurrent
                            ? 'bg-[#20202F] border-[#D4A574] text-white'
                            : 'bg-[#11111A] border-[#2C2C3E] hover:border-[#D4A574]/40 hover:bg-[#20202F]/60 text-[#A4A4B5] hover:text-white'
                        }`}
                      >
                        <div>
                          <div className={`text-[13px] font-semibold ${isCurrent ? 'text-[#D4A574]' : 'text-white'}`}>
                            {v.name}
                          </div>
                          <div className="text-[11px] text-[#A4A4B5] mt-0.5 leading-snug line-clamp-1">
                            {v.description}
                          </div>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${isCurrent ? 'text-[#D4A574]' : 'text-[#626275]'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#2C2C3E] bg-[#11111A] flex justify-end">
              <button
                onClick={() => setIsOpenMenu(false)}
                className="px-5 py-2 rounded-lg bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-white text-[13px] font-medium transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
