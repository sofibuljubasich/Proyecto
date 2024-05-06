import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { VerEventoComponent } from './components/ver-evento/ver-evento.component';
import { PagPrincipalComponent } from './components/pag-principal/pag-principal.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //, component: HomeComponent },
  { path: 'inicio', component: PagPrincipalComponent },
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
