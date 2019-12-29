import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

	personas:any = [];
	details:any = {
		nombre: '',
		contacto: '',
		direccion: ''
	};
	forNothing:any = {index: 0}
	htmlSrc:string=`<h1 class="text-secondary text-center mt-5">Detalle</h1>`
	nextB:boolean = true;

	countP:any={ index: 0 };
	countN:any={ index: 0 };
	lengthP:any = {index: 5};
	count:number;
	ot:any;

	constructor( private personaService: PersonaService) {
		this.personaService.countPersons().subscribe(
			res => {
				this.count = parseInt(res[0].count)
				console.log(this.count)
			},
			err => console.log(err)
		)
	}

	detail(data){
		this.details.nombre = data.nombre
		this.details.contacto = data.contacto
		this.details.direccion = data.direccion
		console.log(this.details)

		this.htmlSrc = `
		<div class="card">
			<div class="card-header text-center">
				<h3> <b> ${this.details.nombre} </b> </h3>
			</div>
			<div class="card-body">
				<blockquote class="blockquote mb-0">
				<p><i class="fa fa-map-marker-alt"></i> <b>  DIRECCION: </b> <cite>${this.details.direccion}</cite> </p>
				<i class="fa fa-mobile-alt"></i><b>  CONTACTO: </b><cite>${this.details.contacto}</cite>
				</blockquote>
			</div>
		</div>
		`

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
		if(this.details.nombre===''){
			this.details.nombre = 'DETALLE'
		}
		if(this.details.contacto===''){
			this.details.contacto = 'DETALLE'
		}
		if(this.details.direccion===''){
			this.details.direccion = 'DETALLE'
		}
  	}

}
