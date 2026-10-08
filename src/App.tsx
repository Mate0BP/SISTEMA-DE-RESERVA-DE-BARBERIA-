import React, { useState } from 'react';
import { ViewId, Service, Barber, Appointment, BlockedTime, ClientProfile, AppointmentStatus, StaffMember } from './types';
import {
  INITIAL_SERVICES,
  INITIAL_BARBERS,
  INITIAL_APPOINTMENTS,
  INITIAL_BLOCKED_TIMES,
  INITIAL_CLIENTS,
  INITIAL_STAFF,
} from './data/mockData';

// Common components
import { ViewNavigationDock } from './components/common/ViewNavigationDock';

// Client Views
import { View1Landing } from './components/views/client/View1Landing';
import { View2Auth } from './components/views/client/View2Auth';
import { View3Services } from './components/views/client/View3Services';
import { View4BarberSelect } from './components/views/client/View4BarberSelect';
import { View5Schedule } from './components/views/client/View5Schedule';
import { View6Summary } from './components/views/client/View6Summary';
import { View7Confirmation } from './components/views/client/View7Confirmation';
import { View8MyAppointments } from './components/views/client/View8MyAppointments';
import { View9VisitHistory } from './components/views/client/View9VisitHistory';
import { View10Profile } from './components/views/client/View10Profile';

