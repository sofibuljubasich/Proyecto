import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Components
import { AgregarEditarEventoComponent } from './components/agregar-editar-evento/agregar-editar-evento.component';
import { ListadoEventoComponent } from './components/listado-evento/listado-evento.component';
import { VerEventoComponent } from './components/ver-evento/ver-evento.component';
import { PagPrincipalComponent } from './components/pag-principal/pag-principal.component';
import { EventoCardComponent } from './components/evento-card/evento-card.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { ToolbarBasicExample } from './components/toolbar/toolbar.component';
import { HeaderComponent } from './components/header/header.component';

//Modulos
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarEventoComponent,
    ListadoEventoComponent,
    VerEventoComponent,
    PagPrincipalComponent,
    ToolbarBasicExample,
    EventoCardComponent,
    CarruselComponent,
    HeaderComponent,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
})
export class AppModule {}
