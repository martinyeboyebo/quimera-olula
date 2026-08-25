import ApiUrls from "#/ventas/comun/urls.ts";
import { RestAPI } from "@olula/lib/api/rest_api.ts";

export type TallaArticulo = { talla: string; barcode: string };

export type TallasArticuloApi = {
  tallas: TallaArticulo[];
  codbarras: string | null;
};

export type ArticuloPorBarcodeApi = {
  referencia: string;
  descripcion: string;
  talla: string;
};

export const getTallasArticulo = (referencia: string) =>
  RestAPI.get<TallasArticuloApi>(`${new ApiUrls().ARTICULO}/${referencia}/talla`);

export const getArticuloPorBarcode = (barcode: string) =>
  RestAPI.get<ArticuloPorBarcodeApi>(
    `${new ApiUrls().ARTICULO}/por-barcode/${barcode}`
  );

export const postLineaGan = async (
  pedidoId: string,
  linea: { articuloId: string; barcode?: string; cantidad: number }
): Promise<string> => {
  const respuesta = await RestAPI.post<{ lineas: unknown[] }>(
    `${new ApiUrls().PEDIDO}/${pedidoId}/linea`,
    {
      lineas: [
        {
          articulo: {
            articulo_id: linea.articuloId,
            ...(linea.barcode ? { barcode: linea.barcode } : {}),
          },
          cantidad: linea.cantidad,
        },
      ],
    },
    "Error al crear linea de pedido"
  );
  const { ids } = respuesta as unknown as { ids: string[] };
  return ids[0];
};
