# Guía de Contribución — Blade & Co

Gracias por colaborar. Antes de abrir un Pull Request lee esto y el [flujo de Git](WORKFLOW.md).

## Antes de subir tus cambios

```bash
npm run lint   # verificación de tipos (tsc --noEmit)
npm test       # suite de verificación de principios SOLID
npm run build  # confirma que compila para producción
```

## Convención de commits

Usamos el formato `tipo: descripción corta en minúscula`.

| Tipo | Cuándo usarlo | Ejemplo |
| :--- | :--- | :--- |
| `feat` | Nueva funcionalidad | `feat: agregar bloqueo de horarios por barbero` |
| `fix` | Corrección de un error | `fix: evitar solapamiento de citas en AvailabilityService` |
| `docs` | Solo documentación | `docs: documentar reglas de negocio` |
| `refactor` | Cambio interno sin alterar comportamiento | `refactor: extraer cálculo de slots` |
| `test` | Pruebas | `test: cubrir AnyAvailableBarberStrategy` |
| `chore` | Configuración, dependencias, tareas varias | `chore: agregar .editorconfig` |
| `style` | Formato (sin cambios de lógica) | `style: ordenar imports` |

## Reglas de arquitectura

- La **lógica de negocio vive en `src/domain/`**, nunca dentro de componentes React.
- Los servicios dependen de **interfaces** (`src/domain/contracts/`), no de implementaciones concretas.
- Las implementaciones concretas (repositorios, notificaciones) van en `src/infrastructure/`.
- Para nuevas políticas de asignación de barberos, crea una nueva clase que implemente `IBarberAssignmentStrategy` en lugar de modificar `BookingService`.

## Pull Requests

- Base: `dev`. Compare: tu rama personal.
- Un PR = un objetivo claro. Describe qué cambió y cómo probarlo.
- No subas archivos `.env` ni claves de API.
