import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * FavoritosService
 * -----------------
 * Guarda y lee del localStorage del navegador qué noticias marcó
 * el usuario como favoritas (misma clave "wz_favoritos" que usa la
 * versión HTML/CSS/JS, por si corren los dos proyectos en el mismo
 * navegador).
 *
 * Usa un BehaviorSubject para que, apenas un componente se suscribe
 * (con el pipe "async" en el HTML), reciba el valor actual Y los
 * cambios futuros — así, si agregas un favorito desde el Detalle,
 * la página de Favoritos se entera sola sin recargar.
 */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly key = 'wz_favoritos';
  private favoritos$ = new BehaviorSubject<string[]>(this.leer());

  cambios$ = this.favoritos$.asObservable();

  private leer(): string[] {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  }

  private guardar(lista: string[]): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(lista));
    } catch {
      /* noop */
    }
    this.favoritos$.next(lista);
  }

  obtenerActuales(): string[] {
    return this.favoritos$.getValue();
  }

  esFavorita(id: string): boolean {
    return this.obtenerActuales().includes(id);
  }

  toggle(id: string): void {
    const actuales = this.obtenerActuales();
    const idx = actuales.indexOf(id);
    if (idx === -1) {
      this.guardar([...actuales, id]);
    } else {
      this.guardar(actuales.filter((x) => x !== id));
    }
  }
}
