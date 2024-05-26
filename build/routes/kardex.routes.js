"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kardex_controller_1 = __importDefault(require("../controllers/kardex.controller"));
const validations = require('./validations');
const helper = require('./helper');
class KardexRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/kardex', helper.ValidateToken, helper.routeHelper(kardex_controller_1.default.getKardex));
        this.router.get('/kardexByDate/:initialDate/:endDate', helper.ValidateToken, helper.routeHelper(kardex_controller_1.default.getKardexByDate));
        this.router.get('/kardexByProduct/:barcode', helper.ValidateToken, helper.routeHelper(kardex_controller_1.default.getKardexByProduct));
        this.router.get('/kardex/:type/:id_operation/:id_product', helper.ValidateToken, helper.routeHelper(kardex_controller_1.default.getKardexById));
        this.router.use(helper.errorMiddleware);
    }
}
const kardexRoutes = new KardexRoutes();
exports.default = kardexRoutes.router;
