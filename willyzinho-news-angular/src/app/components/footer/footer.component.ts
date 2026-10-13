import { Component } from '@angular/core';

@Component({
  selector: 'wz-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  /** Interpolación simple: se usa en el HTML como {{ anioActual }} */
  anioActual = new Date().getFullYear();
}
