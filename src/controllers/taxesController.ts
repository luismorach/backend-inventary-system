import { Request, Response } from 'express';
import pool from '../database/conection';

class TaxesController {

    public async getTaxes(req: Request, res: Response) {
        const response = await pool.query('SELECT * FROM taxes ORDER BY tax_name ASC')
        res.json(response.rows)
    }
    public async getTaxById(req: Request, res: Response) {
        const tax_id = parseInt(req.params.tax_id)
        const response = await pool.query('SELECT * FROM taxes WHERE tax_id=$1 ORDER BY tax_name ASC',
            [tax_id])
        if (response.rowCount > 0) {
            res.json(response.rows)
        } else {
            throw ('No existen impuestos con la informacion especificada ' +
            'actualice la lista de impuestos e intentelo nuevamente')
        }
    }
    public async createTax(req: Request, res: Response) {
        const { tax_name, tax_rate,show_tax } = req.body
        await pool.query('INSERT INTO taxes (tax_name,tax_rate,show_tax) values($1,$2,$3)',
         [tax_name, tax_rate,show_tax]);
        res.status(200).json({
            title: '¡Impuesto Registrado!', description: 'El Impuesto se registro con exito en el sístema'
        })
    }

    public async updateTax(req: Request, res: Response) {
        const tax_id = parseInt(req.params.tax_id)
        const { tax_name, tax_rate,show_tax } = req.body
        await pool.query('UPDATE taxes SET tax_name=$1,tax_rate=$2,show_tax=$3 WHERE tax_id=$4',
            [tax_name, tax_rate,show_tax, tax_id]);
        res.status(200).json({
            title: '¡Impuesto Actualizado!', description: 'El Impuesto se actualizó con exito en el sístema'
        })
    }
    public async deleteTax(req: Request, res: Response) {
        const tax_id = parseInt(req.params.tax_id)
        await pool.query('DELETE FROM taxes WHERE tax_id=$1', [tax_id])
        res.status(200).json({
            title: '¡Impuesto Eliminado!', description: 'El Impuesto se elimminó con exito del sístema'
        })
    }
}
const taxesController = new TaxesController();
export default taxesController;