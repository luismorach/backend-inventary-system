import { Router } from 'express';
import ComprasController from '../controllers/compras.controller';
const helper = require('./helper')

class ComprasRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
       
        this.router.get('/buys',helper.ValidateToken, helper.routeHelper(ComprasController.getCompras))
        this.router.get('/buys/:id_buy',helper.ValidateToken, helper.routeHelper(ComprasController.getCompraById))
        this.router.get('/buys/:initialDate/:endDate',helper.ValidateToken, helper.routeHelper(ComprasController.getCompraByDate))
        this.router.get('/buysProducts/:id_buy',helper.ValidateToken,helper.routeHelper(ComprasController.getProductosCompraById))
        this.router.get('/buysProduct/:id_buy/:id_product',helper.ValidateToken,helper.routeHelper(ComprasController.getProductoCompraById))
        this.router.get('/buysByUser/:names',helper.ValidateToken,helper.routeHelper(ComprasController.getComprasByUser))
        this.router.get('/buysByProvider/:name',helper.ValidateToken,helper.routeHelper(ComprasController.getComprasByProvider))
        this.router.post('/buys',helper.ValidateToken,helper.routeHelper(ComprasController.createCompra))
        this.router.put('/buys/:id_buy',helper.ValidateToken, helper.routeHelper(ComprasController.actualizarCompra))
        this.router.put('/buysProducts/:id_buy/:id_product',helper.ValidateToken, helper.routeHelper(ComprasController.actualizarProductosCompra))
        this.router.delete('/buys/:id_buy',helper.ValidateToken, helper.routeHelper(ComprasController.eliminarCompra))
        this.router.use(helper.errorMiddleware)
    }
}
const comprasRoutes = new ComprasRoutes();
export default comprasRoutes.router;