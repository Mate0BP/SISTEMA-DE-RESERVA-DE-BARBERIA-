import React, { useState } from 'react';
import { ViewId, Barber } from '../../../types';
import { User, Phone, Mail, Scissors, Save, Check, Shield, Bell, ArrowLeft } from 'lucide-react';

interface Props {
  barbers: Barber[];
  clientData: {
    name: string;
    phone: string;
    email: string;
  };
  onUpdateProfile: (updatedData: { name: string; phone: string; email: string }) => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View10Profile: React.FC<Props> = ({
  barbers,
  clientData,
  onUpdateProfile,
  onNavigate,
}) => {
  const [name, setName] = useState(clientData.name || 'Rodrigo Méndez');
  const [phone, setPhone] = useState(clientData.phone || '+57 312 345 6789');
  const [email, setEmail] = useState(clientData.email || 'rodrigo.m@gmail.com');
  const [preferredBarberId, setPreferredBarberId] = useState('barber-1');
  const [styleNotes, setStyleNotes] = useState('Degradado a media altura, tijera en la zona superior, productos efecto mate.');
  const [notifyWhatsapp, setNotifyWhatsapp] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, phone, email });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full bg-[#161622] text-white py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header navigation */}
        <div className="pb-8 border-b border-[#2C2C3E]">
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
              Gestión Personal del Cliente
            </span>
          </div>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[32px] sm:text-[38px] text-white font-normal"
          >
            Mi Perfil y Preferencias de Estilo
          </h1>
          <p className="text-[13px] text-[#A4A4B5] mt-1">
            Administra tus datos de contacto para avisos de citas y especifica tus preferencias a tu barbero.
          </p>
        </div>

        {savedSuccess && (
          <div className="mt-6 p-4 rounded-lg bg-[#1B5E20]/25 border border-[#4ADE80]/30 text-[#4ADE80] text-[13px] flex items-center gap-2">
            <Check className="w-4 h-4 text-[#4ADE80]" />
            <span>Tus datos y preferencias han sido actualizados satisfactoriamente.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          {/* Main profile form (8 cols) */}
          <div className="md:col-span-8 space-y-6">
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 space-y-5">
              <h3
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-[20px] text-white font-normal pb-3 border-b border-[#2C2C3E]"
              >
                Información de Contacto
              </h3>

              <div>
                <label className="block text-[11px] font-semibold text-[#A4A4B5] uppercase tracking-wider mb-1.5">
                  Nombre Completo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[14px] text-white outline-none"
                  />
                  <User className="w-4 h-4 text-[#626275] absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#A4A4B5] uppercase tracking-wider mb-1.5">
                    Teléfono Móvil
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[14px] text-white outline-none"
                    />
                    <Phone className="w-4 h-4 text-[#626275] absolute right-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#A4A4B5] uppercase tracking-wider mb-1.5">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[14px] text-white outline-none"
                    />
                    <Mail className="w-4 h-4 text-[#626275] absolute right-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#A4A4B5] uppercase tracking-wider mb-1.5">
                  Barbero Preferente
                </label>
                <select
                  value={preferredBarberId}
                  onChange={(e) => setPreferredBarberId(e.target.value)}
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[14px] text-white outline-none"
                >
                  {barbers.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.title})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#A4A4B5] uppercase tracking-wider mb-1.5">
                  Ficha Técnica de Estilo & Alergias
                </label>
                <textarea
                  rows={3}
                  value={styleNotes}
                  onChange={(e) => setStyleNotes(e.target.value)}
                  placeholder="Describe cómo sueles cortarte el cabello, alergias a colonias, etc."
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[13px] text-white outline-none resize-none"
                />
                <span className="text-[11px] text-[#626275] mt-1 block">
                  Esta información estará disponible para el barbero asignado al momento de tu cita.
                </span>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[14px] font-semibold rounded inline-flex items-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Save className="w-4 h-4 text-[#161622]" />
                  <span>Guardar Datos del Perfil</span>
                </button>
              </div>
            </div>
          </div>

          {/* Side card notifications & security (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C2C3E]">
                <Bell className="w-4 h-4 text-[#D4A574]" />
                <h4 className="text-[14px] font-semibold text-white">Recordatorios</h4>
              </div>

              <label className="flex items-center justify-between text-[13px] text-[#A4A4B5] cursor-pointer">
                <span>Recordatorios por WhatsApp</span>
                <input
                  type="checkbox"
                  checked={notifyWhatsapp}
                  onChange={(e) => setNotifyWhatsapp(e.target.checked)}
                  className="accent-[#D4A574] w-4 h-4 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between text-[13px] text-[#A4A4B5] cursor-pointer">
                <span>Comprobantes por Correo</span>
                <input
                  type="checkbox"
                  checked={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.checked)}
                  className="accent-[#D4A574] w-4 h-4 rounded cursor-pointer"
                />
              </label>
            </div>

            <div className="bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-[#2C2C3E]">
                <Shield className="w-4 h-4 text-[#4ADE80]" />
                <h4 className="text-[14px] font-semibold text-white">Privacidad y Seguridad</h4>
              </div>
              <p className="text-[12px] text-[#A4A4B5] leading-relaxed">
                Tus datos son almacenados exclusivamente para el agendamiento y atención en Blade & Co. No compartimos tu información con terceros.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
