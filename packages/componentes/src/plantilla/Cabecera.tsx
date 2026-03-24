import { FactoryCtx } from "@olula/lib/factory_ctx.tsx";
import { useContext } from "react";
import { Link } from "react-router";
import { QIcono } from "../atomos/qicono.tsx";
import "./Cabecera.css";
import { estaAutentificado } from "./autenticacion";
import { useMenuControl } from "./useMenuControl";

export type CabeceraProps = Record<string, never>;

export const CabeceraBase = (_props?: CabeceraProps) => {
  const { app } = useContext(FactoryCtx);
  const { toggleMenu } = useMenuControl();
  const AccionesCabecera = app.Componentes
    ?.cabecera_acciones as () => React.ReactNode;
  const autenticado = estaAutentificado();

  return (
    <>
      <header>
        <button
          id="boton-menu-lateral"
          aria-label="Abrir menú lateral"
          onClick={() => toggleMenu("lateral")}
        ></button>

        <label htmlFor="boton-menu-lateral" id="etiqueta-menu-abierto" />
        <Link to="/">
          <img src="/olula_header_blanco.png" alt="Olula | Inicio" />
        </Link>
        <div id="cabecera-acciones-extra">
          {AccionesCabecera ? <AccionesCabecera /> : null}
        </div>
        {autenticado && (
          <>
            <button
              id="boton-menu-usuario"
              aria-label="Abrir menú usuario"
              onClick={() => toggleMenu("usuario")}
            ></button>
            <label
              htmlFor="boton-menu-usuario"
              id="etiqueta-menu-usuario-abierto"
            >
              <QIcono nombre="perfil" tamaño="sm" />
            </label>
          </>
        )}
      </header>
    </>
  );
};

export const Cabecera = (props?: CabeceraProps) => {
  const { app } = useContext(FactoryCtx);
  if (!app.Componentes?.Cabecera) {
    return null;
  }
  const Cabecera_ = app.Componentes.Cabecera as typeof CabeceraBase;

  return Cabecera_(props);
};
