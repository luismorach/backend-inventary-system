"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compras_controller_1 = __importDefault(require("../controllers/compras.controller"));
const helper = require('./helper');
class ComprasRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/buys', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.getCompras));
        this.router.get('/buys/:id_buy', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.getCompraById));
        this.router.get('/buys/:initialDate/:endDate', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.getCompraByDate));
        this.router.get('/buysProducts/:id_buy', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.getProductosCompraById));
        this.router.get('/buysProduct/:id_buy/:id_product', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.getProductoCompraById));
        this.router.get('/buysByUser/:names', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.getComprasByUser));
        this.router.get('/buysByProvider/:name', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.getComprasByProvider));
        this.router.post('/buys', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.createCompra));
        this.router.put('/buys/:id_buy', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.actualizarCompra));
        this.router.put('/buysProducts/:id_buy/:id_product', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.actualizarProductosCompra));
        this.router.delete('/buys/:id_buy', helper.ValidateToken, helper.routeHelper(compras_controller_1.default.eliminarCompra));
        this.router.use(helper.errorMiddleware);
    }
}
const comprasRoutes = new ComprasRoutes();
exports.default = comprasRoutes.router;
