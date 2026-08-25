import { Almacen } from "#/almacen/comun/componentes/Almacen.tsx";
import { Agente } from "#/ventas/comun/componentes/agente.tsx";
import { FormaPago } from "#/ventas/comun/componentes/formapago.tsx";
import { BotonCambiar } from "#/ventas/comun/componentes/BotonCambiar.tsx";
import { QDate } from "@olula/componentes/atomos/qdate.tsx";
import { HookModelo } from "@olula/lib/useModelo.ts";
import { EstadoPedido, Pedido } from "../diseño.ts";
import "./TabDatos.css";

export interface TabDatosProps {
  pedido: HookModelo<Pedido>;
  estado?: EstadoPedido;
  publicar?: (evento: string, payload?: unknown) => void;
}

// En El Ganso (venta TPV) no existen fecha de salida, divisa (siempre EUR)
// ni comisión de agente de cabecera — son campos del modelo genérico de
// pedido sin equivalente real en tpv_comandas (confirmado contra Eneboo).
export const TabDatos = ({
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
