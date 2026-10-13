import {
  inicializarSala,
  reservarAsiento,
  mostrarResumen,
} from "./sala";

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