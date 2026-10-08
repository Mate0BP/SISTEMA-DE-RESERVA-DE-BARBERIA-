import React from 'react';
import { AppointmentStatus } from '../../types';

interface Props {
  status: AppointmentStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<Props> = ({ status, size = 'md' }) => {
  const config = {
    confirmada: {
      label: 'Confirmada',
      textColor: 'text-[#4ADE80]',
      bgColor: 'bg-[#1B5E20]/25',
      borderColor: 'border-[#4ADE80]/30',
      dotColor: 'bg-[#4ADE80]',
    },
    pendiente: {
      label: 'Pendiente',
      textColor: 'text-[#FBBF24]',
      bgColor: 'bg-[#E65100]/25',
      borderColor: 'border-[#FBBF24]/30',
      dotColor: 'bg-[#FBBF24]',
    },
    atendida: {
      label: 'Atendida',
      textColor: 'text-[#64B5F6]',
      bgColor: 'bg-[#0D47A1]/25',
      borderColor: 'border-[#64B5F6]/30',
      dotColor: 'bg-[#64B5F6]',
    },
    cancelada: {
      label: 'Cancelada',
      textColor: 'text-[#F87171]',
      bgColor: 'bg-[#B71C1C]/25',
      borderColor: 'border-[#F87171]/30',
      dotColor: 'bg-[#F87171]',
    },
    no_asistio: {
      label: 'No Asistió',
      textColor: 'text-[#E57373]',
      bgColor: 'bg-[#B71C1C]/20',
      borderColor: 'border-[#E57373]/30',
      dotColor: 'bg-[#E57373]',
    },
  }[status] || {
    label: status,
    textColor: 'text-white',
    bgColor: 'bg-[#2D2D3F]',
    borderColor: 'border-[#2C2C3E]',
    dotColor: 'bg-white',
  };

  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-[12px] px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded border ${config.bgColor} ${config.borderColor} ${config.textColor} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      <span>{config.label}</span>
    </span>
  );
};
