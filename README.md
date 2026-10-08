# Sistema de Reserva de Barbería

Este es el Frontend de una aplicación de reserva para una barbería, desarrollado con **React**, **TypeScript**, **Vite** y estilizado utilizando **Tailwind CSS**. 

El sistema incluye una interfaz completa tanto para los clientes (flujo de reserva, visualización de servicios, selección de barberos) como para los administradores (dashboard, gestión de citas, bloqueo de horarios y configuración de servicios).

## Requisitos Previos

Asegúrate de tener instalado en tu sistema:
- [Node.js](https://nodejs.org/) (se recomienda la versión 18 o superior).

## Instalación

Sigue estos pasos para levantar el proyecto en tu máquina local:

1. **Abre una terminal** y navega hasta la carpeta raíz del proyecto.
2. **Instala las dependencias** ejecutando el siguiente comando:
   ```bash
   npm install
   ```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### Levantar el servidor de desarrollo

```bash
npm run dev
```
Inicia el entorno de desarrollo local usando Vite. Por defecto, la aplicación estará disponible en `http://localhost:3000`.

### Construir para producción

```bash
npm run build
```
Empaqueta la aplicación para ser desplegada en producción. Los archivos generados se guardarán en la carpeta `dist`.

### Vista previa de producción

```bash
npm run preview
```
Inicia un servidor web local para visualizar cómo se comportará la aplicación compilada en producción (requiere haber ejecutado `npm run build` antes).

### Validar tipos y sintaxis (Lint)

```bash
npm run lint
```
Ejecuta el compilador de TypeScript para comprobar si hay errores de tipado o sintaxis en el código sin generar nuevos archivos.

### Limpiar compilaciones

```bash
npm run clean
```
Elimina las carpetas `dist` y cualquier otro archivo generado durante la construcción.

## Estructura del Proyecto

- `src/App.tsx`: Orquestador principal de la aplicación. Maneja el estado global y decide qué vista renderizar.
- `src/components/views/client/`: Componentes correspondientes al flujo de los clientes (landing, autenticación, reserva, etc.).
- `src/components/views/admin/`: Componentes para la administración interna de la barbería (agenda, dashboard analítico, gestión).
- `src/data/mockData.ts`: Datos simulados (servicios, barberos, clientes) utilizados para inicializar el estado de la aplicación.
- `src/types.ts`: Definiciones de interfaces y tipos en TypeScript para garantizar la seguridad del código en todo el proyecto.

## Notas Adicionales

Actualmente, el proyecto funciona con **datos simulados (mock data)** cargados en memoria. Cualquier cambio (como nuevas reservas o actualizaciones de clientes) se perderá si recargas la página web en el navegador, ya que no cuenta con un backend conectado o una base de datos persistente.
