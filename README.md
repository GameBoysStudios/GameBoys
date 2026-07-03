# Verde Games Studio - Sitio Web Oficial

Una página web moderna y profesional para Verde Games Studio, mostrando sus videojuegos y cómics con autenticación mediante Firebase.

## 📋 Características

- ✅ **Multi-página responsive** con navegación fluida
- ✅ **Portafolio completo** de videojuegos y cómics
- ✅ **Autenticación Firebase** (Email/Google)
- ✅ **Diseño gaming moderno** con animaciones
- ✅ **Optimizado para móviles**
- ✅ **Fácil de personalizar**

## 🎮 Secciones Principales

1. **Inicio** - Página de bienvenida con destacados
2. **Juegos** - Catálogo de videojuegos
3. **Cómics** - Galería de cómics y novelas gráficas
4. **Sobre Nosotros** - Información de la empresa y equipo
5. **Comunidad** - Enlaces a redes sociales y comunidades
6. **Cuenta** - Sistema de login/signup con Firebase

## 🚀 Instalación Rápida

### Paso 1: Clonar o Descargar el Proyecto

```bash
git clone https://github.com/tunombre/verde-games-studio.git
cd verde-games-studio
```

### Paso 2: Abrir en Visual Studio Code

```bash
code .
```

### Paso 3: Instalar Live Server (Extensión VSCode)

1. Abre VSCode
2. Ve a Extensiones (Ctrl+Shift+X)
3. Busca "Live Server"
4. Instala la extensión de Ritwick Dey

### Paso 4: Ejecutar Localmente

1. Click derecho en `index.html`
2. Selecciona "Open with Live Server"
3. Tu navegador abrirá automáticamente en `http://localhost:5500`

## 🔥 Configurar Firebase

### Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Haz click en "Agregar Proyecto"
3. Completa el nombre del proyecto
4. Activa Google Analytics (opcional)
5. Haz click en "Crear Proyecto"

### Paso 2: Configurar Autenticación

1. En el menú izquierdo, ve a **Authentication**
2. Haz click en "Get Started"
3. En **Métodos de Autenticación**, habilita:
   - Email/Contraseña ✅
   - Google ✅

Para Google:
- Ve a **Configuración del Proyecto** (engranaje)
- En **Aplicaciones**, copia tus credenciales de Firebase
- Ve a **APIs y Servicios** en Google Cloud
- Configura la pantalla de consentimiento OAuth

### Paso 3: Obtener Credenciales

1. Ve a **Configuración del Proyecto** (engranaje arriba a la izquierda)
2. En la pestaña **General**, baja hasta **Tus aplicaciones**
3. Si no tienes una app web, haz click en "Web" (< />)
4. Copia el objeto `firebaseConfig`

### Paso 4: Actualizar archivo firebase-config.js

Abre `firebase-config.js` y reemplaza:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

Con tus valores reales de Firebase.

## 📤 Desplegar en GitHub Pages

### Opción 1: GitHub Pages Automático

1. **Crea un repositorio en GitHub**
   - Nombre: `verde-games-studio` (o el que prefieras)
   - Público

2. **Sube los archivos**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tunombre/verde-games-studio.git
   git push -u origin main
   ```

3. **Activa GitHub Pages**
   - Ve a **Settings** en tu repositorio
   - En el menú izquierdo, ve a **Pages**
   - En **Source**, selecciona **main** y **/(root)**
   - Haz click en **Save**

4. **Tu sitio estará en:**
   ```
   https://tunombre.github.io/verde-games-studio
   ```

### Opción 2: GitHub Pages con Rama gh-pages

```bash
# Crear rama gh-pages
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Init gh-pages"
git push -u origin gh-pages

# Volver a main
git checkout main

# En Settings > Pages, selecciona gh-pages como source
```

## 📝 Personalización

### Cambiar Colores

Edita las variables de color en `styles.css`:

```css
:root {
    --color-dark: #0a0e27;        /* Fondo oscuro */
    --color-cactus: #2ecb71;      /* Color principal verde */
    --color-orange: #ff6b35;      /* Color secundario */
    --color-light: #e8e8e8;       /* Texto claro */
}
```

### Cambiar Contenido

- **Juegos**: Edita la sección de `juegos-page` en `index.html`
- **Cómics**: Edita la sección de `comics-page` en `index.html`
- **Sobre Nosotros**: Edita la sección de `about-page` en `index.html`

### Cambiar Logo

Edita en `index.html` la sección `.logo`:

```html
<div class="logo" onclick="navigateTo('home')">
    <span class="cactus-icon">🌵</span>  <!-- Cambiar emoji -->
    <span class="logo-text">VERDE<br><small>GAMES</small></span>
</div>
```

## 📱 Estructura de Archivos

```
verde-games-studio/
├── index.html              # Página principal (HTML)
├── styles.css              # Estilos (CSS)
├── script.js               # Lógica de navegación y eventos
├── firebase-config.js      # Configuración de Firebase
├── README.md               # Este archivo
└── .gitignore             # Archivo para git
```

## 🔐 Seguridad

⚠️ **IMPORTANTE**: El archivo `firebase-config.js` contiene datos públicos de Firebase, pero:

1. Configura **Reglas de Seguridad en Firestore** si usas base de datos
2. Limita las claves API en Firebase Console
3. Usa **Autenticación de usuarios** para contenido sensible
4. No guardes secretos en archivos públicos

## 🐛 Solucionar Problemas

### Firebase no funciona
- ✓ Verifica que `firebase-config.js` tenga valores correctos
- ✓ Abre la consola del navegador (F12) para ver errores
- ✓ Comprueba que la autenticación está habilitada en Firebase

### GitHub Pages no muestra cambios
- ✓ Espera 2-3 minutos después de hacer push
- ✓ Limpia el caché del navegador (Ctrl+Shift+Del)
- ✓ Verifica que los archivos estén en main o gh-pages

### Problema CORS con APIs
- ✓ Firebase está optimizado para CORS
- ✓ Si usas otras APIs, configura CORS apropiadamente

## 📚 Recursos Útiles

- [Firebase Documentation](https://firebase.google.com/docs)
- [GitHub Pages Guide](https://pages.github.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)

## 💡 Tips Profesionales

1. **Backup regular**: Haz commits frecuentes a GitHub
2. **Testing**: Prueba en diferentes navegadores y dispositivos
3. **Mejora SEO**: Actualiza meta tags en `<head>`
4. **Analytics**: Añade Google Analytics (opcional)
5. **CDN**: Considera usar Cloudflare para mejor rendimiento

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo y modificarlo.

## 🤝 Contribuciones

¿Sugerencias o mejoras? ¡Crea un issue o haz un fork!

---

**Hecho con 💚 para Verde Games Studio**

¿Preguntas? Contacta a [tu-email@ejemplo.com]
