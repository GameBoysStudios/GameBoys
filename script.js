// ==================== NAVEGACIÓN ====================
function navigateTo(page) {
    // Restringir acceso a la sección Películas si no está autenticado
    if (page === 'movie') {
        const user = firebase.auth().currentUser;
        if (!user) {
            showMessage('Inicia sesión para acceder a Películas', 'error');
            navigateTo('auth');
            return;
        }
    }

    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// ==================== AUTENTICACIÓN FIREBASE ====================
auth.onAuthStateChanged((user) => {
    if (user) {
        showUserPanel(user);
    } else {
        hideUserPanel();
    }
});

function showUserPanel(user) {
    document.getElementById('userBadge').style.display = 'flex';
    document.getElementById('userEmail').textContent = user.email;
}

function hideUserPanel() {
    document.getElementById('userBadge').style.display = 'none';
}

// ==================== FUNCIONES DE LOGIN ====================
function toggleAuthForm() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
}

function showMessage(message, type) {
    const messageEl = document.getElementById('authMessage');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `auth-message ${type}`;
        messageEl.style.display = 'block';
        setTimeout(() => messageEl.style.display = 'none', 5000);
    }
}

function loginWithEmail() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (!email || !password) return showMessage('Completa todos los campos', 'error');
    
    auth.signInWithEmailAndPassword(email, password)
        .then(() => showMessage('¡Sesión iniciada!', 'success'))
        .catch(err => showMessage('Error: ' + err.message, 'error'));
}

function signupWithEmail() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupPasswordConfirm').value;
    
    if (password !== confirm) return showMessage('Las contraseñas no coinciden', 'error');
    if (password.length < 6) return showMessage('La contraseña debe tener al menos 6 caracteres', 'error');

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            showMessage('¡Cuenta creada!', 'success');
            setTimeout(() => toggleAuthForm(), 1500);
        })
        .catch(err => showMessage('Error: ' + err.message, 'error'));
}

function loginWithGoogle() {
    auth.signInWithPopup(googleProvider)
        .then(() => showMessage('Sesión con Google iniciada', 'success'))
        .catch(err => showMessage('Error: ' + err.message, 'error'));
}

function logout() {
    auth.signOut().then(() => showMessage('Sesión cerrada', 'success'));
}

// ==================== SISTEMA DE PELÍCULAS ====================
const movies = [
    {
        id: "misioncasiposible",
        title: "Misión Casi Imposible",
        description: "El comandante Yakolev Yak reune un equipo liderado por el mismisimo Kingsman para conseguir recuperar unos codigos nucleares perdidos en un pueblo revelde. Lo que no se esperan es que el pueblo les tiene una sorpresa preparada...",
        cover: "🔫",
        image: "movies/portada%20mision%20casi%20posible.png",
        completeImage: "movies/portada%20mision%20casi%20posible_completo.png",
        preview: "movies/MISIÓN_CASI_POSIBLE-TRAILER.mp4",
        full: "https://github.com/GameBoysStudios/GameBoys/releases/download/movie/MISION_CASI_POSIBLE.mp4"
        ,categories: ['películas']
        ,featured: true
        ,duration: '11:47 minutos'
        ,year: '2026'
        ,quality: '720P'
        ,age: '13+'
    },
    {
        id: "misioncasiposible2",
        title: "Misión Casi Imposible: 2",
        description: "Tras escapar de la entidad y neutralizarla el comandante Yakolev y Kingsman se ven obligados a huir a San Francisco, el mundo se pone patas arriba y aparece una nueva entidad que no les pondra facil la supervivencia.",
        cover: "🔥",
        image: "movies/portada%20mision%20casi%20posible2.png",
        completeImage: "movies/portada%20mision%20casi%20posible2_completo.png",
        preview: "movies/MISIÓN_CASI_POSIBLE2-TRAILER.mp4",
        full: "movies/MISIÓN_CASI_POSIBLE2.mp4"
        ,categories: ['películas']
        ,featured: false
        ,duration: 'No se ha anunciado aún'
        ,year: '2027'
        ,quality: '1080P'
        ,age: 'Edad desconocida'
    }
];

