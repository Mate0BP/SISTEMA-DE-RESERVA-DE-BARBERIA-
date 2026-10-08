import React, { useState } from 'react';
import { ViewId, StaffMember, StaffRole } from '../../../types';
import {
  ArrowLeft,
  UserPlus,
  Edit2,
  Trash2,
  Search,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Shield,
  CheckCircle2,
  AlertCircle,
  X,
  Camera,
  Scissors,
  Headphones,
  Phone,
  Sparkles,
  KeyRound,
  Filter,
} from 'lucide-react';

interface Props {
  staffList: StaffMember[];
  onAddStaff: (newStaff: StaffMember) => void;
  onUpdateStaff: (updatedStaff: StaffMember) => void;
  onDeleteStaff: (id: string) => void;
  onNavigate: (viewId: ViewId) => void;
}

const AVATAR_PRESETS = [
  {
    name: 'Hombre 1 (Barbero Clásico)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Hombre 2 (Barbero Experto)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Hombre 3 (Barbero Fade)',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Mujer 1 (Recepción Ejecutiva)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Mujer 2 (Coordinadora)',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Hombre 4 (Estilista)',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
  },
];

export const View18AdminProfileTeamCrud: React.FC<Props> = ({
  staffList,
  onAddStaff,
  onUpdateStaff,
  onDeleteStaff,
  onNavigate,
}) => {
  // Search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'barbero' | 'recepcionista'>('all');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  // Form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: AVATAR_PRESETS[0].url,
    role: 'barbero' as StaffRole,
    phone: '',
    specialty: '',
    active: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'danger' } | null>(null);

  // Deletion confirm modal
  const [deletingStaff, setDeletingStaff] = useState<StaffMember | null>(null);

  // Admin Profile editable info
  const [adminProfile, setAdminProfile] = useState({
    name: 'Mateo Palacios (Director General)',
    email: 'director@bladeandco.co',
    phone: '+57 310 987 6543',
    role: 'Administrador Propietario',
    branch: 'Bogotá D.C. · Zona G',
  });
  const [isEditingAdmin, setIsEditingAdmin] = useState(false);
  const [tempAdminProfile, setTempAdminProfile] = useState({ ...adminProfile });

  const showToast = (text: string, type: 'success' | 'danger' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenCreateModal = () => {
    setEditingStaff(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      photo: AVATAR_PRESETS[0].url,
      role: 'barbero',
      phone: '+57 ',
      specialty: 'Cortes & Barbería',
      active: true,
    });
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (staff: StaffMember) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      password: staff.password || '••••••••',
      photo: staff.photo || AVATAR_PRESETS[0].url,
      role: staff.role,
      phone: staff.phone || '',
      specialty: staff.specialty || '',
      active: staff.active,
    });
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      showToast('Por favor completa el nombre, correo y contraseña.', 'danger');
      return;
    }

    if (editingStaff) {
      // Update
      const updated: StaffMember = {
        ...editingStaff,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        photo: formData.photo,
        role: formData.role,
        phone: formData.phone,
        specialty: formData.specialty,
        active: formData.active,
      };
      onUpdateStaff(updated);
      showToast(`¡Personal "${formData.name}" actualizado correctamente!`);
    } else {
      // Create
      const newMember: StaffMember = {
        id: `stf-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        photo: formData.photo,
        role: formData.role,
        phone: formData.phone,
        specialty: formData.specialty,
        active: formData.active,
      };
      onAddStaff(newMember);
      showToast(`¡Nuevo miembro "${formData.name}" registrado con éxito!`);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deletingStaff) {
      onDeleteStaff(deletingStaff.id);
      showToast(`Miembro "${deletingStaff.name}" eliminado del sistema.`, 'danger');
      setDeletingStaff(null);
    }
  };

  const handleSaveAdminProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminProfile({ ...tempAdminProfile });
    setIsEditingAdmin(false);
    showToast('Perfil de Administrador actualizado con éxito.');
  };

  // Filtered staff
  const filteredStaff = staffList.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.specialty && item.specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchRole = roleFilter === 'all' || item.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalBarberos = staffList.filter((s) => s.role === 'barbero').length;
  const totalRecepcionistas = staffList.filter((s) => s.role === 'recepcionista').length;

  return (
    <div className="w-full bg-[#11111A] text-white py-8 px-4 sm:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Toast feedback */}
        {toastMessage && (
          <div
            className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-lg border shadow-2xl flex items-center gap-3 transition-all animate-bounce ${
              toastMessage.type === 'success'
                ? 'bg-[#1C2C22] border-[#22C55E]/50 text-[#86EFAC]'
                : 'bg-[#2E1818] border-[#EF4444]/50 text-[#FCA5A5]'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
            ) : (
              <AlertCircle className="w-5 h-5 text-[#EF4444]" />
            )}
            <span className="text-[13px] font-medium">{toastMessage.text}</span>
          </div>
        )}

        {/* Header con botón de volver al Dashboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2C2C3E]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('v17_analitica')}
              className="px-3.5 py-2 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-white hover:text-[#D4A574] text-[13px] font-medium rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Dashboard</span>
            </button>
            <div>
              <span className="text-[11px] font-semibold text-[#D4A574] uppercase tracking-[2px]">
                Administración General & Perfil
              </span>
              <h1
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[32px] sm:text-[36px] text-white font-normal leading-tight"
              >
                Perfil de Administrador & Gestión del Personal
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenCreateModal}
              className="px-4 py-2.5 bg-[#D4A574] hover:bg-[#e0b585] text-[#161622] text-[13px] font-bold rounded-lg inline-flex items-center gap-2 transition-all shadow-md cursor-pointer hover:scale-[1.02]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Registrar Personal</span>
            </button>
          </div>
        </div>

        {/* 👤 FICHA DE PERFIL DE ADMINISTRADOR */}
        <section className="bg-[#20202F] border border-[#2C2C3E] rounded-xl p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#161622] border-2 border-[#D4A574] flex items-center justify-center text-[#D4A574] shadow-inner shrink-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Admin Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#161622] border border-[#2C2C3E] text-[11px] font-semibold text-[#D4A574] uppercase tracking-wider mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{adminProfile.role}</span>
                </div>
                <h2
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[26px] text-white font-normal"
                >
                  {adminProfile.name}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#A4A4B5] mt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#D4A574]" />
                    {adminProfile.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D4A574]" />
                    {adminProfile.phone}
                  </span>
                  <span className="text-white/60">·</span>
                  <span className="text-[#D4A574]">{adminProfile.branch}</span>
                </div>
              </div>
            </div>

            {/* Acciones y métricas rápidas del personal */}
            <div className="flex flex-wrap items-center gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-[#2C2C3E]">
              <div className="flex items-center gap-4 bg-[#161622] px-4 py-2.5 rounded-lg border border-[#2C2C3E]">
                <div className="text-center">
                  <div className="text-[18px] font-bold text-white tabular-nums">{staffList.length}</div>
                  <div className="text-[10px] uppercase text-[#A4A4B5] font-semibold tracking-wider">Total Equipo</div>
                </div>
                <div className="w-px h-7 bg-[#2C2C3E]" />
                <div className="text-center">
                  <div className="text-[18px] font-bold text-[#D4A574] tabular-nums">{totalBarberos}</div>
                  <div className="text-[10px] uppercase text-[#A4A4B5] font-semibold tracking-wider">Barberos</div>
                </div>
                <div className="w-px h-7 bg-[#2C2C3E]" />
                <div className="text-center">
                  <div className="text-[18px] font-bold text-[#38BDF8] tabular-nums">{totalRecepcionistas}</div>
                  <div className="text-[10px] uppercase text-[#A4A4B5] font-semibold tracking-wider">Recepción</div>
                </div>
              </div>

              <button
                onClick={() => {
                  setTempAdminProfile({ ...adminProfile });
                  setIsEditingAdmin(!isEditingAdmin);
                }}
                className="px-3.5 py-2.5 bg-[#161622] hover:bg-[#28283d] border border-[#2C2C3E] hover:border-[#D4A574]/40 text-white hover:text-[#D4A574] text-[12px] font-semibold rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditingAdmin ? 'Cerrar Edición' : 'Editar Mi Perfil'}</span>
              </button>
            </div>
          </div>

          {/* Formulario de edición rápida del perfil de admin */}
          {isEditingAdmin && (
            <form onSubmit={handleSaveAdminProfile} className="mt-6 pt-6 border-t border-[#2C2C3E] space-y-4">
              <h3 className="text-[14px] font-semibold text-[#D4A574] uppercase tracking-wider">
                Modificar Datos del Administrador
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    value={tempAdminProfile.name}
                    onChange={(e) => setTempAdminProfile({ ...tempAdminProfile, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#161622] border border-[#2C2C3E] rounded text-[13px] text-white focus:outline-none focus:border-[#D4A574]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    value={tempAdminProfile.email}
                    onChange={(e) => setTempAdminProfile({ ...tempAdminProfile, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#161622] border border-[#2C2C3E] rounded text-[13px] text-white focus:outline-none focus:border-[#D4A574]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">Teléfono Móvil</label>
                  <input
                    type="text"
                    value={tempAdminProfile.phone}
                    onChange={(e) => setTempAdminProfile({ ...tempAdminProfile, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#161622] border border-[#2C2C3E] rounded text-[13px] text-white focus:outline-none focus:border-[#D4A574]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingAdmin(false)}
                  className="px-3 py-1.5 bg-[#161622] text-[#A4A4B5] hover:text-white rounded text-[12px] font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#D4A574] text-[#161622] rounded text-[12px] font-bold hover:bg-[#e0b585]"
                >
                  Guardar Perfil
                </button>
              </div>
            </form>
          )}
        </section>

        {/* ✂️ SECCIÓN CRUD: GESTIÓN DE BARBEROS Y RECEPCIONISTAS */}
        <section className="bg-[#20202F] border border-[#2C2C3E] rounded-xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2C2C3E]">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#D4A574]">
                <Scissors className="w-3.5 h-3.5" />
                <span>Equipo Operativo · Barberos y Recepcionistas</span>
              </div>
              <h2
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[26px] text-white font-normal mt-0.5"
              >
                Control de Credenciales & Personal
              </h2>
            </div>

            {/* Filtros de rol */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRoleFilter('all')}
                className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg border transition-all cursor-pointer ${
                  roleFilter === 'all'
                    ? 'bg-[#D4A574] text-[#161622] border-[#D4A574]'
                    : 'bg-[#161622] text-[#A4A4B5] border-[#2C2C3E] hover:text-white'
                }`}
              >
                Todos ({staffList.length})
              </button>
              <button
                onClick={() => setRoleFilter('barbero')}
                className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  roleFilter === 'barbero'
                    ? 'bg-[#D4A574] text-[#161622] border-[#D4A574]'
                    : 'bg-[#161622] text-[#A4A4B5] border-[#2C2C3E] hover:text-white'
                }`}
              >
                <Scissors className="w-3 h-3" />
                <span>Barberos ({totalBarberos})</span>
              </button>
              <button
                onClick={() => setRoleFilter('recepcionista')}
                className={`px-3 py-1.5 text-[12px] font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  roleFilter === 'recepcionista'
                    ? 'bg-[#D4A574] text-[#161622] border-[#D4A574]'
                    : 'bg-[#161622] text-[#A4A4B5] border-[#2C2C3E] hover:text-white'
                }`}
              >
                <Headphones className="w-3 h-3" />
                <span>Recepción ({totalRecepcionistas})</span>
              </button>
            </div>
          </div>

          {/* Barra de búsqueda */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#A4A4B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre completo, correo o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#161622] border border-[#2C2C3E] rounded-lg text-[13px] text-white placeholder-[#626275] focus:outline-none focus:border-[#D4A574]"
            />
          </div>

          {/* Lista de miembros en formato de tarjetas limpias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff.map((member) => {
              const isPasswordShown = !!visiblePasswords[member.id];
              const isBarber = member.role === 'barbero';

              return (
                <div
                  key={member.id}
                  className="bg-[#161622] border border-[#2C2C3E] hover:border-[#D4A574]/50 rounded-xl p-5 flex flex-col justify-between transition-all shadow-md group"
                >
                  <div className="space-y-4">
                    {/* Top strip: Avatar + Badge + Actions */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-13 h-13 rounded-full bg-[#20202F] border-2 border-[#D4A574]/40 overflow-hidden shrink-0 shadow-md">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback placeholder
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';
                            }}
                          />
                        </div>
                        <div>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${
                              isBarber
                                ? 'bg-[#D4A574]/15 text-[#D4A574] border border-[#D4A574]/30'
                                : 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30'
                            }`}
                          >
                            {isBarber ? <Scissors className="w-2.5 h-2.5" /> : <Headphones className="w-2.5 h-2.5" />}
                            <span>{member.role === 'barbero' ? 'Barbero' : 'Recepcionista'}</span>
                          </span>
                          <h3
                            style={{ fontFamily: "'Instrument Serif', serif" }}
                            className="text-[20px] text-white font-normal group-hover:text-[#D4A574] transition-colors leading-snug"
                          >
                            {member.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(member)}
                          className="p-1.5 text-[#A4A4B5] hover:text-[#D4A574] hover:bg-[#20202F] rounded transition-colors cursor-pointer"
                          title="Editar información"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingStaff(member)}
                          className="p-1.5 text-[#A4A4B5] hover:text-[#F87171] hover:bg-[#20202F] rounded transition-colors cursor-pointer"
                          title="Eliminar del personal"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Detalles de contacto & credenciales */}
                    <div className="space-y-2 bg-[#20202F]/60 p-3 rounded-lg border border-[#2C2C3E]/80 text-[12px]">
                      {/* Correo */}
                      <div className="flex items-center justify-between text-[#A4A4B5]">
                        <span className="flex items-center gap-1.5 text-[#626275] font-semibold text-[11px] uppercase">
                          <Mail className="w-3.5 h-3.5 text-[#D4A574]" />
                          Correo
                        </span>
                        <span className="text-white font-mono select-all text-[11px] truncate max-w-[180px]">
                          {member.email}
                        </span>
                      </div>

                      {/* Contraseña con toggle */}
                      <div className="flex items-center justify-between text-[#A4A4B5]">
                        <span className="flex items-center gap-1.5 text-[#626275] font-semibold text-[11px] uppercase">
                          <KeyRound className="w-3.5 h-3.5 text-[#D4A574]" />
                          Contraseña
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-white text-[11px]">
                            {isPasswordShown ? member.password : '••••••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(member.id)}
                            className="p-1 text-[#A4A4B5] hover:text-[#D4A574] transition-colors cursor-pointer"
                            title={isPasswordShown ? 'Ocultar contraseña' : 'Ver contraseña'}
                          >
                            {isPasswordShown ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Teléfono */}
                      {member.phone && (
                        <div className="flex items-center justify-between text-[#A4A4B5]">
                          <span className="flex items-center gap-1.5 text-[#626275] font-semibold text-[11px] uppercase">
                            <Phone className="w-3.5 h-3.5 text-[#D4A574]" />
                            Teléfono
                          </span>
                          <span className="text-white text-[11px]">{member.phone}</span>
                        </div>
                      )}

                      {/* Especialidad */}
                      {member.specialty && (
                        <div className="flex items-center justify-between text-[#A4A4B5]">
                          <span className="flex items-center gap-1.5 text-[#626275] font-semibold text-[11px] uppercase">
                            <Sparkles className="w-3.5 h-3.5 text-[#D4A574]" />
                            Especialidad
                          </span>
                          <span className="text-[#D4A574] text-[11px] font-medium">{member.specialty}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer de la tarjeta con estado y botón de edición rápida */}
                  <div className="mt-4 pt-3 border-t border-[#2C2C3E] flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
                        member.active ? 'text-[#4ADE80]' : 'text-[#A4A4B5]'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${member.active ? 'bg-[#4ADE80]' : 'bg-[#626275]'}`} />
                      {member.active ? 'Acceso Habilitado' : 'Suspendido'}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(member)}
                      className="text-[12px] font-semibold text-[#D4A574] hover:text-white transition-colors cursor-pointer"
                    >
                      Editar Ficha →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-12 bg-[#161622] rounded-xl border border-dashed border-[#2C2C3E] space-y-3">
              <User className="w-10 h-10 text-[#626275] mx-auto" />
              <p className="text-[14px] text-[#A4A4B5]">No se encontró personal con los filtros seleccionados.</p>
              <button
                onClick={handleOpenCreateModal}
                className="px-4 py-2 bg-[#D4A574] text-[#161622] text-[12px] font-bold rounded-lg cursor-pointer"
              >
                Registrar Nuevo Miembro
              </button>
            </div>
          )}
        </section>

        {/* 📝 MODAL PARA CREAR / EDITAR MIEMBRO DEL PERSONAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#161622] border border-[#2C2C3E] rounded-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-1.5 text-[#A4A4B5] hover:text-white rounded-lg bg-[#20202F] border border-[#2C2C3E] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center">
                <span className="text-[11px] font-semibold text-[#D4A574] uppercase tracking-[2px]">
                  {editingStaff ? 'Actualizar Registro' : 'Nuevo Integrante'}
                </span>
                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[28px] text-white font-normal mt-1"
                >
                  {editingStaff ? 'Editar Ficha del Personal' : 'Registrar Barbero o Recepcionista'}
                </h3>
                <p className="text-[13px] text-[#A4A4B5] mt-1">
                  Completa los campos de acceso y credenciales requeridas por el establecimiento.
                </p>
              </div>

              <form onSubmit={handleSaveStaff} className="space-y-4">
                {/* Selector de Rol */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A4A4B5] mb-1.5">
                    Rol en Blade & Co *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: 'barbero' })}
                      className={`py-2.5 px-3 rounded-lg border text-[13px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        formData.role === 'barbero'
                          ? 'bg-[#D4A574] text-[#161622] border-[#D4A574] shadow-sm'
                          : 'bg-[#20202F] text-[#A4A4B5] border-[#2C2C3E] hover:text-white'
                      }`}
                    >
                      <Scissors className="w-4 h-4" />
                      <span>Barbero</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, role: 'recepcionista' })}
                      className={`py-2.5 px-3 rounded-lg border text-[13px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        formData.role === 'recepcionista'
                          ? 'bg-[#D4A574] text-[#161622] border-[#D4A574] shadow-sm'
                          : 'bg-[#20202F] text-[#A4A4B5] border-[#2C2C3E] hover:text-white'
                      }`}
                    >
                      <Headphones className="w-4 h-4" />
                      <span>Recepcionista</span>
                    </button>
                  </div>
                </div>

                {/* 1. Nombre Completo */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A4A4B5] mb-1.5">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A4A4B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ej. Mateo Velásquez o Valentina Gómez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#20202F] border border-[#2C2C3E] rounded-lg text-[13px] text-white focus:outline-none focus:border-[#D4A574]"
                    />
                  </div>
                </div>

                {/* 2. Correo Electrónico */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A4A4B5] mb-1.5">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A4A4B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="usuario@bladeandco.co"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#20202F] border border-[#2C2C3E] rounded-lg text-[13px] text-white focus:outline-none focus:border-[#D4A574]"
                    />
                  </div>
                </div>

                {/* 3. Contraseña */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A4A4B5] mb-1.5">
                    Contraseña de Acceso *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#A4A4B5] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Crea una contraseña segura"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-10 py-2.5 bg-[#20202F] border border-[#2C2C3E] rounded-lg text-[13px] text-white focus:outline-none focus:border-[#D4A574]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1.5 text-[#A4A4B5] hover:text-[#D4A574] absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                      title={showPassword ? 'Ocultar' : 'Mostrar'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 4. Foto (URL o Selección de Galería Rápida) */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A4A4B5] mb-1.5">
                    Foto de Perfil (URL o Galería) *
                  </label>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-[#20202F] border-2 border-[#D4A574] overflow-hidden shrink-0 shadow-md">
                      <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 relative">
                      <Camera className="w-4 h-4 text-[#A4A4B5] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        placeholder="https://ejemplo.com/foto.jpg"
                        value={formData.photo}
                        onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 bg-[#20202F] border border-[#2C2C3E] rounded-lg text-[12px] text-white focus:outline-none focus:border-[#D4A574]"
                      />
                    </div>
                  </div>

                  {/* Preajustes de fotos con un clic */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#626275] tracking-wider">
                      O selecciona un retrato rápido:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {AVATAR_PRESETS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormData({ ...formData, photo: preset.url })}
                          className={`w-9 h-9 rounded-full overflow-hidden border-2 shrink-0 transition-transform hover:scale-110 cursor-pointer ${
                            formData.photo === preset.url ? 'border-[#D4A574] scale-105' : 'border-[#2C2C3E]'
                          }`}
                          title={preset.name}
                        >
                          <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Teléfono y Especialidad */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A4A4B5] mb-1">
                      Teléfono
                    </label>
                    <input
                      type="text"
                      placeholder="+57 312 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-[#20202F] border border-[#2C2C3E] rounded text-[12px] text-white focus:outline-none focus:border-[#D4A574]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A4A4B5] mb-1">
                      Especialidad / Cargo
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Fade Specialist"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-3 py-2 bg-[#20202F] border border-[#2C2C3E] rounded text-[12px] text-white focus:outline-none focus:border-[#D4A574]"
                    />
                  </div>
                </div>

                {/* Estado Activo */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="memberActive"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4 accent-[#D4A574] rounded cursor-pointer"
                  />
                  <label htmlFor="memberActive" className="text-[12px] text-white font-medium cursor-pointer">
                    Habilitar acceso y visibilidad en turnos de atención
                  </label>
                </div>

                {/* Acciones */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#2C2C3E]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-[#20202F] hover:bg-[#2D2D3F] text-[#A4A4B5] hover:text-white rounded-lg text-[13px] font-medium transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D4A574] hover:bg-[#e0b585] text-[#161622] rounded-lg text-[13px] font-bold transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                  >
                    {editingStaff ? 'Guardar Cambios' : 'Registrar Miembro'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ⚠️ MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
        {deletingStaff && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#161622] border border-[#2C2C3E] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center">
                <h3
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                  className="text-[24px] text-white font-normal"
                >
                  ¿Eliminar del personal?
                </h3>
                <p className="text-[13px] text-[#A4A4B5] mt-1">
                  Estás a punto de dar de baja a{' '}
                  <strong className="text-white">{deletingStaff.name}</strong> ({deletingStaff.role}). Esta acción
                  revocará sus accesos y turnos asociados.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingStaff(null)}
                  className="px-4 py-2 bg-[#20202F] hover:bg-[#2D2D3F] text-white rounded-lg text-[13px] font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-[#EF4444] hover:bg-[#dc2626] text-white rounded-lg text-[13px] font-bold cursor-pointer transition-colors"
                >
                  Sí, Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
