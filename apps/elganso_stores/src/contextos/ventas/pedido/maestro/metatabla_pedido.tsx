import { ColumnaEstadoTabla } from "#/comun/componentes/ColumnaEstadoTabla.tsx";
import { MetaTabla } from "@olula/componentes/index.js";
import { Pedido } from "../diseño.ts";
import { colorDeEstado, iconosEstado } from "./configEstado.tsx";

export const getMetaTablaPedido = () => metaTablaPedido;

const ColumnaEstadoPedido = ({ pedido }: { pedido: Pedido }) => (
  <ColumnaEstadoTabla
    estados={iconosEstado}
    estadoActual={colorDeEstado(pedido.servido ?? "")}
  />
);

const metaTablaPedido: MetaTabla<Pedido> = [
  {
    id: "estado",
    cabecera: "",
    render: (pedido: Pedido) => <ColumnaEstadoPedido pedido={pedido} />,
  },
  {
    id: "codigo",
    cabecera: "Código",
    prioridad: "alta",
  },
  {
    id: "nombre_cliente",
    cabecera: "Cliente",
    prioridad: "alta",
    render: (p) => p.cliente.nombre_cliente,
  },
  {
    id: "fecha",
    cabecera: "Fecha",
    tipo: "fecha",
    prioridad: "alta",
  },
  {
    id: "total",
    cabecera: "Total",
    tipo: "moneda",
    prioridad: "alta",
    divisa: (pedido) => pedido.divisa_id,
  },
  {
    id: "nombre_agente",
    cabecera: "Agente",
    prioridad: "baja",
  },
  {
    id: "almacen_id",
    cabecera: "Almacén",
    prioridad: "baja",
    render: (p) => p.nombre_almacen || p.almacen_id,
  },
];
