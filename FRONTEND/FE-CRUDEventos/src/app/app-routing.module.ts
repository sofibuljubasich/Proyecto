import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ConfirmationComponent } from './pages/confirmacion/confirmacion.component';
import { PerfilComponent } from './pages/corredor/perfil/perfil.component';
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
import { TareasComponent } from './pages/admin/tareas/tareas.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { MisEventosComponent } from './pages/corredor/mis-eventos/mis-eventos.component';
import { PagoExitosoComponent } from './pages/pago-exitoso/pago-exitoso.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { HelpComponent } from './pages/corredor/help/help.component';
import { CategoriaComponent } from './pages/admin/abm-categoria/abm-categoria.component';
import { DistanciaComponent } from './pages/admin/abm-distancia/abm-distancia.component';
import { HelpAComponent } from './pages/admin/help/help.component';
import { HelpIComponent } from './pages/inscriptor/help/help.component';
import { HelpVComponent } from './pages/voluntario/help/help.component';
import { MiInscripcionComponent } from './pages/corredor/mi-inscripcion/mi-inscripcion.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //, component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'pago-exitoso', component: PagoExitosoComponent },
  { path:'confirmacionCuenta', component: ConfirmationComponent},
  // CORREDOR
  { path: 'inicio', component: PagPrincipalComponent },
  { path: 'proximos-eventos', component: ProximosEventosComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'inscribirse/:id', component: InscripcionComponent },
  { path: 'verResultados/:id', component: VerResultadosComponent },
  { path: 'verEvento/:id', component: VerEventoComponent },
  { path: 'misEventos', component: MisEventosComponent },
  { path: 'ayuda', component: HelpComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'miInscripcion/:id', component: MiInscripcionComponent },
  // INSCRIPTOR
  { path: 'eventosActivos', component: EventosActivosComponent },
  { path: 'inscripcionManual/:id', component: InscripcionManualComponent },
  { path: 'listaInscriptos/:id', component: ListaInscriptosComponent },
  { path: 'crearCorredor', component: CrearCorredorComponent },
  { path: 'ayudaI', component: HelpIComponent },

  // VOLUNTARIO
  { path: 'eventos', component: EventosVolComponent },
  { path: 'tareasAsignadas/:id', component: TareasAsignadasComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'ayudaV', component: HelpVComponent },

  // ADMINISTRADOR

  { path: 'ABM-Eventos', component: ABMEventosComponent },
  { path: 'ABM-Colaboradores', component: AbmColaboradoresComponent },
  { path: 'ABM-Categorias', component: CategoriaComponent },
  { path: 'ABM-Distancias', component: DistanciaComponent },
  { path: 'distancias', component: DistanciaComponent },
  { path: 'ABM-Tareas/:id', component: AbmTareasComponent },
  { path: 'ABM-Tareas', component: AbmTareasComponent },
  { path: 'reportes/:id', component: ReportesComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'alta-resultados/:id', component: SubirResultadosComponent },
  { path: 'verInscripciones/:id', component: VerInscripcionesComponent },
  { path: 'vistaTareas', component: VistaTareasComponent },
  { path: 'tareas-creadas/:id', component: TareasComponent },
  { path: 'altaEventos/:id', component: AgregarEditarEventoComponent },
  { path: 'altaEventos', component: AgregarEditarEventoComponent },
  { path: 'ayudaA', component: HelpAComponent },
  // { path: 'voluntarios/:id', component: VoluntariosComponent },

  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
