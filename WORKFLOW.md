# Flujo de Trabajo en Git para el Equipo

Este documento describe la estrategia de ramificación basada en **ramas personales por estudiante**, y la integración a la rama compartida `dev` mediante **Pull Requests**.

## Guía Paso a Paso

### 1. Clonar el proyecto y preparar el entorno
La primera vez que vayas a trabajar en el proyecto, debes descargarlo e instalar sus dependencias:
```bash
git clone <URL_DEL_REPOSITORIO>
cd SISTEMA-DE-RESERVA-DE-BARBERIA-
npm install
```

### 2. Crear y cambiar a tu rama personal
Cada estudiante debe crear su propia rama y trabajar **únicamente** allí. El nombre de la rama será el nombre del estudiante.
```bash
git checkout -b nombre-de-estudiante
```

### 3. Desarrollar y probar localmente
Realiza tus cambios en el código y verifica que el proyecto levante y funcione correctamente antes de continuar:
```bash
npm run dev
```

### 4. Subir los cambios a tu rama personal
Una vez que terminaste tu tarea y comprobaste que todo funciona bien en tu computadora, guarda los cambios y súbelos **a tu propia rama**:
```bash
git add .
git commit -m "Descripción clara de lo que se hizo"
git push origin nombre-de-estudiante
```

### 5. Crear un Pull Request para integrarlo a `dev`
Una vez que tu código está subido a tu rama en la plataforma (por ejemplo, GitHub), debes solicitar integrarlo a la rama compartida (`dev`):

1. Ve a la página principal del repositorio en GitHub/GitLab.
2. Es probable que veas un cartel que dice **"Compare & pull request"** referente a la rama que acabas de subir. Dale clic.
3. *Si no aparece el cartel:* Ve a la pestaña **"Pull Requests"** y haz clic en el botón verde **"New pull request"**.
4. Asegúrate de configurar las ramas correctamente en los selectores:
   - **Base (hacia dónde):** `dev`
   - **Compare (desde dónde):** `nombre-de-estudiante` (tu rama).
5. Escribe un título descriptivo y explica brevemente qué funcionalidad agregaste o qué error arreglaste.
6. Haz clic en **"Create pull request"**.

### 6. Revisión y Actualización
- Un compañero o el líder del equipo revisará tu Pull Request en la plataforma.
- Si todo está correcto y no hay conflictos, se aceptará y se hará el *merge* (fusión) hacia `dev`.
- **MUY IMPORTANTE:** Una vez que el PR de un compañero se ha fusionado en `dev`, el resto del equipo debe actualizar sus propias ramas en sus computadoras para tener lo último. Estando en tu rama, debes ejecutar:
  ```bash
  git pull origin dev
  ```