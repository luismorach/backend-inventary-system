import { Router } from 'express';
import dashboardController from '../controllers/dashboard.controller';
const validations = require('./validations')
const helper = require('./helper')

class DashboardRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/dashboard',helper.ValidateToken, helper.routeHelper(dashboardController.getData))
        this.router.use(helper.errorMiddleware)
    }
}
const dashboardRoutes = new DashboardRoutes();
export default dashboardRoutes.router;