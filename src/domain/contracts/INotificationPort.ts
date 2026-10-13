import { Appointment } from '../../types';

export interface NotificationResult {
  success: boolean;
  channel: 'whatsapp' | 'email' | 'sms' | 'mock';
  externalId?: string;
  message?: string;
}

export interface INotificationPort {
  /**
   * Despacha la confirmación de la cita recién creada al cliente.
   */
  sendBookingConfirmation(appointment: Appointment): Promise<NotificationResult>;

  /**
   * Despacha una alerta de cancelación o cambio de estado.
   */
  sendStatusAlert(appointment: Appointment, previousStatus: string): Promise<NotificationResult>;
}
