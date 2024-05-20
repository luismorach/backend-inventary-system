"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coins_controller_1 = __importDefault(require("../controllers/coins.controller"));
const validations = require('./validations');
const helper = require('./helper');
class CoinsRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/coins/all', helper.ValidateToken, helper.routeHelper(coins_controller_1.default.getAllCoins));
        this.router.get('/coinsByCountry/:value/:param', helper.ValidateToken, helper.routeHelper(coins_controller_1.default.getCoinByCountry));
        this.router.get('/coins', helper.ValidateToken, helper.routeHelper(coins_controller_1.default.getCoins));
        this.router.get('/coins/secondaries', helper.ValidateToken, helper.routeHelper(coins_controller_1.default.getSecondariesCoins));
        this.router.get('/coins/:id_coin', helper.ValidateToken, helper.routeHelper(coins_controller_1.default.getCoinById));
        this.router.get('/CoinsMain', helper.ValidateToken, helper.routeHelper(coins_controller_1.default.getMainCoin));
        this.router.post('/coins', helper.ValidateToken, helper.routeHelper(coins_controller_1.default.createCoin));
        this.router.put('/coins/:language_code:currency_code:country_code', helper.ValidateToken, helper.routeHelper(coins_controller_1.default.actualizarCoin));
        this.router.put('/coinsCurrency/:language_code/:currency_code/:country_code', helper.ValidateToken, helper.routeHelper(coins_controller_1.default.actualizarCoin));
        this.router.delete('/coins/:language_code/:currency_code', helper.ValidateToken, helper.routeHelper(coins_controller_1.default.eliminarCoin));
        this.router.use(helper.errorMiddleware);
    }
}
const coinsRoutes = new CoinsRoutes();
exports.default = coinsRoutes.router;
