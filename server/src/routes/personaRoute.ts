import { Router } from 'express';
import personaController from '../controllers/personaController';

class PersonaRoutes {
	
	public router: Router = Router();

	constructor () {
		this.config()
	}

	config(): void{
		this.router.get('/count', personaController.count)
		this.router.post('/', personaController.list)
		this.router.post('/main', personaController.search)
		this.router.post('/main/add', personaController.add)
		this.router.delete('/:id', personaController.delete)
		this.router.put('/', personaController.update)	

		///////////////////////EVENTOS///////////////////////

		this.router.post('/evento', personaController.addEvent)
		this.router.get('/evento', personaController.getEvents)
		this.router.post('/evento/edit', personaController.updateEvent)
		this.router.delete('/evento/:id', personaController.deleteEvent)
		this.router.post('/evento/searchname', personaController.searchNameEvent)
		this.router.post('/evento/searchdate', personaController.searchDateEvent)

		///////////////////////ASISTENCIA///////////////////////

		this.router.get('/asistencia', personaController.assistanceList)
	}
}

const personaRoutes = new PersonaRoutes();
export default personaRoutes.router;
