import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Noticia } from '../models/noticia.model';

/**
 * NoticiasService
 * ----------------
 * El "cerebro" de datos de toda la app, equivalente a js/noticias.js
 * en la versión HTML/CSS/JS del proyecto.
 *
 * 1) Carga assets/data/noticias.json con HttpClient (fetch, pero
 *    con Observables en vez de Promises — así es como se hace en
 *    Angular).
 * 2) La combina con las noticias que el usuario haya creado desde
 *    el panel de Administrar (guardadas en localStorage).
 * 3) Resta las que el usuario haya eliminado.
 *
 * Al ser un @Injectable con providedIn: 'root', Angular crea UNA
 * sola instancia de este servicio y se la "inyecta" (dependency
 * injection) a cualquier componente que lo pida en su constructor.
 */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private readonly jsonUrl = 'assets/data/noticias.json';
  private readonly keyExtra = 'wz_noticias_extra';
  private readonly keyBorradas = 'wz_noticias_borradas';

  constructor(private http: HttpClient) {}

  private leerExtra(): Noticia[] {
    try {
      const raw = localStorage.getItem(this.keyExtra);
      return raw ? (JSON.parse(raw) as Noticia[]) : [];
    } catch {
      return [];
    }
  }

  private guardarExtra(lista: Noticia[]): void {
    try {
      localStorage.setItem(this.keyExtra, JSON.stringify(lista));
    } catch {
      /* localStorage no disponible: seguimos sin romper la app */
    }
  }

  private leerBorradas(): string[] {
    try {
      const raw = localStorage.getItem(this.keyBorradas);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }

  private guardarBorradas(lista: string[]): void {
    try {
      localStorage.setItem(this.keyBorradas, JSON.stringify(lista));
    } catch {
      /* noop */
    }
  }

  /** Todas las noticias (JSON base + creadas por el usuario), ya sin las borradas. */
  obtenerTodas(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.jsonUrl).pipe(
      map((base) => {
        const extra = this.leerExtra();
        const borradas = this.leerBorradas();
        return base.concat(extra).filter((n) => !borradas.includes(n.id));
      })
    );
  }

  obtenerPorId(id: string): Observable<Noticia | undefined> {
    return this.obtenerTodas().pipe(map((todas) => todas.find((n) => n.id === id)));
  }

  obtenerPorCategoria(categoria: string, limite?: number): Observable<Noticia[]> {
    return this.obtenerTodas().pipe(
      map((todas) => {
        const filtradas =
          categoria === 'TODAS' ? todas : todas.filter((n) => n.categoria === categoria);
        return limite ? filtradas.slice(0, limite) : filtradas;
      })
    );
  }

  /** Crea una noticia nueva en localStorage. Devuelve el id generado. */
  crear(datos: Omit<Noticia, 'id'>): string {
    const extra = this.leerExtra();
    const id = 'custom-' + Date.now();
    extra.push({ id, ...datos });
    this.guardarExtra(extra);
    return id;
  }

  /** Elimina una noticia (del JSON base o creada por el usuario). */
  borrar(id: string): void {
    const borradas = this.leerBorradas();
    if (!borradas.includes(id)) {
      borradas.push(id);
      this.guardarBorradas(borradas);
    }
    this.guardarExtra(this.leerExtra().filter((n) => n.id !== id));
  }

  esPersonalizada(id: string): boolean {
    return id.startsWith('custom-');
  }
}
