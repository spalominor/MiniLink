# [MiniLink 🔗](https://minilink-snowy-feather-6817.fly.dev/)

Minilink es una aplicación web que te permite acortar URLs de forma rápida y sencilla. Con Minilink, puedes convertir URLs largas en enlaces cortos que son más fáciles de compartir, recordar y almacenar.

## Funcionalidades

- Acortamiento de URLs: Minilink permite a los usuarios ingresar una URL larga y generar un enlace corto correspondiente.
- Copia fácil: Los enlaces cortos generados por Minilink pueden copiarse fácilmente al portapapeles con solo un clic.
- Seguimiento de URLs: Los usuarios pueden acceder a un panel de control para ver todas las URLs que han acortado y realizar un seguimiento de su uso.

## ¿Cómo funciona?

Minilink utiliza un algoritmo de acortamiento de URLs para generar enlaces cortos a partir de URLs largas. Cuando un usuario ingresa una URL en el sitio web de Minilink, el sistema genera automáticamente un código aleatorio único para esa URL. Este enlace corto redirige a la URL original cuando se hace clic en él.

# Tecnologías y Lenguajes de Programación Utilizados

- Astro: Un marco de trabajo para crear aplicaciones web modernas y de alto rendimiento utilizando componentes reutilizables y una sintaxis de estilo React.
- AstroDB: Una base de datos diseñada exclusivamente para Astro. Basada en libSQL (fork de SQLite también open source).
- React: Una biblioteca de JavaScript para construir interfaces de usuario interactivas y dinámicas.
- Sonner: Una biblioteca para manejar notificaciones en la aplicación web.
- TypeScript: Un superconjunto tipado de JavaScript que se compila a JavaScript estándar.
- OAuth de Google: Una API de Google para autenticar los usuarios con su cuenta de Google.
- HTML/CSS: Lenguajes estándar para la estructura y el estilo de las páginas web.

## ¿Qué hay en el repositorio?

- README.md: Este archivo README proporciona información básica sobre el proyecto y su funcionamiento.
- src/: Esta carpeta contiene el código fuente de la aplicación, incluidos los componentes de frontend y backend.
- components/: Reúne los scripts para la parte visual de la aplicación.
- ShorterURL.tsx: Este archivo contiene el componente de frontend para acortar URLs.
- ShorterURL.astro: Este archivo reúne el componente React y las otras funciones escritas en TypeScript para mostrarlas correctamente al usuario.
- Header.astro: Este archivo crea y reúne las funciones de la sesión y la base de datos para mostrar el estado de autenticación en el encabezado.
- /icons: Esta carpeta contiene dos iconos svg y su configuración para después mostrarlos en la aplicación
- /utils/db.ts: Este archivo contiene tres funciones esenciales para obtener información detallada y organizada de la base de datos.
- layouts/Layout.astro: Este archivo define la vista general de la aplicación.
- pages/: Esta carpeta contiene los archivos que manejan las vistas de cada pestaña.
- index.astro: Este archivo carga todos los componentes para ser mostrados en la vista principal/inicial de la aplicación.
- my-urls.astro: Este archivo establece la vista y la lógica para mostrar la pestaña/ruta de "/my-urls".
- [code].ts: Este archivo se encarga de hacer la redirección desde el link acortado al link original guardado en la base de datos.
- api/shorter-url.ts: Este archivo se encarga de generar y guardar el código único para cada URL que se va a acortar.
- db/: Esta carpeta contiene la configuración de la base de datos AstroDB.
- config.ts: Este archivo describe el esquema y la configuración de las tablas de la base de datos.
- seed.ts: Este archivo es autogenerado por AstroDB.
