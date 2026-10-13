# WILLYZINHO NEWS — versión Angular

> **¿No te abre? Lee primero `COMO-ABRIRLO.md`** (paso a paso, de la descarga a ver la página).

Esta es la implementación en **Angular** del proyecto (componentes +
binding), para la Entrega 3. Es la misma idea que la versión
HTML/CSS/JS, pero construida como una aplicación Angular de verdad:
con componentes, servicios, inyección de dependencias, Router y
Reactive Forms.

## ⚠️ Antes de abrir nada: una aclaración importante

Este proyecto se escribió en un entorno sin acceso a internet, así que
**no se pudo ejecutar `npm install` ni `ng serve` para probarlo en
vivo** dentro de ese entorno (instalar Angular descarga paquetes de
internet). El código está escrito siguiendo la sintaxis y las reglas
reales de Angular 17, pero antes de entregarlo debes correrlo tú una
vez para confirmar que compila sin errores — ver la sección
"Cómo correrlo" más abajo. Si algo no compila, casi siempre es un
detalle menor (una importación, un tipo) y te puedo ayudar a
corregirlo apenas me digas qué error marca la consola.

## Cómo correrlo

### Opción 1 — StackBlitz (sin instalar nada, recomendado para probarlo rápido)
1. Entra a [stackblitz.com](https://stackblitz.com) y crea un proyecto nuevo de Angular.
2. Reemplaza los archivos que te genere por los de esta carpeta (o arrastra la carpeta `src/` completa).
3. StackBlitz instala las dependencias y corre la app solo, en el navegador.

### Opción 2 — En tu computador
Necesitas tener [Node.js](https://nodejs.org) instalado (versión 18 o más reciente).

```bash
cd willyzinho-news-angular
npm install
npm start
```

Luego abre `http://localhost:4200` en tu navegador.

## Estructura del proyecto

```
willyzinho-news-angular/
├── src/
│   ├── index.html
│   ├── main.ts                    ← arranca la app (bootstrap de AppModule)
│   ├── styles.css                 ← estilos globales (misma marca: negro/rojo/plateado)
│   ├── assets/
│   │   ├── data/noticias.json     ← la "base de datos" de noticias
│   │   └── img/                   ← logo + ilustraciones SVG (las mismas del sitio HTML)
│   └── app/
│       ├── app.module.ts          ← el módulo raíz: declara todos los componentes
│       ├── app-routing.module.ts  ← las rutas de la app (Home, Noticias, Detalle...)
│       ├── app.component.ts/html  ← el componente raíz (header + <router-outlet> + footer)
│       ├── models/
│       │   └── noticia.model.ts   ← la forma (interface) de una noticia
│       ├── services/
│       │   ├── noticias.service.ts   ← carga el JSON + mini CRUD con localStorage
│       │   └── favoritos.service.ts  ← favoritos con localStorage
│       ├── components/            ← piezas reutilizables
│       │   ├── header/
│       │   ├── footer/
│       │   └── noticia-card/      ← la tarjeta de noticia (el mejor ejemplo de @Input/@Output)
│       └── pages/                 ← una carpeta por cada "página" (ruta)
│           ├── home/
│           ├── noticias-list/
│           ├── noticia-detalle/
│           ├── favoritos/
│           ├── contacto/
│           └── admin/
```

## Qué conceptos de Angular quedaron demostrados (para tu sustentación)

- **Componentes**: cada pieza de la interfaz es un componente (`.ts` +
  `.html` + `.css`) — 9 en total, repartidos entre `components/`
  (reutilizables) y `pages/` (una ruta completa).
- **Property binding** (`[ ]`): por ejemplo `[noticia]="n"` en
  `noticia-card`, o `[src]="n.imagen"` para la imagen.
- **Event binding** (`( )`): por ejemplo `(click)="toggleMenu()"` en el
  header, o `(favorito)="onFavorito($event)"` — este último es un
  **binding de un `@Output()` personalizado**, no uno que trae Angular
  de fábrica.
- **Interpolación** (`{{ }}`): los textos dinámicos, como
  `{{ n.titulo }}` o `{{ anioActual }}`.
- **Directivas estructurales**: `*ngFor` (listas de noticias),
  `*ngIf`/`else` (estados de carga, "no encontrada", menú móvil).
- **Servicios + inyección de dependencias**: `NoticiasService` y
  `FavoritosService` se inyectan en los componentes a través del
  constructor — Angular se encarga de crearlos y compartirlos.
- **Router**: navegación entre páginas sin recargar (`routerLink`,
  `routerLinkActive`) y **parámetros de ruta** (`/noticias/:id`, leído
  con `ActivatedRoute` en `noticia-detalle`).
- **Reactive Forms**: `Contacto` y `Administrar` usan `FormBuilder` +
  `Validators` (campos obligatorios, formato de correo, longitud
  mínima) — el enfoque recomendado por Angular para formularios con
  validación.
- **HttpClient**: `NoticiasService` carga `assets/data/noticias.json`
  con `HttpClient.get()`, que es la forma "de Angular" de hacer lo que
  en la versión HTML/CSS/JS hacíamos con `fetch()`.
- **RxJS** (Observables): `combineLatest`, `map`, `switchMap`,
  `BehaviorSubject` — para que, por ejemplo, la lista de Favoritos se
  actualice sola cuando cambias un favorito desde otra página.

## Qué datos usa

Usa exactamente las mismas 10 noticias del sitio HTML/CSS/JS
(`assets/data/noticias.json`), y el mismo mini CRUD por `localStorage`
(crear/eliminar noticias desde `/administrar`, favoritos desde
cualquier tarjeta) — para que ambas versiones del proyecto cuenten la
misma historia.
