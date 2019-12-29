import pool from '../database';
import { Request, Response } from 'express';

class PersonaController {
	public async list (req:Request, res:Response){
		let data = req.body
		let persons = await pool.query(`select * from persona order by nombre limit 5 offset ${data.index}`);
		res.send(persons.rows)
	}

	public async add (req:Request, res:Response){
		let data = req.body;
		let result = await pool.query(`
			insert into persona values (uuid_generate_v1(), '${data.nombre}', '${data.contacto}', '${data.direccion}')
		`);
		res.json({result: result.rows})
	}

	public async update (req:Request, res:Response) {
		let data = req.body;
		pool.query(`
			update persona set nombre='${data.nombre}',
			contacto='${data.contacto}', direccion='${data.direccion}'
			where id='${data.id}';
		`)
		res.json({message: 'Person Updated'})
	}

	public async delete (req:Request, res:Response) {
		let { id } = req.params;
		await pool.query(`delete from persona where id = '${id}'`)
		res.json({text: 'Dato Eliminado'})
	}

	public async search (req:Request, res:Response) {
		let data = req.body;
		let result = await pool.query(`
			select * from persona where nombre ilike '%${data.value}%' order by nombre limit 5;
		`)
		res.json({text: result.rows});
	}

	public async count (req: Request, res:Response){
		let result = pool.query(`select count(*) from persona`)
		res.send((await result).rows);
	}


	///////////////////////EVENTOS///////////////////////

	public async addEvent (req:Request, res:Response){
		let data = req.body;
		let result = await pool.query(`
			insert into eventos values ( '${data.nombre}', '${data.lugar}', '${data.fecha}', '${data.hora}' )
		`);
		res.json({result: result.rows})
	}

	public async getEvents (req:Request, res:Response){
		let events = await pool.query(`select * from eventos order by fecha`);
		res.send(events.rows);
	}

	public async updateEvent (req:Request, res:Response){
		let data = req.body;
		let result = await pool.query(`
			update eventos set nombre='${data.nombre}',
			lugar='${data.lugar}', fecha='${data.fecha}',
			hora='${data.hora}' where id='${data.id}';
		`);
		res.json({result: result.rows})
	}

	public async deleteEvent (req:Request, res:Response) {
		let { id } = req.params;
		await pool.query(`delete from eventos where id = '${id}'`)
		res.json({text: 'Dato Eliminado'})
	}

	public async searchNameEvent (req:Request, res:Response) {
		let data = req.body;
		let result = await pool.query(`
			select * from eventos where nombre ilike '%${data.value}%' order by nombre;
		`)
		res.send(result.rows);
	}

	public async searchDateEvent (req:Request, res:Response) {
		let data = req.body;
		let result = await pool.query(`
			select * from eventos where fecha between '${data.desde}' and '${data.hasta}' order by fecha;
		`)
		res.send(result.rows)
	}

	///////////////////////ASISTENCIA///////////////////////

	public async assistanceList (req:Request, res:Response){
		let result = await pool.query(`
			select * from persona order by nombre
		`)
		res.send(result.rows)
	}

	// public async pagination (req:Request, res:Response){
	// 	let data = req.body;
	// 	let result = await pool.query(`select * from persona order by nombre limit 5 offset ${data.index}`);
	// 	res.send(result.rows)
	// }
}

const personaController = new PersonaController();
export default personaController;