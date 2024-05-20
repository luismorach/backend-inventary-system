import { Router } from 'express';
import DevolucionController from '../controllers/repayment.controller';
const helper = require('./helper')

class DevolucionesRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
       
        this.router.get('/repayments',helper.ValidateToken, helper.routeHelper(DevolucionController.getDevoluciones))
        this.router.get('/repaymentsById/:ticket',helper.ValidateToken, helper.routeHelper(DevolucionController.getDevolucionesById))
        this.router.get('/repayments/:id_repayment',helper.ValidateToken, helper.routeHelper(DevolucionController.getDevolucionById))
        this.router.get('/repayments/:initialDate/:endDate',helper.ValidateToken, helper.routeHelper(DevolucionController.getDevolucionByDate))
        this.router.get('/repaymentsProducts/:id_repayment',helper.ValidateToken,helper.routeHelper(DevolucionController.getProductosDevolucionById))
        this.router.get('/repaymentsBuy/:id_buy',helper.ValidateToken,helper.routeHelper(DevolucionController.getDevolucionBuy))
        this.router.get('/repaymentsSell/:id_sell',helper.ValidateToken,helper.routeHelper(DevolucionController.getDevolucionSell))
        this.router.get('/repaymentsByUser/:names',helper.ValidateToken,helper.routeHelper(DevolucionController.getDevolucionByUser))
        this.router.get('/repaymentsByType/:type',helper.ValidateToken,helper.routeHelper(DevolucionController.getDevolucionByType))
        this.router.post('/repaymentsBuy',helper.ValidateToken,helper.routeHelper(DevolucionController.createDevolucionCompra))
        this.router.post('/repaymentsSell',helper.ValidateToken,helper.routeHelper(DevolucionController.createDevolucionVenta))
        this.router.put('/repayments/:id_repayment',helper.ValidateToken, helper.routeHelper(DevolucionController.actualizarDevolucion))
        this.router.delete('/repayments/:id_repayment',helper.ValidateToken, helper.routeHelper(DevolucionController.eliminarDevolucion))
        this.router.use(helper.errorMiddleware)
    }
}
const devolucionesRoutes = new DevolucionesRoutes();
export default devolucionesRoutes.router;