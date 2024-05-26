import { Request, Response } from 'express';
import pool from '../database/conection';

class VentasController {

    public async getVentas(req: Request, res: Response) {
        const response = await pool.query('SELECT * FROM sells ORDER BY time DESC ')
        res.json(response.rows)
    }

    public async getVentaById(req: Request, res: Response) {
        const id_sell = parseInt(req.params.id_sell)
        if (Number.isNaN(id_sell)) {
            throw ('No existe una venta con la informacion especificada, verifiquela e intente nuevamente')
        }
        const response = await pool.query('SELECT distinct on (sells.id_sell)* FROM sells JOIN users ON ' +
            'sells.id_user=users.id_user JOIN clients ON sells.id_client=clients.id_client ' +
            'JOIN registers ON registers.id_register=users.id_register ' +
            'JOIN currencies c on c.currency_code=sells.currency_code ' +
            'AND sells.id_sell=$1 ORDER BY sells.id_sell', [id_sell])
        if (response.rowCount > 0) {
            res.json(response.rows)
        } else {
            throw ('No existen ventas con la informacion especificada ' +
                'actualice la lista de ventas e intentelo nuevamente')
        }

    }
    public async getVentasByDate(req: Request, res: Response) {
        const initialDate = req.params.initialDate
        const endDate = req.params.endDate
        console.log(initialDate + ' ' + endDate)
        const response = await pool.query('SELECT distinct on (sells.id_sell)* FROM sells ' +
            'JOIN users ON sells.id_user=users.id_user JOIN clients ON sells.id_client=clients.id_client ' +
            'join currencies c on c.currency_code=sells.currency_code ' +
            'AND date>=$1 and date<=$2 ORDER BY sells.id_sell DESC',
            [initialDate, endDate])
        res.json(response.rows)

    }
    public async getVentaByDate(req: Request, res: Response) {
        const initialDate = req.params.initialDate
        const endDate = req.params.endDate
        const response = await pool.query('SELECT registers.name_register,users.names_user,users.last_names_user, ' +
            'SUM(sells.total_sell) as total_sell,count(*) as sells,sells.currency_code,' +
            '(SELECT calcular_costos($1,$2,sells.id_user))as costos FROM sells JOIN users ON ' +
            'sells.id_user=users.id_user JOIN registers ON users.id_register=registers.id_register ' +
            'where sells.date>=$1 and sells.date<=$2 GROUP BY registers.name_register,users.names_user,users.last_names_user,' +
            'sells.currency_code,sells.id_user order by users.names_user',
            [initialDate, endDate])
        res.json(response.rows)

    }
    public async getVentasByUser(req: Request, res: Response) {
        const names = '%' + req.params.names.split(' ')[0] + '%'
        const last_names = ((req.params.names.split(' ')[1]) ?
            '%' + req.params.names.split(' ')[1] + '%' : '')
        const response = await pool.query('SELECT distinct on (sells.id_sell)* FROM sells ' +
            'JOIN users ON sells.id_user=users.id_user JOIN clients ON sells.id_client=clients.id_client ' +
            'join currencies c on c.currency_code=sells.currency_code ' +
            'WHERE ( names_user ilike $1 or last_names_user ilike $2) ORDER BY id_sell DESC', [names,last_names])
        res.json(response.rows)
    }
    public async getVentasByClient(req: Request, res: Response) {
        const names = '%' + req.params.names.split(' ')[0] + '%'
        const last_names = ((req.params.names.split(' ')[1]) ?
        '%' + req.params.names.split(' ')[1] + '%' : '')
        const response = await pool.query('SELECT distinct on (sells.id_sell)* FROM sells ' +
            'JOIN users ON sells.id_user=users.id_user JOIN clients ON sells.id_client=clients.id_client ' +
            'join currencies c on c.currency_code=sells.currency_code ' +
            'WHERE (names_client ilike $1 or last_names_client ilike $2) ORDER BY id_sell DESC', [names,last_names])
        res.json(response.rows)
    }

