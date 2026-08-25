import { FormaPago } from "#/ventas/comun/componentes/formapago.tsx";
import { HookModelo } from "@olula/lib/useModelo.ts";
import { Pedido } from "../diseño.ts";
import "./TabPagos.css";

export interface TabPagosProps {
  pedido: HookModelo<Pedido>;
}

export const TabPagos = ({ pedido }: TabPagosProps) => {
  const { uiProps } = pedido;

  return (
    <div className="TabPagos">
      <quimera-formulario>
        <FormaPago {...uiProps("forma_pago_id", "nombre_forma_pago")} />
      </quimera-formulario>
    </div>
  );
};
