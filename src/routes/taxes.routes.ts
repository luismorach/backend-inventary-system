import { Router } from 'express';
import taxesController from '../controllers/taxesController';
const validations = require('./validations')
const helper = require('./helper')

class CajasRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/taxes',helper.ValidateToken, helper.routeHelper(taxesController.getTaxes))
        this.router.get('/taxes/:tax_id',helper.ValidateToken, helper.routeHelper(taxesController.getTaxById))
        this.router.post('/taxes',helper.ValidateToken, validations.validate(validations.createRegisterValidation),
            helper.routeHelper(taxesController.createTax))
        this.router.put('/taxes/:tax_id',helper.ValidateToken, helper.routeHelper(taxesController.updateTax))
        this.router.delete('/taxes/:tax_id',helper.ValidateToken, helper.routeHelper(taxesController.deleteTax))
        this.router.use(helper.errorMiddleware)
    }
}
const cajasRoutes = new CajasRoutes();
export default cajasRoutes.router;