import { RouterFactoryVentasOlula } from "#/ventas/router_factory.ts";
import { crearRouter } from "@olula/lib/router.ts";
import { RouteObject } from "react-router";
import { RouterFactoryAuthOlula } from "./contextos/auth/router.ts";
import { MaestroConDetallePedido } from "./contextos/ventas/pedido/maestro/MaestroConDetallePedido.tsx";

// "ventas/pedido" ya no es el módulo genérico: El Ganso tiene su propio
// módulo completo de pedido (venta TPV), sin pasar por la fábrica de
// packages/contextos.
export class RouterFactoryVentasGanso extends RouterFactoryVentasOlula {
    static router = {
        ...RouterFactoryVentasOlula.router,
        "ventas/pedido": MaestroConDetallePedido,
    }
}

// export class RouterFactoryLegacy extends RouterFactoryOlula {
//     Inicio = undefined;
//     Crm = undefined;
// }
export class RouterFactoryLegacy {
    Ventas = RouterFactoryVentasGanso;
    Auth = RouterFactoryAuthOlula;
}

export const router = crearRouter(new RouterFactoryLegacy() as unknown as Record<string, { router: RouteObject }>);
