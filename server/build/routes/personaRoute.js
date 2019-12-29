"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personaController_1 = __importDefault(require("../controllers/personaController"));
class PersonaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/count', personaController_1.default.count);
        this.router.post('/', personaController_1.default.list);
        this.router.post('/main', personaController_1.default.search);
        this.router.post('/main/add', personaController_1.default.add);
        this.router.delete('/:id', personaController_1.default.delete);
        this.router.put('/', personaController_1.default.update);
        ///////////////////////EVENTOS///////////////////////
        this.router.post('/evento', personaController_1.default.addEvent);
        this.router.get('/evento', personaController_1.default.getEvents);
        this.router.post('/evento/edit', personaController_1.default.updateEvent);
        this.router.delete('/evento/:id', personaController_1.default.deleteEvent);
        this.router.post('/evento/searchname', personaController_1.default.searchNameEvent);
        this.router.post('/evento/searchdate', personaController_1.default.searchDateEvent);
        ///////////////////////ASISTENCIA///////////////////////
        this.router.get('/asistencia', personaController_1.default.assistanceList);
    }
}
const personaRoutes = new PersonaRoutes();
exports.default = personaRoutes.router;
