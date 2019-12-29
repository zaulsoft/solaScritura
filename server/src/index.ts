import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import personaRoutes from './routes/personaRoute';

class Server {

	public app: Application;

	constructor(){
		this.app = express()
		this.config()
		this.routes()
	}

	start(): void{
		this.app.listen(this.app.get('port'), () => {
			console.log('Server running in port: ' + this.app.get('port'))
		})
	}

	config(): void{
		this.app.set('port', process.env.PORT || 3000)
		this.app.use(morgan('dev'))
		this.app.use(cors())
		this.app.use(express.json())
		this.app.use(express.urlencoded({extended: true}))
		
	}

	routes(): void{
		this.app.use('/', personaRoutes)
	}
}

const server = new Server();
server.start() 
