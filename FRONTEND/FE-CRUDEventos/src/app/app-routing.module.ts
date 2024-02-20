import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '' }, //, component: HomeComponent },
  // { path: 'eventos-proximos', component: EventosProximosComponent },
  // { path: 'resultados', component: ResultadosComponent },
  // { path: 'sobre-nosotros', component: SobreNosotrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
