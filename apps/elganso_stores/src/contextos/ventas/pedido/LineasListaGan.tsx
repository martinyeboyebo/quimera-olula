import { EditarCantidadLinea } from "#/ventas/pedido/detalle/lineas/EditarCantidadLinea.tsx";
import {
  criteriaLineasDefecto,
  LineasListaProps,
} from "#/ventas/pedido/detalle/lineas/LineasLista.tsx";
import { TarjetaLinea } from "#/ventas/pedido/detalle/lineas/TarjetaLinea.tsx";
import { LineaPedido as Linea } from "#/ventas/pedido/diseño.ts";
import { LineaPedidoGan } from "./diseño.ts";
import { metaTablaLineaVentaResumida } from "#/ventas/venta/vistas/metatabla_linea_venta.tsx";
import { QInput } from "@olula/componentes/atomos/qinput.tsx";
import { ListadoSemiControlado } from "@olula/componentes/maestro/ListadoSemiControlado.tsx";
import { useEsMovil } from "@olula/componentes/maestro/useEsMovil.ts";
import { QuimeraAcciones } from "@olula/componentes/moleculas/qacciones.tsx";
import { ContextoError } from "@olula/lib/contexto.ts";
import { Criteria } from "@olula/lib/diseño.ts";
import { useContext, useState } from "react";
import { getArticuloPorBarcode, postLineaGan } from "./infraestructuraGan.ts";
import "./LineasListaGan.scss";

export const LineasListaGan = ({
  pedidoId,
  lineas,
  seleccionada,
  onCambioCantidad,
  pedidoEditable,
  cantidadEditable = false,
  divisa,
  acciones,
  publicar,
}: LineasListaProps) => {
  const esMovil = useEsMovil();
  const { intentar } = useContext(ContextoError);
  const [codigoEscaneado, setCodigoEscaneado] = useState("");

  const setSeleccionada = (linea: Linea) => {
    if (!pedidoEditable) return;
    publicar("linea_seleccionada", linea);
  };

  const escanear = async (valor: string) => {
    const barcode = valor.trim();
    if (!barcode || !pedidoId) return;

    await intentar(async () => {
      const lineaExistente = lineas.find(
        (linea) => (linea as LineaPedidoGan).barcode === barcode
      );

      if (lineaExistente) {
        onCambioCantidad?.(lineaExistente, lineaExistente.cantidad + 1);
      } else {
        const articulo = await getArticuloPorBarcode(barcode);
        await postLineaGan(pedidoId, {
          articuloId: articulo.referencia,
          barcode,
          cantidad: 1,
        });
        publicar("alta_linea_lista");
      }

      setCodigoEscaneado("");
    });
  };

  return (
    <ListadoSemiControlado
      metaTabla={metaTablaLineaVentaResumida<Linea>({
        divisa,
        renderCantidad:
          cantidadEditable && onCambioCantidad
            ? (linea) => (
                <EditarCantidadLinea
                  linea={linea}
                  onCantidadEditada={onCambioCantidad}
                />
              )
            : undefined,
      })}
      tarjeta={(linea) => (
        <TarjetaLinea
          linea={linea}
          cantidadEditable={cantidadEditable}
          onCambioCantidad={onCambioCantidad}
          divisa={divisa}
        />
      )}
      entidades={lineas}
      totalEntidades={lineas.length}
      seleccionada={lineas.find((linea) => linea.id === seleccionada) ?? null}
      onSeleccion={setSeleccionada}
      criteriaInicial={criteriaLineasDefecto}
      modoInicial={esMovil ? "tarjetas" : "tabla"}
      onCriteriaChanged={(_: Criteria) => null}
      renderAcciones={() =>
        pedidoEditable ? (
          <div className="botones maestro-botones LineasListaGan-botones">
            <QInput
              label="Escanear código de barras"
              nombre="escanear_barcode_linea_pedido"
              valor={codigoEscaneado}
              onChange={setCodigoEscaneado}
              onEnterKeyUp={escanear}
            />
            {acciones && acciones.length > 0 && (
              <QuimeraAcciones acciones={acciones} />
            )}
          </div>
        ) : null
      }
    />
  );
};
