// Genera las páginas del sitio de BTA con la misma cabecera y pie.
// Uso: node build.mjs   (escribe los .html en esta carpeta)
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = dirname(fileURLToPath(import.meta.url));
const EMAIL = 'administration@bta-consulting.com';
const WEB = 'www.bta-consulting.com';

const MENU = [
  ['index.html', 'Inicio'],
  ['servicios.html', 'Servicios'],
  ['equipo.html', 'Equipo'],
  ['presencia.html', 'Presencia'],
  ['proyectos.html', 'Proyectos de Inversión'],
  ['conocimientos.html', 'Base de Conocimientos'],
  ['inversionistas.html', 'Portal de Inversionistas'],
  ['disclaimer.html', 'Disclaimer'],
  ['contacto.html', 'Contacto'],
];

const ICONOS = {
  diana: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
  llave: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  rayo: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  base: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
  personas: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  globo: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
};
const icono = (n) => `<svg class="icono" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONOS[n]}</svg>`;

const cabeceraPagina = (antetitulo, titulo, intro = '') => `
<section class="cabecera-pagina">
  <div class="contenedor">
    <p class="antetitulo">${antetitulo}</p>
    <h1>${titulo}</h1>
    ${intro ? `<p class="intro">${intro}</p>` : ''}
  </div>
</section>`;

const llamada = (titulo, texto, boton = 'Presentar un proyecto', destino = 'contacto.html') => `
<section class="seccion azul llamada">
  <div class="contenedor">
    <h2>${titulo}</h2>
    <p class="intro">${texto}</p>
    <div class="acciones"><a class="boton boton-oro" href="${destino}">${boton}</a></div>
  </div>
</section>`;

