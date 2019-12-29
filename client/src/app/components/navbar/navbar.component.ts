import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {	

	constructor( private router: Router, private personaService: PersonaService ) {}

	view(e){
		console.log(e)
	}

  	ngOnInit() {
  	}

}
