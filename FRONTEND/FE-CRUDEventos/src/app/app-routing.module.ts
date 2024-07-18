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

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //, component: HomeComponent },
  { path: 'inicio', component: PagPrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'proximos-eventos', component: ProximosEventosComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'inscribirse/:id', component: InscripcionComponent },
  { path: 'verResultados/:id', component: VerResultadosComponent },
  { path: 'verEvento/:id', component: VerEventoComponent },
  // { path: 'eventos-proximos', component: EventosProximosComponent },
  // { path: 'resultados', component: ResultadosComponent },
  // { path: 'sobre-nosotros', component: SobreNosotrosComponent }
  { path: 'eventosActivos', component: EventosActivosComponent },
  { path: 'inscripcionManual', component: InscripcionManualComponent },
  { path: 'listaInscriptos/:id', component: ListaInscriptosComponent },

  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
