"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
class CajasController {
    async getKardex(req, res) {
        const response = await database_1.default.query('SELECT * FROM kardex JOIN products ON ' +
            'kardex.id_product=products.id_product ORDER BY time ASC');
        res.json(response.rows);
    }
    async getKardexById(req, res) {
        const type = req.params.type;
        const id_operation = parseInt(req.params.id_operation);
        const id_product = parseInt(req.params.id_product);
        if (Number.isNaN(id_operation) || Number.isNaN(id_product)) {
            throw ('No existe un movimiento con la informacion especificada, verifiquela e intente nuevamente');
        }
        console.log(type);
        const response = await database_1.default.query('SELECT * FROM kardex JOIN products ON ' +
            'kardex.id_product=products.id_product where type=$1 And id_operation=$2 AND kardex.id_product=$3 ' +
            'ORDER BY date,time ASC', [type, id_operation, id_product]);
        if (response.rowCount > 0) {
            res.json(response.rows);
        }
        else {
            throw ('No existen movimientos con la informacion especificada ' +
                'actualice el kardex e intentelo nuevamente');
        }
    }
    async getKardexByDate(req, res) {
        const initialDate = req.params.initialDate;
        const endDate = req.params.endDate;
        const response = await database_1.default.query('SELECT distinct on ' +
            '(kardex.id_operation,kardex.id_product,kardex.type,kardex.time)* FROM kardex JOIN products ON ' +
            'kardex.id_product=products.id_product JOIN currencies c on ' +
            'c.currency_code=kardex.currency_code where date>=$1 and date<=$2 ORDER BY kardex.time ASC', [initialDate, endDate]);
        res.json(response.rows);
    }
    async getKardexByProduct(req, res) {
        const barcode = parseInt(req.params.barcode);
        const response = await database_1.default.query('SELECT * FROM kardex JOIN products ON ' +
            'kardex.id_product=products.id_product JOIN currencies c on ' +
            'c.currency_code=kardex.currency_code ' +
            'where products.barcode=$1 order by kardex.time asc ', [barcode]);
        res.json(response.rows);
    }
}
const cajasController = new CajasController();
exports.default = cajasController;
