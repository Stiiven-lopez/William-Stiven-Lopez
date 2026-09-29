# WILLYZINHO NEWS — Proyecto organizado para VS Code

Este es el mismo sitio que ya viste funcionando, pero reorganizado como un
proyecto web de verdad: HTML, CSS, JavaScript e imágenes cada uno en su
propio lugar, en vez de un solo archivo gigante con todo mezclado por dentro.

## Cómo abrirlo

1. Descomprime la carpeta `willyzinho-news/` donde quieras.
2. Ábrela completa en VS Code (`Archivo → Abrir carpeta...`).
3. Haz clic derecho sobre `index.html` → **"Open with Live Server"** (si tienes
   la extensión Live Server instalada) o simplemente ábrelo dos veces con el
   mouse — funciona directo en el navegador, sin necesidad de instalar nada,
   porque no usa ningún framework ni paso de compilación.

No necesitas Node, npm, ni ningún build tool. Es HTML + CSS + JS plano.

---

## La estructura de carpetas — qué va en cada lugar

```
willyzinho-news/
├── index.html            ← Home (tema Futsal — negro/rojo/plateado)
├── futbol-de-salon.html  ← Home (tema Fútbol de Salón — blanco/rojo/negro)
├── noticias.html         ← Página de Noticias
├── destacados.html       ← Página de Destacados (ranking de jugadores)
├── torneos.html          ← Página de Torneos
├── favoritos.html        ← Página de Favoritos (usa localStorage)
├── contacto.html         ← Página de Contacto (formulario con validación)
├── envivo.html           ← Página de transmisiones En Vivo
│
├── css/
│   ├── variables.css     ← Todos los colores del sitio, en un solo lugar
│   ├── base.css          ← Reset del navegador + tipografía base
│   ├── layout.css        ← Header, ticker, hero, footer, menú (lo que se repite en las 8 páginas)
│   ├── components.css    ← Tarjetas, botones, formularios, cada "pieza" del sitio
│   ├── theme-light.css   ← SOLO la carga futbol-de-salon.html: repinta el sitio a blanco/rojo/negro
│   └── responsive.css    ← Ajustes para celular y tablet (todo el mobile, en un solo archivo)
│
├── js/
│   ├── nav.js            ← El menú hamburguesa (☰) de las 8 páginas
│   ├── favoritos.js      ← Lógica de favoritos.html (localStorage)
│   ├── contacto.js       ← Validación del formulario de contacto.html
│   └── envivo.js         ← Marcador en vivo + botón "Recordarme" de envivo.html
│
└── assets/img/
    ├── logo-wz7.png       ← Tu logo real, optimizado (fondo transparente)
    ├── court.svg          ← Cancha de futsal (ilustración)
    ├── ball.svg            ← Balón de futsal
    ├── jersey.svg          ← Camiseta con número
    ├── trophy.svg          ← Trofeo
    ├── goal.svg            ← Arco/portería
    ├── whistle.svg         ← Silbato de árbitro
    ├── stadium.svg         ← Reflectores de cancha
    ├── medal.svg           ← Medalla
    ├── avatar.svg          ← Silueta genérica para fotos de jugador (círculos)
    └── player-feature.svg  ← Ilustración grande para el "Jugador del Mes"
```

### La regla de oro de este proyecto
**Cada página HTML solo tiene el contenido de esa página** (los textos, las
tarjetas, la estructura). Todo lo visual (colores, tamaños, espaciados) vive
en los archivos CSS, y esos archivos los cargan **las 8 páginas por
igual**. Eso quiere decir:

> Si cambias un color en `css/variables.css`, cambia en las 8 páginas a la vez
> (menos en `futbol-de-salon.html`, que a propósito redefine esos mismos
> colores en `theme-light.css` para verse distinta).
> Si quieres cambiar cómo se ve una tarjeta de noticia, la tocas una sola vez
> en `css/components.css` y se actualiza en todo el sitio.


Eso es lo que en desarrollo web se llama **separar contenido (HTML), diseño
(CSS) y comportamiento (JS)** — es la forma estándar en la que se construye
cualquier sitio profesional, y es lo que te permite después escalarlo a
Angular sin tener que reescribir todo desde cero (el CSS y la lógica de los
componentes se pueden reutilizar casi tal cual).

---

## Cómo leer cada archivo CSS (en el orden en que se cargan)

Los 5 archivos se cargan siempre en este orden, dentro de cada `<head>`:

```html
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/responsive.css">
```

