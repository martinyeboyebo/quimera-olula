import { BotonCambiar } from "#/ventas/comun/componentes/BotonCambiar.tsx";
import { CamposDireccionVenta } from "#/ventas/comun/componentes/CamposDireccionVenta.tsx";
import { CambioCliente } from "#/ventas/comun/componentes/moleculas/CambioClienteVenta/diseño.ts";
import { metaCambioClienteNoRegistrado } from "#/ventas/comun/componentes/moleculas/CambioClienteVenta/dominio.ts";
import { QInput } from "@olula/componentes/atomos/qinput.tsx";
import { MetaModelo } from "@olula/lib/dominio.ts";
import { HookModelo, useModelo, UiProps } from "@olula/lib/useModelo.ts";
import { useMemo, useState } from "react";
import { CambiosDatosCliente, TarjetaPuntos } from "../../infraestructura.ts";
import { Pedido } from "../../diseño.ts";
import { BuscarTarjetaPuntos } from "./BuscarTarjetaPuntos.tsx";
import "./TabCliente.css";

const metaDatosCliente: MetaModelo<CambiosDatosCliente> = {
  campos: {
    email: { tipo: "texto" },
    tarjeta_puntos_id: { tipo: "texto" },
  },
};

export interface TabClienteProps {
  pedido: HookModelo<Pedido>;
  publicar?: (evento: string, payload?: unknown) => void;
}

// Venta TPV de El Ganso: no hay cliente registrado (siempre "Venta PDA"), así
// que se edita directamente el mismo formulario de "cliente no registrado"
// del CambioClienteVenta genérico, pero inline en el tab (sin modal) y con
// guardado automático al salir de cada campo, igual que el resto de tabs.
export const TabCliente = ({
  pedido,
  publicar = async () => {},
}: TabClienteProps) => {
  const { modelo, editable } = pedido;
  const { nombre_cliente, id_fiscal, direccion } = modelo.cliente;

  const cambioInicial = useMemo(
    (): CambioCliente => ({
      nombre_cliente: nombre_cliente ?? "",
      id_fiscal: id_fiscal ?? "",
      tipo_via: direccion?.tipo_via ?? "",
      nombre_via: direccion?.nombre_via ?? "",
      numero: direccion?.numero ?? "",
      otros: direccion?.otros ?? "",
      cod_postal: direccion?.cod_postal ?? "",
      ciudad: direccion?.ciudad ?? "",
      provincia: direccion?.provincia ?? "",
      pais_id: direccion?.pais_id ?? "",
      apartado: direccion?.apartado ?? "",
      telefono: direccion?.telefono ?? "",
    }),
    [
      nombre_cliente,
      id_fiscal,
      direccion?.tipo_via,
      direccion?.nombre_via,
      direccion?.numero,
      direccion?.otros,
      direccion?.cod_postal,
      direccion?.ciudad,
      direccion?.provincia,
      direccion?.pais_id,
      direccion?.apartado,
      direccion?.telefono,
    ]
  );

  const onGuardarCambioCliente = async (cambios: CambioCliente) => {
    await publicar("cambio_cliente_listo", cambios);
  };

  const { uiProps: uiPropsCliente } = useModelo(
    metaCambioClienteNoRegistrado,
    cambioInicial,
    onGuardarCambioCliente
  );

  // El formulario de cliente solo es editable mientras el pedido lo sea
  // (Cerrada/Anulada quedan bloqueadas, igual que el resto de campos).
  const uiProps = (campo: string, secundario?: string): UiProps => ({
    ...uiPropsCliente(campo, secundario),
    deshabilitado: !editable,
  });

  const datosClienteInicial = useMemo(
    (): CambiosDatosCliente => ({
      email: modelo.email ?? "",
      tarjeta_puntos_id: modelo.tarjeta_puntos_id ?? "",
    }),
    [modelo.email, modelo.tarjeta_puntos_id]
  );

  const onGuardarDatosCliente = async (cambios: CambiosDatosCliente) => {
    await publicar("datos_cliente_listo", cambios);
  };

  const { uiProps: uiPropsDatosCliente } = useModelo(
    metaDatosCliente,
    datosClienteInicial,
    onGuardarDatosCliente
  );

  const [buscandoTarjeta, setBuscandoTarjeta] = useState(false);

  const onSeleccionarTarjeta = async (tarjeta: TarjetaPuntos) => {
    setBuscandoTarjeta(false);
    await publicar("datos_cliente_listo", {
      email: datosClienteInicial.email,
      tarjeta_puntos_id: tarjeta.codtarjetapuntos,
    });
  };

  return (
    <div className="TabCliente">
      <quimera-formulario className="campos-direccion">
        <QInput label="Nombre del Cliente" {...uiProps("nombre_cliente")} />
        <QInput label="C.I.F/N.I.F" {...uiProps("id_fiscal")} />
        <CamposDireccionVenta uiProps={uiProps} />
      </quimera-formulario>

      <quimera-formulario>
        <QInput
          label="Email"
          {...uiPropsDatosCliente("email")}
          deshabilitado={!editable}
        />
        <QInput
          label="Tarjeta Gansociety"
          {...uiPropsDatosCliente("tarjeta_puntos_id")}
          deshabilitado={!editable}
        />
        {editable && (
          <div className="TabCliente-accion">
            <BotonCambiar
              titulo="Buscar tarjeta Gansociety"
              onClick={() => setBuscandoTarjeta(true)}
            />
          </div>
        )}
      </quimera-formulario>

      {buscandoTarjeta && (
        <BuscarTarjetaPuntos
          onSeleccionar={onSeleccionarTarjeta}
          onCerrar={() => setBuscandoTarjeta(false)}
        />
      )}
    </div>
  );
};
