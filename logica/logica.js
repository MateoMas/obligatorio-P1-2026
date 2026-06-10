const botonAgregarInfluencer = document.getElementById("botonAgregarInfluencer");
const modalInfluencer = document.getElementById("modalInfluencer");
const botonCancelarInfluencer = document.getElementById("botonCancelarInfluencer");
const formInfluencer = document.getElementById("formInfluencer");
const idNombre = document.getElementById("nombre");
const idMail = document.getElementById("mail");
const idComision = document.getElementById("comision");
const botonOrdenInfluencers = document.getElementById("botonOrdenInfluencers");

let influencers = [];

formInfluencer.addEventListener("submit", (e) => {
    e.preventDefault();
    if (comprobarMailDuplicado(idMail.value)) {
        alert("El mail ingresado ya existe. Por favor, ingrese un mail diferente.");
    } else {
        const nuevoInfluencer = new Influencer(idNombre.value, idMail.value, parseInt(idComision.value), 0);
        influencers.push(nuevoInfluencer);
        formInfluencer.reset();
        modalInfluencer.close();
    }
    generarTablaInfluencers();
});

function comprobarMailDuplicado(mail) {
    for (let i = 0; i < influencers.length; i++) {
        if (influencers[i].mail === mail) {
            return true;
        }
    }
    return false;
}

botonAgregarInfluencer.addEventListener("click", () => {
    modalInfluencer.showModal();
});

botonCancelarInfluencer.addEventListener("click", () => {
    modalInfluencer.close();
});

const botonAgregarArticulo = document.getElementById("botonAgregarArticulo");
const modalArticulo = document.getElementById("modalArticulo");
const botonCancelarArticulo = document.getElementById("botonCancelarArticulo");
const formArticulo = document.getElementById("formArticulo");
const idCodigo = document.getElementById("codigo");
const idPrecio = document.getElementById("precio");
const idDescripcion = document.getElementById("descripcion");

let articulos = [];

botonAgregarArticulo.addEventListener("click", () => {
    modalArticulo.showModal();
});

botonCancelarArticulo.addEventListener("click", () => {
    modalArticulo.close();
});

formArticulo.addEventListener("submit", (e) => {
    e.preventDefault();
    if (comprobarCodigoDuplicado(idCodigo.value)) {
        alert("El código ingresado ya existe. Por favor, ingrese un código diferente.");
    } else {
        const nuevoArticulo = new Articulo(idCodigo.value, parseInt(idPrecio.value), idDescripcion.value);
        articulos.push(nuevoArticulo);
        formArticulo.reset();
        modalArticulo.close();
    }
    generarTablaArticulos();
});

function comprobarCodigoDuplicado(codigo) {
    for (let i = 0; i < articulos.length; i++) {
        if (articulos[i].codigo === codigo) {
            return true;
        }
    }
    return false;
}

const botonAgregarVenta = document.getElementById("botonAgregarVenta");
const modalVenta = document.getElementById("modalVenta");
const botonCancelarVenta = document.getElementById("botonCancelarVenta");
const formVenta = document.getElementById("formularioVenta");
const idArticuloVenta = document.getElementById("articulo");
const idInfluencerVenta = document.getElementById("influencer");
const cantidadVenta = document.getElementById("cantidad");
const medioVenta = document.getElementById("medio");

function actualizarSelects() {
    idArticuloVenta.innerHTML = "";
    idInfluencerVenta.innerHTML = "";
    articulos.forEach(articulo => {
        const option = document.createElement("option");
        option.value = articulo.codigo;
        option.textContent = `${articulo.codigo} - $${articulo.precio}`;
        idArticuloVenta.appendChild(option);
    });
    influencers.forEach(influencer => {
        const option = document.createElement("option");
        option.value = influencer.mail;
        option.textContent = influencer.nombre;
        idInfluencerVenta.appendChild(option);
    });
}

let ventas = [];

botonAgregarVenta.addEventListener("click", () => {
    actualizarSelects();
    modalVenta.showModal();
});

botonCancelarVenta.addEventListener("click", () => {
    modalVenta.close();
});

formVenta.addEventListener("submit", (e) => {
    e.preventDefault();
    const articuloSeleccionado = articulos.find(articulo => articulo.codigo === idArticuloVenta.value);
    const influencerSeleccionado = influencers.find(influencer => influencer.mail === idInfluencerVenta.value);
    const nuevaVenta = new Venta(influencerSeleccionado, articuloSeleccionado, parseInt(cantidadVenta.value), medioVenta.value);
    ventas.push(nuevaVenta);
    influencerSeleccionado.totalCobrar += parseFloat(articuloSeleccionado.precio * parseFloat(cantidadVenta.value) * influencerSeleccionado.comision) / 100;
    formVenta.reset();
    modalVenta.close();
    generarTablaVentas();
    generarTablaInfluencers();
});

const iconoTopComision = "🔥";
const iconoCeroVentas = "🧊";
const iconoVentaMasCara = "🟢";

let ordenAscendenteInfluencers = true;
botonOrdenInfluencers.addEventListener("click", () => {
    ordenAscendenteInfluencers = !ordenAscendenteInfluencers;
    generarTablaInfluencers();
});

