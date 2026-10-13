import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoticiaCardComponent } from './components/noticia-card/noticia-card.component';

import { HomeComponent } from './pages/home/home.component';
import { NoticiasListComponent } from './pages/noticias-list/noticias-list.component';
import { NoticiaDetalleComponent } from './pages/noticia-detalle/noticia-detalle.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminComponent } from './pages/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NoticiaCardComponent,
    HomeComponent,
    NoticiasListComponent,
    NoticiaDetalleComponent,
    FavoritosComponent,
    ContactoComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // necesario para que NoticiasService pueda usar HttpClient
    ReactiveFormsModule, // necesario para los formularios de Contacto y Administrar
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
