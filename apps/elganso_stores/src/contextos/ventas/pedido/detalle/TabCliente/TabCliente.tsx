import { Cliente } from "#/ventas/comun/componentes/cliente.tsx";
import { formatearDireccionVenta } from "#/ventas/comun/dominio.ts";
import { BotonCambiar } from "#/ventas/comun/componentes/BotonCambiar.tsx";
import { CambioClienteVenta } from "#/ventas/comun/componentes/moleculas/CambioClienteVenta/CambioClienteVenta.tsx";
import { CambioCliente } from "#/ventas/comun/componentes/moleculas/CambioClienteVenta/diseño.ts";
import { QInput } from "@olula/componentes/atomos/qinput.tsx";
import { HookModelo } from "@olula/lib/useModelo.ts";
import { Pedido } from "../../diseño.ts";
import { EstadoPedido } from "../diseño.ts";
import "./TabCliente.css";

export interface TabClienteProps {
  pedido: HookModelo<Pedido>;
  estado: EstadoPedido;
  publicar?: (evento: string, payload?: unknown) => void;
}

// Además del cliente/dirección genéricos, una venta TPV de El Ganso trae
// email, teléfono y tarjeta de fidelización Gansociety (tal como se ve en
// la ficha de la comanda en Eneboo).
export const TabCliente = ({
  pedido,
  estado,
  publicar = async () => {},
}: TabClienteProps) => {
  const { modelo, editable: clienteEditable } = pedido;

  const onGuardarCambioCliente = async (cambios: CambioCliente) => {
    publicar("cambio_cliente_listo", cambios);
  };

  return (
    <div className="TabCliente">
      <quimera-formulario>
        <Cliente
          nombre="cliente_id"
          valor={modelo.cliente.cliente_id ?? ""}
          descripcion={modelo.cliente.nombre_cliente}
          deshabilitado={true}
        />
        <QInput
          nombre="id_fiscal"
          label="ID Fiscal"
          valor={modelo.cliente.id_fiscal}
          deshabilitado={true}
        />

        {clienteEditable && (
          <div className="TabCliente-accion">
            <BotonCambiar
              titulo="Cambiar cliente y dirección"
              onClick={() => publicar("cambio_cliente_solicitado")}
            />
          </div>
        )}

        <QInput
          deshabilitado={true}
          label="Dirección"
          nombre="direccion_cliente"
          valor={formatearDireccionVenta(modelo.cliente.direccion)}
        />
        <QInput
          deshabilitado={true}
          label="Teléfono"
          nombre="telefono"
          valor={modelo.cliente.direccion.telefono}
        />
        <QInput
          deshabilitado={true}
          label="Email"
          nombre="email"
          valor={modelo.email ?? ""}
        />
        <QInput
          deshabilitado={true}
          label="Tarjeta Gansociety"
          nombre="tarjeta_puntos_id"
          valor={modelo.tarjeta_puntos_id ?? ""}
        />
      </quimera-formulario>

      {clienteEditable && estado === "CAMBIANDO_CLIENTE" && (
        <CambioClienteVenta
          venta={pedido}
          onGuardar={onGuardarCambioCliente}
          onCancelar={() => publicar("cambio_cliente_cancelado")}
        />
      )}
    </div>
  );
};
