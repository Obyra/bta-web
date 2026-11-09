# BTA · Business Transformation Associates S.L.

Sitio web estático de BTA España. Paleta, tipografía y textos tomados del brochure corporativo 2026.

- Páginas: Inicio, Servicios, Equipo, Presencia, Proyectos de Inversión, Base de Conocimientos, Portal de Inversionistas, Disclaimer y Contacto.
- Las páginas `.html` se generan con `node build.mjs` (cabecera y pie compartidos). Editar el contenido en `build.mjs` y volver a correrlo.
- Estilos en `css/styles.css`; menú móvil y formulario en `js/main.js`.
- El formulario de contacto abre el correo del visitante (sin servidor). Para recibir envíos directos hace falta un servicio de formularios.
