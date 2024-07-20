import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Components
import { AgregarEditarEventoComponent } from './pages/agregar-editar-evento/agregar-editar-evento.component';
import { ListadoEventoComponent } from './components/listado-evento/listado-evento.component';
import { VerEventoComponent } from './pages/corredor/ver-evento/ver-evento.component';
import { PagPrincipalComponent } from './pages/corredor/pag-principal/pag-principal.component';
import { EventoCardComponent } from './components/evento-card/evento-card.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { ToolbarBasicExample } from './components/toolbar/toolbar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ResultadosComponent } from './pages/corredor/resultados/resultados.component';
import { ProximosEventosComponent } from './pages/corredor/proximos-eventos/proximos-eventos.component';
import { InscripcionComponent } from './pages/corredor/inscripcion/inscripcion.component';
import { VerResultadosComponent } from './pages/corredor/ver-resultados/ver-resultados.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { TablaResultadosComponent } from './components/tabla-resultados/tabla-resultados.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { EventosActivosComponent } from './pages/inscriptor/eventos-activos/eventos-activos.component';
import { InscripcionManualComponent } from './pages/inscriptor/inscripcion-manual/inscripcion-manual.component';
import { ListaInscriptosComponent } from './pages/inscriptor/lista-inscriptos/lista-inscriptos.component';
import { EventoCardHComponent } from './components/evento-card-h/evento-card-h.component';
import { CrearCorredorComponent } from './pages/inscriptor/crear-corredor/crear-corredor.component';

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
    LoginComponent,
    SignUpComponent,
    ResultadosComponent,
    ProximosEventosComponent,
    InscripcionComponent,
    VerResultadosComponent,
    ComentariosComponent,
    TablaResultadosComponent,
    BuscarComponent,
    EventosActivosComponent,
    InscripcionManualComponent,
    ListaInscriptosComponent,
    EventoCardHComponent,
    CrearCorredorComponent,
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
