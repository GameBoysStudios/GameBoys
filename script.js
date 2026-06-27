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

// ==================== SISTEMA DE CÓMICS ====================
const comics = [
    {
        id: "shango",
        title: "La leyenda del caballero Shango",
        description: "La historia de un chico de otro planeta. Una narrativa visual cautivadora que explora los misterios del límite.",
        cover: "📖",
        preview: "comics/shango-preview.pdf",
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

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    renderComics();
});