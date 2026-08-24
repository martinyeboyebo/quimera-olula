import { ClausulaFiltro } from "@olula/lib/diseño.ts";
import { ReactElement } from "react";

export type ConfigEstadoPedido = {
  etiqueta: string;
  opciones: { valor: string; descripcion: string }[];
  filtroDefecto: ClausulaFiltro[] | null;
  colorDe: (servido: string) => string;
  esEditable: (servido: string) => boolean;
  iconos?: Record<string, ReactElement>;
};

const SERVIDO_NO = "No";
const SERVIDO_PARCIAL = "Parcial";
const SERVIDO_SI = "Sí";

export const configEstadoPedidoBase: ConfigEstadoPedido = {
  etiqueta: "Servido",
  opciones: [
    { valor: SERVIDO_NO, descripcion: "Pendiente" },
    { valor: SERVIDO_PARCIAL, descripcion: "Parcial" },
    { valor: SERVIDO_SI, descripcion: "Servido" },
  ],
  filtroDefecto: [["servido", "in", [SERVIDO_NO, SERVIDO_PARCIAL] as unknown as string]],
  colorDe: (servido) => {
    const valor = servido?.toUpperCase();
    if (valor === "TOTAL" || valor === "SERVIDO") return "cerrado";
    if (valor === "PARCIAL") return "parcial";
    return "pendiente";
  },
  esEditable: (servido) => {
    const valor = servido?.toUpperCase();
    return valor !== "TOTAL" && valor !== "SERVIDO";
  },
};
