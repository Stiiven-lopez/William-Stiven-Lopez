/* ============================================================
   NAV.JS
   Se usa en las 7 páginas.
   Controla el menú móvil: al tocar el ícono de las 3 líneas
   (.menu-btn), abre/cierra el panel con todos los links de
   navegación (.mobile-nav). Se cierra solo si tocas un link,
   si tocas por fuera del panel, o si agrandas la ventana más
   allá del punto de quiebre mobile.
   ============================================================ */

(function () {
  var menuBtn = document.querySelector('.menu-btn');
  var mobileNav = document.getElementById('mobileNav');

  if (!menuBtn || !mobileNav) { return; }

  function closeMenu() {
    mobileNav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var isOpen = mobileNav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Cerrar al tocar cualquier link dentro del panel
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Cerrar al tocar por fuera del panel
  document.addEventListener('click', function (e) {
    if (!mobileNav.contains(e.target) && e.target !== menuBtn) {
      closeMenu();
    }
  });

  // Cerrar si la ventana vuelve a tamaño de escritorio
  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) { closeMenu(); }
  });
})();
