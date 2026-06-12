const botonAgregarInfluencer = document.getElementById("botonAgregarInfluencer");
const modalInfluencer = document.getElementById("modalInfluencer");
const botonCancelarInfluencer = document.getElementById("botonCancelarInfluencer");
const formInfluencer = document.getElementById("formInfluencer");
const idNombre = document.getElementById("nombre");
const idMail = document.getElementById("mail");
const idComision = document.getElementById("comision");
const botonOrdenInfluencers = document.getElementById("botonOrdenInfluencers");

const sistema = new Sistema();

formInfluencer.addEventListener("submit", (e) => {
    e.preventDefault();
    if (sistema.comprobarMailDuplicado(idMail.value)) {
        alert("El mail ingresado ya existe. Por favor, ingrese un mail diferente.");
    } else {
        const nuevoInfluencer = new Influencer(idNombre.value, idMail.value, parseInt(idComision.value), 0);
        sistema.influencers.push(nuevoInfluencer);
        formInfluencer.reset();
        modalInfluencer.close();
    }
    generarTablaInfluencers();
});

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

botonAgregarArticulo.addEventListener("click", () => {
    modalArticulo.showModal();
});

botonCancelarArticulo.addEventListener("click", () => {
    modalArticulo.close();
});

formArticulo.addEventListener("submit", (e) => {
    e.preventDefault();
    if (sistema.comprobarCodigoDuplicado(idCodigo.value)) {
        alert("El código ingresado ya existe. Por favor, ingrese un código diferente.");
    } else {
        const nuevoArticulo = new Articulo(idCodigo.value, parseInt(idPrecio.value), idDescripcion.value);
        sistema.articulos.push(nuevoArticulo);
        formArticulo.reset();
        modalArticulo.close();
    }
    generarTablaArticulos();
});

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
    sistema.articulos.forEach(articulo => {
        const option = document.createElement("option");
        option.value = articulo.codigo;
        option.textContent = `${articulo.codigo} - $${articulo.precio}`;
        idArticuloVenta.appendChild(option);
    });
    sistema.influencers.forEach(influencer => {
        const option = document.createElement("option");
        option.value = influencer.mail;
        option.textContent = influencer.nombre;
        idInfluencerVenta.appendChild(option);
    });
}

botonAgregarVenta.addEventListener("click", () => {
    actualizarSelects();
    modalVenta.showModal();
});

botonCancelarVenta.addEventListener("click", () => {
    modalVenta.close();
});

formVenta.addEventListener("submit", (e) => {
    e.preventDefault();
    const articuloSeleccionado = sistema.articulos.find(articulo => articulo.codigo === idArticuloVenta.value);
    const influencerSeleccionado = sistema.influencers.find(influencer => influencer.mail === idInfluencerVenta.value);
    const nuevaVenta = new Venta(influencerSeleccionado, articuloSeleccionado, parseInt(cantidadVenta.value), medioVenta.value);
    sistema.ventas.push(nuevaVenta);
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
    sistema.ordenarTabla(ordenAscendenteInfluencers, "inf");
    sistema.influencers.forEach(influencer => {
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
            sistema.mostrarDetalleVentas(influencer);
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

function definirIcono(influencer) {
    let iconos = "";
    if (influencer.totalCobrar === 0) {
        iconos += iconoCeroVentas;
    }
    if (sistema.influencerMayorComision(influencer)) {
        iconos += iconoTopComision;
    }
    if (sistema.ventaMasCara(influencer)) {
        iconos += iconoVentaMasCara;
    }
    return iconos;
}

let ordenAscendenteArticulos = true;
botonOrdenArticulos.addEventListener("click", () => {
    ordenAscendenteArticulos = !ordenAscendenteArticulos;
    generarTablaArticulos();
});

function generarTablaArticulos() {
    const tabla = document.getElementById("tablaArticulos");
    tabla.innerHTML = "";
    sistema.ordenarTabla(ordenAscendenteArticulos, "art");
    sistema.articulos.forEach(articulo => {
        const fila = document.createElement("tr");
        const celdaCodigo = document.createElement("td");
        const celdaPrecio = document.createElement("td");
        const celdaDescripcion = document.createElement("td");
        celdaCodigo.textContent = articulo.codigo + sistema.comprobarMasVendido(articulo);
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
    sistema.ventas.forEach(venta => {
        const fila = document.createElement("tr");
        const celdaNumVenta = document.createElement("td");
        const celdaInfluencer = document.createElement("td");
        const celdaArticulo = document.createElement("td");
        const celdaCantidad = document.createElement("td");
        const celdaMedio = document.createElement("td");
        const celdaBorrarVenta = document.createElement("td");
        celdaNumVenta.textContent = sistema.ventas.indexOf(venta) + 1;
        celdaArticulo.textContent = venta.articulo.codigo;
        celdaInfluencer.textContent = venta.influencer.nombre;
        celdaCantidad.textContent = venta.cantidad;
        celdaMedio.textContent = venta.medio;
        celdaBorrarVenta.innerHTML = `<button class="borrarVenta" onclick="sistema.borrarVenta(${sistema.ventas.indexOf(venta)})">❌</button>`;
        fila.appendChild(celdaNumVenta);
        fila.appendChild(celdaInfluencer);
        fila.appendChild(celdaArticulo);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaMedio);
        fila.appendChild(celdaBorrarVenta);
        tabla.appendChild(fila);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    generarTablaInfluencers();
    generarTablaArticulos();
    generarTablaVentas();
});