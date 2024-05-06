// Importar las funciones y componentes necesarios de React
import { useState, useRef } from 'react';

// Importar la función para mostrar notificaciones
import { toast } from 'sonner';



/**
 * Valida si una URL dada es válida.
 * @param url La URL a validar.
 * @returns True si la URL es válida, de lo contrario False.
 */
function validarURL(url: string): boolean {
    // Expresión regular para validar la URL
    const urlPattern: RegExp = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/

    // Verificar si la URL coincide con el patrón
    return urlPattern.test(url)
}

/**
 * Componente funcional para acortar una URL.
 * @param userId (Opcional) El ID del usuario que acorta la URL.
 * @returns Un formulario para acortar una URL.
 */
export default function ShorterURL({ userId }: { userId?: number }) {
    // Estado para almacenar la URL ingresada por el usuario
    const [url, setUrl] = useState<string>() 

    // Estado para almacenar mensajes de error
    const [error, setError] = useState<string>() 

    // Referencia al input donde se mostrará la URL acortada
    const shortenedUrlRef = useRef<HTMLInputElement>(null) 

    /**
     * Maneja el envío del formulario para acortar la URL.
     * @param e El evento del formulario.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        // Evita el comportamiento predeterminado del formulario
        e.preventDefault() 

        if (!url) {
            // Establece un mensaje de error si no se proporciona una URL
            setError('Por favor, introduce una URL'); 
            return;
        }

        if (!validarURL(url)) {
            // Establece un mensaje de error si la URL no es válida
            setError('Por favor, introduce una URL válida'); 
            return;
        }
        
        try {
            // Realiza una solicitud de tipo POST para acortar la URL y 
            // obtener la URL acortada en un objeto JSON
            const res = await fetch('/api/shorter-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    url: url,
                    userId: userId ?? null
                })
            })

            // Obtiene la respuesta de la solicitud
            const body = await res.json() 

            // Obtiene la URL acortada de la respuesta
            const shortenedUrl = body.shortenedUrl 

            // Verifica si se devolvió una URL acortada
            if (!shortenedUrl) {
                // Establece un mensaje de error si no se devuelve una URL
                setError('Error al acortar la URL') 
                return
            }

            // Asigna la URL acortada al input correspondiente
            shortenedUrlRef.current!.value = shortenedUrl 

            // Borra el mensaje de error si existe
            setError(undefined) 

        } catch (error) {
            // Maneja los errores de la solicitud
            console.log(error) 
        }
    }

    const handleCopy = () => {
        try {
            // Copia la URL acortada al portapapeles
            window.navigator.clipboard.writeText(shortenedUrlRef.current!.value) 

            // Muestra un mensaje de éxito
            toast.success('URL copiada al portapapeles') 
        } catch (error) {
            // Muestra un mensaje de error si falla la copia
            toast.error('Error al copiar la URL') 
        }
    }

    // Renderiza el formulario para acortar la URL
    return (
        <form onSubmit={handleSubmit} id="shorter-url-form">
            {error && (
                <span className="shorter-url-form-error">{error}</span>
            )}
            <input 
                className="shorter-url-form-input"
                type="url" 
                placeholder="Escribe aquí tu URL"
                defaultValue={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            
            <button
                className="shorter-url-form-button"
                type="submit"
            >
                Acortar
            </button>

            <input 
                ref={shortenedUrlRef}
                className="shorter-url-form-input"
                disabled
                type="url" 
            />

            <button
                onClick={handleCopy}
                className="shorter-url-form-copy-button"
                type="button"
            >
                Copiar URL
            </button>
        </form>
    );
}
