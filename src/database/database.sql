CREATE DATABASE db_inventary;

CREATE TABLE IF NOT EXISTS Cajas(
    ID_Caja Serial PRIMARY KEY NOT NULL,
    Nombre text NOT NULL,
    Estado text NOT NULL
); 

CREATE TABLE IF NOT EXISTS Usuarios (
    ID_Usuario Serial PRIMARY KEY NOT NULL,
    TipoDocumento TEXT NOT NULL,
    NumeroDocumento Integer NOT NULL,
    Cargo TEXT NOT NULL,
    Nombres TEXT NOT NULL,
    Apellidos TEXT NOT NULL,
    Telefono text NOT NULL,
    Genero TEXT NOT NULL,
    LectorBarras TEXT NOT NULL,
    ID_Caja Integer,
    Email TEXT NOT NULL,
    Password TEXT NOT NULL,
    Estado TEXT NOT NULL,
    foreign key(ID_Caja) references Cajas(ID_Caja) on update cascade on delete cascade
);

CREATE TABLE IF NOT EXISTS Categorias(
    ID_Categoria Serial PRIMARY KEY NOT NULL,
    Nombre text NOT NULL,
    Ubicacion text NOT NULL
);

CREATE TABLE IF NOT EXISTS Proveedores (
    ID_Proveedor Serial PRIMARY KEY NOT NULL,
    TipoDocumento TEXT NOT NULL,
    NumeroDocumento Integer NOT NULL,
    NombreProveedor TEXT NOT NULL,
    Direccion TEXT,
    Estado TEXT NOT NULL,
    NombreEncargado TEXT,
    Telefono TEXT,
    Email TEXT
);

CREATE TABLE IF NOT EXISTS Clientes(
    ID_Cliente Serial PRIMARY KEY NOT NULL,
    TipoDocumento TEXT NOT NULL,
    NumeroDocumento Integer NOT NULL,
    Nombres TEXT NOT NULL,
    Apellidos TEXT NOT NULL,
    Estado TEXT NOT NULL,
    Ciudad TEXT NOT NULL,
    Direccion TEXT NOT NULL,
    Telefono TEXT NOT NULL,
    Email TEXT
);

CREATE TABLE IF NOT EXISTS Productos (
    ID_producto Serial PRIMARY KEY NOT NULL,
    CodigoBarra TEXT NOT NULL,
    Nombre TEXT NOT NULL,
    Garantia TEXT NOT NULL,
    Marca TEXT,
    Modelo TEXT,
    Vencimiento DATE,
    UnidadTiempo Integer,
    Tiempo TEXT,
    ID_Categoria Integer NOT NULL,
    PrecioCompra DECIMAL NOT NULL,
    PrecioVenta DECIMAL NOT NULL,
    Descuento Decimal NOT NULL,
    Impuesto Decimal NOT NULL,
    CantidadVendida Integer NOT NULL,
    CantidadExistente Integer NOT NULL,
    foreign key(ID_Categoria) references Categorias(ID_Categoria) on update cascade on delete cascade
);

CREATE TABLE IF NOT EXISTS Compras (
    ID_Compra SERIAL PRIMARY KEY NOT NULL,
    Tipo TEXT NOT NULL,
    Fecha DATE NOT NULL,
    Hora TIME NOT NULL,
    TotalCompra DECIMAL NOT NULL,
    Moneda TEXT NOT NULL,
    TasaCambioBS DECIMAL,
    TasaCambioDolar DECIMAL,
    TasaCambioEuro DECIMAL,
    ID_Proveedor Integer NOT NULL,
    ID_Usuario Integer NOT NULL,
    foreign key(ID_Usuario) references Usuarios(ID_Usuario) on update cascade on delete cascade,
    foreign key(ID_Proveedor) references Proveedores(ID_Proveedor) on update cascade on delete cascade
);

CREATE TABLE IF NOT EXISTS Productos_Compra(
    ID_Producto Integer NOT NULL,
    ID_Compra Integer NOT NULL,
    PrecioCompra DECIMAL NOT NULL,
    PrecioVenta DECIMAL NOT NULL,
    PromedioPonderado DECIMAL NOT NULL,
    CantProductos Integer NOT NULL,
    CantExistente Integer NOT NULL,
    CantDevuelta Integer NOT NULL,
    foreign key(ID_Producto) references Productos(ID_Producto) on update cascade on delete cascade,
    foreign key(ID_Compra) references Compras(ID_Compra) on update cascade on delete cascade,
    CONSTRAINT Productos_compra_pkey PRIMARY KEY (ID_Producto, ID_Compra)
);

