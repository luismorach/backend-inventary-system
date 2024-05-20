"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
class ProductosController {
    async getProductos(req, res) {
        const response = await database_1.default.query('SELECT * FROM products p join taxes t ' +
            'on p.tax_id = t.tax_id ORDER BY name ASC');
        res.json(response.rows);
    }
    async getProductosMasVendidos(req, res) {
        const response = await database_1.default.query('SELECT * FROM products ORDER BY sell_quantity DESC');
        res.json(response.rows);
    }
    async getProductosPorVencimiento(req, res) {
        const response = await database_1.default.query('SELECT * FROM products ORDER BY expir DESC');
        res.json(response.rows);
    }
    async getProductoById(req, res) {
        const id_product = parseInt(req.params.id_product);
        if (Number.isNaN(id_product)) {
            throw ('No existe un producto con la informacion especificada, verifiquela e intente nuevamente');
        }
        const response = await database_1.default.query('SELECT * FROM products WHERE id_product=$1 ORDER BY name ASC', [id_product]);
        if (response.rowCount > 0) {
            res.json(response.rows);
        }
        else {
            throw ('No existe un producto con la informacion especificada, es posible que ' +
                'haya sido eliminado, actualice la lista de productos e intentelo nuevamente');
        }
    }
    async getProductoByBarcode(req, res) {
        const barcode = parseInt(req.params.barcode);
        const response = await database_1.default.query('SELECT * FROM products WHERE barcode=$1 ORDER BY name ASC', [barcode]);
        if (response.rowCount > 0) {
            res.json(response.rows);
        }
        else {
            throw ('El producto que intenta actualizar ya no existe actualice la lista de Productos e intentelo nuevamente');
        }
    }
    async getProductoByCategory(req, res) {
        const id_category = parseInt(req.params.id_category);
        const response = await database_1.default.query('SELECT * FROM products WHERE id_category=$1 ORDER BY name ASC', [id_category]);
        res.json(response.rows);
    }
    async createProducto(req, res) {
        const { barcode, name, garanty, mark, model, can_expir, expir, time_garanty, id_category, discount, tax_id, time_unit } = req.body;
        await database_1.default.query('INSERT INTO products ' +
            '(barcode,name,garanty,mark,model,can_expir,expir,time_garanty,id_category,discount,tax_id,time_unit)' +
            'values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [barcode, name, garanty, mark, model, can_expir, expir, time_garanty, id_category, discount, tax_id, time_unit]);
        res.status(200).json({
            title: '¡Producto Registrado!', description: 'El Producto se registró con exito en el sístema'
        });
    }
    async actualizarProducto(req, res) {
        const id_product = parseInt(req.params.id_product);
        const { barcode, name, garanty, mark, model, can_expir, expir, time_garanty, id_category, discount, tax_id, cost, price, exist_quantity, time_unit } = req.body;
        await database_1.default.query('UPDATE products SET barcode=$1,name=$2,garanty=$3,mark=$4,' +
            'model=$5,can_expir=$6,expir=$7,time_garanty=$8,id_category=$9,discount=$10,tax_id=$11,' +
            'cost=$12,price=$13,exist_quantity=$14,time_unit=$15 WHERE id_product=$16', [barcode, name, garanty, mark, model, can_expir, expir, time_garanty, id_category, discount,
            tax_id, cost, price, exist_quantity, time_unit, id_product]);
        res.status(200).json({
            title: '¡Producto Actualizado!', description: 'El Producto se actualizó con exito en el sístema'
        });
    }
    async eliminarProducto(req, res) {
        const id_product = parseInt(req.params.id_product);
        await database_1.default.query('DELETE FROM products WHERE id_product=$1', [id_product]);
        res.status(200).json({
            title: '¡Producto Eliminado!', description: 'El Producto se eliminó con exito del sístema'
        });
    }
}
const productosController = new ProductosController();
exports.default = productosController;
