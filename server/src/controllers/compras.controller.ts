import { Request, Response } from 'express';
import pool from '../database/database';

class ComprasController {

    public async getCompras(req: Request, res: Response) {
        const response = await pool.query('SELECT * FROM buys ORDER BY date,time DESC ')
        res.json(response.rows)
    }

    public async getCompraById(req: Request, res: Response) {
        const id_buy = parseInt(req.params.id_buy)
        if (Number.isNaN(id_buy)) {
            throw ('No existe una compra con la informacion especificada, verifiquela e intente nuevamente')
        }
        const response = await pool.query("SELECT distinct on (b.id_buy) * " +
            "from buys b join currencies cu on b.currency_code=cu.currency_code " +
            "join providers p on b.id_provider=p.id_provider " +
            "join users u on b.id_user=u.id_user " +
            "WHERE id_buy=$1 ORDER BY id_buy DESC", [id_buy])
        if (response.rowCount > 0) {
            res.json(response.rows)
        } else {
            throw ('No existen compras con la informacion especificada ' +
                'actualice la lista de compras e intentelo nuevamente')
        }
    }
    public async getCompraByDate(req: Request, res: Response) {
        const initialDate = req.params.initialDate
        const endDate = req.params.endDate
        console.log(initialDate + ' ' + endDate)
        const response = await pool.query("SELECT distinct on (b.id_buy) * " +
            "from buys b join currencies cu on b.currency_code=cu.currency_code " +
            "join providers p on b.id_provider=p.id_provider " +
            "join users u on b.id_user=u.id_user " +
            "WHERE date>=$1 and date<=$2 ORDER BY id_buy DESC", [initialDate, endDate])
        res.json(response.rows)
    }
    public async getComprasByUser(req: Request, res: Response) {
        const names = '%' + req.params.names.split(' ')[0] + '%'
        const last_names = ((req.params.names.split(' ')[1]) ?
            '%' + req.params.names.split(' ')[1] + '%' : '')

        const response = await pool.query("SELECT distinct on (b.id_buy) * " +
            "from buys b join currencies cu on b.currency_code=cu.currency_code " +
            "join providers p on b.id_provider=p.id_provider " +
            "join users u on b.id_user=u.id_user join countries c on c.currency_code=b.currency_code " +
            "where names_user ilike $1 or last_names_user ilike $2", [names, last_names])
        res.json(response.rows)
    }
    public async getComprasByProvider(req: Request, res: Response) {
        const name = '%' + req.params.name + '%'
        const response = await pool.query("SELECT distinct on (b.id_buy) * " +
            "from buys b join currencies cu on b.currency_code=cu.currency_code " +
            "join providers p on b.id_provider=p.id_provider " +
            "join users u on b.id_user=u.id_user join countries c on c.currency_code=b.currency_code " +
            "where name_provider ilike $1", [name])
        res.json(response.rows)
    }

    public async getProductosCompraById(req: Request, res: Response) {
        const id_buy = parseInt(req.params.id_buy)
        const response = await pool.query('SELECT * FROM buy_products WHERE id_buy=$1 order by id_buy',
            [id_buy])
        if (response.rowCount > 0) {
            res.json(response.rows)
        }
    }
    public async getProductoCompraById(req: Request, res: Response) {
        const id_buy = parseInt(req.params.id_buy)
        const id_product = parseInt(req.params.id_product)
        const response = await pool.query('SELECT * FROM buy_products WHERE id_buy=$1 and id_product=$2',
            [id_buy, id_product])
        res.json(response.rows)
    }


    public async createCompra(req: Request, res: Response) {
        const { total_buy, currency_code, exchange, id_provider, id_user, buy_products } = req.body
        const client = await pool.connect()
        await client.query('BEGIN')
        try {
            let response = await client.query('INSERT INTO buys (total_buy,currency_code,exchange,id_provider,id_user)' +
                'values($1,$2,$3,$4,$5) RETURNING id_buy',
                [total_buy, currency_code, exchange, id_provider, id_user]);
            buy_products.forEach(async (data: any) => {
                await client.query('INSERT INTO buy_products (id_buy,id_product,buy_price,sell_price,' +
                    'weighted_averages_sell,quantity_products,exist_products,quantity_back,' +
                    'weighted_averages_buy,discount_product,tax_rate)' +
                    'values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [response.rows[0].id_buy, data.id_product, data.buy_price,
                    data.sell_price, data.weighted_averages_sell, data.quantity_products,
                    data.exist_products, data.quantity_back, data.weighted_averages_buy,
                    data.discount_product, data.tax_rate])
            })
            client.query('COMMIT')
            res.status(200).json({
                title: '¡Compra Registrada!', description: 'La compra se registró con exito en el sístema'
            })
        } catch (error: any) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }


    }

    public async actualizarCompra(req: Request, res: Response) {
        const id_buy = parseInt(req.params.id_buy)
        const { total_buy, id_provider, id_user } = req.body
        await pool.query('UPDATE buys SET total_buy=$1,id_provider=$2,id_user=$3 WHERE id_buy=$4',
            [total_buy, id_provider, id_user, id_buy]);
        res.status(200).json({
            title: '¡Compra Actualizada!', description: 'La compra se actualizó con exito en el sístema'
        })
    }
    public async actualizarProductosCompra(req: Request, res: Response) {
        const id_buy_old = parseInt(req.params.id_buy)
        const id_product_old = parseInt(req.params.id_product)
        const { id_buy, id_product, buy_price, sell_price, weighted_averages, quantity_products,
            exist_products, quantity_back } = req.body
        await pool.query('UPDATE buy_products set id_buy=$1,id_product=$2,buy_price=$3,sell_price=$4,' +
            'weighted_averages=$5,quantity_products=$6,exist_products=$7,quantity_back=$8 where id_buy=$9 and id_product=$10',
            [id_buy, id_product, buy_price, sell_price, weighted_averages, quantity_products,
                exist_products, quantity_back, id_buy_old, id_product_old]);
        res.status(200).json({
            title: '¡Compra Actualizada!', description: 'La compra se actualizó con exito en el sístema'
        })
    }
    public async eliminarCompra(req: Request, res: Response) {
        const id_buy = parseInt(req.params.id_buy)
        await pool.query('DELETE FROM buys WHERE id_buy=$1', [id_buy])
        res.status(200).json({
            title: '¡Compra Eliminada!', description: 'La compra se eliminó con exito del sístema'
        })
    }
}
const comprasController = new ComprasController();
export default comprasController;