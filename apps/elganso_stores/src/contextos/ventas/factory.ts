import { FactoryVentasOlula } from "#/ventas/factory.ts";
import { menuVentas } from "./menu.ts";
import { configEstadoPedidoGan } from "./pedido/configEstadoGan.tsx";
import { CrearLineaGan } from "./pedido/CrearLineaGan.tsx";
import { CrearPedidoGan } from "./pedido/CrearPedidoGan.tsx";
import { metaPedidoGan } from "./pedido/dominio.ts";
import { TabDatosGan } from "./pedido/TabDatosGan.tsx";
import { TabClienteGan } from "./pedido/TabClienteGan.tsx";

export class FactoryVentasGanso extends FactoryVentasOlula {
    static menu = menuVentas;
    static metaPedido = metaPedidoGan;
    static pedido_maestro_configEstado = configEstadoPedidoGan;
    static PedidoTabDatos = TabDatosGan;
    static PedidoTabCliente = TabClienteGan;
    static PedidoCrear = CrearPedidoGan;
    static pedido_CrearLinea = CrearLineaGan;
}
