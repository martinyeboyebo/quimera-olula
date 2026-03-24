import "@olula/componentes/menu/menu-usuario.css";

import { QIcono } from "@olula/componentes/atomos/qicono.tsx";
import { MenuUsuarioProps } from "@olula/componentes/menu/menu-usuario.tsx";
import {
  ElementoMenu,
  ElementoMenuPadre,
} from "@olula/componentes/menu/menu.ts";
import { estaAutentificado } from "@olula/componentes/plantilla/autenticacion.ts";
import { useMenuControl } from "@olula/componentes/plantilla/useMenuControl.ts";
import { puede } from "@olula/lib/dominio.ts";
import { Link } from "react-router";
import "./MenuUsuario.scss";

const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
const nombreUsuario = userData?.user?.user || "Usuario";

const elementosDelMenu = [
  {
    nombre: "Usuario",
    subelementos: [
      {
        nombre: nombreUsuario,
        url: "#",
        regla: "contexto.recibo_venta",
        icono: "usuario_relleno",
      },
    ],
  },
  {
    nombre: "Administración",
    subelementos: [
      {
        nombre: "Usuarios",
        url: "/auth/usuario",
        regla: "contexto.recibo_venta",
        icono: "grupo_relleno",
      },
      {
        nombre: "Grupos",
        url: "/auth/grupo",
        regla: "contexto.recibo_venta",
        icono: "grupo_relleno",
      },
    ],
  },
  {
    nombre: "Sesión",
    subelementos: [
      {
        nombre: "Cerrar sesión",
        url: "/logout",
        icono: "cerrar_sesion",
      },
    ],
  },
];

export const MenuUsuarioGan = (_props?: MenuUsuarioProps) => {
  const { menuAbierto, cerrarMenu } = useMenuControl();

  // No mostrar menú si no está autenticado
  if (!estaAutentificado()) {
    return null;
  }

  const renderizaElemento = (elemento: ElementoMenu) => {
    const icono = elemento.icono ? (
      <QIcono nombre={elemento.icono} tamaño="sm" />
    ) : null;

    if ("regla" in elemento && elemento.regla && !puede(elemento.regla)) {
      return null;
    }

    if ("url" in elemento && elemento.url) {
      return (
        <li key={elemento.nombre}>
          <Link to={elemento.url} onClick={() => cerrarMenu("usuario")}>
            {icono} {elemento.nombre}
          </Link>
        </li>
      );
    }

    const subelementos = (elemento as ElementoMenuPadre).subelementos
      .map((subelemento) => renderizaElemento(subelemento))
      .filter(Boolean);
    if (!subelementos.length) return null;

    return (
      <details key={elemento.nombre} open>
        <summary>
          {icono} {elemento.nombre}
        </summary>
        <hr />
        <ul>{subelementos}</ul>
      </details>
    );
  };

  const elementos = elementosDelMenu.map((elemento) =>
    renderizaElemento(elemento)
  );

  return (
    <menu-usuario className={menuAbierto.usuario ? "activo" : ""}>
      <aside id="menu-usuario">
        <nav>
          <ul>{elementos}</ul>
        </nav>
      </aside>
    </menu-usuario>
  );
};
