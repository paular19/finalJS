const productos = [
    {
        id: "Indumentaria-01",
        categoría: {
            nombre: "indumentaria",
            id: "indumentaria"
        },
        titulo: "Campera Intervenida",
        precio: 10000,
        img: "img/kal-visuals-6TIoPIpMvLc-unsplash.jpg" 
    },
    {
        id: "indumentaria-02",
        categoría: {
            nombre: "indumentaria",
            id: "indumentaria"
        },
        titulo: "Vestido Intervenido",
        precio: 40000,
        img: "img/nikhil-uttam-QrOdhsMAQw8-unsplash.jpg" 
    },
    {
        id: "Arte Plástico-01",
        categoría: {
            nombre: "Arte y Desperdicio",
            id: "arte plástico"
        },
        titulo: "Arte y desperdicio",
        precio: 50000,
        img: "img/marc-newberry-9vcEn3BJyy8-unsplash.jpg" 
    },
    {
        id: "arte plástico-02",
        categoría: {
            nombre: "Arte 3D",
            id: "arte plástico"
        },
        precio: 30000,
        titulo: "Arte 3D",
        img: "img/karl-hornfeldt-pikP0UyB7I0-unsplash.jpg"
    },
    {
        id: "Escultura-01",
        categoría: {
            nombre: "Escultura y Pandemia",
            id: "escultura"
        },
        precio: 100000,
        titulo: "Escultura y Pandemia",
        img: "img/abdullah-khudabardi-GDg21-_-ryU-unsplash.jpg" 
    },
    {
        id: "escultura-02",
        categoría: {
            nombre: "Escultura Somática",
            id: "escultura"
        },
        precio: 200000,
        titulo: "Escultura Somática",
        img: "img/wilhelm-gunkel-LpQs_3t4Dck-unsplash.jpg" 
    },
    {
        id: "Arte en Lienzo-01",
        categoría: {
            nombre: "El Agua",
            id: "arte en lienzo"
        },
        precio: 10000,
        titulo: "El Agua",
        img: "img/jura-Tp6Nj3RgwAI-unsplash.jpg" 
    },
    {
        id: "arte en lienzo-02",
        categoría: {
            nombre: "El Solo",
            id: "arte en lienzo"
        },
        precio: 10000,
        titulo: "El Solo",
        img: "img/kal-visuals-6TIoPIpMvLc-unsplash.jpg" 
    },
    {
        id: "arte en lienzo-03",
        categoría: {
            nombre: "Un Ángel",
            id: "arte en lienzo"
        },
        titulo: "Un Ángel",
        precio: 100900,
        img: "img/annie-spratt-xvU-X0GV9-o-unsplash.jpg" 
    },

];

//llamo al selector y aplico foreach para recorrer todo el array
//creamos el div en el que se rendericen los productos 
//al div le damos la class producto 
//dentro del div ponemos la informacion del html
//aplico el append para vincular el div creado con el selector

//a la funcion cargarProductos que hicimos para reenderizar los productos le podemos agregar un parametro para aplicar el filtro

const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos){
      contenedorProductos.innerHTML="";

        productosElegidos.forEach( producto =>{
                const div =  document.createElement("div");
                div.classList.add("producto");
                div.innerHTML = `
                <img class ="producto-imagen" src=${producto.img} alt="${producto.titulo}">
                <div class ="producto-detalles">
                <h3 class ="producto-precio>${producto.precio}  </h3> 
                <h3 class="producto-titulo">${producto.titulo}</h3>
                    
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                    </div>
                    
                `;
                contenedorProductos.append(div);
        })
      
        actualizarBotonesAgregar();

}



//vamos a hacer el evento 
//que cambie el active con un evento: sacarle la clase active 
//hay que hacer que el active se desactive solo en los demas por eso primero desactivamos y luego activamos
//agrego el if para que me carguen todos los productos de nuevo cuando vuelvo a todos

botonesCategorias.forEach(boton=>{
    boton.addEventListener("click",(e)=>{

        botonesCategorias.forEach(boton=> boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id!= "todos"){
        const productoCategoria = productos.find(producto=>producto.categoría.id===e.currentTarget.id);
        tituloPrincipal.innerText = productoCategoria.id;
        
        const productosBoton = productos.filter(producto=>producto.categoría.id===e.currentTarget.id)
        cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos);
        }
    })
})


function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton=>{
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;


const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if(productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
}else{
productosEnCarrito=[];
}



function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const productosAgregados = productos.find(producto=>producto.id===idBoton);

    if(productosEnCarrito.some(producto=>producto.id===idBoton)){
        const index= productosEnCarrito.findIndex(producto=>producto.id===idBoton)
        productosEnCarrito[index].cantidad++;
    }else{
        productosAgregados.cantidad=1;

        productosEnCarrito.push(productosAgregados);

    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito=productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}


