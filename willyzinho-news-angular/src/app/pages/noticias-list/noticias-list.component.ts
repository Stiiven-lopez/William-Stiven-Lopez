import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'wz-noticias-list',
  templateUrl: './noticias-list.component.html',
  styleUrls: ['./noticias-list.component.css'],
})
export class NoticiasListComponent implements OnInit {
  categorias = ['TODAS', 'FUTSAL', 'FUTBOL-SALON', 'TORNEOS', 'JUGADORES', 'HISTORIAS', 'RESULTADOS'];
  categoriaActiva = 'TODAS';
  textoBusqueda = '';

  private busqueda$ = new BehaviorSubject<string>('');
  private categoria$ = new BehaviorSubject<string>('TODAS');

  noticiasFiltradas$!: Observable<Noticia[]>;

  constructor(
    private noticiasSrv: NoticiasService,
    public favoritosSrv: FavoritosService
  ) {}

  ngOnInit(): void {
    const todas$ = this.noticiasSrv.obtenerTodas().pipe(startWith([] as Noticia[]));

    // combineLatest: cada vez que cambian las noticias, el texto de
    // búsqueda O la categoría, se vuelve a calcular la lista filtrada.
    this.noticiasFiltradas$ = combineLatest([todas$, this.busqueda$, this.categoria$]).pipe(
      map(([todas, texto, categoria]) => {
        let lista = todas;
        if (categoria !== 'TODAS') {
          lista = lista.filter((n) => n.categoria === categoria);
        }
        const q = texto.trim().toLowerCase();
        if (q) {
          lista = lista.filter(
            (n) => n.titulo.toLowerCase().includes(q) || n.resumen.toLowerCase().includes(q)
          );
        }
        return lista;
      })
    );
  }

  seleccionarCategoria(cat: string): void {
    this.categoriaActiva = cat;
    this.categoria$.next(cat);
  }

  onBuscar(valor: string): void {
    this.busqueda$.next(valor);
  }

  onFavorito(id: string): void {
    this.favoritosSrv.toggle(id);
  }

  trackById(_i: number, n: Noticia): string {
    return n.id;
  }
}
