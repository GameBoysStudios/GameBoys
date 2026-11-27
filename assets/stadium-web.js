/* Stadium · utilidades compartidas (Firebase compat v9, igual que el resto del sitio) */
const SW = (() => {
  const db = firebase.firestore();
  const COL_GAMES = 'stadium_games';
  const COL_DEVICES = 'stadium_devices';
  const COL_USERS = 'users';

  const esc = (value) => String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const money = (eur) => {
    const n = Number(eur || 0);
    return n > 0 ? n.toFixed(2).replace('.', ',') + ' €' : 'Gratis';
  };

  function fmtDate(ts) {
    if (!ts) return '—';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function fmtDateTime(ts) {
    if (!ts) return 'nunca';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    if (Number.isNaN(date.getTime())) return 'nunca';
    return date.toLocaleString('es-ES', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
    });
  }

  const SETTINGS_LABELS = {
    language: 'Idioma',
    resolution: 'Resolución',
    volume: 'Volumen',
    cache: 'Caché de juegos',
    cacheSize: 'Caché',
    scale: 'Escala de interfaz',
    theme: 'Tema',
    wifi: 'Red',
    audioOutput: 'Salida de audio',
  };

  function settingsSummary(settings, max = 4) {
    const entries = Object.entries(settings || {})
      .filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value))
      .slice(0, max);
    if (!entries.length) return '';
    return entries.map(([key, value]) => {
      const label = SETTINGS_LABELS[key] || key;
      const shown = typeof value === 'boolean' ? (value ? 'sí' : 'no') : String(value);
      return `<span class="chip"><b>${esc(label)}</b> ${esc(shown)}</span>`;
    }).join('');
  }

  function statusBadge(status) {
    const map = {
      draft: ['badge-draft', 'Borrador'],
      review: ['badge-review', 'En revisión'],
      published: ['badge-published', 'Publicado'],
      rejected: ['badge-rejected', 'Rechazado'],
    };
    const [cls, label] = map[status] || ['badge-draft', status || '—'];
    return `<span class="badge ${cls}">${esc(label)}</span>`;
  }

  function toast(message, type = 'ok') {
    const el = document.createElement('div');
    el.className = 'toast' + (type === 'error' ? ' error' : '');
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4200);
  }

  function friendlyError(err) {
    const code = (err && err.code) || '';
    if (code === 'permission-denied') return 'Firestore ha rechazado la operación. Revisa las reglas publicadas.';
    if (code === 'not-found') return 'Esa consola no existe o todavía no se ha registrado.';
    if (code === 'unavailable') return 'Firestore no responde. Comprueba tu conexión.';
    if (code === 'failed-precondition') return 'Falta un índice en Firestore para esta consulta.';
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') return 'Email o contraseña incorrectos.';
    if (code === 'auth/email-already-in-use') return 'Ese email ya tiene cuenta: inicia sesión.';
    if (code === 'auth/weak-password') return 'La contraseña necesita al menos 6 caracteres.';
    if (code === 'auth/popup-closed-by-user') return 'Has cerrado la ventana de Google.';
    if (code === 'auth/operation-not-allowed') return 'Ese método de acceso no está activado en Firebase.';
    return (err && err.message) || 'Algo ha fallado.';
  }

  /* --- puerta de acceso ------------------------------------------------- */
  function mountGate(onUser, options = {}) {
    const gate = document.getElementById('gate');
    const app = document.getElementById('app');
    const subtitle = options.subtitle || 'Accede para gestionar tu Stadium.';

    gate.innerHTML = `
      <div class="card">
        <h1>${esc(options.title || 'STADIUM')}</h1>
        <p>${esc(subtitle)}</p>
        <button class="btn btn-google" id="swGoogle" style="width:100%">Continuar con Google</button>
        <div class="divider">o con email</div>
        <form id="swForm">
          <div class="field">
            <label for="swEmail">Email</label>
            <input id="swEmail" type="email" autocomplete="email" required>
          </div>
          <div class="field">
            <label for="swPass">Contraseña</label>
            <input id="swPass" type="password" autocomplete="current-password" minlength="6" required>
          </div>
          <div id="swError" class="note warn" style="display:none;margin-bottom:1rem"></div>
          <button class="btn btn-primary" id="swSubmit" style="width:100%">Entrar</button>
        </form>
        <p style="margin:1rem 0 0;font-size:.85rem">
          <a href="#" id="swToggle">No tengo cuenta · crear una</a>
        </p>
      </div>`;

    let register = false;
    const errorBox = gate.querySelector('#swError');
    const showError = (message) => {
      errorBox.textContent = message;
      errorBox.style.display = 'block';
    };

    gate.querySelector('#swGoogle').addEventListener('click', async () => {
      try {
        await auth.signInWithPopup(googleProvider);
      } catch (err) {
        showError(friendlyError(err));
      }
    });

    gate.querySelector('#swToggle').addEventListener('click', (event) => {
      event.preventDefault();
      register = !register;
      gate.querySelector('#swSubmit').textContent = register ? 'Crear cuenta' : 'Entrar';
      gate.querySelector('#swToggle').textContent = register
        ? 'Ya tengo cuenta · iniciar sesión'
        : 'No tengo cuenta · crear una';
      errorBox.style.display = 'none';
    });

    gate.querySelector('#swForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = gate.querySelector('#swEmail').value.trim();
      const password = gate.querySelector('#swPass').value;
      errorBox.style.display = 'none';
      try {
        if (register) {
          await auth.createUserWithEmailAndPassword(email, password);
        } else {
          await auth.signInWithEmailAndPassword(email, password);
        }
      } catch (err) {
        showError(friendlyError(err));
      }
    });

    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        gate.style.display = 'grid';
        app.style.display = 'none';
        return;
      }
      try {
        await onUser(user);
        gate.style.display = 'none';
        app.style.display = 'block';
      } catch (err) {
        showError(friendlyError(err));
      }
    });
  }

  function signOut() {
    return auth.signOut().then(() => location.reload());
  }

  function displayName(user) {
    return (user.displayName || (user.email || '').split('@')[0] || 'Desarrollador').slice(0, 60);
  }

  /* Garantiza que la cuenta puede publicar fichas (role user -> developer). */
  async function ensureDeveloper(user) {
    const ref = db.collection(COL_USERS).doc(user.uid);
    const snap = await ref.get();
    const data = snap.exists ? (snap.data() || {}) : {};
    const role = data.role || data.rol;
    if (role === 'admin' || role === 'developer') return role;
    await ref.set({
      role: 'developer',
      displayName: data.displayName || displayName(user),
      email: user.email || '',
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    return 'developer';
  }

  async function getUserRole(user) {
    const snap = await db.collection(COL_USERS).doc(user.uid).get();
    const data = snap.data() || {};
    return data.role || data.rol || 'user';
  }

  /* --- cabecera --------------------------------------------------------- */
  function header(user, title) {
    const name = displayName(user);
    return `
      <header class="gb-header">
        <a class="gb-brand" href="index.html" style="text-decoration:none;color:inherit">
          <span class="logo">🎮</span>
          <span class="name">GAME BOYS<small>${esc(title)}</small></span>
        </a>
        <span class="spacer"></span>
        <span class="who">${esc(user.email || name)}</span>
        <a class="btn btn-outline btn-sm" href="index.html">← Web</a>
        <button class="btn btn-outline btn-sm" id="swLogout">Salir</button>
      </header>`;
  }

  return { db, COL_GAMES, COL_DEVICES, COL_USERS, esc, money, fmtDate, fmtDateTime,
           settingsSummary, SETTINGS_LABELS, statusBadge, toast, friendlyError, mountGate,
           signOut, ensureDeveloper, getUserRole, displayName, header };
})();
