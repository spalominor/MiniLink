import { useState } from 'react'



function validarURL(url: string): boolean {
    // Expresión regular para validar la URL
    const urlPattern: RegExp = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;

    // Verificar si la URL coincide con el patrón
    return urlPattern.test(url);
}


export default function ShorterURL() {
    const [url, setUrl] = useState<string>()
    const [error, setError] = useState<string>()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!url) {
            setError('Por favor, introduce una URL')
            return
        }

        if (!validarURL(url)) {
            setError('Por favor, introduce una URL válida')
            return
        }
        
        const res = await fetch('/api/shorter-url')
    }
    return (
        <form onSubmit={handleSubmit} id="shorter-url-form">
            {
                error && (
                    <span className="shorter-url-form-error">{error}</span>
                )
            }
            <input 
                className="shorter-url-form-input"
                type="url" 
                placeholder="Escribe aquí tu URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            
            <button
                className="shorter-url-form-button"
                type="submit"
                >
                Acortar
            </button>

            <input 
                className="shorter-url-form-input"
                disabled
                type="url" 
            />

        </form>
    )
}