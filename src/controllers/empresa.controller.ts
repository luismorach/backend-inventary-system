import { Request, Response } from 'express';
import pool from '../database/conection';

class EmpresaController {

    public async getEmpresas(req: Request, res: Response) {
        const response = await pool.query('SELECT * FROM building ORDER BY name ASC')
        res.json(response.rows)
    }
    public async getBuilding() {
        const response = await pool.query('SELECT * FROM building ORDER BY name ASC')
        return response.rows[0]
    }


    public async createEmpresa(req: Request, res: Response) {
        const { document_type, document_number, name, currency_code, address, email,
             phone_number, secondariesCoins,email_password} = req.body
        const client = await pool.connect()
        await client.query('BEGIN')
        try {
            
            await client.query('INSERT INTO building (document_type,document_number,name,currency_code,address,' +
                'email,phone_number,email_password) values($1,$2,$3,$4,$5,$6,$7,$8)',
                [document_type, document_number, name, currency_code, address, email,
                     phone_number,email_password]);
            await client.query('TRUNCATE TABLE secondary_currencies')
            secondariesCoins.forEach(async (data: any) => {
                await client.query('INSERT INTO secondary_currencies (currency_code,exchange) ' +
                    'VALUES($1,$2)', [data.currency_code, data.exchange])
            })
            await client.query('COMMIT')
            res.status(200).json({
                title: '¡Empresa Registrada!', description: 'La Empresa se registró con exitó en el sístema'
            })
        } catch (error: any) {
            await client.query('ROLLBACK')
            throw error
        }
    }

    public async actualizarEmpresa(req: Request, res: Response) {
        const id_building = parseInt(req.params.id_building)
        const { document_type, document_number, name, currency_code, address,
            email, phone_number,email_password, secondariesCoins } = req.body
        const client = await pool.connect()
        await client.query('BEGIN')
        try {
            await client.query('UPDATE building SET document_type=$1,document_number=$2, ' +
                'name=$3,currency_code=$4,address=$5, email=$6,phone_number=$7, email_password=$8 '+
                'WHERE id_building=$9',
                [document_type, document_number, name, currency_code, address,
                    email, phone_number,email_password, id_building]);
            await client.query('TRUNCATE TABLE secondary_currencies')
            secondariesCoins.forEach(async (data: any) => {
                await client.query('INSERT INTO secondary_currencies (currency_code,exchange) ' +
                    'VALUES($1,$2)', [data.currency_code, data.exchange])
            })
            await client.query('COMMIT')
            res.status(200).json({
                title: '¡Empresa Actualizada!', description: 'La empresa se actualizó con exito en el sístema'
            })
        } catch (error: any) {
            await client.query('ROLLBACK')
            throw error
        }
    }

}
const empresaController = new EmpresaController();
export default empresaController;