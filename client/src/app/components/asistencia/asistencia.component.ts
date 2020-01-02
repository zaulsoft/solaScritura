import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})

export class AsistenciaComponent implements OnInit {

	personas:any = [];
	forNothing:any = {index: 0}
	form: FormGroup;
	ordersData = [
		{ id: 100, name: 'order 1' },
		{ id: 200, name: 'order 2' },
		{ id: 300, name: 'order 3' },
		{ id: 400, name: 'order 4' },
		{ id: 400, name: 'order 5' }
	];

	constructor( private personaService: PersonaService, private formBuilder: FormBuilder ) {
		this.list()

		this.form = this.formBuilder.group({
			orders: new FormArray([])
		});

		this.addCheckboxes();
	}

	private addCheckboxes(){
		this.ordersData.forEach((o, i) => {
			const control = new FormControl( i === 0 ); //Si el primer item se almaacena true,
			(this.form.controls.orders as FormArray).push(control);
		});
	}

	submit(){
		const selectedOrdersIds = this.form.value.orders
		.map((v, i) => v ? this.orders[i].id: null)
		.filter( v => v !== null );
		console.log(selectedOrdersIds)
	}
	
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
		};
		
	ngOnInit() { }
}