function renderMovies() {
    const grid = document.getElementById('movieGrid');
    if (!grid) return;

    grid.innerHTML = '';

    movies.forEach(movieItem => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.id = movieItem.id;
        card.addEventListener('click', () => openMovieDetail(movieItem.id));
        // Preferir la imagen "completa" si existe
        const posterSrc = movieItem.completeImage || movieItem.image || '';
        card.innerHTML = `
            <div class="movie-cover">
                ${posterSrc ? `<img src="${posterSrc}" alt="${movieItem.title}">` : `<div class="cover-icon">${movieItem.cover}</div>`}
            </div>
        `;
        grid.appendChild(card);
    });
}

// Renderizar el poster destacado (última película por defecto)
// featured poster removed — no renderFeaturedMovie function

// Rotador de posters en banner usando las imágenes definidas en `movies`
let posterRotatorIndex = 0;
function initPosterRotator(interval = 6000) {
    const imgEl = document.getElementById('bannerPoster');
    if (!imgEl) return;
    const posters = movies.map(m => m.image).filter(Boolean);
    if (posters.length === 0) {
        imgEl.src = '';
        return;
    }
    posterRotatorIndex = 0;
    imgEl.src = posters[posterRotatorIndex];
    setInterval(() => {
        posterRotatorIndex = (posterRotatorIndex + 1) % posters.length;
        imgEl.src = posters[posterRotatorIndex];
    }, interval);
}

// Abrir detalle tipo plataforma (muestra poster, título y botones para trailer/ver)
function openMovieDetail(id) {
    const selectedMovie = movies.find(m => m.id === id);
    if (!selectedMovie) return;
    const modal = document.getElementById('moviePlayerModal');
    const titleEl = document.getElementById('movieModalTitle');
    const subtitleEl = document.getElementById('movieModalSubtitle');
    // poster element removed — poster shown as modal background
    const videoEl = document.getElementById('moviePlayer');
    const trailerBtn = document.getElementById('modalTrailerBtn');
    const fullBtn = document.getElementById('modalFullBtn');

    if (!modal || !titleEl || !trailerBtn || !fullBtn) return;

    titleEl.textContent = selectedMovie.title;
    subtitleEl.textContent = 'Detalle';

    // Ocultar reproductor hasta que se pulse Trailer/Ver
    if (videoEl) videoEl.style.display = 'none';

    trailerBtn.onclick = () => openMoviePlayer(id, false);
    fullBtn.onclick = () => openMoviePlayer(id, true);

    // Poner descripción y badges (duración, año, calidad, edad)
    const descEl = document.getElementById('movieModalDescription');
    const badgesEl = document.getElementById('movieModalBadges');
    if (descEl) descEl.textContent = selectedMovie.description || '';
    if (badgesEl) {
        badgesEl.innerHTML = '';
        if (selectedMovie.duration) badgesEl.innerHTML += `<span class="detail-badge">Duración: ${selectedMovie.duration}</span>`;
        if (selectedMovie.year) badgesEl.innerHTML += `<span class="detail-badge">Año: ${selectedMovie.year}</span>`;
        if (selectedMovie.quality) badgesEl.innerHTML += `<span class="detail-badge">${selectedMovie.quality}</span>`;
        if (selectedMovie.age) badgesEl.innerHTML += `<span class="detail-badge">Edad: ${selectedMovie.age}</span>`;
    }

    // Usar el poster como fondo del modal (no el vídeo)
    const modalContent = document.querySelector('.movie-modal-content');
    const bgImg = selectedMovie.completeImage || selectedMovie.image || '';
    if (modalContent && bgImg) {
        modalContent.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bgImg}')`;
        modalContent.style.backgroundSize = 'cover';
        modalContent.style.backgroundPosition = 'center';
    } else if (modalContent) {
        modalContent.style.backgroundImage = '';
    }

    modal.style.display = 'flex';
}

