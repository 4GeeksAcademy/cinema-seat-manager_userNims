# Cinema Seat Manager

Prototipo de consola en TypeScript para una sala de 8 filas y 10 columnas.
Los asientos se representan exclusivamente con una matriz: 0 libre y 1 ocupado.

## Instalación y ejecución

1. Instalar las dependencias: `npm install`.
2. Validar los tipos: `npm run typecheck`.
3. Ejecutar el programa: `npm run console`.

## Funciones

- inicializarSala: crea la matriz con todos los asientos libres.
- mostrarSala: imprime filas, columnas y los símbolos X/L.
- reservarAsiento: valida la posición y reserva si está libre.
- contarAsientos: devuelve [ocupados, disponibles].
- buscarAsientosContiguos: devuelve el primer par horizontal libre o null.
- mostrarResumen: imprime el mapa, el conteo y el resultado de la búsqueda.

Las posiciones de entrada y salida se numeran desde 1.
La búsqueda recorre filas de arriba abajo y columnas de izquierda a derecha.

## Escenarios

- Vacía: 0 ocupados, 80 disponibles.
- Parcial: 4 ocupados, 76 disponibles.
- Casi llena con asientos sueltos: 72 ocupados, 8 disponibles, sin par horizontal.
- Llena: 80 ocupados, 0 disponibles, sin par horizontal.

La ejecución incluye reservas confirmadas, intentos repetidos y posiciones inválidas.