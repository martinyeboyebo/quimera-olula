import { menuVentas } from "./menu.ts";
import { CambiarLineaBase } from "./pedido/cambiar_linea/CambiarLinea.tsx";
import { CrearPedidoBase } from "./pedido/crear/CrearPedido.tsx";
import { CrearLineaBase } from "./pedido/crear_linea/CrearLinea.tsx";
import { metaPedido } from "./pedido/detalle/detalle.ts";
import { DetallePedidoBase } from "./pedido/detalle/DetallePedido.tsx";
import { LineasListaBase } from "./pedido/detalle/lineas/LineasLista.tsx";
import { TabDatosBase as PedidoTabDatosBase } from "./pedido/detalle/TabDatos.tsx";
import { TabClienteBase as PedidoTabClienteBase } from "./pedido/detalle/TabCliente/TabCliente.tsx";
import { ventasPedidoInfra } from "./pedido/infraestructura.ts";
import { payloadPatchPedido, pedidoDesdeAPI } from "./pedido/infraestructura_base.ts";
import { configEstadoPedidoBase } from "./pedido/maestro/configEstado.ts";
import { getMetaTablaPedido } from "./pedido/maestro/metatabla_pedido.tsx";

export class FactoryVentasOlula {

    static pedido_detalle_lineas_LineasLista = LineasListaBase
    static pedido_DetallePedido = DetallePedidoBase
    static pedido_infraestructura = ventasPedidoInfra
    static pedido_CrearLinea = CrearLineaBase
    static pedido_CambiarLinea = CambiarLineaBase


    static PedidoTabDatos = PedidoTabDatosBase
    static PedidoTabCliente = PedidoTabClienteBase
    static PedidoCrear = CrearPedidoBase
    static pedidoDesdeAPI = pedidoDesdeAPI
    static metaTablaPedido = getMetaTablaPedido
    static api_payloadPatchPedido = payloadPatchPedido
    static metaPedido = metaPedido
    static pedido_maestro_configEstado = configEstadoPedidoBase
    static menu: Record<string, { icono?: string; url?: string; regla?: string }> = menuVentas
}