// Admin Views
import { View11AdminLogin } from './components/views/admin/View11AdminLogin';
import { View12CalendarAgenda } from './components/views/admin/View12CalendarAgenda';
import { View13AvailabilityBlocks } from './components/views/admin/View13AvailabilityBlocks';
import { View14ServicesCrud } from './components/views/admin/View14ServicesCrud';
import { View15ClientDirectory } from './components/views/admin/View15ClientDirectory';
import { View16AppointmentStatusControl } from './components/views/admin/View16AppointmentStatusControl';
import { View17AnalyticsDashboard } from './components/views/admin/View17AnalyticsDashboard';
import { View18AdminProfileTeamCrud } from './components/views/admin/View18AdminProfileTeamCrud';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewId>('v1_bienvenida');

  // Application Data States
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [barbers, setBarbers] = useState<Barber[]>(INITIAL_BARBERS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>(INITIAL_BLOCKED_TIMES);
  const [clients, setClients] = useState<ClientProfile[]>(INITIAL_CLIENTS);
  const [staffList, setStaffList] = useState<StaffMember[]>(INITIAL_STAFF);

  // Client User Data State
  const [clientInfo, setClientInfo] = useState({
    name: 'Rodrigo Méndez',
    phone: '+34 612 345 678',
    email: 'rodrigo.m@gmail.com',
  });

  // Current Booking Flow State
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>('srv-1');
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-07');
  const [selectedTime, setSelectedTime] = useState<string | null>('11:00');
  const [latestAppointment, setLatestAppointment] = useState<Appointment | null>(INITIAL_APPOINTMENTS[0]);

  // Handlers for Services
  const handleSelectService = (service: Service) => {
    setSelectedServiceId(service.id);
  };

  const handleAddService = (newService: Service) => {
    setServices((prev) => [newService, ...prev]);
  };

  const handleUpdateService = (updatedService: Service) => {
    setServices((prev) => prev.map((s) => (s.id === updatedService.id ? updatedService : s)));
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Handlers for Barbers & Scheduling
  const handleSelectBarber = (barberId: string | null) => {
    setSelectedBarberId(barberId);
  };

  const handleSelectDateTime = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  // Handlers for Appointments
  const handleConfirmAppointment = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    setLatestAppointment(newAppointment);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelada' as AppointmentStatus } : a))
    );
  };

  const handleRescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, date: newDate, time: newTime } : a))
    );
  };

  const handleUpdateStatus = (appointmentId: string, newStatus: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
    );
  };

  const handleRepeatAppointment = (serviceId: string, barberId: string) => {
    setSelectedServiceId(serviceId);
    setSelectedBarberId(barberId);
  };

  // Handlers for Blocked Times
  const handleAddBlock = (block: BlockedTime) => {
    setBlockedTimes((prev) => [block, ...prev]);
  };

  const handleRemoveBlock = (id: string) => {
    setBlockedTimes((prev) => prev.filter((b) => b.id !== id));
  };

  // Handlers for Staff (Barberos y Recepcionistas)
  const handleAddStaff = (newStaff: StaffMember) => {
    setStaffList((prev) => [newStaff, ...prev]);
  };

  const handleUpdateStaff = (updatedStaff: StaffMember) => {
    setStaffList((prev) => prev.map((s) => (s.id === updatedStaff.id ? updatedStaff : s)));
  };

  const handleDeleteStaff = (id: string) => {
    setStaffList((prev) => prev.filter((s) => s.id !== id));
  };

  const selectedServiceObj = services.find((s) => s.id === selectedServiceId) || services[0];
  const selectedBarberObj = barbers.find((b) => b.id === selectedBarberId) || null;

  return (
    <div className="min-h-screen bg-[#11111A] text-white flex flex-col font-sans">
      {/* Selector flotante discreto de pantallas para pruebas */}
      <ViewNavigationDock currentView={currentView} onNavigate={setCurrentView} />

      {/* Render the specific view */}
      <main className="flex-1 w-full bg-[#161622]">
        {currentView === 'v1_bienvenida' && (
          <View1Landing onNavigate={setCurrentView} />
        )}

        {currentView === 'v2_auth' && (
          <View2Auth
            onNavigate={setCurrentView}
            onLoginSuccess={(data) => setClientInfo(data)}
          />
        )}

        {currentView === 'v3_servicios' && (
          <View3Services
            services={services}
            selectedServiceId={selectedServiceId}
            onSelectService={handleSelectService}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v4_barbero' && (
          <View4BarberSelect
            barbers={barbers}
            selectedBarberId={selectedBarberId}
            onSelectBarber={handleSelectBarber}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v5_horarios' && (
          <View5Schedule
            selectedService={selectedServiceObj}
            selectedBarber={selectedBarberObj}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            appointments={appointments}
            blockedTimes={blockedTimes}
            onSelectDateTime={handleSelectDateTime}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v6_resumen' && (
          <View6Summary
            selectedService={selectedServiceObj}
            selectedBarber={selectedBarberObj}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            clientInfo={clientInfo}
            onConfirmAppointment={handleConfirmAppointment}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v7_comprobante' && (
          <View7Confirmation
            latestAppointment={latestAppointment}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v8_mis_citas' && (
          <View8MyAppointments
            appointments={appointments}
            onCancelAppointment={handleCancelAppointment}
            onRescheduleAppointment={handleRescheduleAppointment}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v9_historial' && (
          <View9VisitHistory
            appointments={appointments}
            onRepeatAppointment={handleRepeatAppointment}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v10_perfil' && (
          <View10Profile
            barbers={barbers}
            clientData={clientInfo}
            onUpdateProfile={setClientInfo}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v11_admin_login' && (
          <View11AdminLogin
            onLoginSuccess={() => {}}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v12_agenda' && (
          <View12CalendarAgenda
            appointments={appointments}
            barbers={barbers}
            blockedTimes={blockedTimes}
            onOpenStatusModal={(apt) => {
              setCurrentView('v16_estados_cita');
            }}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v13_bloqueos' && (
          <View13AvailabilityBlocks
            blockedTimes={blockedTimes}
            barbers={barbers}
            onAddBlock={handleAddBlock}
            onRemoveBlock={handleRemoveBlock}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v14_gestion_servicios' && (
          <View14ServicesCrud
            services={services}
            onAddService={handleAddService}
            onUpdateService={handleUpdateService}
            onDeleteService={handleDeleteService}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v15_directorio_clientes' && (
          <View15ClientDirectory
            clients={clients}
            appointments={appointments}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v16_estados_cita' && (
          <View16AppointmentStatusControl
            appointments={appointments}
            onUpdateStatus={handleUpdateStatus}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v17_analitica' && (
          <View17AnalyticsDashboard
            appointments={appointments}
            services={services}
            barbers={barbers}
            onNavigate={setCurrentView}
          />
        )}

        {currentView === 'v18_perfil_admin_equipo' && (
          <View18AdminProfileTeamCrud
            staffList={staffList}
            onAddStaff={handleAddStaff}
            onUpdateStaff={handleUpdateStaff}
            onDeleteStaff={handleDeleteStaff}
            onNavigate={setCurrentView}
          />
        )}
      </main>
    </div>
  );
}