function generarTablaInfluencers() {
    const tabla = document.getElementById("tablaInfluencers");
    tabla.innerHTML = "";
    if (ordenAscendenteInfluencers) {
        influencers.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else {
        influencers.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }
    influencers.forEach(influencer => {
        const fila = document.createElement("tr");
        const celdaNombre = document.createElement("td");
        const celdaMail = document.createElement("td");
        const celdaComision = document.createElement("td");
        const celdaTotalCobrar = document.createElement("td");
        const celdaIcono = document.createElement("td");
        const celdaDetalle = document.createElement("td");
        celdaNombre.textContent = influencer.nombre;
        celdaMail.textContent = influencer.mail;
        celdaComision.textContent = `${influencer.comision}%`;
        celdaTotalCobrar.textContent = `$${influencer.totalCobrar}`;
        celdaIcono.textContent = definirIcono(influencer);
        const botonDetalle = document.createElement("button");
        botonDetalle.classList.add("detalleVenta");
        botonDetalle.textContent = "Detalle";
        botonDetalle.addEventListener("click", () => {
            mostrarDetalleVentas(influencer);
        });
        celdaDetalle.appendChild(botonDetalle);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaMail);
        fila.appendChild(celdaComision);
        fila.appendChild(celdaTotalCobrar);
        fila.appendChild(celdaIcono);
        fila.appendChild(celdaDetalle);
        tabla.appendChild(fila);
    });
}

function mostrarDetalleVentas(influencer) {
    const ventasInfluencer = ventas.filter(venta => venta.influencer.mail === influencer.mail);
    if (ventasInfluencer.length > 0) {
        let detalle = "Ventas:\n";
        ventasInfluencer.forEach(venta => {
            const total = venta.articulo.precio * venta.cantidad;
            const comision = parseFloat(venta.articulo.precio * venta.cantidad * influencer.comision) / 100;
            const nro = ventas.indexOf(venta) + 1;
            detalle += `Nro ${nro}- ${venta.cantidad}-${venta.articulo.codigo}- $${venta.articulo.precio}c/u Total $${total}- Comision: $${comision}\n`;
        });
        alert(detalle);
    } else {
        alert(`${influencer.nombre} no tiene ventas registradas.`);
    }
}

function mayorComision(influencer) {
    for (let i = 0; i < influencers.length; i++) {
        if (influencers[i].comision > influencer.comision) {
            return false;
        }
    }
    return true;
}

function ventaMasCara(influencer) {
    if (ventas.length !== 0) {
        let ventaMasCara = ventas[0];
        for (let i = 0; i < ventas.length; i++) {
            if ((ventas[i].articulo.precio * ventas[i].cantidad) > (ventaMasCara.articulo.precio * ventaMasCara.cantidad)) {
                ventaMasCara = ventas[i];
            }
        }
        if (ventaMasCara.influencer.mail === influencer.mail) {
            return true;
        }
    }
    return false;
}

function definirIcono(influencer) {
    let iconos = "";
    if (influencer.totalCobrar === 0) {
        iconos += iconoCeroVentas;
    }
    if (mayorComision(influencer)) {
        iconos += iconoTopComision;
    }
    if (ventaMasCara(influencer)) {
        iconos += iconoVentaMasCara;
    }
    return iconos;
}

let ordenAscendenteArticulos = true;
botonOrdenArticulos.addEventListener("click", () => {
    ordenAscendenteArticulos = !ordenAscendenteArticulos;
    generarTablaArticulos();
});

function comprobarMasVendido(articulo) {
    let masVendido = articulos[0];
    let maxVendido = 0;
    articulos.forEach(art => {
        let cantidadVendida = 0;
        ventas.forEach(venta => {
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

function generarTablaArticulos() {
    const tabla = document.getElementById("tablaArticulos");
    tabla.innerHTML = "";
    if (ordenAscendenteArticulos) {
        articulos.sort((a, b) => a.codigo.localeCompare(b.codigo));
    } else {
        articulos.sort((a, b) => b.codigo.localeCompare(a.codigo));
    }
    articulos.forEach(articulo => {
        const fila = document.createElement("tr");
        const celdaCodigo = document.createElement("td");
        const celdaPrecio = document.createElement("td");
        const celdaDescripcion = document.createElement("td");
        celdaCodigo.textContent = articulo.codigo + comprobarMasVendido(articulo);
        celdaPrecio.textContent = `$${articulo.precio}`;
        celdaDescripcion.textContent = articulo.descripcion;
        fila.appendChild(celdaCodigo);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaPrecio);
        tabla.appendChild(fila);
    });
}

function generarTablaVentas() {
    const tabla = document.getElementById("tablaVentas");
    tabla.innerHTML = "";
    ventas.forEach(venta => {
        const fila = document.createElement("tr");
        const celdaNumVenta = document.createElement("td");
        const celdaInfluencer = document.createElement("td");
        const celdaArticulo = document.createElement("td");
        const celdaCantidad = document.createElement("td");
        const celdaMedio = document.createElement("td");
        const celdaBorrarVenta = document.createElement("td");
        celdaNumVenta.textContent = ventas.indexOf(venta) + 1;
        celdaArticulo.textContent = venta.articulo.codigo;
        celdaInfluencer.textContent = venta.influencer.nombre;
        celdaCantidad.textContent = venta.cantidad;
        celdaMedio.textContent = venta.medio;
        celdaBorrarVenta.innerHTML = `<button class="borrarVenta" onclick="borrarVenta(${ventas.indexOf(venta)})">❌</button>`;
        fila.appendChild(celdaNumVenta);
        fila.appendChild(celdaInfluencer);
        fila.appendChild(celdaArticulo);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaMedio);
        fila.appendChild(celdaBorrarVenta);
        tabla.appendChild(fila);
    });
}

function borrarVenta(index) {
    const venta = ventas[index];
    venta.influencer.totalCobrar -= parseFloat(venta.articulo.precio * parseFloat(venta.cantidad) * venta.influencer.comision) / 100;
    ventas.splice(index, 1);
    generarTablaVentas();
    generarTablaInfluencers();
}

document.addEventListener("DOMContentLoaded", () => {
    generarTablaInfluencers();
    generarTablaArticulos();
    generarTablaVentas();
});