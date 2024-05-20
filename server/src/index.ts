 import express, {Application, application} from 'express'; 
import morgan from 'morgan';
import cors from  'cors';
import cajasRoutes from './routes/cajas.routes'
import categoriasRoutes from './routes/categorias.routes';
import proveedoresRoutes from './routes/proveedores.routes';
import usuariosRoutes from './routes/usuarios.routes';
import clientesRoutes from './routes/clientes.routes';
import productosRoutes from './routes/productos.routes';
import empresaRoutes from './routes/empresa.routes';
import comprasRoutes from './routes/compras.routes';
import coinsRoutes from './routes/coins.routes';
import repaymentRoutes from './routes/repayment.routes';
import ventasRoutes from './routes/ventas.routes';
import kardexRoutes from './routes/kardex.routes';
import dashboardRoutes from './routes/dashboard.routes';
import taxesRoutes from './routes/taxes.routes';
import authRoutes from './routes/auth.routes';

 
 class Server{
    app: Application;

    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }
    config():void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes():void{
        this.app.use(dashboardRoutes)
        this.app.use(cajasRoutes)
        this.app.use(categoriasRoutes)
        this.app.use(proveedoresRoutes)
        this.app.use(usuariosRoutes)
        this.app.use(clientesRoutes)
        this.app.use(productosRoutes)
        this.app.use(comprasRoutes)
        this.app.use(ventasRoutes)
        this.app.use(repaymentRoutes)
        this.app.use(kardexRoutes)
        this.app.use(empresaRoutes)
        this.app.use(coinsRoutes)
        this.app.use(taxesRoutes)
        this.app.use(authRoutes)
    }

    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('server starter on port '+this.app.get('port'))
        })
    }

}
const server = new Server();

server.start(); 
