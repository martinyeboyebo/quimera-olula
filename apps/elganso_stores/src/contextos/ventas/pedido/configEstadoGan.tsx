import { ConfigEstadoPedido } from "#/ventas/pedido/maestro/configEstado.ts";
import { QIcono } from "@olula/componentes/index.js";

const ESTADO_ABIERTA = "Abierta";
const ESTADO_CERRADA = "Cerrada";
const ESTADO_ANULADA = "Anulada";

export const configEstadoPedidoGan: ConfigEstadoPedido = {
  etiqueta: "Estado",
  opciones: [
    { valor: ESTADO_ABIERTA, descripcion: "Abierta" },
    { valor: ESTADO_CERRADA, descripcion: "Cerrada" },
    { valor: ESTADO_ANULADA, descripcion: "Anulada" },
  ],
  filtroDefecto: null,
  colorDe: (servido) => {
    if (servido === ESTADO_CERRADA) return "cerrado";
    if (servido === ESTADO_ANULADA) return "anulado";
    return "pendiente";
  },
  // en El Ganso una venta TPV se cierra al cobrar: solo es editable mientras
  // sigue "Abierta" (Cerrada/Anulada quedan bloqueadas, igual que en Eneboo).
  esEditable: (servido) => servido === ESTADO_ABIERTA,
  iconos: {
    cerrado: (
      <QIcono
        nombre={"circulo_relleno"}
        tamaño="sm"
        color="var(--color-deshabilitado-oscuro)"
      />
    ),
    pendiente: (
      <QIcono
        nombre={"circulo_relleno"}
        tamaño="sm"
        color="var(--color-exito-oscuro)"
      />
    ),
    anulado: (
      <QIcono
        nombre={"circulo_relleno"}
        tamaño="sm"
        color="var(--color-error-oscuro)"
      />
    ),
  },
};
