import { IndicadorGuardado } from "#/ventas/comun/componentes/IndicadorGuardado.tsx";
import { CambiarAgente } from "#/ventas/comun/componentes/moleculas/CambiarAgente/CambiarAgente.tsx";
import { CambiarDescuento } from "#/ventas/comun/componentes/moleculas/CambiarDescuento/CambiarDescuento.tsx";
import "#/ventas/comun/estilos/campos.css";
import "#/ventas/comun/estilos/detalle_documento.css";
import { tituloDocumentoVenta } from "#/ventas/venta/dominio.ts";
import { TotalesVenta } from "#/ventas/venta/vistas/TotalesVenta.tsx";
import { Detalle } from "@olula/componentes/detalle/Detalle.tsx";
import { Tab, Tabs } from "@olula/componentes/detalle/tabs/Tabs.tsx";
import { useMaquina } from "@olula/componentes/hook/useMaquina.js";
import { QuimeraAcciones } from "@olula/componentes/index.js";
import { EmitirEvento } from "@olula/lib/diseño.ts";
import { useModelo } from "@olula/lib/useModelo.js";
import { useCallback, useEffect } from "react";
import { BorrarPedido } from "../borrar/BorrarPedido.tsx";
import { Pedido } from "../diseño.ts";
import { editable, pedidoVacio, metaPedido } from "./detalle.ts";
import "./DetallePedido.css";
import { Lineas } from "./lineas/Lineas.tsx";
import { getMaquina } from "./maquina.ts";
import { TabCliente } from "./TabCliente/TabCliente.tsx";
import { TabDatos } from "./TabDatos.tsx";
import { TabObservaciones } from "./TabObservaciones.tsx";

export type DetallePedidoProps = {
  id?: string;
  publicar: EmitirEvento;
};

export const DetallePedido = ({
  id,
  publicar = async () => {},
}: DetallePedidoProps) => {
  const { ctx, emitir } = useMaquina(
    getMaquina,
    {
      estado: "INICIAL",
      pedido: pedidoVacio(),
      pedidoInicial: pedidoVacio(),
      lineaActiva: null,
    },
    publicar
  );

  const autoGuardar = useCallback(
    async (modelo: Pedido) => {
      await emitir("edicion_de_pedido_lista", modelo);
    },
    [emitir]
  );

  const pedido = useModelo(metaPedido, ctx.pedido, autoGuardar);

  useEffect(() => {
    emitir("pedido_id_cambiado", id, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { estado, lineaActiva } = ctx;

  const titulo = (pedido: Pedido) =>
    tituloDocumentoVenta(pedido, "Nuevo Pedido");

  if (!ctx.pedido.id) return;

  const esEditable = editable(ctx.pedido);

  const acciones = [
    {
      icono: "eliminar",
      texto: "Borrar",
      advertencia: true,
      onClick: () => emitir("borrar_solicitado"),
      deshabilitado: !esEditable,
    },
  ];

  return (
    <Detalle
      id={ctx.pedido.id}
      obtenerTitulo={titulo}
      setEntidad={() => {}}
      entidad={ctx.pedido}
      cerrarDetalle={() => emitir("pedido_deseleccionado", null)}
    >
      <div className="fila-acciones-documento">
        <IndicadorGuardado
          modificado={pedido.modificado}
          error={pedido.errorGuardado}
          guardados={pedido.guardados}
        />
        <QuimeraAcciones acciones={acciones} vertical />
      </div>

      <Tabs>
        <Tab label="Cliente">
          <TabCliente pedido={pedido} estado={estado} publicar={emitir} />
        </Tab>

        <Tab label="Datos">
          <TabDatos pedido={pedido} estado={estado} publicar={emitir} />
        </Tab>

        <Tab label="Observaciones">
          <TabObservaciones pedido={pedido} />
        </Tab>
      </Tabs>

      <TotalesVenta modeloVenta={pedido} publicar={emitir} />

      {estado === "CAMBIANDO_DESCUENTO" && (
        <CambiarDescuento publicar={emitir} venta={ctx.pedido} />
      )}

      {estado === "CAMBIANDO_AGENTE" && (
        <CambiarAgente
          publicar={emitir}
          agenteId={ctx.pedido.agente_id}
          nombreAgente={ctx.pedido.nombre_agente}
          porComision={ctx.pedido.por_comision}
        />
      )}

      <Lineas
        pedido={ctx.pedido}
        lineaActiva={lineaActiva}
        publicar={emitir}
        estadoPedido={estado}
        pedidoEditable={esEditable}
      />

      {estado === "BORRANDO_PEDIDO" && (
        <BorrarPedido pedido={ctx.pedido} publicar={emitir} />
      )}
    </Detalle>
  );
};
