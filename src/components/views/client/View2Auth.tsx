import React, { useState } from 'react';
import { ViewId } from '../../../types';
import { Mail, Lock, Phone, User, ArrowRight, ArrowLeft, CheckCircle2, Shield } from 'lucide-react';

interface Props {
  onNavigate: (viewId: ViewId) => void;
  onLoginSuccess?: (userData: { name: string; email: string; phone: string }) => void;
}

export const View2Auth: React.FC<Props> = ({ onNavigate, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('rodrigo.m@gmail.com');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  
  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [message, setMessage] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('¡Sesión iniciada con éxito! Redirigiendo al catálogo...');
    if (onLoginSuccess) {
      onLoginSuccess({
        name: 'Rodrigo Méndez',
        email: loginIdentifier,
        phone: '+57 312 345 6789',
      });
    }
    setTimeout(() => {
      onNavigate('v3_servicios');
    }, 900);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('¡Cuenta creada correctamente! Bienvenido a Blade & Co Colombia.');
    if (onLoginSuccess) {
      onLoginSuccess({
        name: regName || 'Nuevo Cliente',
        email: regEmail || 'cliente@bladeandco.co',
        phone: regPhone || '+57 300 123 4567',
      });
    }
    setTimeout(() => {
      onNavigate('v3_servicios');
    }, 900);
  };

  return (
    <div className="w-full min-h-[calc(100vh-160px)] bg-[#161622] flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Botón de volver */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('v1_bienvenida')}
          className="px-3.5 py-2 bg-[#20202F] hover:bg-[#2D2D3F] border border-[#2C2C3E] text-white hover:text-[#D4A574] text-[13px] font-medium rounded inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-[#20202F] border border-[#2C2C3E] rounded-lg p-6 sm:p-8 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <span
            style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: '2px' }}
            className="text-[28px] text-[#D4A574] font-normal"
          >
            Blade & Co.
          </span>
          <h1
            style={{ fontFamily: "'Instrument Serif', serif" }}
            className="text-[32px] text-white font-normal mt-1"
          >
            {activeTab === 'login' ? 'Bienvenido de nuevo' : 'Crea tu Cuenta'}
          </h1>
          <p className="text-[13px] text-[#A4A4B5] mt-1">
            {activeTab === 'login'
              ? 'Accede para gestionar tus citas y reservas en segundos.'
              : 'Únete para reservar con tu barbero favorito y acumular visitas.'}
          </p>
        </div>

        {/* Selector de Portal: Cliente vs Administrador */}
        <div className="mb-6">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#A4A4B5] mb-2 text-center">
            Tipo de Portal
          </label>
          <div className="p-1 bg-[#161622] rounded-lg border border-[#2C2C3E] grid grid-cols-2 gap-1">
            <button
              type="button"
              className="py-2.5 px-3 rounded text-[13px] font-semibold transition-all flex items-center justify-center gap-2 bg-[#D4A574] text-[#161622] shadow-sm cursor-default"
            >
              <User className="w-4 h-4" />
              <span>Portal Cliente</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('v11_admin_login')}
              className="py-2.5 px-3 rounded text-[13px] font-semibold transition-all flex items-center justify-center gap-2 text-[#A4A4B5] hover:text-white hover:bg-[#20202F] cursor-pointer"
            >
              <Shield className="w-4 h-4 text-[#D4A574]" />
              <span>Administrador / Barbero</span>
            </button>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="grid grid-cols-2 p-1 bg-[#161622] rounded border border-[#2C2C3E] mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setMessage(null);
            }}
            className={`py-2 text-[14px] font-medium rounded transition-colors ${
              activeTab === 'login'
                ? 'bg-[#20202F] text-white shadow-sm'
                : 'text-[#A4A4B5] hover:text-white'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setMessage(null);
            }}
            className={`py-2 text-[14px] font-medium rounded transition-colors ${
              activeTab === 'register'
                ? 'bg-[#20202F] text-white shadow-sm'
                : 'text-[#A4A4B5] hover:text-white'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Success message banner */}
        {message && (
          <div className="mb-5 p-3 rounded bg-[#1B5E20]/25 border border-[#4ADE80]/30 text-[#4ADE80] text-[13px] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#4ADE80]" />
            <span>{message}</span>
          </div>
        )}

        {/* Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#A4A4B5] uppercase tracking-[0.5px] mb-1.5">
                Correo Electrónico o Teléfono
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="ejemplo@correo.com o +34 612 345 678"
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[14px] text-white placeholder-[#626275] outline-none transition-colors"
                />
                <Mail className="w-4 h-4 text-[#626275] absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[12px] font-semibold text-[#A4A4B5] uppercase tracking-[0.5px]">
                  Contraseña
                </label>
                <a
                  href="#recuperar"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Enlace de recuperación enviado al correo.');
                  }}
                  className="text-[11px] text-[#D4A574] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Tu contraseña de acceso"
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[14px] text-white placeholder-[#626275] outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-[#626275] absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[14px] font-semibold rounded transition-colors inline-flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-sm"
            >
              <span>Acceder a mi Cuenta</span>
              <ArrowRight className="w-4 h-4 text-[#161622]" />
            </button>
          </form>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-[#A4A4B5] uppercase tracking-[0.5px] mb-1.5">
                Nombre Completo
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Carlos Alberto Pérez"
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[14px] text-white placeholder-[#626275] outline-none transition-colors"
                />
                <User className="w-4 h-4 text-[#626275] absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#A4A4B5] uppercase tracking-[0.5px] mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="carlos.perez@ejemplo.com"
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[14px] text-white placeholder-[#626275] outline-none transition-colors"
                />
                <Mail className="w-4 h-4 text-[#626275] absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#A4A4B5] uppercase tracking-[0.5px] mb-1.5">
                Teléfono de Contacto
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+34 600 123 456"
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[14px] text-white placeholder-[#626275] outline-none transition-colors"
                />
                <Phone className="w-4 h-4 text-[#626275] absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#A4A4B5] uppercase tracking-[0.5px] mb-1.5">
                Crear Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-[#161622] border border-[#2C2C3E] focus:border-[#D4A574] rounded px-3.5 py-2.5 text-[14px] text-white placeholder-[#626275] outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-[#626275] absolute right-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D4A574] hover:bg-[#e0b587] text-[#161622] text-[14px] font-semibold rounded transition-colors inline-flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-sm"
            >
              <span>Completar Registro</span>
              <ArrowRight className="w-4 h-4 text-[#161622]" />
            </button>
          </form>
        )}

        {/* Demo fast-track helper */}
        <div className="mt-6 pt-5 border-t border-[#2C2C3E] text-center">
          <p className="text-[12px] text-[#A4A4B5] mb-2">¿Prefieres continuar como invitado?</p>
          <button
            type="button"
            onClick={() => onNavigate('v3_servicios')}
            className="text-[13px] text-[#D4A574] hover:underline font-medium"
          >
            Continuar directamente al Catálogo de Servicios →
          </button>
        </div>
      </div>
    </div>
  );
};
