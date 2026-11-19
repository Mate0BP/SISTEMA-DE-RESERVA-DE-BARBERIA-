# Arquitectura — Blade & Co

El sistema separa la interfaz (React) de la lógica de negocio (dominio orientado a objetos), siguiendo SOLID y el Modelo C4.

## Capas y dependencias

```mermaid
flowchart TD
    UI["components/ (React 19 + Tailwind)"] --> BS
    subgraph Dominio["domain/"]
        BS["BookingService"] --> AS["AvailabilityService"]
        BS --> STR["IBarberAssignmentStrategy"]
        BS --> REPO["IAppointmentRepository"]
        BS --> NOT["INotificationPort"]
        AS --> CHK["IAvailabilityChecker"]
        STR --> D1["DirectBarberStrategy"]
        STR --> D2["AnyAvailableBarberStrategy"]
    end
    subgraph Infra["infrastructure/"]
        IMR["InMemoryAppointmentRepository"]
        WA["WhatsAppNotificationAdapter"]
    end
    IMR -. implementa .-> REPO
    WA -. implementa .-> NOT
```

**Regla clave:** las flechas del dominio apuntan a abstracciones. La infraestructura implementa esas abstracciones (Inversión de Dependencias).

## Flujo de una reserva

```mermaid
sequenceDiagram
    actor C as Cliente
    participant UI as Vista de reserva
    participant B as BookingService
    participant A as AvailabilityService
    participant S as Estrategia de barbero
    participant R as Repositorio
    participant N as Notificador

    C->>UI: Elige servicio, barbero y horario
    UI->>B: createAppointment(datos)
    B->>A: isSlotFree(barbero, fecha, hora)
    A-->>B: true
    B->>S: assign(barbero | cualquiera)
    S-->>B: barbero asignado
    B->>R: save(cita BC-XXXX)
    B->>N: sendConfirmation(cita)
    B-->>UI: comprobante
    UI-->>C: Código BC-XXXX
```

## Ciclo de vida de una cita

```mermaid
stateDiagram-v2
    [*] --> pendiente
    pendiente --> confirmada
    pendiente --> cancelada
    confirmada --> atendida
    confirmada --> cancelada
    atendida --> [*]
    cancelada --> [*]
```

## Cómo extender el sistema

| Necesidad | Qué hacer |
| :--- | :--- |
| Nueva política de asignación de barberos | Implementar `IBarberAssignmentStrategy` |
| Cambiar la base de datos | Crear un repositorio que implemente `IAppointmentRepository` |
| Cambiar canal de notificación (SMS, correo) | Implementar `INotificationPort` |
| Nuevo rol de personal | Extender `StaffMemberBase` respetando LSP |
