const webex = window.Webex.init({});

async function init() {
  await webex.once('ready');
  const emailElem = document.getElementById('user-email');
  const menu = document.getElementById('menu-llamadas');

  try {
    const user = await webex.people.get('me');
    const email = user.emails[0];
    emailElem.textContent = `Hola, ${email}`;
    
    const configResp = await fetch('config.json');
    const config = await configResp.json();
    const opciones = config[email] || config['default'];

    opciones.forEach(op => {
      const opt = document.createElement('option');
      opt.value = op.destino;
      opt.textContent = op.nombre;
      menu.appendChild(opt);
    });

    menu.addEventListener('change', () => {
      const destino = menu.value;
      if (destino) {
        window.location.href = destino;
      }
    });

  } catch (error) {
    emailElem.textContent = "Error al cargar usuario";
    console.error("Error al inicializar Webex", error);
  }
}

init();