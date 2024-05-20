"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = __importDefault(require("../controllers/dashboard.controller"));
const validations = require('./validations');
const helper = require('./helper');
class DashboardRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/dashboard', helper.ValidateToken, helper.routeHelper(dashboard_controller_1.default.getData));
        this.router.use(helper.errorMiddleware);
    }
}
const dashboardRoutes = new DashboardRoutes();
exports.default = dashboardRoutes.router;
