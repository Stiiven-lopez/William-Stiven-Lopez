/* ============================================================
   CONTACTO.JS
   Solo se usa en contacto.html.
   Valida el formulario de contacto (campos obligatorios +
   formato de correo) y muestra el mensaje de confirmación
   cuando todo está bien. No envía nada a un servidor todavía:
   es la validación del lado del cliente.
   ============================================================ */

(function(){
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(fieldId, hasError){
    var field = document.getElementById(fieldId);
    if (hasError) { field.classList.add('has-error'); }
    else { field.classList.remove('has-error'); }
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();

    var nombre = document.getElementById('f-nombre').value.trim();
    var correo = document.getElementById('f-correo').value.trim();
    var asunto = document.getElementById('f-asunto').value.trim();
    var mensaje = document.getElementById('f-mensaje').value.trim();

    var valid = true;

    if (!nombre) { setError('field-nombre', true); valid = false; } else { setError('field-nombre', false); }
    if (!correo || !emailRegex.test(correo)) { setError('field-correo', true); valid = false; } else { setError('field-correo', false); }
    if (!asunto) { setError('field-asunto', true); valid = false; } else { setError('field-asunto', false); }
    if (!mensaje) { setError('field-mensaje', true); valid = false; } else { setError('field-mensaje', false); }

    if (valid) {
      status.textContent = '¡Gracias, ' + nombre + '! Tu mensaje fue enviado. Te responderemos pronto a ' + correo + '.';
      status.classList.add('success');
      form.reset();
    } else {
      status.classList.remove('success');
      status.style.display = 'none';
    }
  });
})();
