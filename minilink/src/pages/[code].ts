// Importar el tipo de ruta API y la función para obtener la URL original
import type { APIRoute } from "astro";
import { getLinkUrl } from "../components/utils/db";



/**
 * Ruta API para obtener la URL original a partir de un código de enlace.
 * @param params Los parámetros de la solicitud, que incluyen el código.
 * @returns Una respuesta HTTP con la URL original redirigida.
 */
export const GET: APIRoute = async ({ params }) => {
  // Obtiene el código de enlace desde los parámetros de la solicitud
  const { code } = params; 

  // Si no se proporciona un código de enlace, devuelve una respuesta de 
  // error 400 (Solicitud incorrecta)
  if (!code) {
    return new Response(null, {
      status: 400
    });
  }

  // Obtiene la URL original asociada con el código de enlace
  const url = await getLinkUrl(code);

  // Si no se puede obtener la URL original, devuelve una respuesta de 
  // error 500 (Error interno del servidor)
  if (!url.success) {
    return new Response(null, {
      status: 500
    });
  }

  // Si no se encuentra la URL original, devuelve una respuesta de error 404 
  // (No encontrado)
  if (!url.data) {
    return new Response(null, {
      status: 404
    });
  }

  // Redirige a la URL original utilizando una respuesta HTTP con el código 
  // de estado 307 (Redirección temporal)
  return new Response(null, {
    status: 307,
    headers: {
      'Location': url.data
    }
  });
};