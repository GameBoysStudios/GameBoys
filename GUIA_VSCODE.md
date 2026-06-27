# 🚀 Guía Rápida - Visual Studio Code

## Instalación de Extensiones Recomendadas

### 1. Live Server (Para desarrollo local)
- **Nombre**: Live Server
- **Autor**: Ritwick Dey
- **¿Para qué?**: Servidor local para ver cambios en tiempo real
- **Instalación**: 
  - Abre VSCode
  - Presiona `Ctrl+Shift+X` (o `Cmd+Shift+X` en Mac)
  - Busca "Live Server"
  - Click en Install

### 2. Prettier - Code Formatter
- **Para qué**: Formatea automáticamente tu código
- **Instalación**: `Ctrl+Shift+X` → Busca "Prettier" → Install

### 3. HTML CSS Support
- **Para qué**: Autocompletado en HTML y CSS
- **Instalación**: `Ctrl+Shift+X` → Busca "HTML CSS Support" → Install

### 4. JavaScript (ES6) code snippets
- **Para qué**: Snippets útiles para JavaScript
- **Instalación**: `Ctrl+Shift+X` → Busca "JavaScript" → Install

## ⚙️ Configuración de VSCode (Opcional)

Crea un archivo `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.fontSize": 14,
  "editor.fontFamily": "Consolas, 'Courier New', monospace",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "files.trimTrailingWhitespace": true,
  "html.format.indentInnerHtml": true,
  "liveServer.settings.CustomBrowser": "chrome"
}
```

## 🎯 Atajos de Teclado Útiles

| Atajo | Función |
|-------|---------|
| `Ctrl+K Ctrl+0` | Plegar todo |
| `Ctrl+K Ctrl+J` | Desplegar todo |
| `Ctrl+/` | Comentar línea |
| `Shift+Alt+↓` | Duplicar línea abajo |
| `Ctrl+D` | Seleccionar palabra actual |
| `Ctrl+Shift+L` | Seleccionar todas las ocurrencias |
| `F12` | Abrir DevTools del navegador |
| `Alt+L Alt+O` | Open with Live Server |

## 📂 Estructura del Proyecto en VSCode

```
Abre la carpeta verde-games-studio en VSCode:
File → Open Folder → Selecciona la carpeta
```

## 🔍 Cómo Editar Archivos

### 1. Cambiar Información de Juegos

**Archivo**: `index.html`

Busca: `<!-- Juego 1: Cactus -->`

```html
<div class="game-card">
    <div class="game-header cactus-theme">
        <div class="game-icon">🌵</div>  <!-- Cambiar emoji -->
    </div>
    <div class="game-content">
        <h3>Cactus: The Videogame</h3>  <!-- Cambiar nombre -->
        <p class="game-status">
            <span class="badge badge-soon">Próximamente</span>  <!-- Cambiar estado -->
        </p>
        <p class="game-description">
            Un viaje épico...  <!-- Cambiar descripción -->
        </p>
        <!-- Cambiar detalles -->
    </div>
</div>
```

### 2. Cambiar Información de Cómics

**Archivo**: `index.html`

Busca: `<!-- Cómic 1 -->`

```html
<div class="comic-card">
    <div class="comic-cover">
        <div class="cover-icon">📖</div>  <!-- Cambiar emoji -->
        <span class="comic-status">Disponible</span>  <!-- Cambiar estado -->
    </div>
    <div class="comic-content">
        <h3>El Legado del Desierto</h3>  <!-- Cambiar título -->
        <p class="comic-author">Por Verde Games Studio</p>  <!-- Cambiar autor -->
        <p class="comic-description">
            La epopeya visual...  <!-- Cambiar descripción -->
        </p>
    </div>
</div>
```

### 3. Cambiar Colores

**Archivo**: `styles.css`

Localiza la sección `:root`:

```css
:root {
    --color-dark: #0a0e27;        /* Fondo principal */
    --color-darker: #050813;      /* Fondo más oscuro */
    --color-cactus: #2ecb71;      /* Color principal (CAMBIAR AQUÍ) */
    --color-orange: #ff6b35;      /* Color secundario (CAMBIAR AQUÍ) */
    --color-light: #e8e8e8;       /* Texto claro */
    --color-gray: #999999;        /* Texto gris */
    --color-border: #1a1f3a;      /* Bordes */
}
```

**Herramientas útiles para colores**:
- [Color Picker](https://www.colorpicker.com/)
- Extensión VSCode: "Color Picker"

### 4. Cambiar Contenido "Sobre Nosotros"

**Archivo**: `index.html`

Busca: `<!-- PÁGINA: SOBRE NOSOTROS -->`

Edita la sección dentro de `<section id="about-page">`

## 🚀 Flujo de Trabajo Típico

### Paso 1: Hacer Cambios
```
1. Abre archivo en VSCode
2. Edita el contenido
3. Presiona Ctrl+S para guardar
```

### Paso 2: Ver Cambios en Vivo
```
1. Live Server recarga automáticamente
2. Tu navegador muestra los cambios al instante
```

### Paso 3: Guardar en GitHub
```
1. Ctrl+` (abre terminal integrada)
2. git add .
3. git commit -m "Descripción de cambios"
4. git push
```

## 🐛 Debugging

### Abrir DevTools
- Presiona `F12` en tu navegador
- O Click derecho → Inspeccionar

### En la pestaña Console:
- Verás errores de JavaScript
- Prueba comandos directamente

### Ejemplo de debugging:
```javascript
// Si algo no funciona, abre console y prueba:
auth.currentUser // Ver usuario actual
// En la consola verás si es null o tiene datos
```

## 📝 Tips Importantes

1. **Siempre guarda** (`Ctrl+S`) antes de hacer cambios importantes
2. **Haz commits regularmente** con mensajes descriptivos
3. **Prueba en diferentes navegadores** para asegurar compatibilidad
4. **Usa la consola** (F12) para debugging
5. **Lee los mensajes de error** en la consola

## 🆘 Problemas Comunes

### "Live Server no funciona"
```
Solución:
1. Click derecho en index.html
2. Select "Open with Live Server"
3. Si no aparece la opción, reinstala la extensión
```

### "JavaScript da error"
```
Solución:
1. Abre F12 (Console)
2. Lee el error
3. Revisa la sintaxis en script.js
4. Verifica que firebase-config.js tenga valores correctos
```

### "Cambios no se ven"
```
Solución:
1. Presiona Ctrl+Shift+R (reload sin caché)
2. O en DevTools: Click derecho → Vaciar caché
3. Espera 1-2 segundos a que Live Server recargue
```

## 🎓 Próximos Pasos

1. ✅ Configura Firebase con tus credenciales
2. ✅ Personaliza contenido
3. ✅ Prueba todo localmente
4. ✅ Sube a GitHub
5. ✅ Activa GitHub Pages
6. ✅ Comparte tu sitio

---

**¡Ahora estás listo para desarrollar! 🚀**

Si tienes dudas, consulta el README.md principal.
