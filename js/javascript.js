class Producto {
    constructor(id, nombre, tipo, variedad, precio) {
        this.id = id,
            this.nombre = nombre,
            this.tipo = tipo,
            this.variedad = variedad,
            this.precio = precio
            this.cantidad = 0
    }
}

const producto1 = new Producto(1, "Vital Power", "Serum Facial", "30ml", 2970)
const producto2 = new Producto(2, "Deep Luminous", "Serum Facial", "30ml", 2970)
const producto3 = new Producto(3, "Glow Boost", "Serum Facial", "30ml", 2080)
const producto4 = new Producto(4, "Acido Hyaluronico", "Serum Facial", "30ml", 2080)
const producto5 = new Producto(5, "Plant Power", "Acondicionador", "400ml", 2700)
const producto6 = new Producto(6, "Nutri Boost", "Shampoo", "400ml", 2700)
const producto7 = new Producto(7, "Nutri Boost", "Acondicionador", "400ml", 2700)
const producto8 = new Producto(8, "Plant Power", "Shampoo", "400ml", 2700)


let eshop = []

//capturas DOM

let section2 = document.getElementById("section2")
let btnNuevoProducto = document.getElementById("nuevoProducto")
let btnOrdenarId = document.getElementById("ordenarId")
let btnOrdenarNombre = document.getElementById("ordenarNombre")
let btnOrdenarMenorPrecio = document.getElementById("ordenarMenorPrecio")
let btnOrdenarMayorPrecio = document.getElementById("ordenarMayorPrecio")
let inputBuscador = document.getElementById("buscador")
let inputEliminador = document.getElementById("eliminador")
let btnEliminador = document.getElementById("eliminar")
let btnCarrito = document.getElementById("btnCarrito")
let btnCarrito2 = document.getElementById("btnCarrito2")
let modalBodyCarrito = document.getElementById("modalBodyCarrito")
let divCompra = document.getElementById("divCompra")
let resultadoTexto = document.getElementById("resultadoTexto")


//EVENTOS PROYECTO

btnNuevoProducto.addEventListener("click", () => { agregarNuevoProducto(eshop) })
btnOrdenarId.addEventListener('click', () => { ordenarId(eshop) })
btnOrdenarNombre.addEventListener('click', () => { ordenarNombre(eshop) })
btnOrdenarMenorPrecio.addEventListener('click', () => { ordenarMenorMayor(eshop) })
btnOrdenarMayorPrecio.addEventListener('click', () => { ordenarMayorMenor(eshop) })
inputBuscador.addEventListener('input', () => { buscador(inputBuscador.value, eshop) })
btnEliminador.addEventListener('click', () => { removerProducto(eshop) })
btnCarrito.addEventListener("click", () => { cargarProductosCarrito(productosEnCarrito) })
btnCarrito2.addEventListener("click", () => { cargarProductosCarrito(productosEnCarrito) })


//CONDICIONAL PRIMER INGRESO

if (localStorage.getItem("eshop")) {
    eshop = JSON.parse(localStorage.getItem("eshop"))
} else {
    eshop.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16, producto17, producto18, producto19, producto20, producto21, producto22, producto23)
    localStorage.setItem("eshop", JSON.stringify(eshop))
}

//Display catalogo

function mostrarCatalogo(array) {
    section2.innerHTML = ""
    for (let elem of array) {
        let nuevoProducto = document.createElement("div")
        nuevoProducto.innerHTML = `<div id="${elem.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 200px;"src="./multimedia/stock1.jpg" alt="${elem.nombre} de ${elem.tipo}">
            <div class="card-body">
                <h4> N?? ${elem.id}</h4>
                <h4 class="card-title">${elem.nombre}</h4>
                <p> Tipo: ${elem.tipo}</p>
                <p> Variedad: ${elem.variedad}</p>
                <p class="">Precio: ${elem.precio}</p>
                <button id="agregarBtn${elem.id}" class="btn btn-outline-success">Agregar al carrito</button>
            </div>
        </div>`
        section2.appendChild(nuevoProducto)
        let btnAgregar = document.getElementById(`agregarBtn${elem.id}`)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(elem)
        })
    }
}

//Cargar nuevo producto

function agregarNuevoProducto(array) {
    //captura y utilizaci??n de input para crear nuevo objeto
    let inputNombre = document.getElementById("inputNombre")
    let inputTipo = document.getElementById("inputTipo")
    let inputVariedad = document.getElementById("inputVariedad")
    let inputPrecio = document.getElementById("inputPrecio")
    array.sort((a, b) => a.id - b.id)
    let newArray = array.slice()
    let newId = newArray.pop().id + 1
    let productoCreado = new Producto(newId, inputNombre.value, inputTipo.value, inputVariedad.value, parseInt(inputPrecio.value))
    array.push(productoCreado)
    localStorage.setItem("eshop", JSON.stringify(array))
    mostrarCatalogo(array)
    inputNombre.value = ""
    inputTipo.value = ""
    inputVariedad.value = ""
    inputPrecio.value = ""
}

