import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona.service';
import { Evento } from '../../models/evento'

@Component({
    selector: 'app-eventos',
    templateUrl: './eventos.component.html',
    styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

    values:Evento = {
		id: '',
        nombre: '',
        lugar: '',
        fecha: '',
        hora: ''
    }

	eventos:any = []
	
	status:string = 'add';
	searchStatus:string = 'fecha'

	dataName:any = { value: '' }

	dataDate:any = {
		desde: '',
		hasta: ''
	}

	constructor(private personaService: PersonaService) {
        this.getEvents()
	}

	viewName(e){
		this.dataName.value = e

		this.personaService.searchNameEvent(this.dataName).subscribe(
			res => {
				this.eventos = res;
				console.log(res)
			},
			err => console.log(err)
		)
	}

	viewDate(){	
		if(this.dataDate.desde != '' && this.dataDate.hasta != ''){
			console.log(this.dataDate)
			this.personaService.searchDateEvent(this.dataDate).subscribe(
				res => {
					this.eventos = res;
					console.log(res)
				},
				err => console.log(err)
			)
		}		
	}

	getEvents(){
        this.personaService.getEvents().subscribe(
            res => {                
                this.eventos = res
            },
            err => console.log(err)
        )
	}
	
	nameFilter(){		
		this.searchStatus = 'fecha'
	}

	dateFilter(){
		this.searchStatus = 'nombre'
	}

    send(){
        this.personaService.sendEvent(this.values).subscribe(
            res => {				
                this.values.nombre = '';
                this.values.lugar = '';
                this.values.fecha = '';
                this.values.hora = '';
                this.getEvents()

                this.eventos = res
            },
            err => console.log(err)
        )
	}
	
	update(values){
		this.personaService.updateEvent(this.values).subscribe(
			res => {
				this.status = 'add'
				this.getEvents()
				this.values.nombre='';
				this.values.lugar='';
				this.values.fecha='';
				this.values.hora='';
				console.log(res)
			},
			err => console.log(err)
		)
	}

	edit(evento){
		this.status = 'update'
		this.values.id = evento.id;
		this.values.nombre = evento.nombre;
		this.values.lugar = evento.lugar;
		this.values.fecha = evento.fecha;
		this.values.hora = evento.hora;
	}
	
	delete(){
		console.log(this.values.id)
		this.personaService.deleteEvent(this.values.id).subscribe(
			res => {
				this.status = 'add'
				this.values.nombre='';
				this.values.lugar='';
				this.values.fecha='';
				this.values.hora='';
				console.log(res)
				this.getEvents()
			},
			err => console.log(err)
		)
	}

	ngOnInit() {
	}

}
