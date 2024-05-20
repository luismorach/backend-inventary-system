import { Request, Response } from 'express';
import pool from '../database/database';

class CajasController {

    public async getData(req: Request, res: Response) {
        const response = await pool.query('select count (*) as registers,' +
            '(select count (*) as categories from categories),' +
            '(select count (*) as providers from providers),' +
            '(select count (*) as users from users WHERE id_user!=0),' +
            '(select count (*) as clients from clients WHERE id_client!=0),' +
            '(select count (*) as products from products),' +
            '(select count (*) as buys from buys),' +
            '(select count (*) as sells from sells),' +
            '(select count (*) as repayments from repayment),' +
            '(select count (*) as kardex from kardex)' +
            'from registers WHERE id_register!=0')
       
            res.json(response.rows)
        
        
    }

}
const cajasController = new CajasController();
export default cajasController;