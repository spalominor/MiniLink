import type { APIRoute } from "astro"
import { ShortenedUrl, db, eq } from "astro:db"



export const POST: APIRoute = async ({ request }) => {
  // Verificar si la solicitud es de tipo JSON
  if (request.headers.get('content-type') !== 'application/json') {
    return new Response(null, { status: 400, statusText: 'Bad request' })
  }

  // Parsear el cuerpo de la solicitud JSON
  const body = await request.json()

  // Comprobar si la URL está presente en el cuerpo de la solicitud
  if (!body.url) {
    return new Response(null, { status: 400, statusText: 'Bad request' })
  }

  // Obtener la URL del cuerpo de la solicitud
  const url: string = body.url

  try {
    let idExists = true
    let id: string = ''

    // Generar un ID único y comprobar si ya existe en la base de datos
    do {
      const auxId = Math.random().toString(36).substring(2, 12)
  
      const idExistsReq = await db.select().from(ShortenedUrl).where(
        eq(ShortenedUrl.code, auxId)
      )
  
      if (idExistsReq.length === 0) {
        idExists = false
        id = auxId
  
        // Guardar la URL acortada en la base de datos
        try {
            await db.insert(ShortenedUrl).values({
                userId: body.userId ?? null,
                code: id,
                url: url
            })
        } catch (e) {
            const error = e as Error
            return new Response(null, 
                { status: 500, statusText: error.message })
        }
      }
    } while (idExists)

    // Construir la URL corta utilizando el origen de la solicitud y el ID
    const newUrl = new URL(request.url)
    const shortenedUrl = `${newUrl.origin}/${id}`

    // Retornar la URL corta en la respuesta HTTP
    return new Response(JSON.stringify({
      shortenedUrl: shortenedUrl
    }), {
      status: 201
    })
  } catch (e) {
    // Manejar errores internos del servidor
    const error = e as Error
    return new Response(null, { status: 500, statusText: error.message })
  }
}
