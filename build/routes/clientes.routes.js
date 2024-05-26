"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesController_1 = __importDefault(require("../controllers/clientesController"));
const validations = require('./validations');
const helper = require('./helper');
class ClientesRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/clients', helper.ValidateToken, helper.routeHelper(clientesController_1.default.getClientes));
        this.router.get('/clientsAll', helper.ValidateToken, helper.routeHelper(clientesController_1.default.getAllClientes));
        this.router.get('/clients/:id_client', helper.ValidateToken, helper.routeHelper(clientesController_1.default.getClienteById));
        this.router.post('/clients', helper.ValidateToken, helper.routeHelper(clientesController_1.default.createCliente));
        this.router.put('/clients/:id_client', helper.ValidateToken, helper.routeHelper(clientesController_1.default.actualizarCliente));
        this.router.delete('/clients/:id_client', helper.ValidateToken, helper.routeHelper(clientesController_1.default.eliminarCliente));
        this.router.use(helper.errorMiddleware);
    }
}
const clientesRoutes = new ClientesRoutes();
exports.default = clientesRoutes.router;
