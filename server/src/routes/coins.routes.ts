import { Router } from 'express';
import coinsController from '../controllers/coins.controller';
const validations = require('./validations')
const helper = require('./helper')

class CoinsRoutes {
    public router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/coins/all',helper.ValidateToken, helper.routeHelper(coinsController.getAllCoins))
        this.router.get('/coinsByCountry/:value/:param',helper.ValidateToken, helper.routeHelper(coinsController.getCoinByCountry))
        this.router.get('/coins',helper.ValidateToken, helper.routeHelper(coinsController.getCoins))
        this.router.get('/coins/secondaries',helper.ValidateToken, helper.routeHelper(coinsController.getSecondariesCoins))
        this.router.get('/coins/:id_coin',helper.ValidateToken, helper.routeHelper(coinsController.getCoinById))
        this.router.get('/CoinsMain',helper.ValidateToken, helper.routeHelper(coinsController.getMainCoin))
        this.router.post('/coins',helper.ValidateToken,helper.routeHelper(coinsController.createCoin))
        this.router.put('/coins/:language_code:currency_code:country_code',helper.ValidateToken,
         helper.routeHelper(coinsController.actualizarCoin))
        this.router.put('/coinsCurrency/:language_code/:currency_code/:country_code',helper.ValidateToken,
         helper.routeHelper(coinsController.actualizarCoin))
        this.router.delete('/coins/:language_code/:currency_code',helper.ValidateToken, helper.routeHelper(coinsController.eliminarCoin))
        
        this.router.use(helper.errorMiddleware)
    }
}
const coinsRoutes = new CoinsRoutes();
export default coinsRoutes.router;