// Menú de categorías (lista dinámica)
function openCategoryMenu(category, anchorEl) {
    // cerrar menú existente
    const existing = document.getElementById('categoryMenu');
    if (existing) existing.remove();

    const list = movies.filter(m => m.categories && m.categories.includes(category));
    const menu = document.createElement('div');
    menu.id = 'categoryMenu';
    menu.className = 'category-menu';
    menu.style.position = 'absolute';
    menu.style.background = '#07102a';
    menu.style.border = '1px solid rgba(255,255,255,0.06)';
    menu.style.padding = '8px';
    menu.style.borderRadius = '8px';
    menu.style.zIndex = 3000;

    if (list.length === 0) {
        menu.innerHTML = '<div class="cat-empty">No hay resultados</div>';
    } else {
        menu.innerHTML = '<ul class="cat-list">' + list.map(m => `<li><button class="cat-list-btn" onclick="(function(){navigateTo('movie'); setTimeout(()=>openMovieDetail('${m.id}'),150);})()">${m.title}</button></li>`).join('') + '</ul>';
    }

    document.body.appendChild(menu);

    // posicionar debajo del botón
    const rect = anchorEl.getBoundingClientRect();
    menu.style.left = rect.left + 'px';
    menu.style.top = (rect.bottom + window.scrollY + 8) + 'px';

    // cerrar al clicar fuera
    setTimeout(() => {
        function onDocClick(e) {
            if (!menu.contains(e.target) && e.target !== anchorEl) {
                menu.remove();
                document.removeEventListener('click', onDocClick);
            }
        }
        document.addEventListener('click', onDocClick);
    }, 50);
}

function openMoviePlayer(id, isFull) {
    const selectedMovie = movies.find(m => m.id === id);
    if (!selectedMovie) return;

    const user = firebase.auth().currentUser;
    let url = selectedMovie.preview || selectedMovie.full;

    if (isFull) {
        if (!user) {
            showMessage("Inicia sesión para ver la película completa", "error");
            return;
        }
        url = selectedMovie.full;
    }

    if (!url) {
        showMessage("Este contenido aún no está disponible", "error");
        return;
    }

    const modal = document.getElementById('moviePlayerModal');
    const titleEl = document.getElementById('movieModalTitle');
    const subtitleEl = document.getElementById('movieModalSubtitle');
    const videoEl = document.getElementById('moviePlayer');

    if (!modal || !titleEl || !subtitleEl || !videoEl) return;

    titleEl.textContent = selectedMovie.title;
    subtitleEl.textContent = isFull ? 'Película completa' : 'Trailer';

    // Poner poster como fondo del modal para mantener la estética solicitada
    const modalContent = document.querySelector('.movie-modal-content');
    if (modalContent && selectedMovie.image) {
        modalContent.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${selectedMovie.image}')`;
        modalContent.style.backgroundSize = 'cover';
        modalContent.style.backgroundPosition = 'center';
    }

    videoEl.src = url;
    videoEl.load();
    // Mostrar reproductor
    videoEl.style.display = 'block';
    modal.style.display = 'flex';

    videoEl.play().catch(() => {});
}

function closeMoviePlayer() {
    const modal = document.getElementById('moviePlayerModal');
    const videoEl = document.getElementById('moviePlayer');

    if (modal) {
        modal.style.display = 'none';
        const modalContent = document.querySelector('.movie-modal-content');
        if (modalContent) modalContent.style.backgroundImage = '';
    }

    if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute('src');
        videoEl.load();
    }
}

// ==================== SISTEMA DE CÓMICS ====================
const comics = [
    {
        id: "shango",
        title: "La leyenda del caballero Shango",
        description: "La historia de un chico de otro planeta. Una narrativa visual cautivadora que explora los misterios del límite.",
        cover: "📖",
        preview: "https://raw.githubusercontent.com/GameBoysStudios/GameBoys/main/comics/shango-preview.pdf",
        full: "comics/shango-full.pdf"
    },
    {
        id: "cactus1",
        title: "Cactus 1: El arbor de una aventura",
        description: "Una épica aventura en un desierto misterioso. Descubre secretos antiguos y enfrenta desafíos únicos.",
        cover: "🌵",
        preview: "comics/cactus1-preview.pdf",
        full: "comics/cactus1-full.pdf"
    }
];

