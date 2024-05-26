import { Router } from 'express';
import ProductosController from '../controllers/productosController';
const validations = require('./validations')
const helper = require('./helper')

class ProductosRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/products',helper.ValidateToken, helper.routeHelper(ProductosController.getProductos))
        this.router.get('/products/sells',helper.ValidateToken, helper.routeHelper(ProductosController.getProductosMasVendidos))
        this.router.get('/products/expir',helper.ValidateToken, helper.routeHelper(ProductosController.getProductosPorVencimiento))
        this.router.get('/products/:id_product',helper.ValidateToken, helper.routeHelper(ProductosController.getProductoById))
        this.router.get('/products/barcode/:barcode',helper.ValidateToken, helper.routeHelper(ProductosController.getProductoByBarcode))
        this.router.get('/products/category/:id_category',helper.ValidateToken, helper.routeHelper(ProductosController.getProductoByCategory))
        this.router.post('/products',helper.ValidateToken,helper.routeHelper(ProductosController.createProducto))
        this.router.put('/products/:id_product',helper.ValidateToken, helper.routeHelper(ProductosController.actualizarProducto))
        this.router.delete('/products/:id_product',helper.ValidateToken, helper.routeHelper(ProductosController.eliminarProducto))
        this.router.use(helper.errorMiddleware)
    }
}
const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;