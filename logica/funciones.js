// Código hecho por Mateo Más Lukinskas (375845) y Luca Piacenza (360347)

let botonAgregarInfluencer = document.getElementById("botonAgregarInfluencer");
let modalInfluencer = document.getElementById("modalInfluencer");
let botonCancelarInfluencer = document.getElementById("botonCancelarInfluencer");
let formInfluencer = document.getElementById("formInfluencer");
let idNombre = document.getElementById("nombre");
let idMail = document.getElementById("mail");
let idComision = document.getElementById("comision");
let botonOrdenInfluencers = document.getElementById("botonOrdenInfluencers");

let sistema = new Sistema();

formInfluencer.addEventListener("submit", (e) => {
    e.preventDefault();
    if (sistema.comprobarMailDuplicado(idMail.value)) {
        alert("El mail ingresado ya existe. Por favor, ingrese un mail diferente.");
    } else {
        let nuevoInfluencer = new Influencer(idNombre.value, idMail.value, parseInt(idComision.value), 0);
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

let botonAgregarArticulo = document.getElementById("botonAgregarArticulo");
let modalArticulo = document.getElementById("modalArticulo");
let botonCancelarArticulo = document.getElementById("botonCancelarArticulo");
let formArticulo = document.getElementById("formArticulo");
let idCodigo = document.getElementById("codigo");
let idPrecio = document.getElementById("precio");
let idDescripcion = document.getElementById("descripcion");

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
        let nuevoArticulo = new Articulo(idCodigo.value, parseInt(idPrecio.value), idDescripcion.value);
        sistema.articulos.push(nuevoArticulo);
        formArticulo.reset();
        modalArticulo.close();
    }
    generarTablaArticulos();
});

let botonAgregarVenta = document.getElementById("botonAgregarVenta");
let modalVenta = document.getElementById("modalVenta");
let botonCancelarVenta = document.getElementById("botonCancelarVenta");
let formVenta = document.getElementById("formularioVenta");
let idArticuloVenta = document.getElementById("articulo");
let idInfluencerVenta = document.getElementById("influencer");
let cantidadVenta = document.getElementById("cantidad");
let medioVenta = document.getElementById("medio");

