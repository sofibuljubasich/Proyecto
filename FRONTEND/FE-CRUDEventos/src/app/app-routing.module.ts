import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { VerEventoComponent } from './components/ver-evento/ver-evento.component';
import { PagPrincipalComponent } from './components/pag-principal/pag-principal.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //, component: HomeComponent },
  { path: 'inicio', component: PagPrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
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
