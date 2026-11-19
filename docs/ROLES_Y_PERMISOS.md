# Roles y Permisos del Personal

Definidos en `src/domain/entities/Staff.ts` (jerarquía basada en `StaffMemberBase`).

| Permiso | Barbero | Recepcionista | Administrador |
| :--- | :---: | :---: | :---: |
| Ver su propia agenda (`view_own_agenda`) | ✅ | — | ✅ |
| Ver todas las agendas (`view_all_agendas`) | — | ✅ | ✅ |
| Actualizar estado de sus citas (`update_own_status`) | ✅ | — | ✅ |
| Actualizar estado de cualquier cita (`update_appointment_status`) | — | ✅ | ✅ |
| Agregar notas técnicas (`add_technical_notes`) | ✅ | — | ✅ |
| Registrar clientes (`register_clients`) | — | ✅ | ✅ |
| Gestionar bloqueos y descansos (`manage_blocks`) | — | ✅ | ✅ |
| Gestionar servicios (`manage_services`) | — | — | ✅ |
| Gestionar equipo (`manage_team`) | — | — | ✅ |
| Ver analítica financiera (`view_analytics`) | — | — | ✅ |

> Fuente: salida esperada de `npm test` (verificación LSP). Si cambian los permisos en el código, actualiza esta tabla.
