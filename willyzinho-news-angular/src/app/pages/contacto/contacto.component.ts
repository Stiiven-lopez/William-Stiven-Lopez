import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * ContactoComponent
 * -------------------
 * Usa Reactive Forms (FormBuilder + Validators), el enfoque
 * recomendado por Angular para formularios con validación — es
 * "binding" en los dos sentidos: el HTML se conecta al FormGroup
 * con [formGroup] y formControlName, y cualquier cambio en el
 * input se refleja solo en el estado del formulario (y viceversa).
 */
@Component({
  selector: 'wz-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  enviado = false;

  form = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(private fb: FormBuilder) {}

  get f() {
    return this.form.controls;
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Sin backend todavía: solo mostramos la confirmación, tal
    // como pide el brief para esta etapa del proyecto.
    this.enviado = true;
    this.form.reset();
  }
}
