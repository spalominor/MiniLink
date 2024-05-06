// Importar los tipos necesarios para la ruta de la API
import type { APIRoute } from "astro";

// Importar las clases, funciones y tablas necesarias para la base de datos
import { ShortenedUrl, db, eq } from "astro:db";



/**
 * Ruta API para acortar una URL.
 * @param request La solicitud HTTP para acortar la URL.
 * @returns Una respuesta HTTP con la URL acortada.
 */
export const POST: APIRoute = async ({ request }) => {
  // Verificar si la solicitud es de tipo JSON
  if (request.headers.get('content-type') !== 'application/json') {
    return new Response(null, { status: 400, statusText: 'Bad request' });
  }

  // Parsear el cuerpo de la solicitud JSON
  const body = await request.json();

  // Comprobar si la URL está presente en el cuerpo de la solicitud
  if (!body.url) {
    return new Response(null, { status: 400, statusText: 'Bad request' });
  }

  // Obtener la URL del cuerpo de la solicitud
  const url: string = body.url;

  try {
    // Inicializar las variables para el ID único y la URL acortada
    let idExists = true;
    let id: string = '';

    // Generar un ID único y comprobar si ya existe en la base de datos
    do {
      // Generar un ID aleatorio
      const auxId = Math.random().toString(36).substring(2, 12);
      
      // Comprobar si el ID ya existe en la base de datos
      const idExistsReq = await db.select().from(ShortenedUrl).where(
        eq(ShortenedUrl.code, auxId)
      );
      
      // Si el ID no existe, asignarlo a la variable y salir del bucle
      if (idExistsReq.length === 0) {
        idExists = false;
        id = auxId;
  
        // Guardar la URL acortada en la base de datos
        try {
            await db.insert(ShortenedUrl).values({
                userId: body.userId ?? null,
                code: id,
                url: url
            });
        } catch (e) {
            // Manejar errores internos del servidor
            const error = e as Error;
            return new Response(null, 
                { status: 500, statusText: error.message });
        }
      }
    } while (idExists);

    // Construir la URL corta utilizando el origen de la solicitud y el ID
    const newUrl = new URL(request.url);
    const shortenedUrl = `${newUrl.origin}/${id}`;

    // Retornar la URL corta en la respuesta HTTP
    return new Response(JSON.stringify({
      shortenedUrl: shortenedUrl
    }), {
      status: 201
    });
  } catch (e) {
    // Manejar errores internos del servidor
    const error = e as Error;
    return new Response(null, { status: 500, statusText: error.message });
  }
};
