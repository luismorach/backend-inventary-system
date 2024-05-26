"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repayment_controller_1 = __importDefault(require("../controllers/repayment.controller"));
const helper = require('./helper');
class DevolucionesRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/repayments', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.getDevoluciones));
        this.router.get('/repaymentsById/:ticket', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.getDevolucionesById));
        this.router.get('/repayments/:id_repayment', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.getDevolucionById));
        this.router.get('/repayments/:initialDate/:endDate', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.getDevolucionByDate));
        this.router.get('/repaymentsProducts/:id_repayment', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.getProductosDevolucionById));
        this.router.get('/repaymentsBuy/:id_buy', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.getDevolucionBuy));
        this.router.get('/repaymentsSell/:id_sell', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.getDevolucionSell));
        this.router.get('/repaymentsByUser/:names', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.getDevolucionByUser));
        this.router.get('/repaymentsByType/:type', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.getDevolucionByType));
        this.router.post('/repaymentsBuy', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.createDevolucionCompra));
        this.router.post('/repaymentsSell', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.createDevolucionVenta));
        this.router.put('/repayments/:id_repayment', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.actualizarDevolucion));
        this.router.delete('/repayments/:id_repayment', helper.ValidateToken, helper.routeHelper(repayment_controller_1.default.eliminarDevolucion));
        this.router.use(helper.errorMiddleware);
    }
}
const devolucionesRoutes = new DevolucionesRoutes();
exports.default = devolucionesRoutes.router;
