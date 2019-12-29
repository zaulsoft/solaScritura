import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/persona';
import { Evento } from '../../app/models/evento';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

	api_url:any='http://localhost:3000'

  	constructor(private http: HttpClient) { }
  
	getPersons(index:number){
		return this.http.post(`${this.api_url}`, index)
	}

	countPersons(){
		return this.http.get(`${this.api_url}/count`)
	}

	addPerson(persona: Persona){
		delete(persona.id)
		console.log(persona)
		return this.http.post(`${this.api_url}/main/add`, persona)
	}

	updatePerson(persona: Persona) {
		return this.http.put(`${this.api_url}`, persona)
	}

	deletePerson(id:string){
		return this.http.delete(`${this.api_url}/${id}`)
	}

	search(text:string){
		return this.http.post(`${this.api_url}/main`, text)
	}

	///////////////////////EVENTOS///////////////////////

	getEvents(){
		return this.http.get(`${this.api_url}/evento`)
	}

	sendEvent(evento:Evento){
		return this.http.post(`${this.api_url}/evento`, evento)
	}

	updateEvent(evento:Evento){
		return this.http.post(`${this.api_url}/evento/edit`, evento)
	}

	deleteEvent(id:string){
		return this.http.delete(`${this.api_url}/evento/${id}`)
	}

	searchNameEvent(text:string){
		return this.http.post(`${this.api_url}/evento/searchname`, text)
	}

	searchDateEvent(text:any){
		return this.http.post(`${this.api_url}/evento/searchdate`, text)
	}

	///////////////////////ASISTENCIA///////////////////////

	assistenceList(){
		return this.http.get(`${this.api_url}/asistencia`)
	}

	// addPerson(persona:Persona){
	// 	return this.http.get(`${this.api_url}, ${persona}`)
	// }
  
}