//Funciones Ordenar

function ordenarMenorMayor(array) {
    array.sort((a, b) => (a.precio - b.precio))
    mostrarCatalogo(array)
}

function ordenarMayorMenor(array) {
    array.sort((a, b) => (b.precio - a.precio))
    mostrarCatalogo(array)
}

function ordenarId(array) {
    array.sort((a, b) => (a.id - b.id))
    mostrarCatalogo(array)
}

function ordenarNombre(array) {
    array.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        }
        if (a.nombre > b.nombre) {
            return 1;
        }
        return 0;
    })
    mostrarCatalogo(array)
}

//Funcion Buscador 

// let arrayBuscador = []

// function buscador(array) {

//     let filtro = inputBuscador.value.toUpperCase();
//     let resultadoBusqueda = array.filter((elem) => elem.nombre.toUpperCase() == filtro || elem.tipo.toUpperCase() == filtro || elem.variedad.toUpperCase() == filtro || elem.precio == parseInt(filtro))

//     if (resultadoBusqueda == false) {
//         mostrarCatalogo(eshop)
//     }

//     else {
//         mostrarCatalogo(resultadoBusqueda)
//     }
//     arrayBuscador = []
// }

function buscador(buscado, array){
    resultadoTexto.innerHTML = ""
let busqueda = array.filter(
    (elem) => elem.nombre.toLowerCase().includes(buscado.toLowerCase()) || elem.tipo.toLowerCase().includes(buscado.toLowerCase()) || elem.variedad.toLowerCase().includes(buscado.toLowerCase()) || [elem.precio].includes(parseInt(buscado)) || [elem.id].includes(parseInt(buscado)))
    busqueda.length == 0 ? (resultadoTexto.innerHTML = `<h3 class="text-success m-2">No hay coincidencias con su b??squeda... `)
    : (section2.innerHTML = "", mostrarCatalogo(busqueda))
}

//Function remover producto

function removerProducto(array) {
    let ids = array.map(elem => elem.id)
    let indice = ids.indexOf(parseInt(inputEliminador.value))
    if (indice != -1) { array.splice(indice, 1) }
    localStorage.setItem("eshop", JSON.stringify(array))
    mostrarCatalogo(array)
}

//------Carrito

let productosEnCarrito = []
if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    console.log("Seteando el array carrito por primera vez")
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

//Agregar al carrito

function agregarAlCarrito(producto) {
    if (producto.cantidad == 0){
    producto.cantidad++
    productosEnCarrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))}
    else{producto.cantidad++
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
    }
}

function cargarProductosCarrito(array) {
    modalBodyCarrito.innerHTML = ""
    array.forEach((producto) => {
        modalBodyCarrito.innerHTML += `
        <div class="card" id="productoCarrito${producto.id}" style="width: 80%; margin: auto; margin-bottom: 5%;">
        <img src="./multimedia/stock1.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <h6 class="card-id">N?? ${producto.id}</h6>
            <p class="card-text">${producto.tipo}</p>
            <p class="card-text">Precio: $${producto.precio}</p>
            <p class="card-text">Cantidad: ${producto.cantidad}</p>
            <button class= "btn btn-danger" id="botonEliminar${producto.id}">Eliminar</a>
        </div>
        </div>
        `
    })
    array.forEach((producto) => {
    //capturo elemento del DOM
    document.getElementById(`botonEliminar${producto.id}`).addEventListener("click", () => {
        //Eliminar del DOM
        let cardProducto = document.getElementById(`productoCarrito${producto.id}`)
        cardProducto.remove()
        //Eliminar del array de comprar
        let ids = array.map(elem => elem.id)
        let indice = ids.indexOf(producto.id)
        if (indice != -1) {productosEnCarrito.splice(indice, 1)}
        producto.cantidad = 0;
        localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))
        //calculo compraTotal
        compraTotal(array)
        })
    })
    compraTotal(array)
}

function compraTotal(array){
    let acumulador = 0
    acumulador = array.reduce((acc, productoCarrito)=> acc + (productoCarrito.precio * productoCarrito.cantidad), 0)
    console.log(acumulador)
    acumulador == 0 ? divCompra.innerHTML = `No hay productos en el carrito`: divCompra.innerHTML = `<p class="totalCompraTexto">EL total de su compra es $${acumulador}</p>`
}

mostrarCatalogo(eshop);