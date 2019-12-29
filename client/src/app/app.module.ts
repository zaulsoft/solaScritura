import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './components/lista/lista.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PersonaComponent } from './components/persona/persona.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { PersonaService } from './services/persona.service';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    NavbarComponent,
    PersonaComponent,
    EventosComponent,
	AsistenciaComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule
  ],
  providers: [PersonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
