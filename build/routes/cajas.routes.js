"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cajasController_1 = __importDefault(require("../controllers/cajasController"));
const validations = require('./validations');
const helper = require('./helper');
class CajasRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/registers', helper.ValidateToken, helper.routeHelper(cajasController_1.default.getCajas));
        this.router.get('/registers/:id_register', helper.ValidateToken, helper.routeHelper(cajasController_1.default.getCajaById));
        this.router.post('/registers', helper.ValidateToken, validations.validate(validations.createRegisterValidation), helper.routeHelper(cajasController_1.default.createCaja));
        this.router.put('/registers/:id_register', helper.ValidateToken, helper.routeHelper(cajasController_1.default.actualizarCaja));
        this.router.delete('/registers/:id_register', helper.ValidateToken, helper.routeHelper(cajasController_1.default.eliminarCaja));
        this.router.use(helper.errorMiddleware);
    }
}
const cajasRoutes = new CajasRoutes();
exports.default = cajasRoutes.router;
