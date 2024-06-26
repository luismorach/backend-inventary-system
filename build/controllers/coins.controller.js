"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conection_1 = __importDefault(require("../database/conection"));
class CoinsController {
    async getAllCoins(req, res) {
        const response = await conection_1.default.query('select c.country,c.country_code,l.language,' +
            'l.language_code,c.currency_code,a.currency from countries c  join languages l  on ' +
            'c.language_code= l.language_code join all_coins a on ' +
            'c.currency_code=a.currency_code order by c.country asc');
        res.json(response.rows);
    }
    async getCoinByCountry(req, res) {
        const country_code = req.params.value;
        const param = 'c.' + req.params.param;
        const response = await conection_1.default.query('select distinct on (c.currency_code) c.country,c.country_code,l.language,' +
            'l.language_code,c.currency_code,a.currency from countries c  join languages l  on ' +
            'c.language_code= l.language_code join all_coins a on ' +
            'c.currency_code=a.currency_code where ' + param + ' = $1 order by c.currency_code', [country_code]);
        if (response.rowCount > 0) {
            res.json(response.rows);
        }
        else {
            throw ('No existen monedas con la informacion especificada ' +
                'actualice la lista de monedas e intentelo nuevamente');
        }
    }
    async getCoins(req, res) {
        const response = await conection_1.default.query('select * from currencies order by currency asc');
        res.json(response.rows);
    }
    async getSecondariesCoins(req, res) {
        const response = await conection_1.default.query('select distinct on (a.currency_code) ' +
            'a.currency,s.currency_code,s.exchange,c.country_code,c.language_code ' +
            'from secondary_currencies s join all_coins a on s.currency_code=a.currency_code ' +
            'join countries c on a.currency_code= c.currency_code');
        res.json(response.rows);
    }
    async getCoinById(req, res) {
        const id_coin = parseInt(req.params.id_coin);
        const response = await conection_1.default.query('SELECT * FROM coins WHERE id_coin=$1 ORDER BY name ASC', [id_coin]);
        if (response.rowCount > 0) {
            res.json(response.rows);
        }
        else {
            throw ('No existen monedas con la informacion especificada ' +
                'actualice la lista de monedas e intentelo nuevamente');
        }
    }
    async getMainCoin(req, res) {
        const response = await conection_1.default.query('select distinct on (a.currency_code) ' +
            'a.currency,b.currency_code,1.0 as exchange,c.country_code,c.language_code ' +
            'from building b join countries c on b.currency_code= c.currency_code ' +
            'join all_coins a on b.currency_code=a.currency_code ');
        res.json(response.rows);
    }
    async createCoin(req, res) {
        const { country, country_code, language, language_code, currency, currency_code } = req.body;
        const client = await conection_1.default.connect();
        await client.query('BEGIN');
        try {
            await client.query('INSERT INTO all_coins values($1,$2)', [currency_code, currency]);
            await client.query('INSERT INTO languages values($1,$2)', [language_code, language]);
            await client.query('INSERT INTO countries values($1,$2,$3,$4)', [country_code, country, language_code, currency_code]);
            await client.query('COMMIT');
            res.status(200).json({
                title: '¡Moneda Registrada!', description: 'La Moneda se registró con exito en el sístema'
            });
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
    }
    async actualizarCoin(req, res) {
        const language_code_old = req.params.language_code;
        const currency_code_old = req.params.currency_code;
        const country_code_old = req.params.country_code;
        const { country, country_code, language, language_code, currency, currency_code } = req.body;
        const client = await conection_1.default.connect();
        await client.query('BEGIN');
        try {
            await client.query('UPDATE languages set language=$1,language_code=$2' +
                'WHERE language_code=$3', [language, language_code, language_code_old]);
            await client.query('UPDATE all_coins set currency=$1,currency_code=$2' +
                'WHERE currency_code=$3', [currency, currency_code, currency_code_old]);
            await client.query('UPDATE countries set country=$1,country_code=$2' +
                'WHERE country_code=$3', [country, country_code, country_code_old]);
            await client.query('COMMIT');
            res.status(200).json({
                title: '¡Moneda Actualizada!', description: 'La Moneda se actualizó con exito en el sístema'
            });
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
    }
    async eliminarCoin(req, res) {
        const language_code_old = req.params.language_code;
        const currency_code_old = req.params.currency_code;
        const client = await conection_1.default.connect();
        await client.query('BEGIN');
        try {
            await client.query('DELETE FROM languages WHERE language_code=$1', [language_code_old]);
            await client.query('DELETE FROM all_coins WHERE currency_code=$1', [currency_code_old]);
            await client.query('COMMIT');
            res.status(200).json({
                title: '¡Moneda Eliminada!', description: 'La Moneda se elimminó con exito del sístema'
            });
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
    }
}
const coinsController = new CoinsController();
exports.default = coinsController;
