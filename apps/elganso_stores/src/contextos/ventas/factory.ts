import { FactoryVentasOlula } from "#/ventas/factory.ts";
import { menuVentas } from "./menu.ts";

export class FactoryVentasGanso extends FactoryVentasOlula {
    static menu = menuVentas;
}
