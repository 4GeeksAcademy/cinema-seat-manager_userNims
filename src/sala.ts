// Tipos fundamentales para el estado de la sala
export type Asiento = 0 | 1;
export type Sala = Asiento[][];
export type Posicion = [number, number];
export type ParContiguo = [Posicion, Posicion];

// Crea ocho filas independientes de diez asientos libres cada una.
export function inicializarSala(): Sala {
  const sala: Sala = [];
  for (let fila = 0; fila < 8; fila++) {
    const nuevaFila: Asiento[] = [];
    for (let columna = 0; columna < 10; columna++) {
      nuevaFila.push(0);
    }
    sala.push(nuevaFila);
  }
  return sala;
}

// Imprime la matriz con etiquetas de filas y columnas desde 1.
export function mostrarSala(sala: Sala): void {
  let encabezado = "Fila/Col";
  for (let columna = 1; columna <= 10; columna++) {
    encabezado += ` ${String(columna).padStart(2, " ")}`;
  }
  console.log(encabezado);
  for (let fila = 0; fila < sala.length; fila++) {
    let linea = String(fila + 1).padStart(8, " ");
    for (let columna = 0; columna < sala[fila].length; columna++) {
      const simbolo = sala[fila][columna] === 1 ? "X" : "L";
      linea += ` ${simbolo.padStart(2, " ")}`;
    }
    console.log(linea);
  }
}

// Valida la posición y disponibilidad; reserva y devuelve un mensaje.
export function reservarAsiento(sala: Sala, fila: number, columna: number): string {
  if (!Number.isInteger(fila) || !Number.isInteger(columna)) {
    return "Reserva fallida: fila y columna deben ser números enteros.";
  }
  if (fila < 1 || fila > sala.length) {
    return "Reserva fallida: la fila debe estar entre 1 y 8.";
  }
  if (columna < 1 || columna > sala[fila - 1].length) {
    return "Reserva fallida: la columna debe estar entre 1 y 10.";
  }
  const indiceFila = fila - 1;
  const indiceColumna = columna - 1;
  if (sala[indiceFila][indiceColumna] === 1) {
    return `Reserva fallida: el asiento de fila ${fila}, columna ${columna} ya está ocupado.`;
  }
  sala[indiceFila][indiceColumna] = 1;
  return `Reserva confirmada: fila ${fila}, columna ${columna}.`;
}

// Valida la posición y desmarca un asiento reservado; devuelve un mensaje.
export function liberarAsiento(sala: Sala, fila: number, columna: number): string {
  if (!Number.isInteger(fila) || !Number.isInteger(columna)) {
    return "Cancelación fallida: fila y columna deben ser números enteros.";
  }
  if (fila < 1 || fila > sala.length) {
    return "Cancelación fallida: la fila debe estar entre 1 y 8.";
  }
  if (columna < 1 || columna > sala[fila - 1].length) {
    return "Cancelación fallida: la columna debe estar entre 1 y 10.";
  }
  const indiceFila = fila - 1;
  const indiceColumna = columna - 1;
  if (sala[indiceFila][indiceColumna] === 0) {
    return `Cancelación fallida: el asiento de fila ${fila}, columna ${columna} ya está libre.`;
  }
  sala[indiceFila][indiceColumna] = 0;
  return `Reserva cancelada: fila ${fila}, columna ${columna} ahora está libre.`;
}

// Devuelve [ocupados, disponibles] recorriendo todos los asientos.
export function contarAsientos(sala: Sala): [number, number] {
  let ocupados = 0;
  let disponibles = 0;
  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length; columna++) {
      if (sala[fila][columna] === 1) {
        ocupados++;
      } else {
        disponibles++;
      }
    }
  }
  return [ocupados, disponibles];
}

// Devuelve el primer par horizontal libre, o null si no existe.
// Las posiciones devueltas usan números de fila y columna desde 1.
export function buscarAsientosContiguos(sala: Sala): ParContiguo | null {
  for (let fila = 0; fila < sala.length; fila++) {
    for (let columna = 0; columna < sala[fila].length - 1; columna++) {
      if (sala[fila][columna] === 0 && sala[fila][columna + 1] === 0) {
        return [[fila + 1, columna + 1], [fila + 1, columna + 2]];
      }
    }
  }
  return null;
}

// Muestra el mapa, los totales y el resultado de buscar un par libre.
export function mostrarResumen(sala: Sala): void {
  mostrarSala(sala);
  const [ocupados, disponibles] = contarAsientos(sala);
  console.log(`Ocupados: ${ocupados} | Disponibles: ${disponibles}`);
  const par = buscarAsientosContiguos(sala);
  if (par === null) {
    console.log("No hay dos asientos libres contiguos en la misma fila.");
  } else {
    console.log(
      `Asientos contiguos encontrados: fila ${par[0][0]}, columnas ${par[0][1]} y ${par[1][1]}.`
    );
  }
}
