"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
const { encript } = require('../utils/encrypt');
const nodemailer = require('nodemailer');
class EmailController {
    async sendEmail(req, res) {
        const user = req.body;
        if (user.email_user.length <= 0) {
            throw ('Este usuario no posee una dirección de correo registrada');
        }
        let building = await database_1.default.query('SELECT * FROM building ORDER BY name ASC');
        if (building.rows.length > 0) {
            building = building.rows[0];
            let transport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: building.email,
                    pass: building.email_password
                }
            });
            const options = {
                from: building.email,
                subject: 'Autogestión',
                to: user.email_user,
                text: 'hola ' + user.names_user + user.last_names_user,
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                
                <style>
                p, a, h1, h2, h3, h4, h5, h6 {font-family: 'Roboto', sans-serif !important;}
                h1{ font-size: 30px !important;}
                h2{ font-size: 25px !important;}
                h3{ font-size: 18px !important;}
                h4{ font-size: 16px !important;}
                p, a{font-size: 15px !important;}
                
                .claseBoton{
                width: 30%;
                background-color: #fcae3b;
                border: 2px solid #fcae3b;
                border-radius:.5rem;
                color: black; 
                padding: 16px 32px;
                text-align: center;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                transition-duration: 0.4s;
                cursor: pointer;
                }
                .claseBoton:hover{
                background-color: #000000;
                color: #ffffff;
                }
                .imag{
                width: 20px;
                height: 20px;
                }
                .contA{
                margin: 0px 5px 0 5px;
                }
                .afooter{
                color: #ffffff !important; 
                text-decoration: none;
                font-size: 13px !important;
                }
                </style>
                </head>
                <body>
                <div style="width: 100%; background-color: #e3e3e3;">
                <div style="padding: 20px 10px 20px 10px;">
                
                
                <!-- Contenido principal -->
                <div style="box-sizing:border-box;background-color: #ffffff; padding: 20px 10px 5px 10px;width: 100%; text-align: center;">
                <h1>Recuperación de contraseña</h1>
                <p>Hola ${user.names_user} ${user.last_names_user}, para reestablecer su contraseña 
                haga click en el boton de abajo
                </p>
                <a class="claseBoton" href="http://localhost:4200/recover password/${user.id_user}">Autogestion</a>
                
                <p>Si usted no solicitó esta petición por favor comuniquese con nosotros 
                    en los puntos de contacto proporcionados en la sección de soporte
                </p>
                
                <!-- Gracias -->
                <p>Gracias por tu tiempo.</p>
                <p style="margin-bottom: 50px;"><i>Atentamente:</i><br>Equipo ${building.name}</p>
                </div>
                <!-- Contenido principal -->
                
                <!-- Footer -->
                <div style="background-color: #282828; color: #ffffff; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
                
                <h4>Soporte</h4>
                <p style="font-size: 13px; padding: 0px 20px 0px 20px;">
                    Comunícate con nosotros por los siguientes medios:<br>
                    Correo: <a class="afooter" href="mailto:${building.email}">${building.email}</a><br>
                    Whatsapp: <a class="afooter" href="https://wa.me/${building.phone_number}">${building.phone_number}</a><br>
                </p>
                <p style="background-color: black; padding: 10px 0px; font-size: 12px !important;">
                    
                </p>
                </div>
                <!-- Footer -->
                
                
                
                </div>
                </div>
                </body>
                </html>
                `
            };
            try {
                await transport.sendMail(options);
                res.status(200).json({
                    title: '¡Correo enviado!', description: 'se ha enviado a su correo un enlace para reestablecer su contraseña'
                });
            }
            catch (error) {
                console.log(error);
                if (error.responseCode === 535)
                    throw ('las credenciales del email de la empresa son incorrectos. ' +
                        'comuniquese con su administrador ' + error.response);
                else if (error.errno === -3001) {
                    throw ('Verifique su conexión a internet');
                }
                else
                    throw (error);
            }
        }
        else {
            throw ('la empresa no posee una dirección de correo eléctronico registrado para ' +
                'realizar la recuperacion de la contraseña. comuniquese con su administrador');
        }
    }
    async redirect(req, res) {
        res.set({
            authorization: true
        });
        res.cookie('authorization', 'true', {
            path: 'recover password'
        });
        res.redirect('http://localhost:4200/recover password/34');
    }
}
const emailController = new EmailController();
exports.default = emailController;
