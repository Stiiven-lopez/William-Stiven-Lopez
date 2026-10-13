import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Noticia } from '../../models/noticia.model';

/**
 * NoticiaCardComponent
 * ---------------------
 * El componente "tarjeta de noticia", reutilizado en Home,
 * Noticias y Favoritos. Es el mejor ejemplo de binding del
 * proyecto:
 *
 *  - @Input()  noticia   → el componente PADRE le pasa los datos
 *                          con [noticia]="unaNoticia" (property binding).
 *  - @Input()  esFavorita → también recibe si ya está guardada.
 *  - @Output() favorito  → el componente HIJO avisa al padre cuando
 *                          el usuario toca la estrella, con
 *                          (favorito)="loQueSea($event)" (event binding).
 */
@Component({
  selector: 'wz-noticia-card',
  templateUrl: './noticia-card.component.html',
  styleUrls: ['./noticia-card.component.css'],
})
export class NoticiaCardComponent {
  @Input() noticia!: Noticia;
  @Input() esFavorita = false;
  @Input() mostrarFavorito = true;

  @Output() favorito = new EventEmitter<string>();

  onFavoritoClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorito.emit(this.noticia.id);
  }
}