function renderComics() {
    const grid = document.getElementById('comicsGrid');
    grid.innerHTML = '';

    comics.forEach(comic => {
        const card = document.createElement('div');
        card.className = 'comic-card';
        card.innerHTML = `
            <div class="comic-cover">
                <div class="cover-icon">${comic.cover}</div>
            </div>
            <div class="comic-content">
                <h3>${comic.title}</h3>
                <p class="comic-description">${comic.description}</p>
                <button class="btn btn-primary btn-full" onclick="readComic('${comic.id}', false)">Previsualizar</button>
                <button class="btn btn-outline btn-full" onclick="readComic('${comic.id}', true)">Leer Completo</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function readComic(id, isFull) {
    const comic = comics.find(c => c.id === id);
    if (!comic) return;

    const user = firebase.auth().currentUser;
    let url = comic.preview;

    if (isFull) {
        if (!user) {
            showMessage("Inicia sesión para leer la versión completa", "error");
            return;
        }
        url = comic.full;
    }

    window.open(url, '_blank');
}

function setupMoviePlayerProtection() {
    const videoEl = document.getElementById('moviePlayer');
    if (!videoEl) return;

    videoEl.addEventListener('contextmenu', (event) => event.preventDefault());
    videoEl.addEventListener('keydown', (event) => {
        const isSaveShortcut = (event.ctrlKey || event.metaKey) && (event.key === 's' || event.key === 'S' || event.key === 'p' || event.key === 'P');
        if (isSaveShortcut) event.preventDefault();
    });
}

// ==================== MENÚ CACTUS (GTA-V STYLE) ====================
function openCactusMenu() {
    const modal = document.getElementById('cactusMenuModal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    renderCactusTab('overview');
}

function closeCactusMenu() {
    const modal = document.getElementById('cactusMenuModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function switchCactusTab(e) {
    const btn = e.currentTarget;
    const tab = btn.dataset.tab;
    document.querySelectorAll('#cactusMenuModal .menu-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCactusTab(tab);
}

function renderCactusTab(tab) {
    const content = document.getElementById('cactusTabContent');
    if (!content) return;
    if (tab === 'overview') {
        content.innerHTML = `
            <h3>Overview</h3>
            <p>Un cactus, proveniente de un desierto misterioso, se embarca en una aventura épica llena de desafíos y descubrimientos, en el centro de Hong Kong.</p>
            <ul>
                <li>Historia cinematográfica</li>
                <li>Exploración abierta</li>
                <li>Diálogo interactivo</li>
            </ul>
        `;
    } else if (tab === 'trailers') {
        content.innerHTML = `
            <h3>Trailers</h3>
            <p>Disfruta del tráiler oficial y avances exclusivos.</p>
            <div class="video-wrapper-small">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/QJ0_A-3C3x8?si=UdZuWYpMO5Mxw8Rs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        `;
    } else if (tab === 'screenshots') {
        content.innerHTML = `
            <h3>Screenshots</h3>
            <div class="screenshot-grid">
                <div class="screenshot"> <img src="games/cactus/screen1.jpg" alt="Screenshot 1" onerror="this.style.display='none'"> </div>
                <div class="screenshot"> <img src="games/cactus/screen2.jpg" alt="Screenshot 2" onerror="this.style.display='none'"> </div>
                <div class="screenshot"> <img src="games/cactus/screen3.jpg" alt="Screenshot 3" onerror="this.style.display='none'"> </div>
            </div>
        `;
    } else if (tab === 'features') {
        content.innerHTML = `
            <h3>Features</h3>
            <ul>
                <li>Mundo abierto dinámico</li>
                <li>Sistema de clima y día/noche</li>
                <li>Combinación de sigilo y acción</li>
                <li>3 Actos diferentes</li>
                <li>Más de 20 niveles!</li>
            </ul>
        `;
    } else if (tab === 'preorder') {
        content.innerHTML = `
            <h3>Pre-order</h3>
            <p>Pre-order para acceder a contenido exclusivo y beta cerrada.</p>
            <p>NO DISPONIBLE (Por Ahora...)</p>
        `;
    } else {
        content.innerHTML = '';
    }
}

function preorderCactus() {
    const user = firebase.auth().currentUser;
    if (!user) {
        showMessage('Inicia sesión para pre-ordenar', 'error');
        return;
    }
    showMessage('Gracias — Te hemos inscrito para la pre-orden (simulado)', 'success');
}

function notifyCactus() {
    const user = firebase.auth().currentUser;
    if (!user) {
        showMessage('Inicia sesión para recibir notificaciones', 'error');
        return;
    }
    showMessage('Te notificaremos cuando haya novedades', 'success');
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    renderComics();
    renderMovies();
    initPosterRotator();
    setupMoviePlayerProtection();
    // cerrar menú con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCactusMenu();
    });
});