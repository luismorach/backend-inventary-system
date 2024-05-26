"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conection_1 = __importDefault(require("../database/conection"));
class CajasController {
    async getData(req, res) {
        const response = await conection_1.default.query('select count (*) as registers,' +
            '(select count (*) as categories from categories),' +
            '(select count (*) as providers from providers),' +
            '(select count (*) as users from users WHERE id_user!=0),' +
            '(select count (*) as clients from clients WHERE id_client!=0),' +
            '(select count (*) as products from products),' +
            '(select count (*) as buys from buys),' +
            '(select count (*) as sells from sells),' +
            '(select count (*) as repayments from repayment),' +
            '(select count (*) as kardex from kardex)' +
            'from registers WHERE id_register!=0');
        res.json(response.rows);
    }
}
const cajasController = new CajasController();
exports.default = cajasController;
