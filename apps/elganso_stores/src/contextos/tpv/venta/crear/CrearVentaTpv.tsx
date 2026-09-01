import { CambioCliente } from "#/ventas/comun/componentes/moleculas/CambioClienteVenta/diseño.ts";
import { getVenta, patchCambiarCliente, postVenta } from "../infraestructura.ts";
import { QBoton } from "@olula/componentes/atomos/qboton.tsx";
import { EmitirEvento } from "@olula/lib/diseño.ts";
import { useForm } from "@olula/lib/useForm.js";
import { useCallback } from "react";
import "./CrearVentaTpv.css";

// En El Ganso una venta TPV no lleva cliente real: se crea siempre con este
// cliente de paso fijo, sin preguntar nada al usuario. El endpoint de alta
// de tpv/venta no acepta cliente en la creación (solo agente_id/
// punto_venta_id, que además el backend resuelve por el usuario logueado),
// así que el cliente "Venta PDA" se fija en un segundo paso. "ciudad" no
// puede quedar en "": el backend exige que la ciudad de la dirección sea un
// string (aunque el resto de campos sí aceptan null).
const VENTA_PDA: CambioCliente = {
  nombre_cliente: "Venta PDA",
  ciudad: "-",
};

export const CrearVentaTpv = ({
  publicar = async () => {},
}: {
  publicar?: EmitirEvento;
}) => {
  const guardar_ = useCallback(async () => {
    const id = await postVenta({ agente_id: "", punto_venta_id: "" });
    await patchCambiarCliente(id, VENTA_PDA);
    const ventaCreada = await getVenta(id);
    publicar("venta_creada", ventaCreada);
  }, [publicar]);

  const cancelar_ = useCallback(() => {
    publicar("creacion_venta_cancelada");
  }, [publicar]);

  const [guardar, cancelar] = useForm(guardar_, cancelar_);

  return (
    <div className="CrearVentaTpv">
      <p className="CrearVentaTpv-texto">
        Vas a crear un nuevo pedido, ¿deseas continuar?
      </p>
      <div className="botones">
        <QBoton onClick={guardar}>Guardar</QBoton>
        <QBoton onClick={cancelar} variante="texto">
          Cancelar
        </QBoton>
      </div>
    </div>
  );
};
