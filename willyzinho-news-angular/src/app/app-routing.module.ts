import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NoticiasListComponent } from './pages/noticias-list/noticias-list.component';
import { NoticiaDetalleComponent } from './pages/noticia-detalle/noticia-detalle.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'noticias', component: NoticiasListComponent },
  { path: 'noticias/:id', component: NoticiaDetalleComponent }, // :id → parámetro de ruta
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'administrar', component: AdminComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
