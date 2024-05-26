import { Router } from 'express';
import proveedoresController from '../controllers/proveedoresController';
const validations = require('./validations')
const helper = require('./helper')

class ProveedorRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/providers',helper.ValidateToken, helper.routeHelper(proveedoresController.getProveedores))
        this.router.get('/providers/:id_provider',helper.ValidateToken, helper.routeHelper(proveedoresController.getProveedoresById))
        this.router.post('/providers',helper.ValidateToken,helper.routeHelper(proveedoresController.createProveedor))
        this.router.put('/providers/:id_provider',helper.ValidateToken, helper.routeHelper(proveedoresController.actualizarProveedor))
        this.router.delete('/providers/:id_provider',helper.ValidateToken, helper.routeHelper(proveedoresController.eliminarProveedor))
        this.router.use(helper.errorMiddleware)
    }
}
const proveedorRoutes = new ProveedorRoutes();
export default proveedorRoutes.router;