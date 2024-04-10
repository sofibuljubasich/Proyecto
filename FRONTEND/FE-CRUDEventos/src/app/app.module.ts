import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Components
import { AgregarEditarEventoComponent } from './components/agregar-editar-evento/agregar-editar-evento.component';
import { ListadoEventoComponent } from './components/listado-evento/listado-evento.component';
import { VerEventoComponent } from './components/ver-evento/ver-evento.component';
import { PagPrincipalComponent } from './components/pag-principal/pag-principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modulos
import { SharedModule } from './shared/shared.module';
import { ToolbarBasicExample } from './components/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventoCardComponent } from './components/evento-card/evento-card.component';
import { MatCardModule } from '@angular/material/card';
import { CarruselComponent } from './components/carrusel/carrusel.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