El orden importa porque en CSS "el que llega después gana" cuando hay
conflicto — por eso `responsive.css` (los ajustes de celular) va **al final**:
así sus reglas pueden sobreescribir las de escritorio cuando la pantalla es
chica.

1. **`variables.css`** — Aquí no hay diseño todavía, solo nombres de color:
   `--gold: #d81b25;` por ejemplo. En todo el resto del CSS vas a ver
   `color: var(--gold)` en vez de `color: #d81b25` escrito directo — así, si
   mañana quieres otro rojo, u otra paleta completa, la cambias aquí una sola
   vez.

2. **`base.css`** — El "reset" (quitarle los márgenes por defecto a todo,
   fijar la fuente, el fondo negro del `<body>`) y un puñado de clases que se
   usan en cualquier parte: `.display` (la tipografía Anton de los títulos),
   `.gold-text` (el efecto degradado rojo tipo cromo), `.wrap` (el contenedor
   centrado de 1280px) y `.gold-rule` (la línea divisoria roja).

3. **`layout.css`** — Todo lo que arma el "esqueleto" que se repite en las 8
   páginas: el `header` con el logo y el menú, el `.ticker-bar` (la franja
   roja que se mueve arriba), el `.hero-*` (la portada grande de cada
   página), el `.disc-band` (el selector Futsal/Fútbol de Salón), el
   `footer`, y el molde genérico `.sec-head`/`.sec-link` que usan casi todas
   las secciones internas.

4. **`components.css`** — El archivo más grande, porque aquí vive **cada
   pieza reutilizable** del sitio como su propia clase: `.news-card` (las
   tarjetas de noticia), `.feat-card` (las tarjetas de ranking con el número
   gris de fondo), `.agenda-card` (las tarjetas de torneo), `.doc-card` (las
   tarjetas de multimedia/repeticiones), `.destaca-panel` (el panel del
   Jugador del Mes), `.live-hero` (el reproductor de En Vivo),
   `.schedule-row` (la parrilla de transmisiones), el formulario de
   `contacto.html` (`.contact-form-card`, `.field`, etc.), los favoritos
   (`.fav-toggle`, `.fav-empty`) y los botones (`.btn-gold`, `.btn-ghost`).

5. **`responsive.css`** — Los `@media (max-width:980px)` que existían
   repartidos por el archivo original, ahora todos juntos aquí. Si algo se ve
   mal en celular, es en este archivo donde hay que buscar.

---

## Cómo leer los archivos JS

Cada uno se usa en **una sola página, o en las 8** (nav.js), y se carga al
final del `<body>` con `defer` (para que el HTML se pinte primero y el
script se ejecute después, sin bloquear nada):

- **`nav.js`** — Se usa en las 8 páginas. Controla el menú hamburguesa (☰)
  de celular: al tocarlo, despliega un panel con todos los links de
  navegación y el selector de disciplina. Se cierra solo si tocas un link,
  si tocas por fuera del panel, o si agrandas la ventana. Más detalle en la
  siguiente sección.
- **`favoritos.js`** — Guarda y lee del `localStorage` del navegador (bajo la
  clave `"wz_favoritos"`) qué noticias marcó el usuario. Dibuja dos grillas:
  las noticias recientes (con el botón ☆ para guardar) y "Mis Favoritos" (lo
  ya guardado). Es funcionalidad real: ciérralo y vuelve a abrirlo, tus
  favoritos siguen ahí.
- **`contacto.js`** — Valida el formulario (campos obligatorios + formato de
  correo con una expresión regular) y muestra el mensaje de confirmación.
  Todavía no envía nada a un servidor real — eso vendría cuando conectes un
  backend.
- **`envivo.js`** — Hace avanzar el minuto del marcador en vivo cada segundo,
  varía el contador de espectadores, y activa el botón "Recordarme".

El `ticker-bar` (la franja que se mueve arriba de todo) **no tiene JS** — el
movimiento es pura animación CSS (`@keyframes` en `layout.css`), así que es
más liviano y no depende de JavaScript para funcionar.

---

## El menú del header: selector de disciplina y menú móvil

Dos cosas que se arreglaron en esta entrega:

**1. El selector FUTSAL / FÚTBOL DE SALÓN ya no se sale del header.**
Antes, en pantallas de ancho intermedio (por ejemplo una ventana de
navegador achicada, o una tablet en horizontal), el menú de navegación y el
selector competían por el mismo espacio y el selector terminaba saliéndose
del header. La solución no fue "achicar letras hasta que quepa" — fue
mover el punto donde el sitio cambia a menú hamburguesa de 980px de ancho a
**1300px**. Así, el menú de texto completo (Inicio, En Vivo, Noticias...)
y el selector solo se muestran cuando hay espacio de sobra para los dos; en
cualquier ancho más angosto, el sitio pasa directo al header compacto (lupa
+ ☰), sin una zona intermedia incómoda donde algo se pueda salir. Ese ajuste
vive en `css/responsive.css`.

