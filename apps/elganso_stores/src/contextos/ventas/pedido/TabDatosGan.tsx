import { Almacen } from "#/almacen/comun/componentes/Almacen.tsx";
import { Agente } from "#/ventas/comun/componentes/agente.tsx";
import { FormaPago } from "#/ventas/comun/componentes/formapago.tsx";
import { BotonCambiar } from "#/ventas/comun/componentes/BotonCambiar.tsx";
import { QDate } from "@olula/componentes/atomos/qdate.tsx";
import { TabDatosProps } from "#/ventas/pedido/detalle/TabDatos.tsx";

// En El Ganso (venta TPV) no existen fecha de salida, divisa (siempre EUR) ni
// comisión de agente de cabecera — son campos del modelo genérico de pedido
// sin equivalente real en tpv_comandas (confirmado contra el ERP legacy).
export const TabDatosGan = ({
  pedido,
  estado,
  publicar = () => {},
}: TabDatosProps) => {
  const { uiProps, editable } = pedido;
  const mostrarBotonCambiarAgente = estado === "ABIERTO" && editable;

  return (
    <div className="TabDatos">
      <quimera-formulario>
        <QDate label="Fecha" {...uiProps("fecha")} />
        <Almacen {...uiProps("almacen_id", "nombre_almacen")} />
        <Agente {...uiProps("agente_id", "nombre_agente")} />
        {mostrarBotonCambiarAgente && (
          <div className="TabDatos-accion TabDatos-accion--agente">
            <BotonCambiar
              titulo="Cambiar agente"
              onClick={() => publicar("cambio_agente_solicitado")}
            />
          </div>
        )}
        <FormaPago {...uiProps("forma_pago_id", "nombre_forma_pago")} />
      </quimera-formulario>
    </div>
  );
};
