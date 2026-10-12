//ETAPA A
type Asiento = 0 | 1;
type Sala = Asiento[][];
type Posicion = [number, number];
type ParContiguo = [Posicion, Posicion];

// Crea ocho filas independientes de diez asientos libres cada una.
function inicializarSala(): Sala {
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
function mostrarSala(sala: Sala): void {
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



//ETAPA B
// Valida la posición y disponibilidad; reserva y devuelve un mensaje.
function reservarAsiento(sala: Sala, fila: number, columna: number): string {
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



//ETAPA C
// Devuelve [ocupados, disponibles] recorriendo todos los asientos.
function contarAsientos(sala: Sala): [number, number] {
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
function buscarAsientosContiguos(sala: Sala): ParContiguo | null {
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
function mostrarResumen(sala: Sala): void {
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

console.log("\n=== 1. SALA VACÍA ===");
const salaVacia = inicializarSala();
mostrarResumen(salaVacia);

console.log("\n=== 2. SALA PARCIALMENTE OCUPADA ===");
const salaParcial = inicializarSala();
console.log(reservarAsiento(salaParcial, 1, 1));
console.log(reservarAsiento(salaParcial, 1, 2));
console.log(reservarAsiento(salaParcial, 3, 5));
console.log(reservarAsiento(salaParcial, 8, 10));
console.log(reservarAsiento(salaParcial, 1, 1));
console.log(reservarAsiento(salaParcial, 0, 1));
console.log(reservarAsiento(salaParcial, 9, 1));
console.log(reservarAsiento(salaParcial, 1, 0));
console.log(reservarAsiento(salaParcial, 1, 11));
console.log(reservarAsiento(salaParcial, 1.5, 2));
mostrarResumen(salaParcial);

console.log("\n=== 3. SALA CASI LLENA: SOLO ASIENTOS SUELTOS ===");
const salaCasiLlena = inicializarSala();
for (let fila = 0; fila < salaCasiLlena.length; fila++) {
  for (let columna = 0; columna < salaCasiLlena[fila].length; columna++) {
    salaCasiLlena[fila][columna] = 1;
  }
  salaCasiLlena[fila][4] = 0;
}
mostrarResumen(salaCasiLlena);

console.log("\n=== 4. SALA COMPLETAMENTE LLENA ===");
const salaLlena = inicializarSala();
for (let fila = 0; fila < salaLlena.length; fila++) {
  for (let columna = 0; columna < salaLlena[fila].length; columna++) {
    salaLlena[fila][columna] = 1;
  }
}
console.log(reservarAsiento(salaLlena, 2, 4));
mostrarResumen(salaLlena);