"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conection_1 = __importDefault(require("../database/conection"));
const { encript, verified } = require('../utils/encrypt');
const { generateAccessToken } = require('../utils/jwt');
class UsuariosController {
    async getUsuarios(req, res) {
        console.log('enviando users');
        const response = await conection_1.default.query('SELECT * FROM users WHERE id_user!=0 ORDER BY names_user ASC');
        if (response.rowCount > 0)
            res.json(response.rows);
    }
    async getUsuariosById(req, res) {
        const id_user = parseInt(req.params.id_user);
        if (Number.isNaN(id_user)) {
            throw ('No existe un usuario con la informacion especificada, verifiquela e intente nuevamente');
        }
        const response = await conection_1.default.query('SELECT * FROM users WHERE id_user=$1 ORDER BY names_user ASC', [id_user]);
        if (response.rowCount > 0) {
            res.json(response.rows);
        }
        else {
            throw ('No existe un usuario con la informacion especificada, es posible que ' +
                'haya sido eliminado, actualice la lista de usuarios e intentelo nuevamente');
        }
    }
    async getUsuarioByDocument(document_type_user, document_number_user) {
        const response = await conection_1.default.query('SELECT * FROM users u JOIN registers r ON ' +
            'u.id_register=r.id_register WHERE document_type_user=$1 ' +
            'AND document_number_user=$2 ORDER BY names_user ASC', [document_type_user, document_number_user]);
        return response.rows[0];
    }
    async createUsuario(req, res) {
        const { document_type_user, document_number_user, range_user, names_user, last_names_user, phone_number_user, gander_user, id_register, email_user, state_user } = req.body;
        const password_user = await encript(req.body.password_user);
        await conection_1.default.query('INSERT INTO users ' +
            '(document_type_user,document_number_user,range_user,names_user,last_names_user,' +
            'phone_number_user,gander_user,id_register,' +
            'email_user,password_user,state_user) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [document_type_user, document_number_user, range_user, names_user, last_names_user,
            phone_number_user, gander_user, id_register, email_user, password_user, state_user]);
        res.status(201).json({
            title: '¡Usuario Registrado!', description: 'El Usuario se registró con exito en el sístema'
        });
    }
    async actualizarUsuario(req, res) {
        const id_user = parseInt(req.params.id_user);
        const { range_user, id_register, state_user } = req.body;
        await conection_1.default.query('UPDATE users SET range_user=$1,id_register=$2,state_user=$3 ' +
            'WHERE id_user=$4', [range_user, id_register, state_user, id_user]);
        res.status(200).json({
            title: '¡Usuario Actualizado!', description: 'El Usuario se actualizó con exito en el sístema'
        });
    }
    async actualizarCuenta(req, res) {
        const id_user = parseInt(req.params.id_user);
        const { document_type_user, document_number_user, names_user, last_names_user, phone_number_user, gander_user, id_register, email_user, current_password } = req.body;
        const client = await conection_1.default.connect();
        await client.query('BEGIN');
        try {
            let response = await client.query('SELECT password_user FROM users WHERE id_user=$1', [id_user]);
            if (await verified(current_password, response.rows[0].password_user)) {
                const password_user = await encript(req.body.password_user);
                await client.query('UPDATE users SET document_type_user=$1,document_number_user=$2,' +
                    'names_user=$3,last_names_user=$4,phone_number_user=$5,gander_user=$6,' +
                    'id_register=$7,email_user=$8,password_user=$9 WHERE id_user=$10', [document_type_user, document_number_user, names_user, last_names_user,
                    phone_number_user, gander_user, id_register, email_user, password_user, id_user]);
                await client.query('COMMIT');
                res.status(200).json({
                    title: '¡Cuenta Actualizada!', description: 'La cuenta se actualizó con exito en el sístema'
                });
            }
            else {
                throw 'La clave actual es incorrecta verifiquela e intente nuevamente';
            }
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
    async eliminarUsuario(req, res) {
        const id_user = parseInt(req.params.id_user);
        await conection_1.default.query('DELETE FROM users WHERE id_user=$1', [id_user]);
        res.status(200).json({
            title: '¡Usuario Eliminado!', description: 'El Usuario se elimminó con exito del sístema'
        });
    }
}
const usuariosController = new UsuariosController();
exports.default = usuariosController;
