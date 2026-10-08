---
name: Reglas de Vibecoding y Lore
description: Reglas maestras sobre diseño, tipografía y arquitectura del proyecto Blade & Co.
trigger: always_on
---

# Contexto y Reglas del Proyecto (Blade & Co Barbershop)

## 1. Lore y Propósito (Project Lore)
- **Nombre del Negocio:** Blade & Co - Barbería & Grooming.
- **Objetivo de la App:** Sistema Frontend completo de reservas y gestión operativa. Permite a clientes agendar y al administrador gestionar el negocio.

## 2. Tipografía y Estilo Visual (UI/UX)
- **Modo:** El sistema utiliza modo oscuro por defecto.
- **Colores Principales:** 
  - Fondo base: `#11111A`
  - Fondo secundario/paneles: `#161622`
  - Color de acento (Selección/Botones): Dorado/Cobre `#D4A574`
  - Texto principal: `text-white`
- **Tipografías:** Fuentes de Google: `Geist`, `Instrument Serif`, y `Inter`.
- **Framework CSS:** Tailwind CSS v4. No usar CSS en línea.

## 3. Formas de Trabajo y Arquitectura
- **Stack Tecnológico:** React + TypeScript + Vite.
- **Enrutamiento:** **NO se utiliza `react-router`**. La navegación se maneja manualmente mediante el estado `currentView` en `App.tsx`. Al agregar vistas, registrarlas en el tipo `ViewId` en `src/types.ts`.
- **Estado:** El estado global es manejado desde `App.tsx` pasándose como *props*.
- **Datos:** Se usan Mock Data en `src/data/mockData.ts`. No modificar para conectarse a un backend a menos que se solicite explícitamente.

## 4. Directrices para Vibecoding
Cuando se generen nuevas funcionalidades:
1. Mantén siempre el fondo `#161622` para tarjetas y modales.
2. Respeta la estructura estricta de TypeScript definida en `src/types.ts`.
3. Evita librerías externas de enrutamiento o gestión de estado. Mantén el código minimalista.
