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

idArticuloVenta.addEventListener("click", actualizarSelects);
idInfluencerVenta.addEventListener("click", actualizarSelects);

let ventas = [];

botonAgregarVenta.addEventListener("click", () => {
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
    formVenta.reset();
    modalVenta.close();
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
        celdaDetalle.innerHTML = `<button class="detalleVenta" data-mail="${influencer.mail}">Detalle</button>`;
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaMail);
        fila.appendChild(celdaComision);
        fila.appendChild(celdaTotalCobrar);
        fila.appendChild(celdaIcono);
        fila.appendChild(celdaDetalle);
        tabla.appendChild(fila);
    });
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

document.addEventListener("DOMContentLoaded", () => {
    generarTablaInfluencers();
    generarTablaArticulos();
    generarTablaVentas();
});