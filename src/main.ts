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