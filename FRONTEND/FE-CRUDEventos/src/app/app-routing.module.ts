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

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //, component: HomeComponent },
  { path: 'inicio', component: PagPrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'proximos-eventos', component: ProximosEventosComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'inscribirse/:id', component: InscripcionComponent },
  // { path: 'verEvento', component: VerEventoComponent },
  { path: 'verEvento/:id', component: VerEventoComponent },
  // { path: 'eventos-proximos', component: EventosProximosComponent },
  // { path: 'resultados', component: ResultadosComponent },
  // { path: 'sobre-nosotros', component: SobreNosotrosComponent }
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
