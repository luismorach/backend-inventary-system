"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_controller_1 = __importDefault(require("../controllers/email.controller"));
const helper = require('./helper');
class EmailRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.post('/sendEmail', helper.routeHelper(email_controller_1.default.sendEmail));
        this.router.get('/redirect', helper.routeHelper(email_controller_1.default.redirect));
        this.router.use(helper.errorMiddleware);
    }
}
const emailRoutes = new EmailRoutes();
exports.default = emailRoutes.router;
