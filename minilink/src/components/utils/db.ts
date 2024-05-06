// Importar las tablas y funciones necesarias de la base de datos
import { ShortenedUrl, User, db, eq, like } from "astro:db";



/**
 * Obtiene un usuario por su dirección de correo electrónico.
 * @param email La dirección de correo electrónico del usuario.
 * @returns Un objeto con el resultado de la operación.
 */
export const getUserByEmail = async (email: string) => {
  try {
    // Realiza una consulta a la base de datos para obtener el usuario 
    // con el correo electrónico proporcionado
    const res = await db.select().from(User).where(
      like(User.email, email)
    );

    // Si no se encuentra ningún usuario con el correo electrónico dado
    // retorna un objeto con éxito pero sin datos
    if (res.length === 0) {
      return {
        success: true,
        data: null
      };
    }

    // Retorna un objeto con éxito y los datos del primer usuario encontrado
    return {
      success: true,
      data: res[0]
    };
  } catch (e) {
    // Si ocurre un error durante la consulta a la base de datos
    //  maneja el error y retorna un objeto con el error
    const error = e as Error;
    return {
      success: false,
      error: error.message
    };
  }
};


/**
 * Obtiene la URL correspondiente a un código de URL acortada.
 * @param code El código de la URL acortada.
 * @returns Un objeto con el resultado de la operación.
 */
export const getLinkUrl = async (code: string) => {
  try {
    // Realiza una consulta a la base de datos para obtener 
    // la URL asociada al código de URL acortada proporcionado
    const res = await db.select().from(ShortenedUrl).where(
      like(ShortenedUrl.code, code)
    );

    // Si no se encuentra ninguna URL asociada al código proporcionado
    // retorna un objeto con éxito y sin datos
    if (res.length === 0) {
      return {
        success: true,
        data: null
      };
    }

    // Retorna un objeto con éxito y la URL asociada al código de URL 
    // acortada encontrado
    return {
      success: true,
      data: res[0].url
    };
  } catch (e) {
    // Si ocurre un error durante la consulta a la base de datos
    // maneja el error y retorna un objeto con el error
    const error = e as Error;
    return {
      success: false,
      error: error.message
    };
  } 
};


/**
 * Obtiene las URLs acortadas asociadas a un usuario.
 * @param userId El ID del usuario.
 * @returns Un objeto con el resultado de la operación.
 */
export const getUrlsFromUser = async (userId: number) => {
  try {
    // Realiza una consulta a la base de datos para obtener las URLs acortadas 
    // asociadas al usuario con el ID proporcionado
    const res = await db.select({
      url: ShortenedUrl.url,
      code: ShortenedUrl.code
    }).from(ShortenedUrl).where(
      eq(ShortenedUrl.userId, userId)
    );

    // Retorna un objeto con éxito y los datos de las URLs acortadas 
    // que están asociadas al usuario
    return {
      success: true,
      data: res
    };
  } catch (e) {
    // Si ocurre un error durante la consulta a la base de datos
    // maneja el error y retorna un objeto con el error
    const error = e as Error;
    return {
      success: false,
      error: error.message
    };
  }
};
