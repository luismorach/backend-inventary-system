"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
const functionsAuth_1 = require("../utils/functionsAuth");
const empresa_controller_1 = __importDefault(require("./empresa.controller"));
const usuariosController_1 = __importDefault(require("../controllers/usuariosController"));
const { encript, verified } = require('../utils/encrypt');
const { generateAccessToken, validateAccessToken } = require('../utils/jwt');
class AuthController {
    async auth(req, res) {
        const { document_type_user, document_number_user, password_user } = req.body;
        let user = await usuariosController_1.default.getUsuarioByDocument(document_type_user, document_number_user);
        if (!user || !await verified(password_user, user.password_user)) {
            throw ('Documento o contraseña incorrecta');
        }
        if (user.state_user === 'Deshabilitado') {
            throw ('Usuario bloqueado comuniquese con un administrador');
        }
        const building = await empresa_controller_1.default.getBuilding();
        let ACCESS_TOKEN = generateAccessToken({ id_user: user.id_user }, process.env.SECRET, '5m');
        let REFRESH_TOKEN = generateAccessToken({ id_user: user.id_user }, process.env.SECRET_REFRESH, '1h');
        res.status(200).json({
            id_user: user.id_user,
            names_user: user.names_user + ' ' + user.last_names_user,
            name_register: user.name_register,
            id_register: user.id_register,
            range_user: user.range_user,
            id_building: building.id_building,
            token: ACCESS_TOKEN,
            refreshToken: REFRESH_TOKEN
        });
    }
    async forgotPassword(req, res) {
        const { document_type_recover, document_number_recover } = req.body;
        console.log(document_type_recover, document_number_recover);
        let user = await usuariosController_1.default.getUsuarioByDocument(document_type_recover, document_number_recover);
        if (!user) {
            return res.status(200).json({
                title: '¡Correo enviado!', description: 'Se ha enviado a su correo un enlace para reestablecer su contraseña'
            });
        }
        if (user.email_user.length <= 0) {
            throw ('Este usuario no posee una dirección de correo registrada');
        }
        const building = await empresa_controller_1.default.getBuilding();
        if (!building) {
            throw ('la empresa no posee una dirección de correo eléctronico registrado para ' +
                'realizar la recuperacion de la contraseña. comuniquese con su administrador');
        }
        let id_user = user.id_user;
        let token = generateAccessToken({ id_user, document_type_recover, document_number_recover }, process.env.SECRET_RESET, '5m');
        let verificationLink = `http://localhost:4200/new-password/${token}`;
        const transport = (0, functionsAuth_1.getTransportEmail)(building);
        const options = (0, functionsAuth_1.getOptionsEmail)(building, user, verificationLink);
        (0, functionsAuth_1.sendEmail)(transport, options, res);
    }
    async changePassword(req, res) {
        let { newPassword } = req.body;
        if (!newPassword) {
            throw ('Todos los campos son requeridos');
        }
        try {
            let payload = validateAccessToken(req, process.env.SECRET_RESET);
            newPassword = await encript(newPassword);
            await database_1.default.query('UPDATE users SET password_user=$1 WHERE id_user=$2', [newPassword, payload.id_user]);
            res.json({
                title: '¡Contraseña cambiada!', description: 'La contraseña se ha cambiado exitosamente'
            });
        }
        catch (error) {
            throw ('Ups... algo ha salido mal');
        }
    }
    async refreshToken(req, res) {
        const id_user = req.body.id_user;
        console.log(id_user);
        validateAccessToken(req, process.env.SECRET_REFRESH);
        let ACCESS_TOKEN = generateAccessToken({ id_user }, process.env.SECRET, '5m');
        let REFRESH_TOKEN = generateAccessToken({ id_user }, process.env.SECRET_REFRESH, '1h');
        res.status(200).json({
            token: ACCESS_TOKEN,
            refreshToken: REFRESH_TOKEN
        });
    }
}
const authController = new AuthController();
exports.default = authController;
