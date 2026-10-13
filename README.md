# 💈 Sistema de Reserva de Barbería — "Blade & Co"

Aplicación web para la gestión integral y reserva autónoma de citas en barbería, desarrollada con **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4** y una **Capa de Dominio Orientada a Objetos** desacoplada bajo los principios **SOLID** y el **Modelo C4**.

El sistema integra dos experiencias:
1. **Portal de Autoservicio del Cliente:** Catálogo de servicios, selección de barbero o asignación automática, selector interactivo de fechas y horarios libres sin colisiones, resumen de reserva y comprobante con código único (`BC-XXXX`).
2. **Panel de Gestión y Staff:** Agenda operativa diaria y semanal, inhabilitación de horarios y descansos (`BlockedTimes`), directorio de clientes, control del ciclo de vida de los turnos (`pendiente` ➔ `confirmada` ➔ `atendida` / `cancelada`) y dashboard analítico financiero.

---

## 🛠️ Requisitos Previos

* [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
* Gestor de paquetes `npm`.

---

## 🚀 Instalación y Puesta en Marcha

1. Clonar o ubicarse en la carpeta raíz del proyecto:
   ```bash
   cd "SISTEMA-DE-RESERVA-DE-BARBERIA-"
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```

---

## 📜 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con Vite (por defecto en `http://localhost:3000`). |
| `npm run build` | Compila y empaqueta la aplicación para producción en la carpeta `dist`. |
| `npm run preview` | Previsualiza localmente la versión compilada de producción. |
| `npm run lint` | Ejecuta el análisis de tipos de TypeScript (`tsc --noEmit`) sin generar archivos. |
| `npm test` | **Ejecuta la suite automatizada de verificación de Principios SOLID** en consola (`tsx src/domain/verify_solid.ts`). |
| `npm run clean` | Elimina la carpeta de salida `dist`. |

---

## 🏛️ Estructura del Proyecto

```text
src/
├── components/                            # Interfaz de Usuario (React 19 + Tailwind CSS)
│   ├── common/                            # Componentes transversales y barra de navegación
│   └── views/                             # Vistas de la aplicación
│       ├── client/                        # Flujo de cliente (Vistas 1 a 10: Landing, Catálogo, Agenda, etc.)
│       └── admin/                         # Panel de administración (Vistas 11 a 18: Agenda, Bloqueos, Analítica)
│
├── domain/                                # Capa de Dominio Orientada a Objetos (SOLID / C4 Nivel 4)
│   ├── contracts/                         # Abstracciones e interfaces (DIP, ISP)
│   │   ├── IAppointmentRepository.ts      # Contrato de persistencia desacoplada de citas
│   │   ├── IAvailabilityChecker.ts        # Contrato enfocado exclusivamente a verificar disponibilidad
│   │   ├── INotificationPort.ts           # Puerto para envío de comprobantes (WhatsApp / Notifier)
│   │   ├── IBarberAssignmentStrategy.ts   # Interfaz Strategy para asignación polimórfica de personal
│   │   └── IStaffMember.ts                # Contratos segregados para el equipo de trabajo (LSP, ISP)
│   ├── entities/                          # Entidades del dominio con validación y reglas de negocio
│   │   ├── AppointmentEntity.ts           # Entidad cita: generación de códigos y máquina de estados
│   │   └── Staff.ts                       # Jerarquía de clases (StaffMemberBase, BarberStaff, Receptionist)
│   ├── strategies/                        # Estrategias de asignación de barberos (OCP)
│   │   └── BarberAssignmentStrategies.ts  # DirectBarberStrategy y AnyAvailableBarberStrategy (balanceo)
│   ├── services/                          # Servicios de orquestación y cálculo (SRP)
│   │   ├── AvailabilityService.ts         # Cálculo de franjas horarias y cruce con descansos (RN-01, RN-06)
│   │   └── BookingService.ts              # Orquestador del caso de uso de agendamiento
│   ├── verify_solid.ts                    # Suite de verificación técnica automatizada
│   └── index.ts                           # Exportación unificada de la capa de dominio
│
├── infrastructure/                        # Adaptadores concretos de infraestructura (DIP)
│   ├── repositories/
│   │   └── InMemoryAppointmentRepository.ts # Adaptador concreto de repositorio
│   └── notifications/
│       └── WhatsAppNotificationAdapter.ts   # Adaptador de mensajería externa
│
├── data/
│   └── mockData.ts                        # Datos iniciales simulados del negocio
├── utils/
│   └── formatCurrency.ts                  # Utilidad para formateo de moneda en COP
├── types.ts                               # Modelos de datos y tipos base de TypeScript
├── App.tsx                                # Coordinador del flujo visual y navegación de vistas
└── main.tsx                               # Punto de entrada de la aplicación React
```

---

## 💎 Aplicación de Principios SOLID

El proyecto transitó de un prototipo centrado exclusivamente en la interfaz gráfica (donde la lógica se encontraba acoplada a las vistas de React) hacia una **arquitectura orientada a objetos desacoplada**, alineada con el **Nivel 4 del Modelo C4**.

### Plantilla Oficial de Análisis de Principios SOLID (Diligenciada)

| Principio | Componente del Sistema Analizado (Evolución E1 ➔ E2) | Problema / Anti-patrón en la Entrega 1 | Solución Arquitectónica Aplicada en la Entrega 2 | Beneficio Concreto para "Blade & Co" |
| :--- | :--- | :--- | :--- | :--- |
| **S — Single Responsibility (Responsabilidad Única)** | **Módulo de Gestión y Creación de Citas** (`BookingService`, `AvailabilityService`, `AppointmentRepository`, `NotificationAdapter`) | En la Entrega 1, la vista `View6Summary.tsx` y `App.tsx` concentraban en un solo bloque el renderizado del formulario, generación de código `BC-XXXX`, cálculo de solapamiento de horarios y almacenamiento en estados locales. | Se dividieron responsabilidades en clases con un único motivo para cambiar: `BookingService` (orquestación), `AvailabilityService` (cálculo de slots), `InMemoryAppointmentRepository` (persistencia) y `WhatsAppNotificationAdapter` (mensajería). | Si cambia la API de WhatsApp o el motor de base de datos SQL, la lógica de agendamiento de turnos de la barbería no sufre ninguna alteración. |
| **O — Open/Closed (Abierto/Cerrado)** | **Motor de Asignación de Barberos** (`IBarberAssignmentStrategy`, `DirectBarberStrategy`, `AnyAvailableBarberStrategy`) | En la Entrega 1, la opción "Cualquier barbero disponible" (RF-23 / RN-07) se implementaba con un condicional rígido `if (barberId === null)` dentro del selector de horarios, obligando a modificar la vista si se requería otra regla. | Se aplicó el patrón Strategy mediante la interfaz `IBarberAssignmentStrategy`. Para incorporar nuevas políticas (ej. asignar al barbero con mejor calificación o con menor facturación), se crean nuevas clases sin modificar el código de `BookingService`. | La barbería puede adaptar sus políticas de asignación comercial en cualquier momento sin riesgo de introducir errores en la lógica central de reservas. |
| **L — Liskov Substitution (Sustitución de Liskov)** | **Jerarquía de Miembros de la Organización** (`StaffMemberBase`, `BarberStaff`, `ReceptionistStaff`, `AdminStaff`) | En el modelo conceptual inicial figuraba `StaffMember <|-- Barber`, pero en el prototipo se representaba como una única estructura plana con atributos opcionales, arriesgando excepciones al invocar métodos no soportados por ciertos roles. | Se formalizó la clase abstracta `StaffMemberBase` con operaciones universales (`canAccessSystem()`, `getPermissions()`). Las clases derivadas `BarberStaff` y `ReceptionistStaff` respetan íntegramente las precondiciones y poscondiciones de la clase base. | El sistema de autenticación y agenda puede iterar sobre colecciones heterogéneas de `StaffMemberBase` de forma polimórfica sin sorpresas en tiempo de ejecución. |
| **I — Interface Segregation (Segregación de Interfaces)** | **Contratos Operativos de Citas y Turnos** (`IAvailabilityChecker`, `IAppointmentRepository`, `INotificationPort`, `IStaffMember`) | En la Entrega 1, la interfaz general `Appointment` exponía indiscriminadamente los datos personales del cliente (correo, teléfono, notas) a componentes que sólo requerían verificar disponibilidad horaria. | Se segregaron contratos pequeños y especializados: `IAvailabilityChecker` (sólo expone `isSlotFree` y `getAvailableSlots`), `INotificationPort` (sólo métodos de alerta) y repositorios orientados a casos de uso puntuales. | Ningún componente o vista se ve obligado a depender de atributos o métodos que no utiliza, fortaleciendo el encapsulamiento y la seguridad de datos (Habeas Data). |
| **D — Dependency Inversion (Inversión de Dependencias)** | **Orquestador de Casos de Uso del Backend** (`BookingService` y Adaptadores de Infraestructura) | En la Entrega 1, las funciones de agendamiento dependían de forma acoplada de variables globales y de las colecciones directas de `mockData.ts`. | `BookingService` (módulo de alto nivel) depende exclusivamente de interfaces abstractas (`IAppointmentRepository`, `IAvailabilityChecker`, `INotificationPort`). Las concreciones se inyectan en su constructor. | Máxima flexibilidad: permite realizar pruebas automatizadas con dobles de prueba (*mocks*) y migrar de memoria a SQLite o PostgreSQL sin tocar una sola línea de lógica del negocio. |

---

### 🧪 Verificación Automatizada de SOLID

El proyecto incluye una suite de pruebas automatizadas para comprobar el cumplimiento de los cinco principios en tiempo de ejecución. Para ejecutarla:

```bash
npm test
```

**Resultado esperado:**
```text
===============================================================
🧪 VERIFICACIÓN TÉCNICA DE PRINCIPIOS SOLID - BLADE & CO
===============================================================

1️⃣ [SRP] Responsabilidad Única:
   ✅ BookingService delega persistencia al repositorio, cálculo al AvailabilityService y alertas al notifier.

2️⃣ [OCP] Abierto / Cerrado:
   ✅ DirectBarberStrategy asignó: Mateo Velásquez
   ✅ AnyAvailableBarberStrategy asignó (balanceo): Mateo Velásquez
   ✅ Nuevas estrategias pueden agregarse implementando IBarberAssignmentStrategy sin modificar BookingService.

3️⃣ [LSP] Sustitución de Liskov:
   ✅ Subtipo BarberStaff sustituye válidamente a StaffMemberBase -> Acceso: true, Permisos: [view_own_agenda, update_own_status, add_technical_notes]
   ✅ Subtipo ReceptionistStaff sustituye válidamente a StaffMemberBase -> Acceso: true, Permisos: [view_all_agendas, update_appointment_status, register_clients, manage_blocks]
   ✅ Subtipo AdminStaff sustituye válidamente a StaffMemberBase -> Acceso: true, Permisos: [all_permissions, manage_services, manage_team, view_analytics]

4️⃣ [ISP] Segregación de Interfaces:
   ✅ AvailabilityChecker expone únicamente consulta de slots (disponibles: 13), sin requerir datos personales del cliente ni pagos.

5️⃣ [DIP] Inversión de Dependencias:
   ✅ Cita creada exitosamente con código único: BC-XXXX
   ✅ BookingService opera 100% sobre interfaces abstractas (IAppointmentRepository, IAvailabilityChecker, INotificationPort).

===============================================================
🎉 TODOS LOS PRINCIPIOS SOLID FUERON VALIDADOS EXITOSAMENTE
===============================================================
```
