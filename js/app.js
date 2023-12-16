const contenedorTarjetas = document.getElementById("productos-container");

function crearTarjetasInit(productos) {
    productos.forEach(producto => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "tarjeta-producto";
        nuevoProducto.innerHTML = `
        <img src="./img/${producto.id}.jpg">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button> Agregar al Carrito </button>

        `
        contenedorTarjetas.appendChild(nuevoProducto); 
        nuevoProducto.getElementsByTagName("button")[0].addEventListener ("click", ()=> agregarCarrito(producto))

    
});
}

crearTarjetasInit(productos);

