import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Components
import { PerfilComponent } from './pages/corredor/perfil/perfil.component';
import { ConfirmationComponent } from './pages/confirmacion/confirmacion.component';
import { AgregarEditarEventoComponent } from './pages/admin/agregar-editar-evento/agregar-editar-evento.component';
import { ListadoEventoComponent } from './components/listado-evento/listado-evento.component';
import { VerEventoComponent } from './pages/corredor/ver-evento/ver-evento.component';
import { PagPrincipalComponent } from './pages/corredor/pag-principal/pag-principal.component';
import { EventoCardComponent } from './components/evento-card/evento-card.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { ToolbarBasicExample } from './components/toolbar/toolbar.component';
import { HeaderComponent } from './components/header/header.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
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
import { EventosVolComponent } from './pages/voluntario/eventos-vol/eventos-vol.component';
import { TareasAsignadasComponent } from './pages/voluntario/tareas-asignadas/tareas-asignadas.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ChatComponent } from './pages/chat/chat.component';
import { EmailPopupComponent } from './components/email-popup/email-popup.component';
import { HelpComponent } from './pages/corredor/help/help.component';
import { HelpAComponent } from './pages/admin/help/help.component';
import { HelpVComponent } from './pages/voluntario/help/help.component';
import { HelpIComponent } from './pages/inscriptor/help/help.component';

import { ABMEventosComponent } from './pages/admin/abm-eventos/abm-eventos.component';
import { AbmColaboradoresComponent } from './pages/admin/abm-colaboradores/abm-colaboradores.component';
import { AbmTareasComponent } from './pages/admin/abm-tareas/abm-tareas.component';
import { ReportesComponent } from './pages/admin/reportes/reportes.component';
import { SubirResultadosComponent } from './pages/admin/subir-resultados/subir-resultados.component';
import { VerInscripcionesComponent } from './pages/admin/ver-inscripciones/ver-inscripciones.component';
import { VistaTareasComponent } from './pages/admin/vista-tareas/vista-tareas.component';
import { TareasComponent } from './pages/admin/tareas/tareas.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { MisEventosComponent } from './pages/corredor/mis-eventos/mis-eventos.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ChatSelectorComponent } from './components/chat-selector/chat-selector.component';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { CategoriaComponent } from './pages/admin/abm-categoria/abm-categoria.component';
import { DistanciaComponent } from './pages/admin/abm-distancia/abm-distancia.component';
import { MiInscripcionComponent } from './pages/corredor/mi-inscripcion/mi-inscripcion.component';

//Modulos
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
//import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
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
    EventosVolComponent,
    TareasAsignadasComponent,
    ChatComponent,
    ChatsComponent,
    ABMEventosComponent,
    AbmColaboradoresComponent,
    AbmTareasComponent,
    ReportesComponent,
    SubirResultadosComponent,
    VerInscripcionesComponent,
    VistaTareasComponent,
    CommentFormComponent,
    TareasComponent,
    ResetPasswordComponent,
    MisEventosComponent,
    EmailPopupComponent,
    ChangePasswordComponent,
    ChatSelectorComponent,
    FilterByNamePipe,
    HelpComponent,
    CategoriaComponent,
    DistanciaComponent,
    ReportesComponent,
    ConfirmationComponent,
    HelpAComponent,
    HelpIComponent,
    HelpVComponent,
    MiInscripcionComponent
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    EditorModule,
    NgChartsModule,
  ],
})
export class AppModule {}
