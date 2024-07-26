import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { VerEventoComponent } from './pages/corredor/ver-evento/ver-evento.component';
import { PagPrincipalComponent } from './pages/corredor/pag-principal/pag-principal.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { ProximosEventosComponent } from './pages/corredor/proximos-eventos/proximos-eventos.component';
import { ResultadosComponent } from './pages/corredor/resultados/resultados.component';
import { InscripcionComponent } from './pages/corredor/inscripcion/inscripcion.component';
import { VerResultadosComponent } from './pages/corredor/ver-resultados/ver-resultados.component';
import { EventosActivosComponent } from './pages/inscriptor/eventos-activos/eventos-activos.component';
import { InscripcionManualComponent } from './pages/inscriptor/inscripcion-manual/inscripcion-manual.component';
import { ListaInscriptosComponent } from './pages/inscriptor/lista-inscriptos/lista-inscriptos.component';
import { CrearCorredorComponent } from './pages/inscriptor/crear-corredor/crear-corredor.component';
import { TareasAsignadasComponent } from './pages/voluntario/tareas-asignadas/tareas-asignadas.component';
import { EventosVolComponent } from './pages/voluntario/eventos-vol/eventos-vol.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AbmColaboradoresComponent } from './pages/admin/abm-colaboradores/abm-colaboradores.component';
import { ABMEventosComponent } from './pages/admin/abm-eventos/abm-eventos.component';
import { AbmTareasComponent } from './pages/admin/abm-tareas/abm-tareas.component';
import { ReportesComponent } from './pages/admin/reportes/reportes.component';
import { SubirResultadosComponent } from './pages/admin/subir-resultados/subir-resultados.component';
import { VerInscripcionesComponent } from './pages/admin/ver-inscripciones/ver-inscripciones.component';
import { VistaTareasComponent } from './pages/admin/vista-tareas/vista-tareas.component';
import { AgregarEditarEventoComponent } from './pages/admin/agregar-editar-evento/agregar-editar-evento.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //, component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  // CORREDOR
  { path: 'inicio', component: PagPrincipalComponent },
  { path: 'proximos-eventos', component: ProximosEventosComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'inscribirse/:id', component: InscripcionComponent },
  { path: 'verResultados/:id', component: VerResultadosComponent },
  { path: 'verEvento/:id', component: VerEventoComponent },
  // INSCRIPTOR
  { path: 'eventosActivos', component: EventosActivosComponent },
  { path: 'inscripcionManual/:id', component: InscripcionManualComponent },
  { path: 'listaInscriptos/:id', component: ListaInscriptosComponent },
  { path: 'crearCorredor', component: CrearCorredorComponent },
  // VOLUNTARIO
  { path: 'eventos', component: EventosVolComponent },
  { path: 'tareasAsignadas/:id', component: TareasAsignadasComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'chats', component: ChatsComponent },
  // ADMINISTRADOR
  { path: 'ABM-Eventos', component: ABMEventosComponent },
  { path: 'ABM-Colaboradores', component: AbmColaboradoresComponent },
  { path: 'ABM-Tareas/:id', component: AbmTareasComponent },
  { path: 'reportes/:id', component: ReportesComponent },
  { path: 'alta-resultados/:id', component: SubirResultadosComponent },
  { path: 'verInscripciones/:id', component: VerInscripcionesComponent },
  { path: 'vistaTareas', component: VistaTareasComponent },
  { path: 'altaEventos', component: AgregarEditarEventoComponent },
  // { path: 'voluntarios/:id', component: VoluntariosComponent },

  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
