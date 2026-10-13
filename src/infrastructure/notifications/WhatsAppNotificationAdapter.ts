import { Appointment } from '../../types';
import { INotificationPort, NotificationResult } from '../../domain/contracts/INotificationPort';

export class WhatsAppNotificationAdapter implements INotificationPort {
  public async sendBookingConfirmation(appointment: Appointment): Promise<NotificationResult> {
    const message = `💈 ¡Hola ${appointment.clientName}! Tu cita en Blade & Co ha sido confirmada. Código: ${appointment.code}. Fecha: ${appointment.date} a las ${appointment.time}. Profesional: ${appointment.barberName}.`;
    
    // Simulación del despacho de webhook/API de WhatsApp
    return {
      success: true,
      channel: 'whatsapp',
      externalId: `wa-msg-${Date.now()}`,
      message,
    };
  }

  public async sendStatusAlert(appointment: Appointment, previousStatus: string): Promise<NotificationResult> {
    const message = `💈 Hola ${appointment.clientName}, tu cita ${appointment.code} cambió de '${previousStatus}' a '${appointment.status}'.`;
    
    return {
      success: true,
      channel: 'whatsapp',
      externalId: `wa-alert-${Date.now()}`,
      message,
    };
  }
}
