# 🎨 Guía de Personalización

Esta guía te muestra cómo personalizar el sitio sin tocar mucho código.

## 🎮 Añadir un Nuevo Juego

### Paso 1: Abre `index.html`

Busca la sección `<!-- PÁGINA: JUEGOS -->` y encuentra `<div class="games-grid">`

### Paso 2: Copia una tarjeta de juego existente

```html
<div class="game-card">
    <div class="game-header cactus-theme">
        <div class="game-icon">🌵</div>
    </div>
    <div class="game-content">
        <h3>Cactus: The Videogame</h3>
        <p class="game-status">
            <span class="badge badge-soon">Próximamente</span>
        </p>
        <p class="game-description">
            Un viaje épico a través de un desierto misterioso...
        </p>
        <div class="game-details">
            <div class="detail-item">
                <span class="detail-label">Género:</span> Aventura/Acción
            </div>
            <div class="detail-item">
                <span class="detail-label">Plataforma:</span> PC (Steam)
            </div>
            <div class="detail-item">
                <span class="detail-label">Motor:</span> Unreal Engine 5
            </div>
        </div>
        <button class="btn btn-primary btn-full">Ver Más</button>
    </div>
</div>
```

### Paso 3: Personaliza los datos

**Cambios necesarios:**

1. **Cambiar tema de color de la tarjeta:**
   - `cactus-theme` → `mystery-theme` o `adventure-theme`

2. **Cambiar emoji:**
   - Reemplaza `🌵` por otro emoji

3. **Cambiar título:**
   - `Cactus: The Videogame` → Tu nombre de juego

4. **Cambiar estado:**
   - `badge-soon` → `badge-development` o `badge-coming`
   - Texto: `Próximamente` → `En Desarrollo` o `Anunciado`

5. **Cambiar descripción:** Reemplaza el texto

6. **Cambiar detalles:** Actualiza Género, Plataforma, Motor

### Ejemplo Completo: Nuevo Juego

```html
<div class="game-card">
    <div class="game-header adventure-theme">
        <div class="game-icon">🌊</div>
    </div>
    <div class="game-content">
        <h3>Ocean's Whisper</h3>
        <p class="game-status">
            <span class="badge badge-development">En Desarrollo</span>
        </p>
        <p class="game-description">
            Una aventura acuática donde explorarás misterios submarinos y desbloquearás poderes antiguos.
        </p>
        <div class="game-details">
            <div class="detail-item">
                <span class="detail-label">Género:</span> Aventura/Exploración
            </div>
            <div class="detail-item">
                <span class="detail-label">Plataforma:</span> PC, PlayStation, Xbox
            </div>
            <div class="detail-item">
                <span class="detail-label">Motor:</span> Unreal Engine 5
            </div>
        </div>
        <button class="btn btn-primary btn-full">Ver Más</button>
    </div>
</div>
```

## 📚 Añadir un Nuevo Cómic

### Paso 1: Busca la sección de Cómics

En `index.html`, busca `<!-- PÁGINA: CÓMICS -->`

### Paso 2: Copia una tarjeta de cómic

```html
<div class="comic-card">
    <div class="comic-cover">
        <div class="cover-icon">📖</div>
        <span class="comic-status">Disponible</span>
    </div>
    <div class="comic-content">
        <h3>El Legado del Desierto</h3>
        <p class="comic-author">Por Verde Games Studio</p>
        <p class="comic-description">
            La epopeya visual que inspiró nuestro videojuego más aclamado...
        </p>
        <div class="comic-details">
            <span class="detail-badge">5 Volúmenes</span>
            <span class="detail-badge">350+ Páginas</span>
            <span class="detail-badge">Color</span>
        </div>
        <button class="btn btn-primary btn-full">Leer Ahora</button>
        <a href="#" class="btn-text">Ver Previsualizaciones</a>
    </div>
</div>
```

### Paso 3: Personaliza

**Cambios:**

