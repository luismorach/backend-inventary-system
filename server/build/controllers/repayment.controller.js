"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
class DevolucionesController {
    async getDevoluciones(req, res) {
        const response = await database_1.default.query('SELECT * FROM repayment ORDER BY date,time DESC ');
        res.json(response.rows);
    }
    async getDevolucionById(req, res) {
        const id_repayment = parseInt(req.params.id_repayment);
        const response = await database_1.default.query('SELECT * FROM repayment JOIN users ON ' +
            'repayment.id_user=users.id_user  AND id_repayment=$1 ORDER BY date,time DESC', [id_repayment]);
        console.log(id_repayment);
        res.json(response.rows);
    }
    async getDevolucionesById(req, res) {
        const ticket = parseInt(req.params.ticket);
        const response = await database_1.default.query('SELECT * FROM repayment r  JOIN users u ON ' +
            'r.id_user=u.id_user JOIN currencies c ON r.currency_code=c.currency_code ' +
            'AND (id_buy=$1 OR id_sell=$1) ORDER BY time DESC', [ticket]);
        res.json(response.rows);
    }
    async getDevolucionBuy(req, res) {
        const id_buy = parseInt(req.params.id_buy);
        const response = await database_1.default.query('SELECT * FROM repayment ' +
            'JOIN users ON repayment.id_user=users.id_user WHERE id_buy=$1 ORDER BY time ASC', [id_buy]);
        res.json(response.rows);
    }
    async getDevolucionSell(req, res) {
        const id_sell = parseInt(req.params.id_sell);
        const response = await database_1.default.query('SELECT * FROM repayment r JOIN users u ON ' +
            'r.id_user=u.id_user JOIN registers re ON u.id_register=re.id_register ' +
            'JOIN currencies c ON r.currency_code=c.currency_code ' +
            'AND id_sell=$1 ORDER BY  time DESC', [id_sell]);
        res.json(response.rows);
    }
    async getDevolucionByDate(req, res) {
        const initialDate = req.params.initialDate;
        const endDate = req.params.endDate;
        const response = await database_1.default.query('SELECT * FROM repayment r JOIN users u ON ' +
            'r.id_user=u.id_user JOIN currencies c ON r.currency_code=c.currency_code ' +
            'AND date>=$1 AND date<=$2 ORDER BY time desc', [initialDate, endDate]);
        if (response.rowCount > 0) {
            res.json(response.rows);
        }
        else {
            throw ('No existen devoluciones para la fecha especificada');
        }
    }
    async getDevolucionByUser(req, res) {
        const names = '%' + req.params.names.split(' ')[0] + '%';
        const last_names = ((req.params.names.split(' ')[1]) ?
            '%' + req.params.names.split(' ')[1] + '%' : '');
        const response = await database_1.default.query("SELECT * FROM repayment r JOIN users u ON " +
            "r.id_user=u.id_user JOIN currencies c ON r.currency_code=c.currency_code " +
            "WHERE (names_user ilike $1 or last_names_user ilike $2) ORDER BY time DESC", [names, last_names]);
        res.json(response.rows);
    }
    async getDevolucionByType(req, res) {
        const type = req.params.type;
        const response = await database_1.default.query("SELECT * FROM repayment r JOIN users u ON " +
            "r.id_user=u.id_user JOIN currencies c ON r.currency_code=c.currency_code " +
            "where LOWER(type)= LOWER($1)", [type]);
        res.json(response.rows);
    }
    async getProductosDevolucionById(req, res) {
        const id_repayment = parseInt(req.params.id_repayment);
        const response = await database_1.default.query('SELECT * FROM buy_products WHERE id_repayment=$1', [id_repayment]);
        if (response.rowCount > 0) {
            res.json(response.rows);
        }
    }
    async createDevolucionCompra(req, res) {
        const { type, id_buy, quantity, buy_price, total, currency_code, exist_quantity, weighted_averages_sell, id_user, id_product, weighted_averages_buy, exchange, sell_price } = req.body;
        let response = await database_1.default.query('INSERT INTO repayment (type,id_buy,quantity,' +
            'buy_price,total,currency_code,exist_quantity,weighted_averages_sell,id_user,id_product,' +
            'weighted_averages_buy,exchange,sell_price) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', [type, id_buy, quantity, buy_price, total, currency_code, exist_quantity,
            weighted_averages_sell, id_user, id_product, weighted_averages_buy, exchange, sell_price]);
        res.status(200).json({
            title: '¡Devolucion Registrada!', description: 'La Devolucion se registró con exito en el sístema'
        });
    }
    async createDevolucionVenta(req, res) {
        const { type, id_sell, quantity, buy_price, total, currency_code, exist_quantity, weighted_averages_sell, id_user, id_product, weighted_averages_buy, exchange, sell_price } = req.body;
        let response = await database_1.default.query('INSERT INTO repayment (type,id_sell,quantity,' +
            'buy_price,total,currency_code,exist_quantity,weighted_averages_sell,id_user,id_product,' +
            'weighted_averages_buy,exchange,sell_price) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', [type, id_sell, quantity, buy_price, total, currency_code, exist_quantity,
            weighted_averages_sell, id_user, id_product, weighted_averages_buy, exchange, sell_price]);
        res.status(200).json({
            title: '¡Devolucion Registrada!', description: 'La Devolucion se registró con exito en el sístema'
        });
    }
    async actualizarDevolucion(req, res) {
        const id_repayment = parseInt(req.params.id_repayment);
        const { type, id_operation, quantity, price, total, currency_code, exist_quantity, weighted_averages, id_user, id_product } = req.body;
        await database_1.default.query('UPDATE repayment SET otal_buy=$1,id_provider=$2,id_user=$3 WHERE id_repayment=$4', [type, id_operation, quantity, price, total, currency_code, exist_quantity,
            weighted_averages, id_user, id_product]);
        res.status(200).json({
            title: '¡Devolucion Actualizada!', description: 'La Devolucion se actualizó con exito en el sístema'
        });
    }
    async eliminarDevolucion(req, res) {
        const id_repayment = parseInt(req.params.id_repayment);
        await database_1.default.query('DELETE FROM repayment WHERE id_repayment=$1', [id_repayment]);
        res.status(200).json({
            title: '¡Devolucion Eliminada!', description: 'La Devolucion se eliminó con exito del sístema'
        });
    }
}
const devolucionsController = new DevolucionesController();
exports.default = devolucionsController;
