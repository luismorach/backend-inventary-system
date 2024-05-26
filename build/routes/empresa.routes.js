"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresa_controller_1 = __importDefault(require("../controllers/empresa.controller"));
const validations = require('./validations');
const helper = require('./helper');
class EmpresaRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/building', helper.ValidateToken, helper.routeHelper(empresa_controller_1.default.getEmpresas));
        this.router.post('/building', helper.ValidateToken, helper.routeHelper(empresa_controller_1.default.createEmpresa));
        this.router.put('/building/:id_building', helper.ValidateToken, helper.routeHelper(empresa_controller_1.default.actualizarEmpresa));
        //this.router.delete('/building/:id_building', helper.routeHelper(EmpresaController.eliminarEmpresa))
        this.router.use(helper.errorMiddleware);
    }
}
const empresaRoutes = new EmpresaRoutes();
exports.default = empresaRoutes.router;
