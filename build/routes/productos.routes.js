"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = __importDefault(require("../controllers/productosController"));
const validations = require('./validations');
const helper = require('./helper');
class ProductosRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/products', helper.ValidateToken, helper.routeHelper(productosController_1.default.getProductos));
        this.router.get('/products/sells', helper.ValidateToken, helper.routeHelper(productosController_1.default.getProductosMasVendidos));
        this.router.get('/products/expir', helper.ValidateToken, helper.routeHelper(productosController_1.default.getProductosPorVencimiento));
        this.router.get('/products/:id_product', helper.ValidateToken, helper.routeHelper(productosController_1.default.getProductoById));
        this.router.get('/products/barcode/:barcode', helper.ValidateToken, helper.routeHelper(productosController_1.default.getProductoByBarcode));
        this.router.get('/products/category/:id_category', helper.ValidateToken, helper.routeHelper(productosController_1.default.getProductoByCategory));
        this.router.post('/products', helper.ValidateToken, helper.routeHelper(productosController_1.default.createProducto));
        this.router.put('/products/:id_product', helper.ValidateToken, helper.routeHelper(productosController_1.default.actualizarProducto));
        this.router.delete('/products/:id_product', helper.ValidateToken, helper.routeHelper(productosController_1.default.eliminarProducto));
        this.router.use(helper.errorMiddleware);
    }
}
const productosRoutes = new ProductosRoutes();
exports.default = productosRoutes.router;
