"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriasController_1 = __importDefault(require("../controllers/categoriasController"));
const validations = require('./validations');
const helper = require('./helper');
class CategoriasRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/categories', helper.ValidateToken, helper.routeHelper(categoriasController_1.default.getcategorías));
        this.router.get('/categories/:id_category', helper.ValidateToken, helper.routeHelper(categoriasController_1.default.getcategoríaById));
        this.router.post('/categories', helper.ValidateToken, helper.routeHelper(categoriasController_1.default.createcategoría));
        this.router.put('/categories/:id_category', helper.ValidateToken, helper.routeHelper(categoriasController_1.default.actualizarcategoría));
        this.router.delete('/categories/:id_category', helper.ValidateToken, helper.routeHelper(categoriasController_1.default.eliminarcategoría));
        this.router.use(helper.errorMiddleware);
    }
}
const categoriasRoutes = new CategoriasRoutes();
exports.default = categoriasRoutes.router;
