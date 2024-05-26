"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taxesController_1 = __importDefault(require("../controllers/taxesController"));
const validations = require('./validations');
const helper = require('./helper');
class CajasRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/taxes', helper.ValidateToken, helper.routeHelper(taxesController_1.default.getTaxes));
        this.router.get('/taxes/:tax_id', helper.ValidateToken, helper.routeHelper(taxesController_1.default.getTaxById));
        this.router.post('/taxes', helper.ValidateToken, validations.validate(validations.createRegisterValidation), helper.routeHelper(taxesController_1.default.createTax));
        this.router.put('/taxes/:tax_id', helper.ValidateToken, helper.routeHelper(taxesController_1.default.updateTax));
        this.router.delete('/taxes/:tax_id', helper.ValidateToken, helper.routeHelper(taxesController_1.default.deleteTax));
        this.router.use(helper.errorMiddleware);
    }
}
const cajasRoutes = new CajasRoutes();
exports.default = cajasRoutes.router;
