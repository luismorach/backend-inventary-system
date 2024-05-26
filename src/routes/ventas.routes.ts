import { Router } from 'express';
import VentasController from '../controllers/ventas.controller';
const helper = require('./helper')

class VentasRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
       
        this.router.get('/sells',helper.ValidateToken, helper.routeHelper(VentasController.getVentas))
        this.router.get('/sells/:id_sell',helper.ValidateToken, helper.routeHelper(VentasController.getVentaById))
        this.router.get('/sells/:initialDate/:endDate',helper.ValidateToken, helper.routeHelper(VentasController.getVentasByDate))
        this.router.get('/sellsByDate/:initialDate/:endDate',helper.ValidateToken, helper.routeHelper(VentasController.getVentaByDate))
        this.router.get('/sellsProducts/:id_sell',helper.ValidateToken,helper.routeHelper(VentasController.getProductosVentaById))
        this.router.get('/sellsProduct/:id_sell/:id_product',helper.ValidateToken,helper.routeHelper(VentasController.getProductoVentaById))
        this.router.get('/sellsPays/:id_sell',helper.ValidateToken,helper.routeHelper(VentasController.getPagosVentaById))
        this.router.get('/sellsPaysByDate/:initialDate/:endDate',helper.ValidateToken,helper.routeHelper(VentasController.getPagosVentaByDate))
        this.router.get('/sellsByUser/:names',helper.ValidateToken,helper.routeHelper(VentasController.getVentasByUser))
        this.router.get('/sellsByClient/:names',helper.ValidateToken,helper.routeHelper(VentasController.getVentasByClient))
        this.router.post('/sells',helper.ValidateToken,helper.routeHelper(VentasController.createVenta))
        this.router.post('/sellsPays',helper.ValidateToken,helper.routeHelper(VentasController.createPay))
        this.router.put('/sells/:id_sell',helper.ValidateToken, helper.routeHelper(VentasController.actualizarVenta))
        this.router.put('/sellsProducts/:id_sell/:id_product',helper.ValidateToken, helper.routeHelper(VentasController.actualizarProductosVenta))
        this.router.delete('/sells/:id_sell',helper.ValidateToken, helper.routeHelper(VentasController.eliminarVenta))
        this.router.use(helper.errorMiddleware)
    }
}
const ventasRoutes = new VentasRoutes();
export default ventasRoutes.router;