// Actualiza los selectores del formulario de ventas con los artículos e influencers disponibles.
function actualizarSelects() {
    idArticuloVenta.innerHTML = "";
    idInfluencerVenta.innerHTML = "";
    sistema.articulos.forEach(articulo => {
        let option = document.createElement("option");
        option.value = articulo.codigo;
        option.textContent = `${articulo.codigo} - $${articulo.precio}`;
        idArticuloVenta.appendChild(option);
    });
    sistema.influencers.forEach(influencer => {
        let option = document.createElement("option");
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
    let articuloSeleccionado = sistema.articulos.find(articulo => articulo.codigo === idArticuloVenta.value);
    let influencerSeleccionado = sistema.influencers.find(influencer => influencer.mail === idInfluencerVenta.value);
    let nuevaVenta = new Venta(influencerSeleccionado, articuloSeleccionado, parseInt(cantidadVenta.value), medioVenta.value);
    sistema.ventas.push(nuevaVenta);
    influencerSeleccionado.totalCobrar += parseFloat(articuloSeleccionado.precio * parseFloat(cantidadVenta.value) * influencerSeleccionado.comision) / 100;
    formVenta.reset();
    modalVenta.close();
    generarTablaVentas();
    generarTablaInfluencers();
    generarGrafico();
    generarTablaArticulos();
});

let iconoTopComision = "🔥";
let iconoCeroVentas = "🧊";
let iconoVentaMasCara = "🟢";

let ordenAscendenteInfluencers = true;
botonOrdenInfluencers.addEventListener("click", () => {
    ordenAscendenteInfluencers = !ordenAscendenteInfluencers;
    generarTablaInfluencers();
});

// Crea y muestra la tabla de influencers con sus datos y estado visual.
function generarTablaInfluencers() {
    let tabla = document.getElementById("tablaInfluencers");
    tabla.innerHTML = "";
    sistema.ordenarTabla(ordenAscendenteInfluencers, "inf");
    sistema.influencers.forEach(influencer => {
        let fila = document.createElement("tr");
        let celdaNombre = document.createElement("td");
        let celdaMail = document.createElement("td");
        let celdaComision = document.createElement("td");
        let celdaTotalCobrar = document.createElement("td");
        let celdaIcono = document.createElement("td");
        let celdaDetalle = document.createElement("td");
        celdaNombre.textContent = influencer.nombre;
        celdaMail.textContent = influencer.mail;
        celdaComision.textContent = `${influencer.comision}%`;
        celdaTotalCobrar.textContent = `$${influencer.totalCobrar}`;
        celdaIcono.textContent = definirIcono(influencer);
        let botonDetalle = document.createElement("button");
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

// Determina qué iconos mostrar según el estado del influencer.
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

// Genera la tabla de artículos con su precio y descripción.
function generarTablaArticulos() {
    let tabla = document.getElementById("tablaArticulos");
    tabla.innerHTML = "";
    sistema.ordenarTabla(ordenAscendenteArticulos, "art");
    sistema.articulos.forEach(articulo => {
        let fila = document.createElement("tr");
        let celdaCodigo = document.createElement("td");
        let celdaPrecio = document.createElement("td");
        let celdaDescripcion = document.createElement("td");
        celdaCodigo.textContent = articulo.codigo + sistema.comprobarMasVendido(articulo);
        celdaPrecio.textContent = `$${articulo.precio}`;
        celdaDescripcion.textContent = articulo.descripcion;
        fila.appendChild(celdaCodigo);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaPrecio);
        tabla.appendChild(fila);
    });
}

// Muestra el listado de ventas registradas y permite borrarlas desde la tabla.
function generarTablaVentas() {
    let tabla = document.getElementById("tablaVentas");
    tabla.innerHTML = "";
    sistema.ventas.forEach(venta => {
        let fila = document.createElement("tr");
        let celdaNumVenta = document.createElement("td");
        let celdaInfluencer = document.createElement("td");
        let celdaArticulo = document.createElement("td");
        let celdaCantidad = document.createElement("td");
        let celdaMedio = document.createElement("td");
        let celdaBorrarVenta = document.createElement("td");
        celdaNumVenta.textContent = sistema.ventas.indexOf(venta) + 1;
        celdaArticulo.textContent = venta.articulo.codigo;
        celdaInfluencer.textContent = venta.influencer.nombre;
        celdaCantidad.textContent = venta.cantidad;
        celdaMedio.textContent = venta.medio;
        celdaBorrarVenta.innerHTML = `<button class="borrarVenta" onclick="sistema.borrarVenta(${sistema.ventas.indexOf(venta)})">❌</button>`;
        fila.appendChild(celdaNumVenta);
        fila.appendChild(celdaArticulo);
        fila.appendChild(celdaInfluencer);
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
    generarGrafico();
});

let burbujaIG = document.getElementById("colorIg");
let burbujaYT = document.getElementById("colorYt");
let burbujaX = document.getElementById("colorX");
let burbujaTK = document.getElementById("colorTk");
let burbujaFB = document.getElementById("colorFb");
let burbujaOT = document.getElementById("colorOt");
let montoIG = document.getElementById("montoIg");
let montoYT = document.getElementById("montoYt");
let montoX = document.getElementById("montoX");
let montoTK = document.getElementById("montoTk");
let montoFB = document.getElementById("montoFb");
let montoOT = document.getElementById("montoOt");

// Actualiza el gráfico de medios con los datos de ventas actuales.
function generarGrafico() {
    if (sistema.ventas.length === 0) {
        burbujaIG.style.fontSize = "10px";
        burbujaYT.style.fontSize = "10px";
        burbujaX.style.fontSize = "10px";
        burbujaTK.style.fontSize = "10px";
        burbujaFB.style.fontSize = "10px";
        burbujaOT.style.fontSize = "10px";
        montoIG.textContent = "0";
        montoYT.textContent = "0";
        montoX.textContent = "0";
        montoTK.textContent = "0";
        montoFB.textContent = "0";
        montoOT.textContent = "0";
        return;
    }

    let totales = {
        Instagram: 0,
        Youtube: 0,
        X: 0,
        TikTok: 0,
        Facebook: 0,
        Otro: 0
    };

    let montosTotales = {
        Instagram: 0,
        Youtube: 0,
        X: 0,
        TikTok: 0,
        Facebook: 0,
        Otro: 0
    }
    
    sistema.ventas.forEach(venta => {
        totales[venta.medio] += 1;
        montosTotales[venta.medio] += venta.articulo.precio * venta.cantidad;
    });

    let totalVentas = 0;
    let medioMasVentas = null;
    let medioMenosVentas = null;
    Object.keys(totales).forEach(medio => {
        totalVentas += totales[medio];
        if (medioMasVentas === null) {
            if (totales[medio] > 0) {
                medioMasVentas = medio;
            }
        }
        if (medioMenosVentas === null) {
            if (totales[medio] > 0) {
                medioMenosVentas = medio;
            }
        }
        if (totales[medio] > totales[medioMasVentas]) {
            medioMasVentas = medio;
        }
        if (totales[medio] < totales[medioMenosVentas] && totales[medio] > 0) {
            medioMenosVentas = medio;
        }
    });

    let cantidadVentasMedioMasVentas = totales[medioMasVentas];
    let cantidadVentasMedioMenosVentas = totales[medioMenosVentas];
    Object.keys(totales).forEach(medio => {
        if (medioMasVentas === medio || cantidadVentasMedioMasVentas === totales[medio]) {
            generarGraficoMedio(medio, "mas", (totales[medio] / totalVentas) * 100, montosTotales[medio]);
        }
        else if (medioMenosVentas === medio || cantidadVentasMedioMenosVentas === totales[medio]) {
            generarGraficoMedio(medio, "menos", (totales[medio] / totalVentas) * 100, montosTotales[medio]);
        }
        else if (totales[medio] === 0) {
            generarGraficoMedio(medio, "normal", 0);
        }
        else {
            generarGraficoMedio(medio, "normal", (totales[medio] / totalVentas) * 100, montosTotales[medio]);
        }
    });

}

// Ajusta el tamaño y el texto de cada burbuja del gráfico según el medio y su nivel de ventas.
function generarGraficoMedio(medio, tipo, monto, montoTotal) {
    let burbuja;
    let montoElemento;
    monto = Math.round(monto);
    switch (medio) {
        case "Instagram":
            burbuja = burbujaIG;
            montoElemento = montoIG;
            break;
        case "Youtube":
            burbuja = burbujaYT;
            montoElemento = montoYT;
            break;
        case "X":
            burbuja = burbujaX;
            montoElemento = montoX;
            break;
        case "TikTok":
            burbuja = burbujaTK;
            montoElemento = montoTK;
            break;
        case "Facebook":
            burbuja = burbujaFB;
            montoElemento = montoFB;
            break;
        case "Otro":
            burbuja = burbujaOT;
            montoElemento = montoOT;
            break;
    }

    if (tipo === "mas") {
        burbuja.style.fontSize = "110px";
        montoElemento.textContent = "Ganancias totales: " + montoTotal + " (" + monto + "% de ventas fueron por este medio)";
    }
    else if (tipo === "menos") {
        burbuja.style.fontSize = "10px";
        montoElemento.textContent = "Ganancias totales: " + montoTotal + " (" + monto + "% de ventas fueron por este medio)";
    }
    else if (tipo === "normal" && monto === 0) {
        burbuja.style.fontSize = "5px";
        montoElemento.textContent = "0";
    }
    else {
        burbuja.style.fontSize = (monto + 10) + "px";
        montoElemento.textContent = "Ganancias totales: " + montoTotal + " (" + monto + "% de ventas fueron por este medio)";
    }
}