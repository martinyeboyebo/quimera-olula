import { QBoton } from "@olula/componentes/atomos/qboton.tsx";
import { useMaquina } from "@olula/componentes/hook/useMaquina.js";
import { Listado } from "@olula/componentes/maestro/Listado.js";
import { MaestroDetalle } from "@olula/componentes/maestro/MaestroDetalle.tsx";
import { MetaFiltro } from "@olula/componentes/maestro/maestroFiltros/MaestroFiltrosActivoControlado.js";
import { QModal } from "@olula/componentes/moleculas/qmodal.tsx";
import { criteriaDefecto } from "@olula/lib/dominio.js";
import { listaActivaEntidadesInicial } from "@olula/lib/ListaActivaEntidades.js";
import { getUrlParams, useUrlParams } from "@olula/lib/url-params.js";
import { useEffect } from "react";
import {
  filtroAgente,
  filtroAlmacen,
  filtroCliente,
  filtroCodigo,
  filtroFechaDocumento,
} from "#/ventas/comun/filtros.tsx";
import { CrearPedido } from "../crear/CrearPedido.tsx";
import { DetallePedido } from "../detalle/DetallePedido.tsx";
import { Pedido } from "../diseño.ts";
import { TarjetaDocumentoVenta, EstadoDocumento } from "#/ventas/comun/componentes/TarjetaDocumentoVenta.tsx";
import { colorDeEstado, etiquetaEstado, opcionesEstado } from "./configEstado.tsx";
import { getMaquina } from "./maquina.ts";
import { getMetaTablaPedido } from "./metatabla_pedido.tsx";

const campoFiltroEstado: MetaFiltro = {
  servido: {
    id: "servido",
    label: etiquetaEstado,
    tipo: "multiseleccion",
    opciones: opcionesEstado,
    filtro: (valor) => {
      const elegidos = (valor as string[]) ?? [];
      if (elegidos.length === 0 || elegidos.length === opcionesEstado.length) return null;
      return ["servido", "in", elegidos as unknown as string];
    },
  },
};

export const MaestroConDetallePedido = () => {
  const { id, criteria } = getUrlParams();
  const criteriaInicial =
    criteria.filtro.length === 0
      ? { ...criteriaDefecto, filtro: [] }
      : criteria;

  const { ctx, emitir } = useMaquina(getMaquina, {
    estado: "INICIAL",
    pedidos: listaActivaEntidadesInicial<Pedido>(id, criteriaInicial),
    seleccionados: [],
  });

  useUrlParams(ctx.pedidos.activo, ctx.pedidos.criteria);

  useEffect(() => {
    emitir("recarga_de_pedidos_solicitada", ctx.pedidos.criteria);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const metaTablaPedido = getMetaTablaPedido();
  const metaFiltroPedido: MetaFiltro = {
    codigo: filtroCodigo,
    cliente_id: filtroCliente,
    agente_id: filtroAgente,
    fecha: filtroFechaDocumento,
    almacen_id: filtroAlmacen,
    ...campoFiltroEstado,
  };

  return (
    <div className="Pedido">
      <MaestroDetalle<Pedido>
        Maestro={
          <>
            <h2>Pedidos</h2>
            <Listado<Pedido>
              metaTabla={metaTablaPedido}
              metaFiltro={metaFiltroPedido}
              tarjeta={(pedido) => (
                <TarjetaDocumentoVenta
                  codigo={pedido.codigo}
                  nombreCliente={pedido.cliente.nombre_cliente}
                  fecha={pedido.fecha}
                  total={pedido.total}
                  divisa={pedido.divisa_id}
                  tasaConversion={pedido.tasa_conversion}
                  totalDivisaEmpresa={pedido.total_divisa_empresa}
                  estado={colorDeEstado(pedido.servido ?? "") as EstadoDocumento}
                />
              )}
              criteria={ctx.pedidos.criteria}
              entidades={ctx.pedidos.lista}
              totalEntidades={ctx.pedidos.total}
              seleccionada={ctx.pedidos.activo}
              seleccionadas={ctx.seleccionados}
              onMultiSeleccion={(ids) => emitir("seleccionados_cambiados", ids)}
              renderAcciones={() => (
                <div className="maestro-botones">
                  <QBoton onClick={() => emitir("crear_pedido_solicitado")}>
                    Nuevo Pedido
                  </QBoton>
                </div>
              )}
              onSeleccion={(payload) => emitir("pedido_seleccionado", payload)}
              onCriteriaChanged={(payload) =>
                emitir("criteria_cambiado", payload)
              }
              onSiguientePagina={(payload) =>
                emitir("siguiente_pagina", payload)
              }
            />
          </>
        }
        Detalle={<DetallePedido id={ctx.pedidos.activo} publicar={emitir} />}
        seleccionada={ctx.pedidos.activo}
      />

      <QModal
        nombre="altaPedido"
        abierto={ctx.estado === "CREANDO_PEDIDO"}
        titulo="Nuevo Pedido"
        onCerrar={() => emitir("creacion_pedido_cancelada")}
      >
        {ctx.estado === "CREANDO_PEDIDO" && <CrearPedido publicar={emitir} />}
      </QModal>
    </div>
  );
};
