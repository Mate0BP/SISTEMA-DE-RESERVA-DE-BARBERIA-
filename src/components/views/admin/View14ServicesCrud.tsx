import React, { useState } from 'react';
import { Service, ViewId } from '../../../types';
import { formatCOPShort } from '../../../utils/formatCurrency';
import { Scissors, Plus, Edit2, Trash2, Check, X, Clock, ToggleLeft, ToggleRight } from 'lucide-react';

interface Props {
  services: Service[];
  onAddService: (newService: Service) => void;
  onUpdateService: (updatedService: Service) => void;
  onDeleteService: (id: string) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View14ServicesCrud: React.FC<Props> = ({
  services,
  onAddService,
  onUpdateService,
  onDeleteService,
  onNavigate,
}) => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Corte');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [price, setPrice] = useState(20000);
  const [feedback, setFeedback] = useState<string | null>(null);

  const startCreate = () => {
    setName('');
    setDescription('');
    setCategory('Corte');
    setDurationMinutes(45);
    setPrice(20000);
    setIsCreating(true);
    setEditingService(null);
  };

  const startEdit = (srv: Service) => {
    setEditingService(srv);
    setName(srv.name);
    setDescription(srv.description);
    setCategory(srv.category);
    setDurationMinutes(srv.durationMinutes);
    setPrice(srv.price);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (isCreating) {
      const newSrv: Service = {
        id: `srv-${Date.now()}`,
        name,
        description,
        category,
        durationMinutes: Number(durationMinutes),
        price: Number(price),
        enabled: true,
      };
      onAddService(newSrv);
      setFeedback('Nuevo servicio registrado con éxito en el catálogo.');
    } else if (editingService) {
      const updated: Service = {
        ...editingService,
        name,
        description,
        category,
        durationMinutes: Number(durationMinutes),
        price: Number(price),
      };
      onUpdateService(updated);
      setFeedback('Servicio actualizado correctamente.');
    }

    setIsCreating(false);
    setEditingService(null);
    setTimeout(() => setFeedback(null), 3000);
  };

  const toggleEnabled = (srv: Service) => {
    onUpdateService({
      ...srv,
      enabled: !srv.enabled,
    });
  };

  return (
    <div className="w-full bg-[#11111A] text-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#2C2C3E]">
          <div>
            <div className="text-[11px] font-semibold text-[#D4A574] uppercase tracking-[2px] mb-1">
              Catálogo & Tarifas
            </div>
            <h1
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[32px] text-white font-normal"
            >
              Gestión de Servicios & Precios (CRUD)
            </h1>
            <p className="text-[13px] text-[#A4A4B5] mt-1">
              Define los rituales disponibles para tus clientes, fija precios en pesos colombianos (COP) y tiempos de atención.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('v17_analitica')}
              className="px-4 py-2 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] font-semibold text-[13px] rounded transition-colors shadow-sm cursor-pointer"
            >
              ← Volver al Dashboard
            </button>
            <button
              onClick={() => onNavigate('v12_agenda')}
              className="px-3.5 py-2 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-[13px] text-white rounded transition-colors"
            >
              Ver Agenda
            </button>
            <button
              onClick={startCreate}
              className="px-4 py-2 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#D4A574]/40 text-[#D4A574] hover:text-white text-[13px] font-semibold rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#D4A574]" />
              <span>Nuevo Servicio</span>
            </button>
          </div>
        </div>

        {feedback && (
          <div className="p-4 rounded bg-[#1B5E20]/25 border border-[#4ADE80]/30 text-[#4ADE80] text-[13px] flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Services Table */}
        <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2C2C3E] bg-[#161622] text-[11px] uppercase font-semibold text-[#A4A4B5] tracking-wider">
                  <th className="p-4">Servicio & Descripción</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Duración</th>
                  <th className="p-4">Precio (COP)</th>
                  <th className="p-4">Estado en Web</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C2C3E] text-[13px]">
                {services.map((srv) => (
                  <tr key={srv.id} className="hover:bg-[#252538] transition-colors">
                    <td className="p-4 max-w-xs">
                      <div className="font-semibold text-white text-[14px]">{srv.name}</div>
                      <p className="text-[12px] text-[#A4A4B5] line-clamp-1 mt-0.5">{srv.description}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-[11px] bg-[#161622] border border-[#2C2C3E] px-2.5 py-1 rounded text-[#A4A4B5]">
                        {srv.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-white">
                        <Clock className="w-3.5 h-3.5 text-[#D4A574]" />
                        <span>{srv.durationMinutes} min</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-[16px] font-bold text-[#D4A574] tabular-nums">
                        {formatCOPShort(srv.price)}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        type="button"
                        onClick={() => toggleEnabled(srv)}
                        className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-2.5 py-1 rounded border transition-colors ${
                          srv.enabled
                            ? 'bg-[#1B5E20]/25 text-[#4ADE80] border-[#4ADE80]/30'
                            : 'bg-[#B71C1C]/25 text-[#F87171] border-[#F87171]/30'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${srv.enabled ? 'bg-[#4ADE80]' : 'bg-[#F87171]'}`} />
                        <span>{srv.enabled ? 'Habilitado' : 'Oculto'}</span>
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(srv)}
                          className="p-1.5 text-[#A4A4B5] hover:text-white rounded bg-[#161622] border border-[#2C2C3E] hover:border-[#D4A574]"
                          title="Editar servicio"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteService(srv.id)}
                          className="p-1.5 text-[#F87171] hover:text-white rounded bg-[#161622] border border-[#2C2C3E] hover:bg-[#B71C1C]/40"
                          title="Eliminar servicio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Create or Edit */}
        {(isCreating || editingService) && (
          <div className="fixed inset-0 z-50 bg-[#000000]/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#20202F] border border-[#2C2C3E] rounded-xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#2C2C3E]">
                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[22px] text-white font-normal"
                >
                  {isCreating ? 'Registrar Nuevo Servicio' : `Editar: ${editingService?.name}`}
                </h3>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingService(null);
                  }}
                  className="text-[#A4A4B5] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-[13px]">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                    Nombre del Ritual o Corte
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Corte Degradado & Peinado"
                    className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white rounded px-3 py-2 outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                      Categoría
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white rounded px-2.5 py-2 outline-none"
                    >
                      <option value="Corte">Corte</option>
                      <option value="Barba">Barba</option>
                      <option value="Combos">Combos</option>
                      <option value="Tratamientos">Tratamientos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                      Duración (min)
                    </label>
                    <input
                      type="number"
                      required
                      min={15}
                      step={5}
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Number(e.target.value))}
                      className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white rounded px-3 py-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                      Precio ($ COP)
                    </label>
                    <input
                      type="number"
                      required
                      min={5000}
                      step={1000}
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white rounded px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
                    Descripción para el Cliente
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe el procedimiento, productos empleados y detalles especiales..."
                    className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white rounded px-3 py-2 outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#2C2C3E]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingService(null);
                    }}
                    className="px-4 py-2 bg-[#161622] text-[#A4A4B5] hover:text-white rounded border border-[#2C2C3E]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] font-semibold rounded"
                  >
                    Guardar Servicio
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
