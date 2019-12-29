import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

	personas:any = [];
	forNothing:any = {index: 0}
	temFor:any;

	constructor( private personaService: PersonaService ) {
		this.list()
	}

	ngOnInit() { }

	list(){
		this.personaService.assistenceList().subscribe(
			res => {
				this.personas = res;
				console.log(this.personas);

				for (let numero of this.personas){
					console.log(numero.id);
				}
			},
			err => console.log(err)
		)
	}

}
