import { FormaPago } from "#/comun/componentes/formapago.tsx";
import { HookModelo } from "@olula/lib/useModelo.ts";
import { VentaTpv } from "../diseño.ts";
import "./TabPagos.scss";

export interface TabPagosProps {
  venta: HookModelo<VentaTpv>;
}

export const TabPagos = ({ venta }: TabPagosProps) => {
  const { uiProps } = venta;

  return (
    <div className="TabPagos">
      <quimera-formulario>
        <FormaPago {...uiProps("forma_pago_id", "nombre_forma_pago")} />
      </quimera-formulario>
    </div>
  );
};
