import React, { useState } from 'react';
import { ClientProfile, Appointment, ViewId } from '../../../types';
import { StatusBadge } from '../../common/StatusBadge';
import { Search, User, Phone, Mail, Calendar, Scissors, Award, X, History, ArrowRight } from 'lucide-react';

interface Props {
  clients: ClientProfile[];
  appointments: Appointment[];
  onNavigate: (viewId: ViewId) => void;
}

export const View15ClientDirectory: React.FC<Props> = ({
  clients,
  appointments,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(clients[0] || null);

  const filteredClients = clients.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  // Client appointments
  const clientAppointments = selectedClient
    ? appointments.filter(
        (a) =>
          a.clientId === selectedClient.id ||
          a.clientName.toLowerCase() === selectedClient.name.toLowerCase()
      )
    : [];

  return (
    <div className="w-full bg-[#11111A] text-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#2C2C3E]">
          <div>
            <div className="text-[11px] font-semibold text-[#D4A574] uppercase tracking-[2px] mb-1">
              Fichas de Clientes
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] text-white font-normal"
            >
              Directorio de Clientes & Registro de Atenciones
            </h1>
            <p className="text-[13px] text-[#A4A4B5] mt-1">
              Consulta la información de contacto, recurrencia, fidelidad y notas técnicas de cada caballero.
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

        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, teléfono (+57...) o correo..."
            className="w-full bg-[#20202F] border border-[#2C2C3E] focus:border-[#D4A574] text-white text-[13px] rounded-lg pl-10 pr-4 py-2.5 outline-none placeholder-[#626275]"
          />
          <Search className="w-4 h-4 text-[#A4A4B5] absolute left-3.5 top-3.5" />
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Client List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <h3
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[20px] text-white font-normal mb-2"
            >
              Clientes Registrados ({filteredClients.length})
            </h3>

            {filteredClients.map((cli) => {
              const isSelected = selectedClient?.id === cli.id;
              return (
                <div
                  key={cli.id}
                  onClick={() => setSelectedClient(cli)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#20202F] border-[#D4A574] shadow-lg ring-1 ring-[#D4A574]/40'
                      : 'bg-[#20202F] border-[#2C2C3E] hover:border-[#D4A574]/50 hover:bg-[#252538]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full bg-[#161622] border border-[#2C2C3E] flex items-center justify-center text-[14px] font-bold text-[#D4A574]">
                      {cli.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-[14px] flex items-center gap-2">
                        <span>{cli.name}</span>
                        {cli.totalVisits >= 5 && (
                          <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#D4A574]/15 text-[#D4A574] border border-[#D4A574]/30">
                            VIP
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] text-[#A4A4B5] flex items-center gap-2 mt-0.5">
                        <span>{cli.phone}</span>
                        <span>·</span>
                        <span className="truncate max-w-[140px]">{cli.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-[#626275] block uppercase">Visitas</span>
                    <span className="text-[16px] font-bold text-white tabular-nums">
                      {cli.totalVisits}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Client Details & History (5 cols) */}
          <div className="lg:col-span-5">
            {selectedClient ? (
              <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 shadow-xl space-y-6 sticky top-6">
                <div className="flex items-start justify-between pb-4 border-b border-[#2C2C3E]">
                  <div>
                    <h3
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                      className="text-[24px] text-white font-normal"
                    >
                      {selectedClient.name}
                    </h3>
                    <span className="text-[12px] text-[#A4A4B5]">
                      Última visita al salón: {selectedClient.lastVisit}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#161622] border border-[#2C2C3E] flex items-center justify-center text-[16px] font-bold text-[#D4A574]">
                    {selectedClient.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                </div>

                {/* Contact data */}
                <div className="space-y-2 text-[13px] bg-[#161622] p-4 rounded-lg border border-[#2C2C3E]">
                  <div className="flex items-center gap-2 text-white">
                    <Phone className="w-4 h-4 text-[#D4A574]" />
                    <span>{selectedClient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Mail className="w-4 h-4 text-[#D4A574]" />
                    <span>{selectedClient.email}</span>
                  </div>
                  {selectedClient.notes && (
                    <div className="pt-2 border-t border-[#2C2C3E] text-[12px] text-[#A4A4B5]">
                      <span className="font-semibold text-white block mb-0.5">Notas del Barbero:</span>
                      "{selectedClient.notes}"
                    </div>
                  )}
                </div>

                {/* Individual visit history for this client */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                      className="text-[18px] text-white font-normal"
                    >
                      Historial de Citas ({clientAppointments.length})
                    </h4>
                  </div>

                  {clientAppointments.length === 0 ? (
                    <p className="text-[12px] text-[#A4A4B5] italic">
                      No se encontraron citas previas registradas para este perfil.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {clientAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="p-3 rounded bg-[#161622] border border-[#2C2C3E] flex flex-col gap-1 text-[12px]"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{apt.serviceName}</span>
                            <StatusBadge status={apt.status} size="sm" />
                          </div>
                          <div className="flex items-center justify-between text-[#A4A4B5]">
                            <span>{apt.date} · {apt.time} hs</span>
                            <span>{apt.barberName}</span>
                          </div>
                          {apt.notes && (
                            <span className="text-[11px] text-[#626275] italic">"{apt.notes}"</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-[#20202F] border border-[#2C2C3E] rounded-lg text-[#A4A4B5] text-[13px]">
                Selecciona un cliente de la lista para ver su expediente e historial.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
