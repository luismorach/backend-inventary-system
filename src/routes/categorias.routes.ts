import { Router } from 'express';
import categoriasController from '../controllers/categoriasController';
const validations = require('./validations')
const helper = require('./helper')

class CategoriasRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/categories',helper.ValidateToken, helper.routeHelper(categoriasController.getcategorías))
        this.router.get('/categories/:id_category',helper.ValidateToken, helper.routeHelper(categoriasController.getcategoríaById))
        this.router.post('/categories',helper.ValidateToken,helper.routeHelper(categoriasController.createcategoría))
        this.router.put('/categories/:id_category',helper.ValidateToken, helper.routeHelper(categoriasController.actualizarcategoría))
        this.router.delete('/categories/:id_category',helper.ValidateToken, helper.routeHelper(categoriasController.eliminarcategoría))
        this.router.use(helper.errorMiddleware)
    }
}
const categoriasRoutes = new CategoriasRoutes();
export default categoriasRoutes.router;