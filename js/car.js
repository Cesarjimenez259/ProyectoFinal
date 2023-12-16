const contenedorTarjetas = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const reniciarElement = document.getElementById("reiniciar");
const botonComprar = document.getElementById("comprar");

function crearTarjetasInit() {
    const productos = JSON.parse(localStorage.getItem("productos"));
    console.log(productos);
    contenedorTarjetas.innerHTML = ""; 

    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const nuevoProducto = document.createElement("div");
            nuevoProducto.classList = "tarjeta-producto";
            nuevoProducto.innerHTML = `
                <img src="./img/${producto.id}.jpg">
                <h3>${producto.nombre}</h3>
                <p>${producto.precio}</p>
                <div class="todo">
                    <button class="restar-btn">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="sumar-btn">+</button>
                </div>
            `;
            contenedorTarjetas.appendChild(nuevoProducto);

            nuevoProducto.querySelector('.sumar-btn').addEventListener("click", (e) => {
                const cuentaElement = e.target.parentElement.querySelector("span.cantidad");
                const cuenta = agregarCarrito(producto);
                cuentaElement.innerText = cuenta;
                actualizarTotales();
            });

            nuevoProducto.querySelector('.restar-btn').addEventListener("click", (e) => {
                restarCarrito(producto);
                crearTarjetasInit();
                actualizarTotales();
            });
        });
    }
}

crearTarjetasInit();
actualizarTotales();

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    let unidades = 0;
    let precio = 0;
    if (productos.length > 0) {
        productos.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        })
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio;
    }
}

reniciarElement.addEventListener("click", reiniciarCarrito);

function reiniciarCarrito() {
    localStorage.removeItem("productos");
    crearTarjetasInit(); 
    actualizarTotales();
}
botonComprar.addEventListener("click", function() {
    window.open("./compra.html", "_blank");
});

