import { QBoton } from "@olula/componentes/index.js";
import { EmitirEvento } from "@olula/lib/diseño.js";
import { formatearMoneda, plugin } from "@olula/lib/dominio.ts";
import { HookModelo } from "@olula/lib/useModelo.js";
import {
  DIVISA_EMPRESA,
  enDivisaExtranjera,
  mostrarImporte,
} from "#/ventas/venta/dominio.ts";
import { VentaTpv } from "../diseño.ts";
import "#/ventas/venta/vistas/TotalesVenta.css";
import "./TotalesVentaTpv.scss";

interface TotalesVentaTpvProps {
  modeloVenta: HookModelo<VentaTpv>;
  publicar: EmitirEvento;
}

// Réplica local de TotalesVenta (core) con Pagado/Pendiente añadidos en la
// misma caja: son datos propios de tpv_comandas, ya calculados por Eneboo,
// sin equivalente en el TotalesVenta genérico — y el usuario los quiere en
// la misma línea de totales, no en un bloque aparte.
export const TotalesVentaTpv = ({ modeloVenta, publicar }: TotalesVentaTpvProps) => {
  const venta = modeloVenta.modelo;
  const pluginDtoCabeceraVentaActivo =
    plugin("dto_cabecera_venta") === "activo";

  return (
    <div className="totales-venta">
      {modeloVenta.editable && pluginDtoCabeceraVentaActivo && (
        <div className="botones maestro-botones ">
          <QBoton onClick={() => publicar("descuento_solicitado", venta)}>
            Descuento
          </QBoton>
        </div>
      )}

      {venta.dtoPorcentual !== 0 && (
        <>
          <div className="totales-venta-item">
            <label>Neto s/dto:</label>
            <span>{formatearMoneda(venta.netoSinDto, venta.divisa_id)}</span>
          </div>
          <div className="totales-venta-item">
            <label>Dto. ({venta.dtoPorcentual}%):</label>
            <span>
              {formatearMoneda(venta.netoSinDto - venta.neto, venta.divisa_id)}
            </span>
          </div>
        </>
      )}
      <div className="totales-venta-item">
        <label>Neto:</label>
        <span>{formatearMoneda(venta.neto, venta.divisa_id)}</span>
      </div>
      <div className="totales-venta-item">
        <label>IVA:</label>
        <span>{formatearMoneda(venta.total_iva, venta.divisa_id)}</span>
      </div>
      {mostrarImporte(venta.total_recargo) && (
        <div className="totales-venta-item">
          <label>R. Equivalencia:</label>
          <span>{formatearMoneda(venta.total_recargo, venta.divisa_id)}</span>
        </div>
      )}
      {mostrarImporte(venta.total_irpf) && (
        <div className="totales-venta-item">
          <label>IRPF:</label>
          <span>{formatearMoneda(venta.total_irpf, venta.divisa_id)}</span>
        </div>
      )}
      <div className="totales-venta-item">
        <label>Total:</label>
        <span>{formatearMoneda(venta.total, venta.divisa_id)}</span>
      </div>
      {enDivisaExtranjera(venta) && (
        <div className="totales-venta-item totales-venta-item--divisa-empresa">
          <label>{`Total en ${DIVISA_EMPRESA}:`}</label>
          <span>
            {formatearMoneda(venta.total_divisa_empresa, DIVISA_EMPRESA)}
          </span>
        </div>
      )}
      <div className="totales-venta-item">
        <label>Pagado:</label>
        <span>{formatearMoneda(venta.pagado ?? 0, venta.divisa_id)}</span>
      </div>
      <div className="totales-venta-item">
        <label>Pendiente:</label>
        <span>{formatearMoneda(venta.pendiente ?? 0, venta.divisa_id)}</span>
      </div>
    </div>
  );
};