1. **Emoji**: Reemplaza `📖`
2. **Estado**: Cambia `Disponible` a `Próximamente`, `Nuevas Historias`, etc.
3. **Título**: Tu título de cómic
4. **Autor**: Nombre del autor
5. **Descripción**: Sinopsis del cómic
6. **Detalles**: Volúmenes, páginas, tipo (B&N o Color)
7. **Enlaces**: Actualiza "Leer Ahora" y "Ver Previsualizaciones"

### Ejemplo: Nuevo Cómic

```html
<div class="comic-card">
    <div class="comic-cover">
        <div class="cover-icon">⚡</div>
        <span class="comic-status">Nuevas Historias</span>
    </div>
    <div class="comic-content">
        <h3>Truenos de Acero</h3>
        <p class="comic-author">Por Verde Games Studio</p>
        <p class="comic-description">
            Una saga cyberpunk donde gobiernos corporativos controlan todo. Sigue a un grupo de hackers rebeldes
            que luchan por la libertad digital.
        </p>
        <div class="comic-details">
            <span class="detail-badge">2 Volúmenes</span>
            <span class="detail-badge">280+ Páginas</span>
            <span class="detail-badge">Color</span>
        </div>
        <button class="btn btn-primary btn-full">Leer Ahora</button>
        <a href="#" class="btn-text">Ver Previsualizaciones</a>
    </div>
</div>
```

## 🎨 Cambiar Colores del Sitio

### Opción 1: Cambiar Color Principal

En `styles.css`, busca:

```css
:root {
    --color-cactus: #2ecb71;  /* Verde actual */
}
```

Cambia `#2ecb71` a otro color. Ejemplos:

```css
--color-cactus: #00d9ff;    /* Azul cyan */
--color-cactus: #ff00ff;    /* Magenta */
--color-cactus: #00ff00;    /* Verde brillante */
--color-cactus: #ffff00;    /* Amarillo */
--color-cactus: #ff0080;    /* Rosa */
```

