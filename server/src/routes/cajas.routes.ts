import { Router } from 'express';
import cajasController from '../controllers/cajasController';
const validations = require('./validations')
const helper = require('./helper')

class CajasRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/registers',helper.ValidateToken, helper.routeHelper(cajasController.getCajas))
        this.router.get('/registers/:id_register',helper.ValidateToken, helper.routeHelper(cajasController.getCajaById))
        this.router.post('/registers',helper.ValidateToken,  validations.validate(validations.createRegisterValidation),
            helper.routeHelper(cajasController.createCaja))
        this.router.put('/registers/:id_register',helper.ValidateToken, helper.routeHelper(cajasController.actualizarCaja))
        this.router.delete('/registers/:id_register',helper.ValidateToken, helper.routeHelper(cajasController.eliminarCaja))
        this.router.use(helper.errorMiddleware)
    }
}
const cajasRoutes = new CajasRoutes();
export default cajasRoutes.router;