import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../models/persona';
// import * as $ from 'jquery';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

	filterValue:string;
	personas:any = [];	
	values:Persona = {
		id: '',
		nombre: '',
		contacto: '',
		direccion: ''
	};

	status:string = 'add';
	
	valueT:any = {value: ''}
	result:any;
	resultArray:any;
	indexPagination:any={ index: 0 };
	countP:any={ index: 0 };
	countN:any={ index: 0 };
	forNothing:any={ index: 0 };
	ot:any;
	count:number;
	lengthP:any = {index: 5};
	nextB:boolean = true;

	alert:boolean = false;

	inputNameClass:any='form-control';
	smallNote:boolean=false;
	
	constructor( private personaService: PersonaService ) {
		localStorage.setItem("indexPagination", JSON.stringify(this.indexPagination))
		localStorage.setItem("lengthPagination", JSON.stringify(this.lengthP))		
		this.personaService.countPersons().subscribe(
			res => {
				this.count = parseInt(res[0].count)
				console.log(this.count)
			},
			err => console.log(err)
		)

	}

	view(e){
		this.valueT.value = e;
		this.personaService.search(this.valueT).subscribe(
			res => {
				this.result = res
				this.result.text
				console.log(this.result.text)
				this.resultArray = this.result.text
				if(this.resultArray === []){
					alert('Nothing');
				}else{
					this.personas = this.resultArray;
				}
			},
			err => console.log(err)
		)
	}

	getPersons(){
		this.personaService.getPersons(this.forNothing).subscribe(
			res => {
				this.personas = res;
				console.log(this.personas)
			},
			err => console.log(err)
		)
	}
	
	send(values) {

		if(values.nombre === ''){
			this.inputNameClass = 'form-control is-invalid';
			this.smallNote = true;		

		}else{
			this.personaService.addPerson(values).subscribe(
				res => {
					console.log(res)
					this.ngOnInit()
					this.values.nombre='';
					this.values.contacto='';
					this.values.direccion='';
				},
				err => console.log(err)
			)
			this.inputNameClass = 'form-control';
			this.smallNote = false;

			this.count = this.count +1
		}
		
	}

	updateValue(persona: Persona) {
		this.values.id = persona.id;
		this.values.nombre = persona.nombre;
		this.values.contacto = persona.contacto;
		this.values.direccion = persona.direccion;
		this.status = 'update';
	}

	updateButton(data){
		this.personaService.updatePerson(data).subscribe(
			res => {
				this.getPersons()
				this.status='add';
				this.values.nombre='';
				this.values.contacto='';
				this.values.direccion='';
			},
			err => console.log(err)
		)
	}

	delete(id: string){
		this.personaService.deletePerson(id).subscribe(
			res => {
				this.getPersons()
				console.log(res)
			},
			err => console.log(err)
		)
		this.values.nombre='';
		this.values.contacto='';
		this.values.direccion='';
		this.status = 'add';
	}

	next(){

		this.countN = JSON.parse(localStorage.getItem("indexPagination"));
		this.lengthP = JSON.parse(localStorage.getItem("lengthPagination"));
		this.lengthP.index + 5
		console.log(this.lengthP.index)

		this.lengthP.index = this.lengthP.index + 5;
		this.countN.index = this.countN.index + 5;
	
		localStorage.setItem("lengthPagination", JSON.stringify(this.lengthP))
		localStorage.setItem("indexPagination", JSON.stringify(this.countN))

		if(this.lengthP.index >= this.count){
			this.lengthP.index = this.count
			this.nextB = false
		}
		// else if(this.lengthP.index <= 5){
		// 	this.lengthP.index = this.lengthP.index
		// }

		this.personaService.getPersons(this.countN).subscribe(
			res => {
				console.log(res)
				this.personas = res;
				console.log(this.personas.lenght);

				if(this.countN.index > this.count){
					this.previous()
				}

			},
			err => console.log(err)
		)

	}

	previous(){
		if(this.nextB === false){
			this.nextB = true;
		}

		this.ot = JSON.parse(localStorage.getItem("indexPagination"))		
		if(this.ot.index >= 1){

			this.countP = JSON.parse(localStorage.getItem("indexPagination"));
			this.lengthP = JSON.parse(localStorage.getItem("lengthPagination"));

			this.lengthP.index = this.lengthP.index - 5
			this.countP.index = this.countP.index - 5

			localStorage.setItem("lengthPagination", JSON.stringify(this.lengthP))
			localStorage.setItem("indexPagination", JSON.stringify(this.countP))

			console.log(this.countP)
			this.personaService.getPersons(this.countP).subscribe(
				res => {
					this.personas = res;
				},
				err => console.log(err)
			)
			
		}
	}

	ngOnInit() {
		this.getPersons()
		this.status='add';
	}
}
// Esto va en la etiqueta form
// #addPerson="ngForm" (ngSubmit)="send(addPerson)"