"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PersonaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let persons = yield database_1.default.query(`select * from persona order by nombre limit 5 offset ${data.index}`);
            res.send(persons.rows);
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let result = yield database_1.default.query(`
			insert into persona values (uuid_generate_v1(), '${data.nombre}', '${data.contacto}', '${data.direccion}')
		`);
            res.json({ result: result.rows });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            database_1.default.query(`
			update persona set nombre='${data.nombre}',
			contacto='${data.contacto}', direccion='${data.direccion}'
			where id='${data.id}';
		`);
            res.json({ message: 'Person Updated' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            yield database_1.default.query(`delete from persona where id = '${id}'`);
            res.json({ text: 'Dato Eliminado' });
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let result = yield database_1.default.query(`
			select * from persona where nombre ilike '%${data.value}%' order by nombre limit 5;
		`);
            res.json({ text: result.rows });
        });
    }
    count(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = database_1.default.query(`select count(*) from persona`);
            res.send((yield result).rows);
        });
    }
    ///////////////////////EVENTOS///////////////////////
    addEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let result = yield database_1.default.query(`
			insert into eventos values ( '${data.nombre}', '${data.lugar}', '${data.fecha}', '${data.hora}' )
		`);
            res.json({ result: result.rows });
        });
    }
    getEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let events = yield database_1.default.query(`select * from eventos order by fecha`);
            res.send(events.rows);
        });
    }
    updateEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let result = yield database_1.default.query(`
			update eventos set nombre='${data.nombre}',
			lugar='${data.lugar}', fecha='${data.fecha}',
			hora='${data.hora}' where id='${data.id}';
		`);
            res.json({ result: result.rows });
        });
    }
    deleteEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            yield database_1.default.query(`delete from eventos where id = '${id}'`);
            res.json({ text: 'Dato Eliminado' });
        });
    }
    searchNameEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let result = yield database_1.default.query(`
			select * from eventos where nombre ilike '%${data.value}%' order by nombre;
		`);
            res.send(result.rows);
        });
    }
    searchDateEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = req.body;
            let result = yield database_1.default.query(`
			select * from eventos where fecha between '${data.desde}' and '${data.hasta}' order by fecha;
		`);
            res.send(result.rows);
        });
    }
    ///////////////////////ASISTENCIA///////////////////////
    assistanceList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield database_1.default.query(`
			select * from persona order by nombre
		`);
            res.send(result.rows);
        });
    }
}
const personaController = new PersonaController();
exports.default = personaController;
