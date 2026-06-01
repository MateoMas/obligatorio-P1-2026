const botonAgregarInfluencer = document.getElementById("botonAgregarInfluencer");
const modalInfluencer = document.getElementById("modalInfluencer");
const botonCancelarInfluencer = document.getElementById("botonCancelarInfluencer");
const formInfluencer = document.getElementById("formInfluencer");
const idNombre = document.getElementById("nombre");
const idMail = document.getElementById("mail");
const idComision = document.getElementById("comision");

let influencers = [];

formInfluencer.addEventListener("submit", (e) => {
    e.preventDefault();
    if (comprobarMailDuplicado(idMail.value)) {
        alert("El mail ingresado ya existe. Por favor, ingrese un mail diferente.");
    } else {
        const nuevoInfluencer = {
            nombre: idNombre.value,
            mail: idMail.value,
            comision: idComision.value,
            totalCobrar: 0
        };
        influencers.push(nuevoInfluencer);
        formInfluencer.reset();
        modalInfluencer.close();
    }
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
