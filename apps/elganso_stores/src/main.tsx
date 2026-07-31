console.log("Elganso Stores - Vite config");

/* window.onerror = function (message, file, lineNumber, column, error) {
  return true;
}; //Para evitar que los errores de js bloqueen
*/

import { authMiddleware } from "#/auth/middlewares.ts";
import { Vista } from "@olula/componentes/vista/Vista.tsx";
import "@olula/lib/comun.css";
import { FactoryObj, FactoryProvider } from "@olula/lib/factory_ctx.tsx";
import { crearMenu, MenuContextFactory } from "@olula/lib/menu.ts";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router";

import { useTimerRefresco } from "#/auth/useTimerRefresco.ts";
import { FactoryLegacy } from "./factory.ts";
import { routerLegacy } from "./legacy.tsx";
import { router } from "./router_factory.ts";

const root = createRoot(document.getElementById("root")!);

const rutas = createBrowserRouter([
  {
    path: "/",
    middleware: [authMiddleware],
    Component: Vista,
    children: [...router, ...routerLegacy] as RouteObject[],
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
const App = () => {
  useTimerRefresco();

  FactoryObj.setMenu(
    crearMenu(
      new FactoryLegacy() as unknown as Record<string, MenuContextFactory>
    )
  );
  FactoryObj.setApp(
    new FactoryLegacy() as unknown as Record<string, Record<string, unknown>>
  );

  return <RouterProvider router={rutas} />;
};

root.render(
  // <StrictMode>
  <FactoryProvider>
    <App />
  </FactoryProvider>
  // </StrictMode>
);
