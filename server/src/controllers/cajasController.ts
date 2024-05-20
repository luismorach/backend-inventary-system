import { Request, Response } from 'express';
import pool from '../database/database';

class CajasController {

    public async getCajas(req: Request, res: Response) {
        console.log('pasando')
        const response = await pool.query('SELECT * FROM registers WHERE id_register!=0 ORDER BY name_register ASC')
        res.json(response.rows)
    }
    public async getCajaById(req: Request, res: Response) {
        const id_register = parseInt(req.params.id_register) 
        if(Number.isNaN(id_register)){
            throw ('No existe una caja con la informacion especificada, verifiquela e intente nuevamente')
        }
        const response = await pool.query('SELECT * FROM registers WHERE id_register=$1 ORDER BY name_register ASC',
            [id_register])
        if (response.rowCount > 0) {
            res.json(response.rows)
        } else {
            throw ('No existe una caja con la informacion especificada, es posible que '+
            'haya sido eliminada, actualice la lista de cajas e intentelo nuevamente')
        }
    }
    public async createCaja(req: Request, res: Response) {
        const { name_register, state_register } = req.body
        await pool.query('INSERT INTO registers (name_register,state_register) values($1,$2)', [name_register, state_register]);
        res.status(200).json({
            title: '¡Caja Registrada!', 
            description: 'La caja se registro con exito en el sístema'
        })
    }

    public async actualizarCaja(req: Request, res: Response) {
        const id_register = parseInt(req.params.id_register)
        const { name_register, state_register } = req.body
        await pool.query('UPDATE registers SET name_register=$1,state_register=$2 WHERE id_register=$3',
            [name_register, state_register, id_register]);
        res.status(200).json({
            title: '¡Caja Actualizada!', description: 'La caja se actualizó con exito en el sístema'
        })
    }
    public async eliminarCaja(req: Request, res: Response) {
        const id_register = parseInt(req.params.id_register)
        await pool.query('DELETE FROM registers WHERE id_register=$1', [id_register])
        res.status(200).json({
            title: '¡Caja Eliminada!', description: 'La caja se elimminó con exito del sístema'
        })
    }
}
const cajasController = new CajasController();
export default cajasController;