CREATE TABLE IF NOT EXISTS Ventas (
    ID_Venta SERIAL PRIMARY KEY NOT NULL,
    Tipo TEXT NOT NULL,
    Fecha DATE NOT NULL,
    Hora TIME NOT NULL,
    TotalVenta DECIMAL NOT NULL,
    Moneda TEXT NOT NULL,
    TasaCambioBS DECIMAL,
    TasaCambioDolar DECIMAL,
    TasaCambioEuro DECIMAL,
    Estado TEXT NOT NULL,
    TipoDeVenta TEXT NOT NULL,
    TotalPagado DECIMAL,
    DescuentoVenta Decimal NOT NULL,
    ID_Usuario Integer NOT NULL,
    ID_Cliente Integer NOT NULL,
    foreign key(ID_Usuario) references Usuarios(ID_Usuario) on update cascade on delete cascade,
    foreign key(ID_Cliente) references Clientes(ID_Cliente) on update cascade on delete cascade
);

CREATE TABLE IF NOT EXISTS Pagos(
    ID_Pago serial PRIMARY KEY NOT NULL,
    ID_Venta Integer NOT NULL,
    Tipo TEXT NOT NULL,
    Fecha DATE NOT NULL,
    Referencia Integer,
    Monto DECIMAL NOT NULL,
    Moneda TEXT NOT NULL,
    TasaCambioBS DECIMAL,
    TasaCambioDolar DECIMAL,
    TasaCambioEuro DECIMAL,
    ID_Usuario Integer NOT NULL,
    foreign key(ID_Venta) references Ventas(ID_Venta) on update cascade on delete cascade,
    foreign key(ID_Usuario) references Usuarios(ID_Usuario) on update cascade on delete cascade
);

CREATE TABLE IF NOT EXISTS Productos_Venta(
    ID_Producto Integer NOT NULL,
    ID_Venta Integer NOT NULL,
    PrecioCompra DECIMAL NOT NULL,
    PrecioVenta DECIMAL NOT NULL,
    DescuentoProducto Decimal NOT NULL,
    Impuesto Decimal NOT NULL,
    CantProductos Integer NOT NULL,
    CantExistente Integer NOT NULL,
    CantDevuelta Integer NOT NULL,
    foreign key(ID_Producto) references Productos(ID_Producto) on update cascade on delete cascade,
    foreign key(ID_Venta) references Ventas(ID_Venta) on update cascade on delete cascade,
    CONSTRAINT Productos_venta_pkey PRIMARY KEY (ID_Producto, ID_Venta)
);

CREATE TABLE IF NOT EXISTS Devoluciones_Compra (
    ID_Devolucion SERIAL PRIMARY KEY NOT NULL,
    Tipo TEXT NOT NULL,
    ID_Operacion Integer NOT NULL,
    Fecha DATE NOT NULL,
    Hora TIME NOT NULL,
    Cantidad INTEGER,
    Precio DECIMAL NOT NULL,
    Total DECIMAL NOT NULL,
    Moneda TEXT NOT NULL,
    TasaCambioBS DECIMAL,
    TasaCambioDolar DECIMAL,
    TasaCambioEuro DECIMAL,
    CantExistente Integer NOT NULL,
    PromediosPonderados Decimal NOT NULL,
    ID_Usuario Integer NOT NULL,
    ID_Producto Integer NOT NULL,
    foreign key(ID_Operacion) references Compras(ID_Compra) on update cascade on delete cascade,
    foreign key(ID_Usuario) references Usuarios(ID_Usuario) on update cascade on delete cascade,
    foreign key(ID_Producto) references Productos(ID_Producto) on update cascade on delete cascade
);

