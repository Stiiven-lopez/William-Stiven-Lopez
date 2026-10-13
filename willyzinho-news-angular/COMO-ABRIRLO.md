# Cómo abrir y ejecutar este proyecto Angular (paso a paso)

> IMPORTANTE: un proyecto Angular NO se abre con doble clic en `index.html`.
> Se queda en blanco. Hay que instalarlo (una vez) y arrancarlo con un comando.

## 0. Una sola vez en tu computador: instala Node.js
1. Entra a https://nodejs.org y descarga la versión **LTS** (20 o 22).
2. Instálala con "Siguiente, Siguiente..." y **reinicia el computador**.
3. Comprueba: abre una terminal y escribe `node -v` → debe salir v18.13 o mayor
   (ideal v20+). Si sale "no se reconoce el comando", reinstala y reinicia.

## 1. Descomprime el .zip (no lo abras desde dentro del zip)
Clic derecho sobre `willyzinho-news-angular.zip` → **Extraer todo...** → elige
una carpeta simple, p. ej. `C:\proyectos\`. (Evita el Escritorio con OneDrive
y rutas con tildes o espacios raros.)

## 2. Abre la carpeta CORRECTA en VS Code
VS Code → **Archivo → Abrir carpeta...** → elige `willyzinho-news-angular`
(la que contiene `package.json`, `angular.json` y la carpeta `src`).
Si abres la carpeta de afuera, los comandos fallan con "package.json not found".
(Si VS Code sugiere instalar la extensión "Angular Language Service", acepta.)

## 3. Abre la terminal dentro de VS Code
Menú **Terminal → Nueva terminal**. Abajo debe verse la ruta terminando en
`willyzinho-news-angular`.

## 4. Instala las dependencias (una sola vez, tarda 1-3 minutos)
    npm install
Se crea la carpeta `node_modules`. Pueden salir líneas "WARN deprecated": son
normales. Solo importan las que dicen `ERR!`.

## 5. Arranca la app
    npm start
- Si pregunta "Would you like to share pseudonymous usage data...?" → escribe `N` y Enter.
- Espera a ver: `Local: http://localhost:4200/`
- Abre ese enlace en el navegador (Ctrl + clic sobre el enlace en la terminal).
- Para detener: Ctrl + C en la terminal. Para volver a arrancar solo repites `npm start`
  (el paso 4 NO se repite).

## Problemas frecuentes
| Mensaje | Qué significa | Solución |
|---|---|---|
| `npm: no se reconoce` | Node no está instalado | Paso 0 y reiniciar |
| `...npm.ps1 cannot be loaded because running scripts is disabled` (Windows PowerShell) | PowerShell bloquea scripts | En la terminal de VS Code escribe: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` → `S`. O cambia la terminal a "Command Prompt" (flecha junto al +) |
| `ENOENT ... package.json` | Abriste la carpeta equivocada | Paso 2 |
| `The Angular CLI requires a minimum Node.js version` | Node muy viejo | Instala Node LTS (paso 0) |
| `Port 4200 is already in use` | Ya hay otro `ng serve` abierto | Ciérralo (Ctrl+C) o responde `Y` para usar otro puerto |
| `ERESOLVE unable to resolve dependency tree` | Conflicto de versiones | `npm install --legacy-peer-deps` |
| Página en blanco + errores rojos en consola del navegador (F12) | Error del código | Copia el primer error rojo de la TERMINAL y mándalo |
| Errores rojos `TS...` / `NG...` en la terminal | Error de compilación | Copia el mensaje completo y mándalo |

## Para entregar / publicar
    npm run build
Genera `dist/willyzinho-news-angular/browser/` (esa carpeta es la que se sube a
Netlify/Vercel). En GitHub Pages hay que compilar con:
    ng build --base-href "/NOMBRE-DEL-REPOSITORIO/"
