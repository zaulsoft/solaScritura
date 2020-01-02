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
class LoginController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield database_1.default.query(`select * from testing`);
            res.json(items.rows);
            // res.send('Traer todos los Items')
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const item = yield database_1.default.query(`select * from testing where id = ${id}`);
            res.json(item.rows);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.send('Creating Item')
            // await pool.query(`insert into testing values (1, 'Mario Boo', 54)`)
            // .then(function(response){
            // 	console.log(response.rows)
            // })
            // .catch(function(err){
            // 	console.log(err)
            // })
        });
    }
    delete(req, res) {
        res.send('Deleting item');
    }
    update(req, res) {
        res.send('Updating item');
    }
}
const loginController = new LoginController();
exports.default = loginController;