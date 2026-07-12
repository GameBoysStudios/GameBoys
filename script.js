// ==================== NAVEGACIÓN ====================
function navigateTo(page) {
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
        preview: "movies/MISIÓN_CASI_POSIBLE-TRAILER.mp4",
        full: "https://github.com/GameBoysStudios/GameBoys/releases/download/movie/MISION_CASI_POSIBLE.mp4"
    },
    {
        id: "misioncasiposible2",
        title: "Misión Casi Imposible: 2",
        description: "Tras escapar de la entidad y neutralizarla el comandante Yakolev y Kingsman se ven obligados a huir a San Francisco, el mundo se pone patas arriba y aparece una nueva entidad que no les pondra facil la supervivencia.",
        cover: "🔥",
        image: "movies/portada%20mision%20casi%20posible2.png",
        preview: "movies/MISIÓN_CASI_POSIBLE2-TRAILER.mp4",
        full: "movies/MISIÓN_CASI_POSIBLE2.mp4"
    }
];

function renderMovies() {
    const grid = document.getElementById('movieGrid');
    if (!grid) return;

    grid.innerHTML = '';

    movies.forEach(movieItem => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <div class="movie-cover">
                ${movieItem.image ? `<img src="${movieItem.image}" alt="${movieItem.title}">` : `<div class="cover-icon">${movieItem.cover}</div>`}
            </div>
            <div class="movie-content">
                <h3>${movieItem.title}</h3>
                <p class="movie-description">${movieItem.description}</p>
                <button class="btn btn-primary btn-full" onclick="openMoviePlayer('${movieItem.id}', false)">Ver Trailer</button>
                <button class="btn btn-outline btn-full" onclick="openMoviePlayer('${movieItem.id}', true)">Ver Completo</button>
            </div>
        `;
        grid.appendChild(card);
    });
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
    videoEl.src = url;
    videoEl.load();
    modal.style.display = 'flex';

    videoEl.play().catch(() => {});
}

function closeMoviePlayer() {
    const modal = document.getElementById('moviePlayerModal');
    const videoEl = document.getElementById('moviePlayer');

    if (modal) {
        modal.style.display = 'none';
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

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    renderComics();
    renderMovies();
    setupMoviePlayerProtection();
});
