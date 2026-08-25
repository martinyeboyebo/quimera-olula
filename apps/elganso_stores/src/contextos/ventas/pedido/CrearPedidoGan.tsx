import { NuevoPedidoClienteNoRegistrado } from "#/ventas/pedido/diseño.ts";
import { getPedido, postPedido } from "#/ventas/pedido/infraestructura.ts";
import { nuevaVentaClienteNoRegistradaVacia } from "#/ventas/venta/dominio.ts";
import { QBoton } from "@olula/componentes/atomos/qboton.tsx";
import { EmitirEvento } from "@olula/lib/diseño.ts";
import { useForm } from "@olula/lib/useForm.js";
import { useCallback } from "react";

// En El Ganso una venta TPV no lleva cliente real: se crea siempre con este
// cliente de paso fijo, sin preguntar nada al usuario. Se parte del modelo
// "vacío" compartido, pero "ciudad" no puede quedar en "": payloadCambioCliente
// convierte cualquier campo vacío a null, y el backend exige que la ciudad de
// la dirección sea un string (aunque el resto de campos sí aceptan null).
const VENTA_PDA: NuevoPedidoClienteNoRegistrado = {
  ...nuevaVentaClienteNoRegistradaVacia,
  nombre_cliente: "Venta PDA",
  ciudad: "-",
};

export const CrearPedidoGan = ({
  publicar = async () => {},
}: {
  publicar?: EmitirEvento;
}) => {
  const guardar_ = useCallback(async () => {
    const id = await postPedido(VENTA_PDA);
    const pedidoCreado = await getPedido(id);
    publicar("pedido_creado", pedidoCreado);
  }, [publicar]);

  const cancelar_ = useCallback(() => {
    publicar("creacion_pedido_cancelada");
  }, [publicar]);

  const [guardar, cancelar] = useForm(guardar_, cancelar_);

  return (
    <div className="botones">
      <QBoton onClick={guardar}>Guardar</QBoton>
      <QBoton onClick={cancelar} variante="texto">
        Cancelar
      </QBoton>
    </div>
  );
};
