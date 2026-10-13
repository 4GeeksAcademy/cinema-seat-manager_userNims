# Cinema Seat Manager - Guía de Uso y Pruebas

## 1. Resumen del Proyecto

Este proyecto implementa un sistema de gestión de asientos para una sala de cine de 8 filas por 10 columnas utilizando **TypeScript**, estructurado bajo las siguientes características:

- **Estructura de datos**: La sala se representa estrictamente como una matriz bidimensional de números (`0` para asiento libre y `1` para ocupado), sin clases ni objetos para modelar asientos o reservas.
- **Tuplas para resultados**: Las posiciones se manejan como tuplas `[fila, columna]` (usando índices de 1 a 8 y 1 a 10), el conteo de asientos se devuelve como `[ocupados, disponibles]` y los pares contiguos como `[[f, c1], [f, c2]]`.
- **Arquitectura modular**:
  - [src/sala.ts](src/sala.ts): Contiene los tipos y las funciones puras de lógica de negocio (`inicializarSala`, `mostrarSala`, `reservarAsiento`, `liberarAsiento`, `contarAsientos`, `buscarAsientosContiguos` y `mostrarResumen`).
  - [src/main.ts](src/main.ts): Ejecuta las pruebas automatizadas y escenarios demostrativos por consola mediante `tsx`.
  - [src/web.ts](src/web.ts): Administra la interacción con el DOM, renderiza el mapa accesible, gestiona reservas con clic izquierdo, liberaciones con clic derecho y resalta el par contiguo disponible.
  - [index.html](index.html): Estructura visual centrada, leyenda de colores y diseño responsivo adaptado con Tailwind CSS.

---

## 2. Puesta en Marcha

### Prerrequisitos
Asegúrate de contar con Node.js y npm instalados en el entorno.

Instala las dependencias del proyecto:
```bash
npm install
```

---

## 3. Pruebas por Consola

Para validar los tipos del proyecto y ejecutar la batería de pruebas en consola:

1. **Validación de tipos de TypeScript**:
   ```bash
   npm run typecheck
   ```
   Ejecuta el compilador en modo estricto sin generar archivos para comprobar que no existan errores de tipos.

2. **Ejecución de los escenarios de prueba por consola**:
   ```bash
   npm run console
   ```
   Este comando ejecuta [src/main.ts](src/main.ts) a través de `tsx` y valida 4 escenarios fundamentales:
   - **Sala vacía**: 0 ocupados, 80 disponibles y primer par en `[[1, 1], [1, 2]]`.
   - **Sala parcialmente ocupada**: 4 ocupados, 76 disponibles, primer par en `[[1, 3], [1, 4]]` y rechazo de reservas duplicadas o fuera de rango.
   - **Sala casi llena**: 72 ocupados, 8 disponibles distribuidos sin pares contiguos horizontales.
   - **Sala completamente llena**: 80 ocupados, 0 disponibles y sin pares libres.

---

## 4. Puesta en Marcha por Vía Web

Para probar la interfaz gráfica interactiva en el navegador:

1. **Iniciar el servidor de desarrollo local**:
   ```bash
   npm run dev
   ```
   o alternativamente:
   ```bash
   npm start
   ```

2. **Acceder a la aplicación**:
   Abre en el navegador la dirección indicada por Vite (por defecto `http://localhost:5173`).

3. **Interacción en la interfaz**:
   - **Reservar asiento**: Haz clic izquierdo sobre cualquier asiento libre (`L`). Cambiará a ocupado (`X`), actualizará el mensaje de confirmación, los contadores y el cálculo del primer par libre.
   - **Desmarcar asiento**: Haz clic derecho sobre cualquier asiento ocupado (`X`) para cancelarlo y devolverlo al estado libre (`L`).
   - **Par contiguo destacado**: Los dos asientos que forman el primer par contiguo horizontal disponible aparecen resaltados con color ámbar y un anillo de enfoque tanto en la matriz como en la leyenda.
   - **Navegación por teclado**: Los asientos son botones accesibles que admiten foco visible y activación con las teclas Enter y Espacio.
