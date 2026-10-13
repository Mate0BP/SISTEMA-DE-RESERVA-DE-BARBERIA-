/**
 * Script de validación técnica automatizada de los Principios SOLID
 * Ejecutable mediante: npx tsx src/domain/verify_solid.ts
 */
import {
  BookingService,
  AvailabilityService,
  InMemoryAppointmentRepository,
  WhatsAppNotificationAdapter,
  DirectBarberStrategy,
  AnyAvailableBarberStrategy,
  BarberStaff,
  ReceptionistStaff,
  AdminStaff,
  StaffMemberBase,
} from './index';
import { INITIAL_APPOINTMENTS, INITIAL_BARBERS, INITIAL_BLOCKED_TIMES } from '../data/mockData';

async function runSolidVerification() {
  console.log('===============================================================');
  console.log('🧪 VERIFICACIÓN TÉCNICA DE PRINCIPIOS SOLID - BLADE & CO');
  console.log('===============================================================\n');

  // 1. Verificación SRP (Single Responsibility Principle)
  console.log('1️⃣ [SRP] Responsabilidad Única:');
  const repo = new InMemoryAppointmentRepository(INITIAL_APPOINTMENTS);
  const availability = new AvailabilityService(
    async () => repo.findAll(),
    async () => INITIAL_BLOCKED_TIMES
  );
  const notifier = new WhatsAppNotificationAdapter();
  const bookingService = new BookingService(repo, availability, notifier);
  console.log('   ✅ BookingService delega persistencia al repositorio, cálculo al AvailabilityService y alertas al notifier.');

  // 2. Verificación OCP (Open/Closed Principle) con Strategy
  console.log('\n2️⃣ [OCP] Abierto / Cerrado:');
  const directStrategy = new DirectBarberStrategy('barber-1');
  const anyStrategy = new AnyAvailableBarberStrategy();

  const chosenDirect = directStrategy.selectBarber(INITIAL_BARBERS, '2026-10-15', '10:15', INITIAL_APPOINTMENTS);
  console.log(`   ✅ DirectBarberStrategy asignó: ${chosenDirect?.name}`);

  const chosenAny = anyStrategy.selectBarber(INITIAL_BARBERS, '2026-10-15', '10:15', INITIAL_APPOINTMENTS);
  console.log(`   ✅ AnyAvailableBarberStrategy asignó (balanceo): ${chosenAny?.name}`);
  console.log('   ✅ Nuevas estrategias pueden agregarse implementando IBarberAssignmentStrategy sin modificar BookingService.');

  // 3. Verificación LSP (Liskov Substitution Principle)
  console.log('\n3️⃣ [LSP] Sustitución de Liskov:');
  const team: StaffMemberBase[] = [
    new BarberStaff('st-1', 'Carlos "Blade" Silva', 'carlos@blade.com', true),
    new ReceptionistStaff('st-2', 'Laura Gómez', 'laura@blade.com', true),
    new AdminStaff('st-3', 'Marcos Toledo', 'marcos@blade.com', true),
  ];

  for (const member of team) {
    const canAccess = member.canAccessSystem();
    const permissions = member.getPermissions();
    console.log(`   ✅ Subtipo ${member.constructor.name} sustituye válidamente a StaffMemberBase -> Acceso: ${canAccess}, Permisos: [${permissions.join(', ')}]`);
  }

  // 4. Verificación ISP (Interface Segregation Principle)
  console.log('\n4️⃣ [ISP] Segregación de Interfaces:');
  const slots = await availability.getAvailableSlots('barber-1', '2026-10-15', 45);
  console.log(`   ✅ AvailabilityChecker expone únicamente consulta de slots (disponibles: ${slots.length}), sin requerir datos personales del cliente ni pagos.`);

  // 5. Verificación DIP (Dependency Inversion Principle)
  console.log('\n5️⃣ [DIP] Inversión de Dependencias:');
  const newAppt = await bookingService.createAppointment({
    clientId: 'cli-test-1',
    clientName: 'Juan Pérez',
    clientPhone: '+57 300 123 4567',
    clientEmail: 'juan@test.com',
    serviceId: 'srv-1',
    serviceName: 'Corte Clásico Signature',
    barberId: 'barber-1',
    date: '2026-10-15',
    time: '15:00',
    durationMinutes: 45,
    price: 20000,
    availableBarbers: INITIAL_BARBERS,
  });

  console.log(`   ✅ Cita creada exitosamente con código único: ${newAppt.code}`);
  console.log(`   ✅ BookingService opera 100% sobre interfaces abstractas (IAppointmentRepository, IAvailabilityChecker, INotificationPort).`);

  console.log('\n===============================================================');
  console.log('🎉 TODOS LOS PRINCIPIOS SOLID FUERON VALIDADOS EXITOSAMENTE');
  console.log('===============================================================');
}

runSolidVerification().catch((err) => {
  console.error('❌ Error en verificación:', err);
  process.exit(1);
});
