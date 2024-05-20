"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedoresController_1 = __importDefault(require("../controllers/proveedoresController"));
const validations = require('./validations');
const helper = require('./helper');
class ProveedorRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/providers', helper.ValidateToken, helper.routeHelper(proveedoresController_1.default.getProveedores));
        this.router.get('/providers/:id_provider', helper.ValidateToken, helper.routeHelper(proveedoresController_1.default.getProveedoresById));
        this.router.post('/providers', helper.ValidateToken, helper.routeHelper(proveedoresController_1.default.createProveedor));
        this.router.put('/providers/:id_provider', helper.ValidateToken, helper.routeHelper(proveedoresController_1.default.actualizarProveedor));
        this.router.delete('/providers/:id_provider', helper.ValidateToken, helper.routeHelper(proveedoresController_1.default.eliminarProveedor));
        this.router.use(helper.errorMiddleware);
    }
}
const proveedorRoutes = new ProveedorRoutes();
exports.default = proveedorRoutes.router;
