import { metaPedido } from "#/ventas/pedido/detalle/detalle.ts";
import { Pedido } from "#/ventas/pedido/diseño.ts";
import { MetaModelo } from "@olula/lib/dominio.ts";
import { configEstadoPedidoGan } from "./configEstadoGan.tsx";

export const metaPedidoGan: MetaModelo<Pedido> = {
  ...metaPedido,
  editable: (pedido) => configEstadoPedidoGan.esEditable(pedido.servido ?? ""),
};