**2. El botón ☰ (las 3 líneas) ahora sí abre un menú.**
Antes era un ícono decorativo. Ahora, `js/nav.js` lo conecta a un panel
(`.mobile-nav`, ya está en el HTML de las 8 páginas, justo debajo del
`<header>`) que despliega los mismos 7 links de navegación **más** el
selector de disciplina, en una lista vertical fácil de tocar con el dedo.
Se cierra solo al elegir un link, al tocar afuera, o si la ventana vuelve a
tamaño de escritorio.

**3. El selector FUTSAL / FÚTBOL DE SALÓN ahora navega de verdad.**
Antes de esta entrega, "FÚTBOL DE SALÓN" no hacía nada. Ahora es un link
real hacia `futbol-de-salon.html` — ver la sección siguiente.

---

## La versión "Fútbol de Salón"

`futbol-de-salon.html` es, a propósito, casi un espejo de `index.html`: las
mismas secciones (hero, en portada, destacados, agenda, multimedia,
estadísticas), pero con los textos ajustados a "fútbol de salón" en vez de
"futsal", y con **otra paleta de color**: blanco, rojo y negro, en vez de
negro, rojo y plateado.

Lo interesante es *cómo* se logró ese cambio de color sin duplicar ni una
sola regla de diseño: como todo el sitio está construido con variables de
color (`var(--gold)`, `var(--white)`, etc. — ver `css/variables.css`),
`futbol-de-salon.html` carga un sexto archivo extra, **`css/theme-light.css`**,
justo después de `components.css`. Ese archivo redefine esas mismas
variables con valores claros, así que **todo** el CSS ya escrito (tarjetas,
botones, tipografía) se "repinta" solo, sin tocarlo. El header, el footer y
las ilustraciones se quedan con la combinación oscura de siempre — a
propósito, para que la marca se sienta consistente entre las dos versiones.

Si mañana quieres un tercer estilo (para otro deporte, o para una
temporada especial), el patrón es el mismo: un archivo de variables nuevo,
no un sitio nuevo.

---

## Qué cambió con las imágenes

Antes, cada página cargaba fotos de relleno desde `picsum.photos` (fotos
genéricas al azar, sin relación con futsal) y el logo iba **incrustado como
texto base64 dentro del propio HTML**, duplicado en cada página — eso era lo
que hacía que cada archivo pesara más de 300 KB.

Ahora:

- El logo real (el que subiste, en rojo, con el fondo ya transparente) se
  guardó como **un solo archivo** (`assets/img/logo-wz7.png`, optimizado a
  ~58 KB) que las 8 páginas comparten. El navegador lo descarga una vez y lo
  reutiliza en todas — no se vuelve a descargar al cambiar de página.
- Todas las fotos de relleno se reemplazaron por **ilustraciones SVG hechas a
  la medida** (cancha, balón, camiseta, trofeo, arco, silbato, reflectores,
  medalla) con la paleta roja/negra/plateada de la marca. Un SVG es texto
  (vectores, no píxeles), así que cada uno pesa entre 0.5 KB y 1.5 KB —
  gigantescamente más liviano que una foto, y además se ve nítido a
  cualquier tamaño de pantalla sin pixelarse.

Resultado: el proyecto completo (8 páginas + CSS + JS + todas las imágenes)
pesa **cerca de 290 KB en total** — antes, cada una de las 7 páginas
originales pesaba más de 350 KB *por separado*. Esto hace que cargue casi
instantáneo y que no dependa de internet para mostrar imágenes (excepto la
tipografía, que sigue viniendo de Google Fonts).

---

## Lo que sigue siendo "de mentira" (contenido de ejemplo)

Los nombres de jugadores, equipos, torneos y estadísticas son datos de
ejemplo (tal como pedía el brief original: "demostrativo, no debe
presentarse como estadística real"). Cuando conectes esto a datos reales,
son estos los que reemplazas — la estructura del sitio no cambia.

## Lo que todavía falta (fuera del alcance de esta entrega)

- **Detalle de noticia** (la página que se abre al hacer clic en "Ver más →").
- **Panel de Administración** (crear/eliminar noticias) — el brief original
  lo pedía como conceptual, sin sistema de usuarios.
- Conectar el formulario de contacto y el "Ver torneo →" a páginas o a un
  backend real.
