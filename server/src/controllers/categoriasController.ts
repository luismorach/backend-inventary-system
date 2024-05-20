import { Request, Response } from 'express';
import pool from '../database/database';

class CategoriasController {

    public async getcategorías(req: Request, res: Response) {
        const response = await pool.query('SELECT * FROM categories ORDER BY name ASC')
        res.json(response.rows)
    }
    public async getcategoríaById(req: Request, res: Response) {
        const id_category = parseInt(req.params.id_category)
        if(Number.isNaN(id_category)){
            throw ('No existe una categoría con la informacion especificada, verifiquela e intente nuevamente')
        }
        const response = await pool.query('SELECT * FROM categories WHERE id_category=$1 ORDER BY name ASC',
            [id_category])
        if (response.rowCount > 0) {
            res.json(response.rows)
        } else { 
            throw ('No existe una categoría con la informacion especificada, es posible que '+
            'haya sido eliminada, actualice la lista de categorías e intentelo nuevamente')
        }
    }
    public async createcategoría(req: Request, res: Response) {
        const { name, ubication } = req.body
        await pool.query('INSERT INTO categories (name,ubication) values($1,$2)', [name, ubication]);
        res.status(200).json({
            title: '¡Categoría Registrada!', description: 'La categoría se registró con exito en el sístema'
        })
    }

    public async actualizarcategoría(req: Request, res: Response) {
        const id_category = parseInt(req.params.id_category)
        const { name, ubication } = req.body
        await pool.query('UPDATE categories SET name=$1,ubication=$2 WHERE id_category=$3',
            [name, ubication, id_category]);
        res.status(200).json({
            title: '¡Categoría Actualizada!', description: 'La categoría se actualizó con exito en el sístema'
        })
    }
    public async eliminarcategoría(req: Request, res: Response) {
        const id_category = parseInt(req.params.id_category)
        await pool.query('DELETE FROM categories WHERE id_category=$1', [id_category])
        res.status(200).json({
            title: '¡Categoría Eliminada!', description: 'La categoría se elimminó con exito del sístema'
        })
    }
}
const categoriasController = new CategoriasController();
export default categoriasController;