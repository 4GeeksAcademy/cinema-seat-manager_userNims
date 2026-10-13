import "./style.css";
import {
  inicializarSala,
  reservarAsiento,
  liberarAsiento,
  contarAsientos,
  buscarAsientosContiguos,
  type Sala,
} from "./sala";

// Estado de la sala: únicamente la matriz de 0 (libre) y 1 (ocupado)
const sala: Sala = inicializarSala();

function actualizarInterfaz(mensajeTexto?: string, esError = false): void {
  const mapaEl = document.getElementById("mapa");
  const ocupadosEl = document.getElementById("conteo-ocupados");
  const disponiblesEl = document.getElementById("conteo-disponibles");
  const parLibreEl = document.getElementById("par-libre");
  const mensajeEl = document.getElementById("mensaje");

  if (!mapaEl || !ocupadosEl || !disponiblesEl || !parLibreEl || !mensajeEl) {
    return;
  }

  // 1. Mensaje informativo de la última acción
  if (mensajeTexto) {
    mensajeEl.textContent = mensajeTexto;
    mensajeEl.className = esError
      ? "rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800"
      : "rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800";
  }

  // 2. Conteo de asientos usando la tupla [ocupados, disponibles]
  const [ocupados, disponibles] = contarAsientos(sala);
  ocupadosEl.textContent = String(ocupados);
  disponiblesEl.textContent = String(disponibles);

  // 3. Búsqueda del primer par contiguo usando la tupla [[f, c1], [f, c2]]
  const par = buscarAsientosContiguos(sala);
  if (par === null) {
    parLibreEl.textContent = "No hay dos asientos libres contiguos en la misma fila.";
  } else {
    parLibreEl.textContent = `Fila ${par[0][0]}, columnas ${par[0][1]} y ${par[1][1]}`;
  }

  // 4. Renderizado del mapa 8x10 con etiquetas de fila/columna
  mapaEl.innerHTML = "";

  // Fila de encabezados de columna (1 a 10)
  const filaEncabezado = document.createElement("div");
  filaEncabezado.className = "flex items-center gap-1.5";

  const esquina = document.createElement("div");
  esquina.className = "w-12 text-center text-xs font-semibold text-slate-400";
  esquina.textContent = "Fila";
  filaEncabezado.appendChild(esquina);

  for (let c = 1; c <= 10; c++) {
    const colHeader = document.createElement("div");
    colHeader.className = "w-9 text-center text-xs font-semibold text-slate-500";
    colHeader.textContent = String(c);
    filaEncabezado.appendChild(colHeader);
  }
  mapaEl.appendChild(filaEncabezado);

  // Filas del mapa (1 a 8)
  for (let f = 0; f < sala.length; f++) {
    const filaNumero = f + 1;
    const filaEl = document.createElement("div");
    filaEl.className = "flex items-center gap-1.5";

    // Etiqueta de la fila
    const labelFila = document.createElement("div");
    labelFila.className = "w-12 text-center text-xs font-bold text-slate-600";
    labelFila.textContent = `F ${filaNumero}`;
    filaEl.appendChild(labelFila);

    // Botones accesibles para cada asiento
    for (let c = 0; c < sala[f].length; c++) {
      const colNumero = c + 1;
      const estado = sala[f][c];
      const boton = document.createElement("button");
      boton.type = "button";
      boton.dataset.fila = String(filaNumero);
      boton.dataset.columna = String(colNumero);

      const esOcupado = estado === 1;
      const esParContiguo =
        par !== null &&
        par[0][0] === filaNumero &&
        (par[0][1] === colNumero || par[1][1] === colNumero);

      boton.textContent = esOcupado ? "X" : "L";

      const estadoTexto = esOcupado
        ? "Ocupado (X)"
        : esParContiguo
          ? "Libre - Par contiguo recomendado (L)"
          : "Libre (L)";

      boton.setAttribute(
        "aria-label",
        `Fila ${filaNumero}, Columna ${colNumero} - ${estadoTexto}`
      );

      // Foco visible en teclado (focus:ring-2), bordes y contraste
      const estiloBase =
        "flex h-9 w-9 items-center justify-center rounded-md border text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";
      
      let estiloEstado = "";
      if (esOcupado) {
        estiloEstado = "border-rose-300 bg-rose-100 text-rose-700 hover:bg-rose-200";
      } else if (esParContiguo) {
        estiloEstado =
          "border-amber-400 bg-amber-200 text-amber-900 ring-2 ring-amber-400 ring-offset-1 hover:bg-amber-300 active:scale-95";
      } else {
        estiloEstado =
          "border-emerald-300 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 active:scale-95";
      }

      boton.className = `${estiloBase} ${estiloEstado}`;

      boton.addEventListener("click", () => {
        const respuesta = reservarAsiento(sala, filaNumero, colNumero);
        const fallo = respuesta.startsWith("Reserva fallida");
        actualizarInterfaz(respuesta, fallo);
      });

      // Clic derecho para desmarcar / cancelar reserva
      boton.addEventListener("contextmenu", (evento) => {
        evento.preventDefault();
        const respuesta = liberarAsiento(sala, filaNumero, colNumero);
        const fallo = respuesta.startsWith("Cancelación fallida");
        actualizarInterfaz(respuesta, fallo);
      });

      filaEl.appendChild(boton);
    }

    mapaEl.appendChild(filaEl);
  }
}

// Inicialización de la vista una vez cargado el DOM
const mensajeInicial = "Haz clic izquierdo para reservar (L) o clic derecho para desmarcar (X).";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    actualizarInterfaz(mensajeInicial);
  });
} else {
  actualizarInterfaz(mensajeInicial);
}
