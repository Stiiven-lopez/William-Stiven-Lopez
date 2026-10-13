import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'wz-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent implements OnInit {
  favoritas$!: Observable<Noticia[]>;

  constructor(
    private noticiasSrv: NoticiasService,
    public favoritosSrv: FavoritosService
  ) {}

  ngOnInit(): void {
    // Se combina la lista completa de noticias con el Observable de
    // favoritos (favoritosSrv.cambios$): si el usuario quita un
    // favorito, esta vista se actualiza SOLA, sin recargar la página.
    this.favoritas$ = combineLatest([
      this.noticiasSrv.obtenerTodas(),
      this.favoritosSrv.cambios$,
    ]).pipe(map(([todas, favIds]) => todas.filter((n) => favIds.includes(n.id))));
  }

  quitar(id: string): void {
    this.favoritosSrv.toggle(id);
  }

  trackById(_i: number, n: Noticia): string {
    return n.id;
  }
}
