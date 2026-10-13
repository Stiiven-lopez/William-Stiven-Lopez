import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'wz-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  lista: Noticia[] = [];
  mensaje = '';

  imagenesDisponibles = [
    { valor: 'assets/img/court.svg', label: 'Cancha' },
    { valor: 'assets/img/ball.svg', label: 'Balón' },
    { valor: 'assets/img/jersey.svg', label: 'Camiseta' },
    { valor: 'assets/img/trophy.svg', label: 'Trofeo' },
    { valor: 'assets/img/goal.svg', label: 'Arco' },
    { valor: 'assets/img/whistle.svg', label: 'Silbato' },
    { valor: 'assets/img/stadium.svg', label: 'Reflectores' },
    { valor: 'assets/img/medal.svg', label: 'Medalla' },
  ];

  categorias = ['FUTSAL', 'FUTBOL-SALON', 'TORNEOS', 'JUGADORES', 'HISTORIAS', 'RESULTADOS'];

  form = this.fb.group({
    titulo: ['', Validators.required],
    etiqueta: ['', Validators.required],
    categoria: ['FUTSAL', Validators.required],
    fecha: ['', Validators.required],
    meta: ['Willyzinho News'],
    resumen: ['', Validators.required],
    contenido: ['', Validators.required],
    imagen: ['assets/img/court.svg'],
  });

  constructor(private fb: FormBuilder, private noticiasSrv: NoticiasService) {}

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.noticiasSrv.obtenerTodas().subscribe((todas) => (this.lista = todas));
  }

  esPersonalizada(id: string): boolean {
    return this.noticiasSrv.esPersonalizada(id);
  }

  publicar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;
    const parrafos = (v.contenido ?? '')
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    this.noticiasSrv.crear({
      titulo: (v.titulo ?? '').toUpperCase(),
      etiqueta: (v.etiqueta ?? '').toUpperCase(),
      categoria: v.categoria ?? 'FUTSAL',
      fecha: v.fecha ?? '',
      meta: v.meta ?? 'Willyzinho News',
      resumen: v.resumen ?? '',
      contenido: parrafos,
      imagen: v.imagen ?? 'assets/img/court.svg',
    });

    this.mensaje = '¡Listo! Tu noticia ya está publicada — la puedes ver en Noticias o en el Home.';
    this.form.reset({ categoria: 'FUTSAL', meta: 'Willyzinho News', imagen: 'assets/img/court.svg' });
    this.cargar();
  }

  eliminar(id: string): void {
    if (!confirm('¿Eliminar esta noticia? No se puede deshacer.')) return;
    this.noticiasSrv.borrar(id);
    this.cargar();
  }
}
