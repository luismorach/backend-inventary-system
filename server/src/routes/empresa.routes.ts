import { Router } from 'express';
import EmpresaController from '../controllers/empresa.controller';
const validations = require('./validations')
const helper = require('./helper')

class EmpresaRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/building',helper.ValidateToken, helper.routeHelper(EmpresaController.getEmpresas))
        this.router.post('/building',helper.ValidateToken,helper.routeHelper(EmpresaController.createEmpresa))
        this.router.put('/building/:id_building',helper.ValidateToken, helper.routeHelper(EmpresaController.actualizarEmpresa))
        //this.router.delete('/building/:id_building', helper.routeHelper(EmpresaController.eliminarEmpresa))
        this.router.use(helper.errorMiddleware)
    }
}
const empresaRoutes = new EmpresaRoutes();
export default empresaRoutes.router;