    public async getProductosVentaById(req: Request, res: Response) {
        const id_sell = parseInt(req.params.id_sell)
        const response = await pool.query('SELECT * FROM products JOIN sell_products ON ' +
            'sell_products.id_product=products.id_product JOIN taxes ON '+
            'taxes.tax_id=products.tax_id AND id_sell=$1', [id_sell])
        if (response.rowCount > 0) {
            res.json(response.rows)
        }
    }
    public async getProductoVentaById(req: Request, res: Response) {
        console.log('consulta')
        const id_sell = parseInt(req.params.id_sell)
        const id_product = parseInt(req.params.id_product)
        const response = await pool.query('SELECT * FROM sell_products where id_sell=$1 and id_product=$2',
            [id_sell, id_product])
        res.json(response.rows)
    }
    public async getPagosVentaById(req: Request, res: Response) {
        const id_sell = parseInt(req.params.id_sell)
        const response = await pool.query('SELECT distinct on (pays.id_pay)* FROM pays JOIN users ON ' +
            'pays.id_user=users.id_user JOIN registers ON users.id_register=registers.id_register ' +
            'join currencies c on c.currency_code=pays.currency_code AND id_sell=$1', [id_sell])
        res.json(response.rows)
    }
    public async getPagosVentaByDate(req: Request, res: Response) {
        const initialDate = req.params.initialDate
        const endDate = req.params.endDate
        const response = await pool.query("SELECT currency,c.currency_code,c.language_code,c.country_code, " +
            "(SELECT coalesce((SELECT sum(mount) from pays where date>=$1 and date<=$2 " +
            "and type='Efectivo' and currency_code=c.currency_code),0)) as efectivo, " +
            "(SELECT coalesce((SELECT sum(mount) from pays where date>=$1 and date<=$2 " +
            "and type='Transacción eléctronica' and currency_code=c.currency_code),0)) " +
            "as transaccion from currencies c join building b  on c.currency_code=b.currency_code " +
            "group by currency,c.currency_code,c.language_code,c.country_code " +
            "UNION ALL " +
            "SELECT currency,c.currency_code,c.language_code,c.country_code, (SELECT coalesce((SELECT sum(mount) " +
            "from pays where date>=$1 and date<=$2 and type='Efectivo' and " +
            "currency_code=c.currency_code),0)) as efectivo, " +
            "(SELECT coalesce((SELECT sum(mount) from pays where date>=$1 and date<=$2 " +
            "and type='Transacción eléctronica' and currency_code=c.currency_code),0)) " +
            "as transaccion from currencies c join secondary_currencies s on " +
            "c.currency_code=s.currency_code group by currency,c.currency_code,c.language_code,c.country_code ",
            [initialDate, endDate])
        if (response.rowCount > 0) {
            res.json(response.rows)
        } else {
            res.json({
                transaccion: 0, efectivo: 0
            })
        }
    }
    public async createPay(req: Request, res: Response) {
        const { pay, sell } = req.body
        const client = await pool.connect()
        await client.query('BEGIN')

        try {
            await client.query('INSERT INTO pays (id_sell,type,reference,' +
                'mount,currency_code,exchange,id_user) values($1,$2,$3,$4,$5,$6,$7)',
                [sell.id_sell, pay.type, pay.reference, pay.mount, pay.currency_code,
                pay.exchange, pay.id_user]);

            await client.query('UPDATE sells SET total_sell=$1, total_paid=$2,state=$3 WHERE id_sell=$4',
                [sell.total_sell, sell.total_paid, sell.state, sell.id_sell]);

            await client.query('COMMIT')
            res.status(200).json({
                title: '¡Pago Registrado!', description: 'El pago se registró  con exito en el sístema'
            })
        } catch (error: any) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    }

    public async createVenta(req: Request, res: Response) {
        const { total_sell, currency_code, exchange, state, discount, type_sell, total_paid, id_user,
            id_client, sell_products, pays } = req.body
            console.log('sellproducts',sell_products)
            console.log('pagos',pays)
        const client = await pool.connect()
        await client.query('BEGIN')
        try {
            let response = await client.query('INSERT INTO sells (total_sell,currency_code,exchange,state,' +
                'discount,type_sell,total_paid,id_user,id_client) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id_sell',
                [total_sell, currency_code, exchange, state, discount, type_sell, total_paid, id_user, id_client]);
            sell_products.forEach(async (data: any) => {
                await client.query('INSERT INTO sell_products (id_sell,id_product,buy_price,sell_price,' +
                    'discount_product,tax_rate,quantity_products,exist_products,quantity_back)' +
                    'values($1,$2,$3,$4,$5,$6,$7,$8,$9)', [response.rows[0].id_sell, data.id_product, data.buy_price,
                    data.sell_price, data.discount_product, data.tax_rate, data.quantity_products,
                    data.exist_products - data.quantity_products, data.quantity_back])
            })
            pays.forEach(async (data: any) => {
                await client.query('INSERT INTO pays (id_sell,type,reference,' +
                    'mount,currency_code,exchange,id_user) values($1,$2,$3,$4,$5,$6,$7)',
                    [response.rows[0].id_sell, data.type, data.reference, data.mount, data.currency_code,
                    data.exchange, data.id_user]);
            })
            await client.query('COMMIT')
            res.status(200).json({
                title: '¡Venta Registrada!', description: 'La venta se registró con exito en el sístema'
            })
        } catch (error: any) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }


    }

    public async actualizarVenta(req: Request, res: Response) {
        const id_sell = parseInt(req.params.id_sell)
        const { total_buy, id_provider, id_user } = req.body
        await pool.query('UPDATE sells SET total_sell=$1 WHERE id_sell=$1',
            [total_buy, id_provider, id_user, id_sell]);
        res.status(200).json({
            title: '¡Venta Actualizada!', description: 'La Venta se actualizó con exito en el sístema'
        })
    }
    public async actualizarProductosVenta(req: Request, res: Response) {
        const id_sell_old = parseInt(req.params.id_sell)
        const id_product_old = parseInt(req.params.id_product)
        const { id_sell, id_product, buy_price, sell_price, weighted_averages, quantity_products,
            exist_products, quantity_back } = req.body
        await pool.query('UPDATE buy_products set id_sell=$1,id_product=$2,buy_price=$3,sell_price=$4,' +
            'weighted_averages=$5,quantity_products=$6,exist_products=$7,quantity_back=$8 where id_sell=$9 and id_product=$10',
            [id_sell, id_product, buy_price, sell_price, weighted_averages, quantity_products,
                exist_products, quantity_back, id_sell_old, id_product_old]);
        res.status(200).json({
            title: '¡Venta Actualizada!', description: 'La Venta se actualizó con exito en el sístema'
        })
    }
    public async eliminarVenta(req: Request, res: Response) {
        const id_sell = parseInt(req.params.id_sell)
        await pool.query('DELETE FROM sells WHERE id_sell=$1', [id_sell])
        res.status(200).json({
            title: '¡Venta Eliminada!', description: 'La Venta se eliminó con exito del sístema'
        })
    }
}
const ventasController = new VentasController();
export default ventasController;