CREATE TABLE IF NOT EXISTS Devoluciones_Venta (
    ID_Devolucion SERIAL PRIMARY KEY NOT NULL,
    Tipo TEXT NOT NULL,
    ID_Operacion Integer NOT NULL,
    Fecha DATE NOT NULL,
    Hora TIME NOT NULL,
    Cantidad INTEGER,
    Precio DECIMAL NOT NULL,
    Total DECIMAL NOT NULL,
    Moneda TEXT NOT NULL,
    TasaCambioBS DECIMAL,
    TasaCambioDolar DECIMAL,
    TasaCambioEuro DECIMAL,
    CantExistente Integer NOT NULL,
    PromediosPonderados Decimal NOT NULL,
    ID_Usuario Integer NOT NULL,
    ID_Producto Integer NOT NULL,
    foreign key(ID_Operacion) references Ventas(ID_Venta) on update cascade on delete cascade,
    foreign key(ID_Usuario) references Usuarios(ID_Usuario) on update cascade on delete cascade,
    foreign key(ID_Producto) references Productos(ID_Producto) on update cascade on delete cascade
);

create
or replace view kardex (
    ID_Operacion,
    ID_Relacion,
    Tipo,
    Fecha,
    Hora,
    Moneda,
    CantProductos,
    CantExistente,
    PrecioVenta,
    PromedioPonderado,
    TasaCambioBS,
    TasaCambioDolar,
    TasaCambioEuro
) as (
    select
        pc.ID_Compra,
        pc.ID_Producto,
        c.tipo,
        c.Fecha,
        c.Hora,
        c.Moneda,
        pc.CantProductos,
        pc.CantExistente,
        pc.PrecioVenta,
        pc.PromedioPonderado,
        c.TasaCambioBS,
        c.TasaCambioDolar,
        c.TasaCambioEuro
    from
        productos_compra pc
        inner join Compras c on pc.ID_Compra = c.ID_Compra
)
union
all (
    select
        pv.ID_Venta,
        pv.ID_Producto,
        v.tipo,
        v.Fecha,
        v.hora,
        v.moneda,
        pv.CantProductos,
        pv.CantExistente,
        (
            (
                (
                    pv.PrecioVenta -(pv.DescuentoProducto * pv.PrecioVenta)
                ) /(1 + pv.Impuesto)
            ) - (
                v.DescuentoVenta *(
                    (
                        pv.PrecioVenta - (pv.DescuentoProducto * pv.PrecioVenta)
                    ) /(1 + pv.Impuesto)
                )
            )
        ) + (
            (
                (
                    pv.PrecioVenta - (pv.DescuentoProducto * pv.PrecioVenta)
                ) /(1 + pv.Impuesto)
            ) * pv.Impuesto
        ),
        pv.PrecioVenta,
        v.TasaCambioBS,
        v.TasaCambioDolar,
        v.TasaCambioEuro
    from
        Productos_venta pv
        inner join Ventas v on pv.ID_Venta = v.ID_Venta
)
union
all
select
    dc.ID_Operacion,
    dc.ID_Producto,
    dc.Tipo,
    dc.Fecha,
    dc.hora,
    dc.moneda,
    dc.cantidad,
    dc.CantExistente,
    dc.Precio,
    dc.PromediosPonderados,
    dc.TasaCambioBS,
    dc.TasaCambioDolar,
    dc.TasaCambioEuro
from
    Devoluciones_Compra dc
union
all
select
    dv.ID_Operacion,
    dv.ID_Producto,
    dv.Tipo,
    dv.Fecha,
    dv.hora,
    dv.moneda,
    dv.cantidad,
    dv.CantExistente,
    dv.Precio,
    dv.PromediosPonderados,
    dv.TasaCambioBS,
    dv.TasaCambioDolar,
    dv.TasaCambioEuro
from
    Devoluciones_Venta dv;

;

CREATE TABLE IF NOT EXISTS Empresa (
    ID_Empresa serial NOT NULL,
    TipoDocumento TEXT NOT NULL,
    NumeroDocumento BigInt NOT NULL,
    Nombre TEXT NOT NULL,
    Moneda TEXT NOT NULL,
    Direccion TEXT NOT NULL,
    NombreImpuesto TEXT NOT NULL,
    PorcentajeImpuesto DECIMAL NOT NULL,
    MostrarImpuesto TEXT NOT NULL,
    Email TEXT NOT NULL,
    Telefono TEXT NOT NULL,
    TasaCambioBS DECIMAL,
    TasaCambioDolar DECIMAL,
    TasaCambioEuro DECIMAL
);