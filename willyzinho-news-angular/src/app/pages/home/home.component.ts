import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'wz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // El pipe "async" del template se suscribe solo a este Observable
  // (y se desuscribe solo cuando el componente se destruye).
  destacadas$!: Observable<Noticia[]>;

  constructor(
    private noticiasSrv: NoticiasService,
    public favoritosSrv: FavoritosService
  ) {}

  ngOnInit(): void {
    this.destacadas$ = this.noticiasSrv.obtenerPorCategoria('TODAS', 3);
  }

  onFavorito(id: string): void {
    this.favoritosSrv.toggle(id);
  }

  trackById(_index: number, noticia: Noticia): string {
    return noticia.id;
  }
}
