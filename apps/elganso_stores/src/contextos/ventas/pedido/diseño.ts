import { Pedido } from "#/ventas/pedido/diseño.ts";

// email/tarjeta_puntos_id llegan igual en la respuesta de la API (infraestructura.ts
// reenvía la respuesta tal cual), pero no son un concepto genérico de pedido:
// solo El Ganso los usa (email y tarjeta de fidelización Gansociety de una venta TPV).
export interface PedidoGan extends Pedido {
  email?: string;
  tarjeta_puntos_id?: string;
}