**Herramienta:** Usa [ColorPicker.com](https://www.colorpicker.com/) para obtener códigos hex.

### Opción 2: Cambiar Color Secundario

```css
--color-orange: #ff6b35;  /* Naranja actual */
```

Ejemplos:

```css
--color-orange: #00d9ff;   /* Azul */
--color-orange: #ff00ff;   /* Magenta */
--color-orange: #00ff00;   /* Verde */
```

### Opción 3: Cambiar Fondo Oscuro

```css
--color-dark: #0a0e27;     /* Fondo muy oscuro */
--color-darker: #050813;   /* Fondo aún más oscuro */
```

Puedes hacerlos más claros u oscuros según necesites.

## 🌍 Cambiar Enlaces y URLs

### Cambiar enlaces de redes sociales

En `index.html`, busca los links:

```html
<!-- Discord -->
<a href="https://discord.com" target="_blank">

<!-- Twitter -->
<a href="https://twitter.com" target="_blank">

<!-- YouTube -->
<a href="https://youtube.com" target="_blank">

<!-- Instagram (si lo quieres añadir) -->
<a href="https://instagram.com" target="_blank">
```

Reemplaza las URLs con las tuyas:

```html
<!-- Ejemplo -->
<a href="https://discord.gg/tu-código" target="_blank">
<a href="https://twitter.com/tu-usuario" target="_blank">
<a href="https://youtube.com/@tu-canal" target="_blank">
```

### Cambiar Steam

Busca: `https://steamcommunity.com`

Reemplaza con tu página de Steam:

```html
<a href="https://store.steampowered.com/app/TU-GAME-ID" target="_blank">
```

## 📝 Cambiar Información de Empresa

### En el Footer:

Busca en `index.html`:

```html
<div class="footer-section">
    <h4>Verde Games Studio</h4>
    <p>© 2024 Verde Games Studio...</p>
</div>
```

Cambia:
- Año: `2024` → `2025`
- Nombre: `Verde Games Studio` → Tu nombre
- Descripción

### En la Sección "Sobre Nosotros":

Busca `<!-- PÁGINA: SOBRE NOSOTROS -->`

Edita:
- Descripción de la empresa
- Misión
- Valores
- Equipo (avatares, nombres, descripciones)

## 🖼️ Cambiar Emojis del Sitio

Los emojis están en toda la página. Aquí están los principales:

| Ubicación | Emoji | Cambiar a |
|-----------|-------|-----------|
| Logo | 🌵 | 🎮 🎨 🚀 💚 |
| Juego Cactus | 🌵 | 🏜️ 🌞 ⚔️ |
| Juego Echoes | 🔮 | 🌀 👁️ ⏰ |
| Juego Islas | 🏝️ | 🏖️ 🌊 ⛵ |
| Cómic Desierto | 📖 | 📚 📕 📘 |
| Cómic Noche | 🌙 | ⭐ 🌌 ✨ |
| Cómic Caballeros | ⚔️ | 🛡️ 👑 🏰 |
| Cómic Máscaras | 🎭 | 🎪 🎨 🌃 |

Busca y reemplaza en `index.html`:

```html
<!-- Antes -->
<span class="cactus-icon">🌵</span>

<!-- Después -->
<span class="cactus-icon">🎮</span>
```

## 📱 Cambiar Meta Tags (para SEO)

En `index.html`, busca `<head>`:

```html
<title>Verde Games Studio | Videojuegos & Cómics</title>
```

Personaliza el título. Esto aparece en:
- Pestaña del navegador
- Resultados de Google

**Ejemplo:**
```html
<title>Mi Empresa | Juegos y Cómics Increíbles</title>
```

## 🎯 Cambiar Logo

El logo es un emoji. Para cambiar:

En `index.html`:

```html
<div class="logo" onclick="navigateTo('home')">
    <span class="cactus-icon">🌵</span>  <!-- Cambiar aquí -->
    <span class="logo-text">VERDE<br><small>GAMES</small></span>
</div>
```

También puedes cambiar el texto:

```html
<span class="logo-text">MI EMPRESA<br><small>STUDIOS</small></span>
```

## 🎭 Cambiar Temas de Color de Tarjetas

En las tarjetas de juegos hay tres temas:

```css
.cactus-theme    /* Verde */
.mystery-theme   /* Morado */
.adventure-theme /* Naranja */
```

Para crear uno nuevo, edita en `styles.css`:

```css
/* Añade un nuevo tema */
.custom-theme {
    background: linear-gradient(135deg, rgba(YOUR-R, YOUR-G, YOUR-B, 0.2) 0%, 
                                        rgba(YOUR-R, YOUR-G, YOUR-B, 0.05) 100%);
    border-bottom: 3px solid #YOUR-COLOR-HEX;
}
```

Luego úsalo:

```html
<div class="game-header custom-theme">
    <div class="game-icon">🎮</div>
</div>
```

## 📧 Añadir Formulario de Contacto

En `index.html`, dentro de alguna página, puedes añadir:

```html
<form class="contact-form" onsubmit="handleContact(event)">
    <input type="text" placeholder="Tu nombre" required>
    <input type="email" placeholder="Tu email" required>
    <textarea placeholder="Tu mensaje" required></textarea>
    <button type="submit" class="btn btn-primary">Enviar</button>
</form>
```

En `script.js`:

```javascript
function handleContact(event) {
    event.preventDefault();
    alert('Gracias por tu mensaje. Nos pondremos en contacto pronto.');
    event.target.reset();
}
```

## 🔍 Tips de Personalización

1. **Busca y Reemplaza:** `Ctrl+H` en VSCode para cambiar múltiples instancias
2. **Usa DevTools:** F12 para inspeccionar estilos en vivo
3. **Prueba Cambios:** Live Server recarga automáticamente
4. **Guarda Versiones:** Haz commits antes de cambios grandes
5. **Prueba en Móvil:** Asegúrate de que se ve bien en todos los dispositivos

---

**Mas info en README.md y GUIA_VSCODE.md**
