"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventas_controller_1 = __importDefault(require("../controllers/ventas.controller"));
const helper = require('./helper');
class VentasRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/sells', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.getVentas));
        this.router.get('/sells/:id_sell', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.getVentaById));
        this.router.get('/sells/:initialDate/:endDate', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.getVentasByDate));
        this.router.get('/sellsByDate/:initialDate/:endDate', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.getVentaByDate));
        this.router.get('/sellsProducts/:id_sell', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.getProductosVentaById));
        this.router.get('/sellsProduct/:id_sell/:id_product', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.getProductoVentaById));
        this.router.get('/sellsPays/:id_sell', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.getPagosVentaById));
        this.router.get('/sellsPaysByDate/:initialDate/:endDate', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.getPagosVentaByDate));
        this.router.get('/sellsByUser/:names', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.getVentasByUser));
        this.router.get('/sellsByClient/:names', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.getVentasByClient));
        this.router.post('/sells', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.createVenta));
        this.router.post('/sellsPays', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.createPay));
        this.router.put('/sells/:id_sell', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.actualizarVenta));
        this.router.put('/sellsProducts/:id_sell/:id_product', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.actualizarProductosVenta));
        this.router.delete('/sells/:id_sell', helper.ValidateToken, helper.routeHelper(ventas_controller_1.default.eliminarVenta));
        this.router.use(helper.errorMiddleware);
    }
}
const ventasRoutes = new VentasRoutes();
exports.default = ventasRoutes.router;
