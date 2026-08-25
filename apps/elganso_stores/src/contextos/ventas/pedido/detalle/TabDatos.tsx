import { QDate } from "@olula/componentes/atomos/qdate.tsx";
import { QInput } from "@olula/componentes/atomos/qinput.tsx";
import { HookModelo } from "@olula/lib/useModelo.ts";
import { Pedido } from "../diseño.ts";
import "./TabDatos.css";

export interface TabDatosProps {
  pedido: HookModelo<Pedido>;
}

// En El Ganso (venta TPV) no existen fecha de salida, divisa (siempre EUR)
// ni comisión de agente de cabecera — son campos del modelo genérico de
// pedido sin equivalente real en tpv_comandas (confirmado contra Eneboo).
// El agente tampoco es editable: se queda el que creó la venta.
export const TabDatos = ({ pedido }: TabDatosProps) => {
  const { modelo, uiProps } = pedido;

  return (
    <div className="TabDatos">
      <quimera-formulario>
        <QDate label="Fecha" {...uiProps("fecha")} deshabilitado={true} />
        <QInput label="Hora" nombre="hora" valor={modelo.hora ?? ""} deshabilitado={true} />
        <QInput label="Almacén" nombre="almacen_id" valor={modelo.almacen_id ?? ""} deshabilitado={true} />
        <QInput label="Tienda" nombre="codtienda" valor={modelo.codtienda ?? ""} deshabilitado={true} />
        <QInput label="Punto de Venta" nombre="codtpv_puntoventa" valor={modelo.codtpv_puntoventa ?? ""} deshabilitado={true} />
        <QInput label="Código Agente" nombre="agente_id" valor={modelo.agente_id ?? ""} deshabilitado={true} />
        <QInput label="Agente" nombre="nombre_agente" valor={modelo.nombre_agente ?? ""} deshabilitado={true} />
      </quimera-formulario>
    </div>
  );
};
