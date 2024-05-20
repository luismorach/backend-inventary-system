import { Router } from 'express';
import authController from '../controllers/auth.controller';
const validations = require('./validations')
const helper = require('./helper')

class UsuariosRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
      
        this.router.post('/login',helper.routeHelper(authController.auth))
        this.router.post('/forgot-password',helper.routeHelper(authController.forgotPassword))
        this.router.put('/change-password',helper.routeHelper(authController.changePassword))
        this.router.put('/refresh-token',helper.routeHelper(authController.refreshToken))
        this.router.use(helper.errorMiddleware)
    }
    
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;