"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = __importDefault(require("../controllers/usuariosController"));
const validations = require('./validations');
const helper = require('./helper');
class UsuariosRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/users', helper.ValidateToken, helper.routeHelper(usuariosController_1.default.getUsuarios));
        this.router.get('/users/:id_user', helper.ValidateToken, helper.routeHelper(usuariosController_1.default.getUsuariosById));
        this.router.post('/users', helper.ValidateToken, helper.routeHelper(usuariosController_1.default.createUsuario));
        this.router.put('/users/:id_user', helper.ValidateToken, helper.ValidateToken, helper.routeHelper(usuariosController_1.default.actualizarUsuario));
        this.router.put('/usersAccount/:id_user', helper.ValidateToken, helper.routeHelper(usuariosController_1.default.actualizarCuenta));
        this.router.delete('/users/:id_user', helper.ValidateToken, helper.routeHelper(usuariosController_1.default.eliminarUsuario));
        this.router.use(helper.errorMiddleware);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
