import { Router } from 'express';
import usuariosController from '../controllers/usuariosController';
const validations = require('./validations')
const helper = require('./helper')

class UsuariosRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/users',helper.ValidateToken, helper.routeHelper(usuariosController.getUsuarios))
        this.router.get('/users/:id_user',helper.ValidateToken,helper.routeHelper(usuariosController.getUsuariosById))
        this.router.post('/users',helper.ValidateToken,helper.routeHelper(usuariosController.createUsuario))
        this.router.put('/users/:id_user',helper.ValidateToken,helper.ValidateToken, helper.routeHelper(usuariosController.actualizarUsuario))
        this.router.put('/usersAccount/:id_user',helper.ValidateToken, helper.routeHelper(usuariosController.actualizarCuenta))
        this.router.delete('/users/:id_user',helper.ValidateToken, helper.routeHelper(usuariosController.eliminarUsuario))
        this.router.use(helper.errorMiddleware)
    }
    
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;