"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class MainRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('HELLO MAIN'));
    }
}
const mainRoutes = new MainRoutes();
exports.default = mainRoutes.router;
