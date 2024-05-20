"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
class EmpresaController {
    async getEmpresas(req, res) {
        const response = await database_1.default.query('SELECT * FROM building ORDER BY name ASC');
        res.json(response.rows);
    }
    async getBuilding() {
        const response = await database_1.default.query('SELECT * FROM building ORDER BY name ASC');
        return response.rows[0];
    }
    async createEmpresa(req, res) {
        const { document_type, document_number, name, currency_code, address, email, phone_number, secondariesCoins, email_password } = req.body;
        const client = await database_1.default.connect();
        await client.query('BEGIN');
        try {
            await client.query('INSERT INTO building (document_type,document_number,name,currency_code,address,' +
                'email,phone_number,email_password) values($1,$2,$3,$4,$5,$6,$7,$8)', [document_type, document_number, name, currency_code, address, email,
                phone_number, email_password]);
            await client.query('TRUNCATE TABLE secondary_currencies');
            secondariesCoins.forEach(async (data) => {
                await client.query('INSERT INTO secondary_currencies (currency_code,exchange) ' +
                    'VALUES($1,$2)', [data.currency_code, data.exchange]);
            });
            await client.query('COMMIT');
            res.status(200).json({
                title: '¡Empresa Registrada!', description: 'La Empresa se registró con exitó en el sístema'
            });
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
    }
    async actualizarEmpresa(req, res) {
        const id_building = parseInt(req.params.id_building);
        const { document_type, document_number, name, currency_code, address, email, phone_number, email_password, secondariesCoins } = req.body;
        const client = await database_1.default.connect();
        await client.query('BEGIN');
        try {
            await client.query('UPDATE building SET document_type=$1,document_number=$2, ' +
                'name=$3,currency_code=$4,address=$5, email=$6,phone_number=$7, email_password=$8 ' +
                'WHERE id_building=$9', [document_type, document_number, name, currency_code, address,
                email, phone_number, email_password, id_building]);
            await client.query('TRUNCATE TABLE secondary_currencies');
            secondariesCoins.forEach(async (data) => {
                await client.query('INSERT INTO secondary_currencies (currency_code,exchange) ' +
                    'VALUES($1,$2)', [data.currency_code, data.exchange]);
            });
            await client.query('COMMIT');
            res.status(200).json({
                title: '¡Empresa Actualizada!', description: 'La empresa se actualizó con exito en el sístema'
            });
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
    }
}
const empresaController = new EmpresaController();
exports.default = empresaController;
