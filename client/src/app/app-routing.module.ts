import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaComponent } from './components/lista/lista.component';
import { PersonaComponent } from './components/persona/persona.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';


const routes: Routes = [
	{ path: '', redirectTo: '/main', pathMatch: 'full' },
	{path: 'main', component: ListaComponent},
	{path: 'persona', component: PersonaComponent},
	{path: 'eventos', component: EventosComponent},
	{path: 'asistencia', component: AsistenciaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
