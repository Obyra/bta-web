// Menú móvil
const boton = document.querySelector('.hamburguesa');
const menu = document.getElementById('menu');
if (boton && menu) {
  boton.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
    document.body.style.overflow = abierto ? 'hidden' : '';
  });
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      menu.classList.remove('abierto');
      boton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// Formulario: abre el correo del visitante con el mensaje armado.
// El sitio es estático y no guarda ningún dato.
const form = document.getElementById('form-contacto');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const destino = form.dataset.destino;
    const asunto = `Consulta web BTA · ${d.get('tipo')} · ${d.get('empresa') || d.get('nombre')}`;
    const cuerpo = [
      `Nombre: ${d.get('nombre')}`,
      `Empresa: ${d.get('empresa') || '-'}`,
      `Email: ${d.get('email')}`,
      `Teléfono: ${d.get('telefono') || '-'}`,
      `País del proyecto: ${d.get('pais') || '-'}`,
      `Tipo de consulta: ${d.get('tipo')}`,
      '',
      d.get('mensaje'),
    ].join('\n');
    window.location.href = `mailto:${destino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  });
}

const anio = document.getElementById('anio');
if (anio) anio.textContent = new Date().getFullYear();

// contacto.html?tipo=inversor preselecciona la opción de inversores
const tipo = document.getElementById('tipo');
if (tipo && new URLSearchParams(location.search).get('tipo') === 'inversor') {
  tipo.value = 'Inversor / entidad financiera';
}
