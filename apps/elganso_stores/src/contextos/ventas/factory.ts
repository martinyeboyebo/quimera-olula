import { FactoryVentasOlula } from "#/ventas/factory.ts";
import { menuVentas } from "./menu.ts";

// El módulo de pedido ya no pasa por esta fábrica (ver
// apps/elganso_stores/src/router_factory.ts): tiene su propio componente
// completo en contextos/ventas/pedido/, sin slots inyectados.
export class FactoryVentasGanso extends FactoryVentasOlula {
    static menu = menuVentas;
}
