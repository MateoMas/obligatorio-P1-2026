// Código hecho por Mateo Más Lukinskas (375845) y Luca Piacenza (360347)

class Sistema {

    constructor() {
        this.influencers = [];
        this.articulos = [];
        this.ventas = [];
    }

    // Verifica si ya existe un influencer con el mismo correo electrónico.
    comprobarMailDuplicado(mail) {
        for (let i = 0; i < this.influencers.length; i++) {
            if (this.influencers[i].mail === mail) {
                return true;
            }
        }
        return false;
    }

    // Verifica si ya existe un artículo con el mismo código.
    comprobarCodigoDuplicado(codigo) {
        for (let i = 0; i < this.articulos.length; i++) {
            if (this.articulos[i].codigo === codigo) {
                return true;
            }
        }
        return false;
    }

    // Ordena la lista de influencers o artículos según el criterio indicado.
    ordenarTabla(ordenAscendente, tipo) {
        if (tipo === "inf") {
            if (ordenAscendente) {
                this.influencers.sort((a, b) => a.nombre.localeCompare(b.nombre));
            } else {
                this.influencers.sort((a, b) => b.nombre.localeCompare(a.nombre));
            }
        } else if (tipo === "art") {
            if (ordenAscendente) {
                this.articulos.sort((a, b) => a.codigo.localeCompare(b.codigo));
            } else {
                this.articulos.sort((a, b) => b.codigo.localeCompare(a.codigo));
            }
        }
    }

    // Muestra un alert con las ventas registradas para un influencer específico.
    mostrarDetalleVentas(influencer) {
        let ventasInfluencer = this.ventas.filter(venta => venta.influencer.mail === influencer.mail);
        if (ventasInfluencer.length > 0) {
            let detalle = "Ventas:\n";
            ventasInfluencer.forEach(venta => {
                let total = venta.articulo.precio * venta.cantidad;
                let comision = parseFloat(venta.articulo.precio * venta.cantidad * influencer.comision) / 100;
                let nro = sistema.ventas.indexOf(venta) + 1;
                detalle += `Nro ${nro}- ${venta.cantidad}-${venta.articulo.codigo}- $${venta.articulo.precio}c/u Total $${total}- Comision: $${comision}\n`;
            });
            alert(detalle);
        } else {
            alert(`${influencer.nombre} no tiene ventas registradas.`);
        }
    }

    // Elimina una venta y actualiza los totales y tablas asociadas.
    borrarVenta(index) {
        let venta = this.ventas[index];
        venta.influencer.totalCobrar -= parseFloat(venta.articulo.precio * parseFloat(venta.cantidad) * venta.influencer.comision) / 100;
        this.ventas.splice(index, 1);
        generarTablaVentas();
        generarTablaInfluencers();
        generarTablaArticulos();
        generarGrafico();
    }

    // Indica si el influencer tiene la comisión más alta del sistema.
    influencerMayorComision(influencer) {
        for (let i = 0; i < this.influencers.length; i++) {
            if (this.influencers[i].comision > influencer.comision) {
                return false;
            }
        }
        return true;
    }

    // Determina si el influencer participó en la venta de mayor valor.
    ventaMasCara(influencer) {
        if (this.ventas.length !== 0) {
            let ventaMasCara = this.ventas[0];
            for (let i = 0; i < this.ventas.length; i++) {
                if ((this.ventas[i].articulo.precio * this.ventas[i].cantidad) > (ventaMasCara.articulo.precio * ventaMasCara.cantidad)) {
                    ventaMasCara = this.ventas[i];
                }
            }
            if (ventaMasCara.influencer.mail === influencer.mail) {
                return true;
            }
        }
        return false;
    }

    // Señala cuál artículo fue el más vendido y lo marca visualmente.
    comprobarMasVendido(articulo) {
        let masVendido = this.articulos[0];
        let maxVendido = 0;
        this.articulos.forEach(art => {
            let cantidadVendida = 0;
            this.ventas.forEach(venta => {
                if (venta.articulo.codigo === art.codigo) {
                    cantidadVendida += venta.cantidad;
                }
            });
            if (cantidadVendida > maxVendido) {
                maxVendido = cantidadVendida;
                masVendido = art;
            }
        });
        if (articulo === masVendido && maxVendido > 0) {
            return " ⭐";
        }
        return "";
    }

}

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