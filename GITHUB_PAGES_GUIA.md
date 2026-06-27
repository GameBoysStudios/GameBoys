# 📤 Guía Completa: GitHub + GitHub Pages

## 📋 Requisitos Previos

- Tener una cuenta en [GitHub](https://github.com) (gratis)
- Tener Git instalado en tu computadora
- Tener los archivos del proyecto listos

## 🔧 Paso 1: Instalar Git

### Windows:
1. Ve a [git-scm.com](https://git-scm.com)
2. Descarga el instalador
3. Ejecuta el instalador (siguiente → siguiente → instalar)

### Mac:
```bash
# Opción 1: Usando Homebrew
brew install git

# Opción 2: Descarga directa
# Ve a git-scm.com y descarga el instalador
```

### Linux (Ubuntu/Debian):
```bash
sudo apt-get install git
```

## 👤 Paso 2: Configurar Git en tu Computadora

Abre Terminal/CMD y ejecuta:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

**Ejemplo:**
```bash
git config --global user.name "Juan Pérez"
git config --global user.email "juan@ejemplo.com"
```

Verifica que está bien configurado:
```bash
git config --list
```

## 🚀 Paso 3: Crear Repositorio en GitHub

### 3.1 Inicia sesión en GitHub
1. Ve a [github.com](https://github.com)
2. Click en tu perfil (arriba a la derecha)
3. Click en "Sign in"

### 3.2 Crea un nuevo repositorio
1. Click en el **+** (arriba a la derecha)
2. Selecciona "New repository"
3. Completa el formulario:

**Campos importantes:**
- **Repository name**: `verde-games-studio` (o el nombre que quieras)
- **Description**: "Sitio web oficial de Verde Games Studio"
- **Public**: ✅ Selecciona (necesario para GitHub Pages)
- **.gitignore template**: Selecciona "None" (ya tenemos .gitignore)
- **License**: Selecciona "MIT License" (recomendado)

4. Click en "Create repository"

### 3.3 Copia el URL del repositorio
En la página, verás:
```
https://github.com/TU-USERNAME/verde-games-studio.git
```

**Guarda este URL**, lo necesitarás en el paso 4.

## 📂 Paso 4: Preparar la Carpeta del Proyecto

### 4.1 Abre Terminal en la carpeta del proyecto

**Windows (cmd):**
```bash
# Navega a la carpeta
cd C:\Usuarios\TuNombre\verde-games-studio
```

**Mac/Linux:**
```bash
# Navega a la carpeta
cd ~/verde-games-studio
```

### 4.2 Verifica que tienes los archivos
```bash
ls
# Deberías ver: index.html, styles.css, script.js, etc.
```

## 🔗 Paso 5: Vincular con GitHub

En la carpeta de tu proyecto, ejecuta en Terminal:

```bash
# Inicializa git en la carpeta
git init

# Añade todos los archivos
git add .

# Crea el primer commit
git commit -m "Initial commit - Verde Games Studio website"

# Cambia el nombre de la rama a 'main'
git branch -M main

# Añade el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/TU-USERNAME/verde-games-studio.git

# Sube los archivos a GitHub
git push -u origin main
```

**Ejemplo completo:**
```bash
git init
git add .
git commit -m "Initial commit - Verde Games Studio website"
git branch -M main
git remote add origin https://github.com/juan-perez/verde-games-studio.git
git push -u origin main
```

## 🌐 Paso 6: Activar GitHub Pages

### 6.1 Ve a las configuraciones del repositorio
1. En GitHub, abre tu repositorio
2. Click en la pestaña **Settings** (engranaje)

### 6.2 Busca GitHub Pages
En el menú izquierdo, busca **Pages**

### 6.3 Configura la fuente
En **Source**:
- **Branch**: Selecciona `main`
- **Folder**: Selecciona `/ (root)`
- Click en **Save**

### 6.4 Espera a que se publique
GitHub necesita 1-3 minutos para procesar. Verás un mensaje azul:
```
Your site is published at:
https://TU-USERNAME.github.io/verde-games-studio
```

## ✅ Paso 7: Verificar que funciona

1. Copia el URL que te mostró GitHub
2. Abre en tu navegador
3. Verifica que todo se ve bien

Si no ves cambios:
- Espera 2-3 minutos más
- Limpia el caché: `Ctrl+Shift+Delete`
- Intenta con `Ctrl+Shift+R`

## 📝 Paso 8: Hacer Cambios en el Futuro

Cuando necesites actualizar el sitio:

### 8.1 Haz cambios en los archivos

```bash
# Por ejemplo, edita index.html en VSCode
```

### 8.2 Sube los cambios a GitHub

```bash
# Ver qué cambió
git status

# Añade los cambios
git add .

# Crea un commit con descripción
git commit -m "Actualizar contenido de juegos"

# Sube a GitHub
git push
```

**Ejemplo de buenos mensajes de commit:**
```
git commit -m "Añadir nuevo juego: Islas Perdidas"
git commit -m "Actualizar colores principales"
git commit -m "Corregir enlace de Discord"
git commit -m "Mejorar responsive en móviles"
```

### 8.3 GitHub Pages se actualiza automáticamente
Los cambios aparecerán en tu sitio en 1-2 minutos.

## 🔄 Sincronización Regular (Workflow)

Repite este ciclo cada vez que hagas cambios:

```bash
# 1. Ver cambios
git status

# 2. Añadir cambios
git add .

# 3. Comprometer cambios
git commit -m "Descripción clara de qué cambió"

# 4. Subir a GitHub
git push
```

## 🆘 Solucionar Problemas

### Error: "fatal: not a git repository"
```bash
# Estás en la carpeta equivocada
# Ve a la carpeta correcta:
cd C:\Usuarios\TuNombre\verde-games-studio

# O reinicia Git:
git init
```

### Error: "permission denied (publickey)"
```bash
# Necesitas configurar SSH
# Por ahora, usa HTTPS en lugar de SSH

# Ve a Settings > Developer settings > Personal access tokens
# Crea un token y úsalo como contraseña
```

### GitHub Pages no muestra cambios
```bash
# 1. Espera 2-3 minutos
# 2. Limpia caché: Ctrl+Shift+Delete
# 3. Verifica que estés en rama 'main':
git branch

# 4. Verifica que push fue exitoso:
git push
```

### "It looks like you have never created a commit"
```bash
# Haz un primer commit:
git add .
git commit -m "Initial commit"
git push -u origin main
```

## 📊 Ver Historial de Cambios

Para ver todos tus commits:

```bash
# Ver últimos 5 commits
git log --oneline -5

# Ver cambios específicos
git diff HEAD~1
```

## 🔐 Token de Acceso (Si lo necesitas)

Si GitHub pide contraseña:

1. Ve a tu perfil → Settings → Developer settings → Personal access tokens
2. Click en "Tokens (classic)"
3. Click en "Generate new token"
4. Nombres: `gh-pages-token`
5. Selecciona: `public_repo`
6. Click en "Generate token"
7. **Copia el token** (no podrás verlo de nuevo)
8. Usa el token como contraseña cuando pida Git

## 🎓 Comandos Git Útiles

| Comando | Función |
|---------|---------|
| `git status` | Ver estado de cambios |
| `git add .` | Añadir todos los cambios |
| `git commit -m "mensaje"` | Crear un punto de guardado |
| `git push` | Subir a GitHub |
| `git pull` | Descargar cambios de GitHub |
| `git log` | Ver historial |
| `git revert HEAD` | Deshacer último cambio |
| `git branch` | Ver ramas |

## 📱 Ver en Móvil

Una vez publicado en GitHub Pages, puedes acceder desde cualquier dispositivo:

1. Ve a tu URL: `https://tu-username.github.io/verde-games-studio`
2. Abre en navegador móvil
3. Verifica que sea responsive

## 🎉 ¡Completado!

Ya tienes tu sitio publicado en GitHub Pages. Ahora puedes:

✅ Hacer cambios localmente  
✅ Subirlos a GitHub  
✅ Ver cambios en vivo en segundos  
✅ Compartir tu URL con otros  
✅ Colaborar con amigos  

## 📚 Recursos Adicionales

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://github.githubassets.com/files/github-git-cheat-sheet.pdf)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)

---

**¡Éxito con tu sitio! 🚀**

¿Preguntas? Consulta el README.md o abre un issue en GitHub.
