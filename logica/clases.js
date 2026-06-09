class Influencer {
    constructor(nombre, mail, comision, totalCobrar) {
        this.nombre = nombre;
        this.mail = mail;
        this.comision = comision;
        this.totalCobrar = totalCobrar;
    }
}

class Articulo {
    constructor(codigo, precio, descripcion) {
        this.codigo = codigo;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}

class Venta {
    constructor(influencer, articulo, cantidad, medio) {
        this.influencer = influencer;
        this.articulo = articulo;
        this.cantidad = cantidad;   
        this.medio = medio;
    }
}