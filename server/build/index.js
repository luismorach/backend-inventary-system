"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cajas_routes_1 = __importDefault(require("./routes/cajas.routes"));
const categorias_routes_1 = __importDefault(require("./routes/categorias.routes"));
const proveedores_routes_1 = __importDefault(require("./routes/proveedores.routes"));
const usuarios_routes_1 = __importDefault(require("./routes/usuarios.routes"));
const clientes_routes_1 = __importDefault(require("./routes/clientes.routes"));
const productos_routes_1 = __importDefault(require("./routes/productos.routes"));
const empresa_routes_1 = __importDefault(require("./routes/empresa.routes"));
const compras_routes_1 = __importDefault(require("./routes/compras.routes"));
const coins_routes_1 = __importDefault(require("./routes/coins.routes"));
const repayment_routes_1 = __importDefault(require("./routes/repayment.routes"));
const ventas_routes_1 = __importDefault(require("./routes/ventas.routes"));
const kardex_routes_1 = __importDefault(require("./routes/kardex.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const taxes_routes_1 = __importDefault(require("./routes/taxes.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
class Server {
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(dashboard_routes_1.default);
        this.app.use(cajas_routes_1.default);
        this.app.use(categorias_routes_1.default);
        this.app.use(proveedores_routes_1.default);
        this.app.use(usuarios_routes_1.default);
        this.app.use(clientes_routes_1.default);
        this.app.use(productos_routes_1.default);
        this.app.use(compras_routes_1.default);
        this.app.use(ventas_routes_1.default);
        this.app.use(repayment_routes_1.default);
        this.app.use(kardex_routes_1.default);
        this.app.use(empresa_routes_1.default);
        this.app.use(coins_routes_1.default);
        this.app.use(taxes_routes_1.default);
        this.app.use(auth_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server starter on port ' + this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
