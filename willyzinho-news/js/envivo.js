/* ============================================================
   ENVIVO.JS
   Solo se usa en envivo.html.
   Hace tres cosas: 1) avanza el minuto del marcador en vivo
   cada segundo, 2) simula pequeñas variaciones en el contador
   de espectadores, 3) activa el botón "Recordarme" de la
   parrilla de próximas transmisiones.
   ============================================================ */

(function(){
  // Marcador de minuto en vivo: avanza para transmitir sensación de partido corriendo
  var minuteEl = document.getElementById('liveMinute');
  var minute = 27;
  var seconds = 0;
  setInterval(function(){
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minute++;
      if (minute > 40) { minute = 40; }
    }
    if (minuteEl) { minuteEl.textContent = minute + "'"; }
  }, 1000);

  // Contador de espectadores: pequeña variación para sensación de "en vivo"
  var viewersEl = document.getElementById('liveViewers');
  var viewers = 1240;
  setInterval(function(){
    viewers += Math.floor(Math.random() * 7) - 2;
    if (viewers < 1180) { viewers = 1180; }
    if (viewersEl) { viewersEl.textContent = viewers.toLocaleString('es-CO'); }
  }, 2500);

  // Botones "Recordarme": toggle visual simple
  var buttons = document.querySelectorAll('.schedule-remind');
  buttons.forEach(function(btn){
    btn.addEventListener('click', function(){
      var isSet = btn.classList.toggle('is-set');
      btn.textContent = isSet ? 'Recordatorio listo ✓' : 'Recordarme';
    });
  });
})();
