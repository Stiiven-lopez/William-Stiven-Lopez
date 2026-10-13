import { Component } from '@angular/core';

/**
 * HeaderComponent
 * Encabezado + menú de navegación, se usa una sola vez en
 * app.component.html y queda fijo arriba en todas las "páginas"
 * (rutas) de la app.
 */
@Component({
  selector: 'wz-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuAbierto = false;

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}