function plantilla({ archivo, titulo, descripcion, cuerpo }) {
  const enlaces = MENU.map(([href, txt]) =>
    `<li><a href="${href}"${href === archivo ? ' class="activo" aria-current="page"' : ''}>${txt}</a></li>`).join('\n        ');
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${titulo}</title>
  <meta name="description" content="${descripcion}">
  <meta property="og:title" content="${titulo}">
  <meta property="og:description" content="${descripcion}">
  <meta property="og:type" content="website">
  <link rel="icon" href="img/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
<a class="saltar" href="#contenido">Saltar al contenido</a>

<header class="cabecera">
  <div class="contenedor">
    <a class="marca" href="index.html" aria-label="BTA · Business Transformation Associates, inicio">
      <span class="marca-sello">BTA</span>
      <span class="marca-texto">Business Transformation<span>Associates S.L.</span></span>
    </a>
    <nav aria-label="Principal">
      <button class="hamburguesa" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú"><span></span><span></span><span></span></button>
      <ul class="menu" id="menu">
        ${enlaces}
      </ul>
    </nav>
  </div>
</header>

<main id="contenido">
${cuerpo}
</main>

<footer class="pie">
  <div class="contenedor">
    <div>
      <span class="marca-sello">BTA</span>
      <p style="margin-top:10px">Business Transformation Associates S.L.<br>Asesoría y estructuración financiera internacional<br>ECA · Deuda · Equity</p>
    </div>
    <div>
      <h4>España · Sede</h4>
      <ul>
        <li>Jávea, Alicante · España</li>
        <li>VAT B09657271 · CNAE 7022</li>
        <li><a href="mailto:${EMAIL}">${EMAIL}</a></li>
      </ul>
    </div>
    <div>
      <h4>Argentina · Representación</h4>
      <ul>
        <li>Brenda Priscila Koldobsky</li>
        <li>Gustavo Adrián Ochora</li>
        <li><a href="contacto.html">Escribir a Argentina</a></li>
      </ul>
    </div>
    <div class="pie-legal">
      <span>© <span id="anio">2026</span> Business Transformation Associates S.L. · <a href="disclaimer.html">Disclaimer, aviso legal y privacidad</a></span>
      <span class="oro">100% independiente · Base en España y UE</span>
    </div>
  </div>
</footer>
<script src="js/main.js"></script>
</body>
</html>
`;
}

/* ------------------------------------------------------------------ */
const paginas = [];

/* INICIO */
paginas.push({
  archivo: 'index.html',
  titulo: 'BTA · Asesoría y estructuración financiera internacional',
  descripcion: 'BTA diseña, estructura y cierra la financiación de proyectos de infraestructura, energía e industria con agencias de crédito a la exportación, deuda y equity.',
  cuerpo: `
<section class="portada">
  <div class="contenedor">
    <div>
      <div class="portada-logo" aria-hidden="true">BTA</div>
      <p class="portada-nombre">Business Transformation <span>Associates S.L.</span></p>
      <div class="linea-oro"></div>
      <h1>Asesoría y estructuración financiera internacional</h1>
      <p class="sub">ECA · Deuda · Equity para proyectos de infraestructura, energía e industria</p>
      <div class="ficha"><span>Jávea, Alicante · España</span><span>VAT B09657271 · CNAE 7022</span></div>
      <div class="acciones">
        <a class="boton boton-oro" href="contacto.html">Presentar un proyecto</a>
        <a class="boton boton-linea" href="servicios.html">Ver servicios</a>
      </div>
    </div>
    <div class="portada-sello" aria-hidden="true">
      <svg viewBox="0 0 340 340"><circle cx="170" cy="170" r="166" fill="none" stroke="#c9a240" stroke-width="2"/><circle cx="170" cy="170" r="106" fill="none" stroke="#c9a240" stroke-width="1" opacity=".7"/><text x="170" y="196" text-anchor="middle" font-family="'Source Serif 4',Georgia,serif" font-weight="700" font-size="74" letter-spacing="4" fill="#c9a240">BTA</text></svg>
    </div>
  </div>
</section>

<section class="seccion">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Quiénes somos</h2>
    <p class="intro">BTA es una firma independiente de <strong>asesoría y estructuración financiera</strong>. Diseñamos, estructuramos y cerramos la financiación de proyectos de infraestructura, energía e industria en mercados internacionales, combinando agencias de crédito a la exportación, deuda bancaria y multilateral, y equity.</p>
    <div class="rejilla r3">
      <div class="tarjeta"><h3>Estructuración ECA</h3><p>Financiación con agencias oficiales de crédito a la exportación</p></div>
      <div class="tarjeta"><h3>Proyectos EPC-F</h3><p>Obras llave en mano con la financiación incorporada</p></div>
      <div class="tarjeta"><h3>Capex y suministros</h3><p>Maquinaria, flotas, equipos y materiales con plazo</p></div>
      <div class="tarjeta verde"><h3>Deuda y multilaterales</h3><p>Banca comercial y bancos de desarrollo</p></div>
      <div class="tarjeta verde"><h3>Equity y coinversión</h3><p>Capital propio, anticipos y rotación de activos</p></div>
      <div class="tarjeta verde"><h3>Asesoría estratégica</h3><p>Planes de negocio bancables, due diligence y expansión</p></div>
    </div>
  </div>
</section>

<section class="seccion azul">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Acceso a la financiación oficial y privada de todo el mundo</h2>
    <div class="cifras">
      <div class="cifra"><b>85%</b><span>del contrato financiable con cobertura de agencias de crédito a la exportación</span></div>
      <div class="cifra"><b>70+</b><span>bancos, fondos y vehículos de financiación con los que trabajamos</span></div>
      <div class="cifra"><b>6</b><span>agencias de crédito a la exportación en Europa, Asia y América</span></div>
      <div class="cifra"><b>15</b><span>estructuras de operación entre ECA, deuda y equity</span></div>
    </div>
  </div>
</section>

<section class="seccion">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Tres vías de capital, una sola estructura</h2>
    <div class="vias">
      <div class="via"><b>85%</b><h3>ECA</h3><p>Agencias de crédito a la exportación: financian el contenido exportado de su país a largo plazo, con cobertura de riesgo político y comercial.</p></div>
      <div class="flecha" aria-hidden="true">→</div>
      <div class="via deuda"><b>+</b><h3>Deuda</h3><p>Banca comercial y multilateral para lo que la ECA no alcanza: costes locales, obra civil, préstamos puente y circulante.</p></div>
      <div class="flecha" aria-hidden="true">→</div>
      <div class="via equity"><b>15%</b><h3>Equity</h3><p>Capital propio y coinversión: el anticipo que exigen las ECAs, el equity de las multilaterales y la salida por venta del activo.</p></div>
    </div>
    <div class="banda-oro"><b>BTA</b><span>diseña y coordina las tres vías, del análisis de viabilidad al cierre financiero</span></div>
  </div>
</section>

<section class="seccion azul">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Por qué BTA</h2>
    <div class="rejilla r2">
      <div class="tarjeta lateral"><h3>Independencia total</h3><p>Sin ataduras a bancos, agencias ni contratistas: buscamos la mejor estructura para el cliente.</p></div>
      <div class="tarjeta lateral"><h3>Acceso a capital global</h3><p>Seis agencias de crédito a la exportación y más de 70 bancos, fondos y vehículos.</p></div>
      <div class="tarjeta lateral verde"><h3>Alineados con el éxito</h3><p>Honorarios ligados al cierre de la financiación.</p></div>
      <div class="tarjeta lateral verde"><h3>Experiencia senior</h3><p>Equipo con trayectoria directiva en financiación, industria y mercados internacionales.</p></div>
    </div>
    <div class="sellos"><span>100% independiente</span><span>ECA · Deuda · Equity</span><span>Alcance global</span><span>Base en España y UE</span></div>
  </div>
</section>
${llamada('¿Tiene un proyecto que necesita financiación?', 'Un único interlocutor coordina agencias de crédito a la exportación, bancos, bancos de desarrollo, inversores y contratistas. Cuéntenos el proyecto y le diremos qué estructura es viable.')}`,
});

/* SERVICIOS */
paginas.push({
  archivo: 'servicios.html',
  titulo: 'Servicios · BTA',
  descripcion: 'Estructuración EPC-F, capex y suministros, project finance con ECA, deuda bancaria y multilateral, equity, trade finance y asesoría estratégica.',
  cuerpo: `
${cabeceraPagina('Business Transformation Associates S.L.', 'Servicios financieros', 'Diseñamos la combinación de agencias de crédito a la exportación, deuda y equity que hace financiable cada proyecto, y la coordinamos hasta el cierre.')}

<section class="seccion sin-borde">
  <div class="contenedor">
    <div class="rejilla r3 sin-margen">
      <div class="tarjeta lateral">${icono('diana')}<h3>Estructuración EPC-F</h3><p>Proyectos llave en mano: contratista, ECA, banco y equity en un único paquete.</p></div>
      <div class="tarjeta lateral">${icono('llave')}<h3>Capex y suministros</h3><p>Crédito comprador y proveedor para maquinaria, flotas, equipos y materiales.</p></div>
      <div class="tarjeta lateral">${icono('rayo')}<h3>Project finance con ECA</h3><p>Financiación sin recurso a sociedades de proyecto con flujos propios.</p></div>
      <div class="tarjeta lateral verde">${icono('base')}<h3>Deuda bancaria y multilateral</h3><p>Préstamos corporativos, club deals y cofinanciación con bancos de desarrollo.</p></div>
      <div class="tarjeta lateral verde">${icono('personas')}<h3>Equity y coinversión</h3><p>Búsqueda de inversores, anticipos y rotación de activos operativos.</p></div>
      <div class="tarjeta lateral verde">${icono('globo')}<h3>Trade finance</h3><p>Cartas de crédito, forfaiting y seguro de crédito de corto plazo.</p></div>
    </div>
  </div>
</section>

<section class="seccion" id="capex">
  <div class="contenedor">
    <p class="antetitulo">Producto 1</p>
    <h2>Financiación de capex y suministros</h2>
    <div class="producto">
      <div class="caja-oro">
        <h3>Qué se financia</h3>
        <ul>
          <li>Maquinaria y líneas industriales</li>
          <li>Camiones, flotas y maquinaria de obra</li>
          <li>Acero, cemento y prefabricados</li>
          <li>Equipos agrícolas, riego y silos</li>
          <li>Equipamiento médico</li>
          <li>Paneles, inversores, baterías y turbinas</li>
          <li>Insumos y materias primas</li>
        </ul>
      </div>
      <dl class="lista-def">
        <div><dt>Crédito comprador</dt><dd>El banco presta al comprador y la ECA del país del fabricante asegura.</dd></div>
        <div><dt>Crédito proveedor</dt><dd>El fabricante da plazo y descuenta el cobro asegurado sin recurso.</dd></div>
        <div><dt>FIEM pymes</dt><dd>Crédito directo hasta 10 M€ para compras a proveedor español.</dd></div>
        <div><dt>Push Strategy</dt><dd>Línea de SACE a un gran comprador que compromete compras en Italia.</dd></div>
        <div><dt>Trade finance</dt><dd>Cartas de crédito y forfaiting para compras recurrentes.</dd></div>
      </dl>
    </div>
  </div>
</section>

<section class="seccion" id="epcf">
  <div class="contenedor">
    <p class="antetitulo">Producto 2</p>
    <h2>Proyectos llave en mano con EPC-F</h2>
    <div class="pasos cuatro">
      <div class="paso c-1"><div class="num">01</div><h3>Construye</h3><p>Contratista EPC: diseño, compras y obra.</p></div>
      <div class="paso"><div class="num">02</div><h3>Financia</h3><p>La ECA del contratista cubre hasta el 85%.</p></div>
      <div class="paso c-3"><div class="num">03</div><h3>Completa</h3><p>Anticipo y costes locales con deuda o equity.</p></div>
      <div class="paso final"><div class="num">04</div><h3>Entrega</h3><p>Obra terminada y financiada en un solo contrato.</p></div>
    </div>
    <div class="sectores-lista">
      <p class="antetitulo">Sectores</p>
      <p>Energía renovable · Redes eléctricas · Agua y saneamiento · Hospitales · Agroindustria · Carreteras y puentes · Ferrocarril · Puertos · Vivienda social · Industria · Minería</p>
    </div>
  </div>
</section>

<section class="seccion crema" id="agencias">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Agencias de crédito a la exportación</h2>
    <div class="tabla-envoltura">
      <table>
        <thead><tr><th>Agencia</th><th>País</th><th>Producto principal</th><th>Contenido exigido</th><th>Alcance</th></tr></thead>
        <tbody>
          <tr><td>CESCE</td><td>España</td><td>Seguro de crédito comprador y project finance</td><td>Español</td><td>Global</td></tr>
          <tr><td>FIEM</td><td>España</td><td>Crédito directo al comprador, hasta el 85%</td><td>Español</td><td>Global</td></tr>
          <tr><td>SACE · SIMEST</td><td>Italia</td><td>Garantía de crédito comprador y Push Strategy</td><td>Italiano</td><td>Global</td></tr>
          <tr><td>Sinosure</td><td>China</td><td>Seguro de crédito comprador hasta el 95%</td><td>≥60% chino</td><td>Global</td></tr>
          <tr><td>EXIM</td><td>EE. UU.</td><td>Préstamo directo, garantía y seguro</td><td>Estadounidense</td><td>Global</td></tr>
          <tr><td>Atradius DSB</td><td>P. Bajos</td><td>Seguro de crédito comprador y proveedor</td><td>Neerlandés</td><td>Global</td></tr>
        </tbody>
      </table>
    </div>
    <p class="nota">Cada agencia financia el contenido exportado de su país. Combinarlas permite cubrir contratos con proveedores de varios orígenes. Sinosure admite un 15% de contenido chino en obra civil.</p>
  </div>
</section>

<section class="seccion" id="estructuras">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Quince estructuras de operación</h2>
    <div class="rejilla r-estructuras">
      <div class="estructura"><h3>ECA · 8</h3><ul>
        <li>Crédito FIEM directo</li><li>FIEM + crédito comprador CESCE</li><li>Crédito comprador ECA</li><li>EPC-F con Sinosure</li>
        <li>Multi-ECA con varios orígenes</li><li>Push Strategy de SACE</li><li>Project finance con cobertura ECA</li><li>Crédito proveedor asegurado</li></ul></div>
      <div class="estructura verde"><h3>Deuda · 4</h3><ul>
        <li>Blending con fondos europeos</li><li>Préstamo de banco de desarrollo</li><li>ECA + banco de desarrollo</li><li>Banca comercial y club deal</li></ul></div>
      <div class="estructura blanca"><h3>Equity · 3</h3><ul>
        <li>Fondo junto al promotor</li><li>Equity de banco de desarrollo</li><li>Rotación del activo operativo</li></ul></div>
    </div>
    <p class="nota">Cada operación combina una estructura principal con la deuda y el equity que la completan.</p>
  </div>
</section>

<section class="seccion azul" id="asesoria">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Asesoría que hace el proyecto financiable</h2>
    <div class="rejilla r3">
      <div class="tarjeta verde"><h3>Plan de negocio bancable</h3><p>Modelo financiero, flujos de caja y cobertura de la deuda.</p></div>
      <div class="tarjeta verde"><h3>Due diligence</h3><p>Revisión técnica, financiera y contractual para financiadores.</p></div>
      <div class="tarjeta verde"><h3>Selección del contratista</h3><p>EPC con el contenido nacional que hace elegible la ECA.</p></div>
      <div class="tarjeta verde"><h3>Estrategia corporativa</h3><p>Visión, cartera de negocios y planificación de inversiones.</p></div>
      <div class="tarjeta verde"><h3>M&amp;A y alianzas</h3><p>Adquisiciones, UTEs y consorcios internacionales.</p></div>
      <div class="tarjeta verde"><h3>Expansión internacional</h3><p>Entrada en nuevos mercados y operaciones transfronterizas.</p></div>
    </div>
  </div>
</section>

<section class="seccion" id="proceso">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Del análisis al cierre financiero</h2>
    <div class="pasos cinco">
      <div class="paso"><div class="num">01</div><h3>Viabilidad</h3><p>Proyecto, promotor, país, contratista y origen del contenido.</p></div>
      <div class="paso"><div class="num">02</div><h3>Propuesta</h3><p>Estructura de ECA, deuda y equity y financiadores objetivo.</p></div>
      <div class="paso"><div class="num">03</div><h3>Mandato</h3><p>Formalización con honorarios ligados al éxito.</p></div>
      <div class="paso"><div class="num">04</div><h3>Estructuración</h3><p>Términos de la ECA, documentación y due diligence.</p></div>
      <div class="paso final"><div class="num">05</div><h3>Cierre</h3><p>Firma del crédito, anticipo y primeros desembolsos.</p></div>
    </div>
    <p class="nota">Un único interlocutor coordina agencias de crédito a la exportación, bancos, bancos de desarrollo, inversores y contratistas.</p>
  </div>
</section>
${llamada('Hablemos de su operación', 'Le proponemos la estructura de ECA, deuda y equity adecuada y los financiadores objetivo para su proyecto.')}`,
});

/* EQUIPO */
paginas.push({
  archivo: 'equipo.html',
  titulo: 'Equipo · BTA',
  descripcion: 'Equipo directivo de BTA en España y Argentina.',
  cuerpo: `
${cabeceraPagina('Business Transformation Associates S.L.', 'Equipo', 'Equipo con trayectoria directiva en financiación, industria y mercados internacionales.')}

<section class="seccion azul">
  <div class="contenedor">
    <p class="antetitulo">Dirección · España</p>
    <div class="rejilla r1 sin-margen">
      <article class="persona destacada">
        <div class="iniciales" aria-hidden="true">JIB</div>
        <div>
          <h3>José Ignacio Bermejo</h3>
          <p class="cargo">Presidente y Director · España</p>
          <p>Dirige la firma desde su sede en Jávea (Alicante). Coordina la relación con las agencias de crédito a la exportación, la banca comercial y multilateral y los inversores, y supervisa la estructuración de cada operación hasta el cierre financiero.</p>
          <p class="mail"><a href="mailto:${EMAIL}">${EMAIL}</a></p>
        </div>
      </article>
    </div>

    <p class="antetitulo" style="margin-top:60px">Directores asociados · Argentina</p>
    <div class="rejilla r2 sin-margen">
      <article class="persona verde">
        <div class="iniciales" aria-hidden="true">BPK</div>
        <div>
          <h3>Brenda Priscila Koldobsky</h3>
          <p class="cargo">Directora Asociada · Argentina</p>
          <p>Directora de BTA en Argentina. Acompaña a promotores y empresas argentinas en la preparación de sus proyectos para la financiación internacional.</p>
        </div>
      </article>
      <article class="persona verde">
        <div class="iniciales" aria-hidden="true">GAO</div>
        <div>
          <h3>Gustavo Adrián Ochora</h3>
          <p class="cargo">Director Asociado · Argentina</p>
          <p>Director comercial de BTA en Argentina. Identifica proyectos y empresas con necesidades de financiación y es su primer punto de contacto con la firma.</p>
        </div>
      </article>
    </div>
  </div>
</section>
${llamada('Un único interlocutor', 'Agencias de crédito a la exportación, bancos, bancos de desarrollo, inversores y contratistas coordinados por un mismo equipo.', 'Contactar con el equipo')}`,
});

/* PRESENCIA */
paginas.push({
  archivo: 'presencia.html',
  titulo: 'Presencia · BTA',
  descripcion: 'Sede en España, representación en Argentina y alcance global con foco en mercados emergentes.',
  cuerpo: `
${cabeceraPagina('Business Transformation Associates S.L.', 'Presencia', 'Base en España y la Unión Europea, representación en Argentina y operaciones en mercados emergentes de todo el mundo.')}

<section class="seccion sin-borde">
  <div class="contenedor">
    <div class="rejilla r2 sin-margen">
      <div class="oficina">
        <p class="pais">España</p>
        <p class="rol">Sede central</p>
        <p>Jávea, Alicante · España<br>VAT B09657271 · CNAE 7022<br><a href="mailto:${EMAIL}">${EMAIL}</a></p>
      </div>
      <div class="oficina verde">
        <p class="pais">Argentina</p>
        <p class="rol">Representación</p>
        <p>Brenda Priscila Koldobsky · Directora Asociada<br>Gustavo Adrián Ochora · Director Asociado<br><a href="contacto.html">Escribir a Argentina</a></p>
      </div>
    </div>
  </div>
</section>

<section class="seccion azul">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Alcance global, foco en mercados emergentes</h2>
    <div class="rejilla r3">
      <div class="region"><h3>Latinoamérica y Caribe</h3><p>Todas las ECAs y bancos de desarrollo regionales.</p></div>
      <div class="region"><h3>Balcanes y Europa del Este</h3><p>CESCE, FIEM y SACE; blending con fondos europeos.</p></div>
      <div class="region"><h3>Oriente Medio y Golfo</h3><p>SACE, Sinosure y EXIM con banca regional.</p></div>
      <div class="region"><h3>África</h3><p>Sinosure, SACE y bancos de desarrollo europeos.</p></div>
      <div class="region"><h3>Asia y Asia Central</h3><p>Sinosure con contratistas chinos y multilaterales.</p></div>
      <div class="region"><h3>Mediterráneo oriental</h3><p>CESCE, SACE y Atradius DSB con banca internacional.</p></div>
    </div>
    <p class="nota">La elegibilidad de cada país depende de la política de riesgo de cada agencia, del Consenso OCDE y de las sanciones vigentes.</p>
  </div>
</section>`,
});

/* PROYECTOS DE INVERSIÓN */
paginas.push({
  archivo: 'proyectos.html',
  titulo: 'Proyectos de Inversión · BTA',
  descripcion: 'Sectores en los que BTA estructura financiación y criterios para presentar un proyecto.',
  cuerpo: `
${cabeceraPagina('Business Transformation Associates S.L.', 'Proyectos de inversión', 'Estructuramos la financiación de proyectos de infraestructura, energía e industria. Estos son los sectores en los que trabajamos y lo que necesitamos para estudiar un proyecto.')}

<section class="seccion crema">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Sectores de actuación</h2>
    <div class="tabla-envoltura">
      <table>
        <thead><tr><th>Sector</th><th>Qué financiamos</th><th>Estructura habitual</th></tr></thead>
        <tbody>
          <tr><td>Energía renovable</td><td>Solar, eólica, hidroeléctrica y almacenamiento</td><td>EPC-F con ECA · project finance</td></tr>
          <tr><td>Redes y agua</td><td>Transmisión, subestaciones, desalación y depuración</td><td>Crédito comprador ECA · multilateral</td></tr>
          <tr><td>Transporte</td><td>Carreteras, puentes, ferrocarril y puertos</td><td>EPC-F · ECA + multilateral</td></tr>
          <tr><td>Salud y social</td><td>Hospitales llave en mano, equipamiento y vivienda</td><td>EPC-F con garantía soberana</td></tr>
          <tr><td>Agroindustria</td><td>Regadío, silos, procesado y maquinaria agrícola</td><td>Crédito comprador · multi-ECA</td></tr>
          <tr><td>Industria</td><td>Plantas, líneas de producción y bienes de equipo</td><td>Crédito comprador y proveedor</td></tr>
          <tr><td>Minería y recursos</td><td>Plantas de proceso e infraestructura asociada</td><td>EPC-F · equity estratégico</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="seccion crema borde-fino">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h2>Criterios de participación</h2>
    <div class="rejilla r3">
      <div class="criterio"><h3>Proyecto definido</h3><p>Promotor identificado, alcance técnico y calendario.</p></div>
      <div class="criterio"><h3>País elegible</h3><p>Con cobertura de al menos una agencia y sin sanciones.</p></div>
      <div class="criterio"><h3>Contenido exportable</h3><p>Contratista o equipos del país de la agencia.</p></div>
      <div class="criterio oro"><h3>Repago y garantías</h3><p>Garantía soberana, bancaria, corporativa o flujos del proyecto.</p></div>
      <div class="criterio oro"><h3>Aportación propia</h3><p>Capacidad de cubrir el anticipo y el equity exigido.</p></div>
      <div class="criterio oro"><h3>Compromiso de la dirección</h3><p>Interlocutor con poder de decisión y acceso a la información.</p></div>
    </div>
  </div>
</section>
${llamada('Presente su proyecto', 'Si su proyecto cumple estos criterios, envíenos una descripción breve: promotor, país, importe, contratista y origen de los equipos. Le respondemos con una primera lectura de viabilidad.')}`,
});

/* BASE DE CONOCIMIENTOS */
const glosario = [
  ['ECA', 'Agencia de crédito a la exportación. Organismo oficial que financia, asegura o garantiza la exportación de bienes y servicios de su país, a largo plazo y con cobertura de riesgo político y comercial.'],
  ['EPC-F', 'Engineering, Procurement, Construction & Finance. Contrato llave en mano en el que el contratista entrega la obra con la financiación ya incorporada.'],
  ['Crédito comprador', 'El banco presta al comprador extranjero y la ECA del país del fabricante asegura el préstamo.'],
  ['Crédito proveedor', 'El fabricante concede plazo de pago al comprador y descuenta el cobro asegurado sin recurso.'],
  ['Project finance', 'Financiación sin recurso a una sociedad de proyecto, cuyo repago depende de los flujos que genera el propio activo.'],
  ['CESCE', 'Agencia española de crédito a la exportación: seguro de crédito comprador y project finance para contenido español.'],
  ['FIEM', 'Fondo para la Internacionalización de la Empresa (España). Crédito directo al comprador hasta el 85%; FIEM pymes, hasta 10 M€ para compras a proveedor español.'],
  ['SACE · SIMEST', 'Agencias italianas: garantía de crédito comprador y Push Strategy, una línea a un gran comprador que se compromete a comprar en Italia.'],
  ['Sinosure', 'Agencia china: seguro de crédito comprador hasta el 95%, con al menos un 60% de contenido chino. Admite un 15% de contenido chino en obra civil.'],
  ['EXIM', 'Agencia de Estados Unidos: préstamo directo, garantía y seguro para contenido estadounidense.'],
  ['Atradius DSB', 'Agencia de los Países Bajos: seguro de crédito comprador y proveedor para contenido neerlandés.'],
  ['Multi-ECA', 'Combinación de varias agencias para cubrir un contrato con proveedores de distintos orígenes.'],
  ['Blending', 'Combinación de financiación de bancos de desarrollo o comercial con subvenciones o fondos europeos.'],
  ['Club deal', 'Préstamo que un grupo reducido de bancos concede de forma conjunta.'],
  ['Forfaiting', 'Compra sin recurso de cobros a plazo de una operación de comercio exterior.'],
  ['Consenso OCDE', 'Acuerdo entre países de la OCDE que fija plazos, primas y condiciones mínimas del crédito a la exportación con apoyo oficial.'],
  ['Anticipo', 'Pago inicial que exigen las ECAs, en general el 15% del contrato. Se cubre con fondos propios, deuda o equity.'],
  ['Rotación de activos', 'Venta de un activo ya en operación para recuperar el capital invertido y reinvertirlo.'],
];
paginas.push({
  archivo: 'conocimientos.html',
  titulo: 'Base de Conocimientos · BTA',
  descripcion: 'Glosario de financiación internacional: ECAs, EPC-F, crédito comprador, project finance y más.',
  cuerpo: `
${cabeceraPagina('Business Transformation Associates S.L.', 'Base de conocimientos', 'Los términos que más se repiten al financiar un proyecto con agencias de crédito a la exportación, deuda y equity.')}

<section class="seccion sin-borde">
  <div class="contenedor">
    <dl class="glosario">
      ${glosario.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('\n      ')}
    </dl>
    <p class="nota">Las referencias a estructuras, porcentajes, plazos y condiciones son orientativas. Cada agencia y entidad financiera fija sus propios términos tras analizar el proyecto, el prestatario y el país.</p>
  </div>
</section>`,
});

/* PORTAL DE INVERSIONISTAS */
paginas.push({
  archivo: 'inversionistas.html',
  titulo: 'Portal de Inversionistas · BTA',
  descripcion: 'Acceso para inversores, fondos y entidades financieras a las oportunidades que estructura BTA.',
  cuerpo: `
${cabeceraPagina('Business Transformation Associates S.L.', 'Portal de inversionistas', 'Oportunidades de coinversión y financiación en proyectos de infraestructura, energía e industria, para inversores, fondos y entidades financieras cualificados.')}

<section class="seccion sin-borde">
  <div class="contenedor">
    <div class="rejilla r3 sin-margen">
      <div class="tarjeta"><h3>Equity y coinversión</h3><p>Participación junto al promotor y entrada en proyectos con financiación ECA ya estructurada.</p></div>
      <div class="tarjeta"><h3>Deuda y cofinanciación</h3><p>Tramos de deuda comercial, club deals y cofinanciación con bancos de desarrollo.</p></div>
      <div class="tarjeta"><h3>Rotación de activos</h3><p>Activos operativos disponibles para su adquisición una vez en funcionamiento.</p></div>
    </div>
  </div>
</section>

<section class="seccion azul">
  <div class="contenedor acceso">
    <div>
      <p class="antetitulo">Acceso restringido</p>
      <h2>Información solo para destinatarios cualificados</h2>
      <p class="intro">La documentación de cada operación es confidencial. Damos acceso a inversores y entidades identificados, previa firma de un acuerdo de confidencialidad.</p>
    </div>
    <ol class="pasos-acceso">
      <li><b>01</b>Solicite el acceso indicando su entidad y el tipo de inversión que le interesa.</li>
      <li><b>02</b>Firmamos un acuerdo de confidencialidad.</li>
      <li><b>03</b>Le enviamos la documentación de las operaciones que encajan con su perfil.</li>
    </ol>
    <div class="acciones"><a class="boton boton-oro" href="contacto.html?tipo=inversor">Solicitar acceso</a></div>
  </div>
</section>`,
});

/* DISCLAIMER */
paginas.push({
  archivo: 'disclaimer.html',
  titulo: 'Disclaimer y aviso legal · BTA',
  descripcion: 'Aviso legal, confidencialidad y política de privacidad de Business Transformation Associates S.L.',
  cuerpo: `
<section class="legal">
  <div class="contenedor">
    <p class="antetitulo">Business Transformation Associates S.L.</p>
    <h1>Disclaimer, aviso legal y privacidad</h1>

    <h2>Disclaimer</h2>
    <div class="bloque">
      <p>La información contenida en este sitio es estrictamente confidencial y está dirigida exclusivamente a destinatarios cualificados. Queda prohibido divulgarla, reproducirla o utilizarla sin la autorización expresa de Business Transformation Associates S.L.</p>
      <p>Las referencias a estructuras de financiación, porcentajes, plazos y condiciones son orientativas. La aprobación y los términos de cada operación dependen exclusivamente de las agencias de crédito a la exportación, entidades financieras e inversores, y de su análisis de cada proyecto, prestatario y país.</p>
      <p>Business Transformation Associates S.L. no asume responsabilidad por las decisiones adoptadas en base a este sitio, que no constituye una oferta vinculante de financiación ni un compromiso contractual de ningún tipo.</p>
    </div>

    <h2>Aviso legal</h2>
    <p>En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se informa de los datos del titular de este sitio:</p>
    <ul>
      <li>Titular: Business Transformation Associates S.L.</li>
      <li>NIF / VAT: B09657271</li>
      <li>Actividad: CNAE 7022, otras actividades de consultoría de gestión empresarial</li>
      <li>Domicilio: Jávea, Alicante, España</li>
      <li>Correo electrónico: <a href="mailto:${EMAIL}">${EMAIL}</a></li>
      <li>Datos registrales: <span class="pendiente">[pendiente: Registro Mercantil, tomo, folio y hoja]</span></li>
    </ul>

    <h2>Privacidad</h2>
    <p>Responsable del tratamiento: Business Transformation Associates S.L. Los datos que nos envíe a través del correo electrónico o del formulario de contacto se usarán solo para responder a su consulta y, en su caso, estudiar su proyecto. No se ceden a terceros salvo obligación legal o cuando, con su consentimiento, sea necesario compartirlos con entidades financieras para estudiar la operación.</p>
    <p>Base legal: su consentimiento y la aplicación de medidas precontractuales a petición suya (art. 6 del Reglamento General de Protección de Datos). Conservamos los datos mientras dure la relación y los plazos legales que correspondan.</p>
    <p>Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <a href="mailto:${EMAIL}">${EMAIL}</a>, y presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).</p>

    <h2>Cookies</h2>
    <p>Este sitio no utiliza cookies propias ni de analítica o publicidad. Las tipografías se cargan desde Google Fonts, que puede registrar la dirección IP del visitante.</p>
  </div>
