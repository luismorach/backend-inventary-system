"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransport = void 0;
const nodemailer = require('nodemailer');
function getTransport(building) {
    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: building.email,
            pass: building.email_password
        }
    });
    return transport;
}
exports.getTransport = getTransport;
