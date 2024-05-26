"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validations = require('./validations');
const helper = require('./helper');
const conection_1 = __importDefault(require("../database/conection"));
class UsuariosRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/', async (req, res) => {
            console.log('pasando');
            const response = await conection_1.default.query('SELECT * FROM registers WHERE id_register!=0 ORDER BY name_register ASC');
            res.json(response.rows);
        });
        this.router.post('/login', helper.routeHelper(auth_controller_1.default.auth));
        this.router.post('/forgot-password', helper.routeHelper(auth_controller_1.default.forgotPassword));
        this.router.put('/change-password', helper.routeHelper(auth_controller_1.default.changePassword));
        this.router.put('/refresh-token', helper.routeHelper(auth_controller_1.default.refreshToken));
        this.router.use(helper.errorMiddleware);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
