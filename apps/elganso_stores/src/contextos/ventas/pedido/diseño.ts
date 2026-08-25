import { Filtro, Orden, Paginacion, RespuestaLista } from "@olula/lib/diseño.ts";
import { ListaActivaEntidades } from "@olula/lib/ListaActivaEntidades.js";
import { AltaLineaVenta, CambioClienteVenta, ClienteVenta, LineaVenta, NuevaVenta, NuevaVentaClienteNoRegistrado, Venta } from "#/ventas/venta/diseño.ts";

// Venta TPV de El Ganso: además de los campos genéricos, trae email y
// tarjeta de fidelización Gansociety (ver ficha de comanda en Eneboo).
export interface Pedido extends Venta {
    cliente: ClienteVenta;
    servido: string;
    por_comision: number;
    fecha_salida: Date | null;
    almacen_id: string;
    nombre_almacen: string;
    lineas: LineaPedido[];
    email?: string;
    tarjeta_puntos_id?: string;
    hora?: string;
    codtienda?: string;
    codtpv_puntoventa?: string;
    pagado?: number;
    pendiente?: number;
}

// barcode/talla/color: código de barras real de la variante talla+color
// vendida y sus valores (tabla atributosarticulos). El barcode se usa para
// detectar re-escaneos del mismo artículo y sumar cantidad en vez de crear
// otra línea; talla/color son solo para mostrar.
export interface LineaPedido extends LineaVenta {
    otro_campo?: string;
    barcode?: string;
    talla?: string;
    color?: string;
}

export interface CambiosLineaPedido {
    descripcion: string,
    cantidad: number,
    pvp_unitario: number,
    dto_porcentual: number,
    dto_lineal: number,
    grupo_iva_producto_id: string,
    iva_incluido: boolean,
    tipo_irpf: number,
    por_comision: number,
}

export type NuevoPedido = NuevaVenta

export type NuevoPedidoClienteNoRegistrado = NuevaVentaClienteNoRegistrado

export type CambioClientePedido = CambioClienteVenta

export type NuevaLineaPedido = AltaLineaVenta;

export type GetPedidos = (filtro: Filtro, orden: Orden, paginacion: Paginacion) => RespuestaLista<Pedido>;

export type GetPedido = (id: string) => Promise<Pedido>;

export type GetLineasPedido = (id: string) => Promise<LineaPedido[]>;

export type PostPedido = (pedido: NuevoPedido | NuevoPedidoClienteNoRegistrado) => Promise<string>;

export type PostLinea = (id: string, linea: NuevaLineaPedido) => Promise<string>;

export type PatchClientePedido = (id: string, cambio: CambioClientePedido) => Promise<void>;

export type PatchLinea = (id: string, linea: LineaPedido) => Promise<void>;

export type PatchArticuloLinea = (id: string, lineaId: string, referencia: string) => Promise<void>;

export type PatchCantidadLinea = (id: string, linea: LineaPedido, cantidad: number) => Promise<void>;

export type DeleteLinea = (id: string, lineaId: string) => Promise<void>;

export type EstadoPedido = (
    'INICIAL' | 'ABIERTO' | 'SERVIDO'
    | 'BORRANDO_PEDIDO'
    | 'CAMBIANDO_DESCUENTO'
    | 'CREANDO_LINEA' | 'BORRANDO_LINEA' | 'CAMBIANDO_LINEA'
);

export type EstadoMaestroPedido = (
    'INICIAL' | 'CREANDO_PEDIDO'
);

export type ContextoPedido<T extends Pedido = Pedido> = {
    estado: EstadoPedido;
    pedido: T;
    pedidoInicial: T;
    lineaActiva: LineaPedido | null;
};

export type ContextoMaestroPedido = {
    estado: EstadoMaestroPedido;
    pedidos: ListaActivaEntidades<Pedido>;
    seleccionados: string[];
};
