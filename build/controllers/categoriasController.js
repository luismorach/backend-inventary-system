"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conection_1 = __importDefault(require("../database/conection"));
class CategoriasController {
    async getcategorías(req, res) {
        const response = await conection_1.default.query('SELECT * FROM categories ORDER BY name ASC');
        res.json(response.rows);
    }
    async getcategoríaById(req, res) {
        const id_category = parseInt(req.params.id_category);
        if (Number.isNaN(id_category)) {
            throw ('No existe una categoría con la informacion especificada, verifiquela e intente nuevamente');
        }
        const response = await conection_1.default.query('SELECT * FROM categories WHERE id_category=$1 ORDER BY name ASC', [id_category]);
        if (response.rowCount > 0) {
            res.json(response.rows);
        }
        else {
            throw ('No existe una categoría con la informacion especificada, es posible que ' +
                'haya sido eliminada, actualice la lista de categorías e intentelo nuevamente');
        }
    }
    async createcategoría(req, res) {
        const { name, ubication } = req.body;
        await conection_1.default.query('INSERT INTO categories (name,ubication) values($1,$2)', [name, ubication]);
        res.status(200).json({
            title: '¡Categoría Registrada!', description: 'La categoría se registró con exito en el sístema'
        });
    }
    async actualizarcategoría(req, res) {
        const id_category = parseInt(req.params.id_category);
        const { name, ubication } = req.body;
        await conection_1.default.query('UPDATE categories SET name=$1,ubication=$2 WHERE id_category=$3', [name, ubication, id_category]);
        res.status(200).json({
            title: '¡Categoría Actualizada!', description: 'La categoría se actualizó con exito en el sístema'
        });
    }
    async eliminarcategoría(req, res) {
        const id_category = parseInt(req.params.id_category);
        await conection_1.default.query('DELETE FROM categories WHERE id_category=$1', [id_category]);
        res.status(200).json({
            title: '¡Categoría Eliminada!', description: 'La categoría se elimminó con exito del sístema'
        });
    }
}
const categoriasController = new CategoriasController();
exports.default = categoriasController;
