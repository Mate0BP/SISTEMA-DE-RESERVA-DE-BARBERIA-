import React, { useState } from 'react';
import { ViewId } from '../../../types';
import { Shield, Lock, UserCheck, ArrowRight, ArrowLeft, CheckCircle2, User } from 'lucide-react';

interface Props {
  onLoginSuccess: (role: 'admin' | 'barbero' | 'recepcion') => void;
  onNavigate: (viewId: ViewId) => void;
}

export const View11AdminLogin: React.FC<Props> = ({ onLoginSuccess, onNavigate }) => {
  const [role, setRole] = useState<'admin' | 'barbero' | 'recepcion'>('admin');
  const [username, setUsername] = useState('admin@bladeandco.com');
  const [pin, setPin] = useState('••••••••');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(`Acceso autorizado como ${role.toUpperCase()}. Redirigiendo al Dashboard Administrativo...`);
    onLoginSuccess(role);
    setTimeout(() => {
      onNavigate('v17_analitica');
    }, 700);
  };

  const handleQuickRole = (selectedRole: 'admin' | 'barbero' | 'recepcion') => {
    setRole(selectedRole);
    if (selectedRole === 'admin') setUsername('director@bladeandco.com');
    if (selectedRole === 'barbero') setUsername('mateo.barbero@bladeandco.com');
    if (selectedRole === 'recepcion') setUsername('recepcion@bladeandco.com');
  };

  return (
    <div className="w-full min-h-[calc(100vh-160px)] bg-[#11111A] flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('v1_bienvenida')}
          className="px-3.5 py-2 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-white hover:text-[#D4A574] text-[13px] font-medium rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Portal de Clientes</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-[#20202F] border border-[#2C2C3E] rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-[#161622] border border-[#2C2C3E] text-[#D4A574] flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Shield className="w-7 h-7" />
          </div>
          <span className="text-[11px] font-semibold text-[#D4A574] uppercase tracking-[2px]">
            Portal del Personal · Blade & Co
          </span>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[32px] text-white font-normal mt-1"
          >
            Acceso Administrativo & Barberos
          </h1>
          <p className="text-[13px] text-[#A4A4B5] mt-1">
            Autenticación con permisos por rol para control de agenda, disponibilidad y analítica.
          </p>
        </div>

        {/* Selector de Portal: Cliente vs Administrador */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A4A4B5] mb-2 text-center">
            Tipo de Portal
          </label>
          <div className="p-1 bg-[#161622] rounded-lg border border-[#2C2C3E] grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => onNavigate('v2_auth')}
              className="py-2.5 px-3 rounded text-[13px] font-semibold transition-all flex items-center justify-center gap-2 text-[#A4A4B5] hover:text-white hover:bg-[#20202F] cursor-pointer"
            >
              <User className="w-4 h-4 text-[#D4A574]" />
              <span>Portal Cliente</span>
            </button>
            <button
              type="button"
              className="py-2.5 px-3 rounded text-[13px] font-semibold transition-all flex items-center justify-center gap-2 bg-[#D4A574] text-[#161622] shadow-sm cursor-default"
            >
              <Shield className="w-4 h-4" />
              <span>Administrador / Barbero</span>
            </button>
          </div>
        </div>

        {/* Role Fast Selector */}
        <div>
          <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-2 tracking-wider">
            Seleccionar Rol de Acceso
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'admin', label: 'Admin General' },
              { id: 'barbero', label: 'Barbero' },
              { id: 'recepcion', label: 'Recepción' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleQuickRole(r.id as any)}
                className={`py-2 px-2 text-[12px] font-semibold rounded border transition-colors ${
                  role === r.id
                    ? 'bg-[#D4A574] text-[#161622] border-[#D4A574]'
                    : 'bg-[#161622] text-[#A4A4B5] border-[#2C2C3E] hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <div className="p-3 rounded bg-[#1B5E20]/25 border border-[#4ADE80]/30 text-[#4ADE80] text-[13px] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
              Usuario Corporativo
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white text-[13px] rounded px-3.5 py-2.5 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold uppercase text-[#A4A4B5] mb-1">
              Código PIN o Contraseña Maestra
            </label>
            <input
              type="password"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] text-white text-[13px] rounded px-3.5 py-2.5 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[14px] font-semibold rounded inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md mt-2"
          >
            <UserCheck className="w-4 h-4 text-[#161622]" />
            <span>Entrar al Panel Operativo</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#2C2C3E]">
          <button
            type="button"
            onClick={() => onNavigate('v1_bienvenida')}
            className="text-[12px] text-[#A4A4B5] hover:text-white underline"
          >
            ← Volver a la vista del cliente
          </button>
        </div>
      </div>
    </div>
  );
};
