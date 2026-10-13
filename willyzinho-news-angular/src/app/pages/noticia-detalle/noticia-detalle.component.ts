import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';

interface EstadoDetalle {
  noticia?: Noticia;
}

@Component({
  selector: 'wz-noticia-detalle',
  templateUrl: './noticia-detalle.component.html',
  styleUrls: ['./noticia-detalle.component.css'],
})
export class NoticiaDetalleComponent implements OnInit {
  // null = todavía cargando; { noticia: undefined } = no existe; { noticia } = encontrada
  estado$!: Observable<EstadoDetalle | null>;

  constructor(
    private route: ActivatedRoute,
    private noticiasSrv: NoticiasService,
    public favoritosSrv: FavoritosService
  ) {}

  ngOnInit(): void {
    // route.paramMap es un Observable: si el usuario navega de /noticias/n1
    // a /noticias/n2 sin recargar, switchMap vuelve a pedir la noticia nueva.
    this.estado$ = this.route.paramMap.pipe(
      switchMap((params) =>
        this.noticiasSrv
          .obtenerPorId(params.get('id') ?? '')
          .pipe(map((noticia): EstadoDetalle => ({ noticia })))
      ),
      startWith(null)
    );
  }

  toggleFavorito(id: string): void {
    this.favoritosSrv.toggle(id);
  }
}
