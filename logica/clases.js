class Sistema {

    constructor() {
        this.influencers = [];
        this.articulos = [];
        this.ventas = [];
    }

    comprobarMailDuplicado(mail) {
        for (let i = 0; i < this.influencers.length; i++) {
            if (this.influencers[i].mail === mail) {
                return true;
            }
        }
        return false;
    }

    comprobarCodigoDuplicado(codigo) {
        for (let i = 0; i < this.articulos.length; i++) {
            if (this.articulos[i].codigo === codigo) {
                return true;
            }
        }
        return false;
    }

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

    mostrarDetalleVentas(influencer) {
        const ventasInfluencer = this.ventas.filter(venta => venta.influencer.mail === influencer.mail);
        if (ventasInfluencer.length > 0) {
            let detalle = "Ventas:\n";
            ventasInfluencer.forEach(venta => {
                const total = venta.articulo.precio * venta.cantidad;
                const comision = parseFloat(venta.articulo.precio * venta.cantidad * influencer.comision) / 100;
                const nro = sistema.ventas.indexOf(venta) + 1;
                detalle += `Nro ${nro}- ${venta.cantidad}-${venta.articulo.codigo}- $${venta.articulo.precio}c/u Total $${total}- Comision: $${comision}\n`;
            });
            alert(detalle);
        } else {
            alert(`${influencer.nombre} no tiene ventas registradas.`);
        }
    }

    borrarVenta(index) {
        const venta = this.ventas[index];
        venta.influencer.totalCobrar -= parseFloat(venta.articulo.precio * parseFloat(venta.cantidad) * venta.influencer.comision) / 100;
        this.ventas.splice(index, 1);
        generarTablaVentas();
        generarTablaInfluencers();
    }

    influencerMayorComision(influencer) {
        for (let i = 0; i < this.influencers.length; i++) {
            if (this.influencers[i].comision > influencer.comision) {
                return false;
            }
        }
        return true;
    }

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