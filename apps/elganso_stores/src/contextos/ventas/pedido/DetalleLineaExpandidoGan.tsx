import {
  desgloseLineaVenta,
  fiscalidadLineaVenta,
} from "#/ventas/comun/componentes/linea_venta_texto.ts";
import "./DetalleLineaExpandido.scss";
import { LineaPedidoGan } from "./diseño.ts";

// El barcode no cabe bien como columna más en la tabla (ya tiene muchos
// datos): se añade al desplegable de detalle que ya existe, junto al
// desglose e impuestos. Se replica el contenedor de DetalleLineaExpandido
// (mismas clases/CSS compartidos) en vez de anidarlo, porque su CSS solo
// da estilo a los campos que están directamente dentro de su propio div.
export const DetalleLineaExpandidoGan = ({
  linea,
  divisa,
}: {
  linea: LineaPedidoGan;
  divisa?: string;
}) => {
  const desglose = desgloseLineaVenta(linea, divisa);
  const fiscalidad = fiscalidadLineaVenta(linea, divisa);

  return (
    <div className="DetalleLineaExpandido">
      <div className="detalle-linea-row">
        <div className="detalle-linea-campo">
          <span className="detalle-linea-etiqueta">Talla</span>
          <span>{linea.talla || "—"}</span>
        </div>
        <div className="detalle-linea-campo">
          <span className="detalle-linea-etiqueta">Color</span>
          <span>{linea.color || "—"}</span>
        </div>
        <div className="detalle-linea-campo">
          <span className="detalle-linea-etiqueta">Código de barras</span>
          <span>{linea.barcode || "—"}</span>
        </div>
      </div>
      <div className="detalle-linea-row">
        <div className="detalle-linea-campo">
          <span className="detalle-linea-etiqueta">Desglose</span>
          <span>{desglose}</span>
        </div>
        <div className="detalle-linea-campo">
          <span className="detalle-linea-etiqueta">Impuestos y comisión</span>
          <span>{fiscalidad || "—"}</span>
        </div>
      </div>
    </div>
  );
};