</section>`,
});

/* CONTACTO */
paginas.push({
  archivo: 'contacto.html',
  titulo: 'Contacto · BTA',
  descripcion: 'Contacte con BTA en España o en Argentina para estudiar la financiación de su proyecto.',
  cuerpo: `
${cabeceraPagina('Business Transformation Associates S.L.', 'Contacto', 'Cuéntenos su proyecto. Un único interlocutor coordina agencias de crédito a la exportación, bancos, bancos de desarrollo, inversores y contratistas.')}

<section class="seccion sin-borde">
  <div class="contenedor contacto sin-margen">
    <div class="datos">
      <dl>
        <div><dt>Correo</dt><dd><a href="mailto:${EMAIL}">${EMAIL}</a></dd></div>
        <div><dt>Web</dt><dd>${WEB}</dd></div>
        <div><dt>España · Sede</dt><dd>Jávea, Alicante · España<br>José Ignacio Bermejo · Presidente y Director</dd></div>
        <div><dt>Argentina · Representación</dt><dd>Brenda Priscila Koldobsky · Directora Asociada<br>Gustavo Adrián Ochora · Director Asociado</dd></div>
        <div><dt>Datos fiscales</dt><dd>VAT B09657271 · CNAE 7022</dd></div>
      </dl>
    </div>
    <form id="form-contacto" data-destino="${EMAIL}" novalidate>
      <div class="fila">
        <div class="campo"><label for="nombre">Nombre *</label><input id="nombre" name="nombre" required autocomplete="name"></div>
        <div class="campo"><label for="empresa">Empresa</label><input id="empresa" name="empresa" autocomplete="organization"></div>
      </div>
      <div class="fila">
        <div class="campo"><label for="email">Email *</label><input id="email" name="email" type="email" required autocomplete="email"></div>
        <div class="campo"><label for="telefono">Teléfono</label><input id="telefono" name="telefono" type="tel" autocomplete="tel"></div>
      </div>
      <div class="fila">
        <div class="campo"><label for="pais">País del proyecto</label><input id="pais" name="pais" autocomplete="country-name"></div>
        <div class="campo"><label for="tipo">Tipo de consulta *</label>
          <select id="tipo" name="tipo" required>
            <option>Financiación de un proyecto</option>
            <option>Capex y suministros</option>
            <option value="Inversor / entidad financiera">Inversor / entidad financiera</option>
            <option>Asesoría estratégica</option>
            <option>Otra consulta</option>
          </select></div>
      </div>
      <div class="campo"><label for="mensaje">Mensaje *</label><textarea id="mensaje" name="mensaje" required placeholder="Promotor, país, importe aproximado, contratista y origen de los equipos"></textarea></div>
      <label class="casilla"><input type="checkbox" name="acepto" required> <span>He leído la <a href="disclaimer.html">política de privacidad</a> y acepto que se usen mis datos para responder a la consulta.</span></label>
      <button class="boton boton-oro" type="submit">Enviar consulta</button>
      <p class="form-aviso">Al enviar se abrirá su programa de correo con el mensaje preparado. Si prefiere, escriba directamente a ${EMAIL}.</p>
    </form>
  </div>
</section>`,
});

for (const p of paginas) {
  writeFileSync(join(RAIZ, p.archivo), plantilla(p), 'utf8');
  console.log('escrita', p.archivo);
}
