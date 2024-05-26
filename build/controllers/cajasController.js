"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conection_1 = __importDefault(require("../database/conection"));
class CajasController {
    async getCajas(req, res) {
        console.log('pasando');
        const response = await conection_1.default.query('SELECT * FROM registers WHERE id_register!=0 ORDER BY name_register ASC');
        res.json(response.rows);
    }
    async getCajaById(req, res) {
        const id_register = parseInt(req.params.id_register);
        if (Number.isNaN(id_register)) {
            throw ('No existe una caja con la informacion especificada, verifiquela e intente nuevamente');
        }
        const response = await conection_1.default.query('SELECT * FROM registers WHERE id_register=$1 ORDER BY name_register ASC', [id_register]);
        if (response.rowCount > 0) {
            res.json(response.rows);
        }
        else {
            throw ('No existe una caja con la informacion especificada, es posible que ' +
                'haya sido eliminada, actualice la lista de cajas e intentelo nuevamente');
        }
    }
    async createCaja(req, res) {
        const { name_register, state_register } = req.body;
        await conection_1.default.query('INSERT INTO registers (name_register,state_register) values($1,$2)', [name_register, state_register]);
        res.status(200).json({
            title: '¡Caja Registrada!',
            description: 'La caja se registro con exito en el sístema'
        });
    }
    async actualizarCaja(req, res) {
        const id_register = parseInt(req.params.id_register);
        const { name_register, state_register } = req.body;
        await conection_1.default.query('UPDATE registers SET name_register=$1,state_register=$2 WHERE id_register=$3', [name_register, state_register, id_register]);
        res.status(200).json({
            title: '¡Caja Actualizada!', description: 'La caja se actualizó con exito en el sístema'
        });
    }
    async eliminarCaja(req, res) {
        const id_register = parseInt(req.params.id_register);
        await conection_1.default.query('DELETE FROM registers WHERE id_register=$1', [id_register]);
        res.status(200).json({
            title: '¡Caja Eliminada!', description: 'La caja se elimminó con exito del sístema'
        });
    }
}
const cajasController = new CajasController();
exports.default = cajasController;
