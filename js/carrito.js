function agregarCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    let cuenta = 0;

    const indiceProducto = memoria.findIndex(servicio => servicio.id === producto.id);

    if (indiceProducto === -1) {
        memoria.push(nuevoServicioMemoria(producto));
        cuenta = 1;
    } else {
        memoria[indiceProducto].cantidad +=1;
        cuenta = memoria[indiceProducto].cantidad;
    }

    localStorage.setItem("productos", JSON.stringify(memoria));
    actualizarCarrito();

    return cuenta;
}

function restarCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("productos")) || [];
    const indiceProducto = memoria.findIndex(servicio => servicio.id === producto.id);

    if (indiceProducto !== -1) {
        if (memoria[indiceProducto].cantidad === 1) {
            memoria.splice(indiceProducto, 1);
        } else {
            memoria[indiceProducto].cantidad-=1;
        }
        localStorage.setItem("productos", JSON.stringify(memoria));
        actualizarCarrito();
    }
}

function nuevoServicioMemoria(producto) {
    const nuevoServicio = { ...producto }; 
    nuevoServicio.cantidad = 1;
    return nuevoServicio;
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function actualizarCarrito() {
    const memoria = JSON.parse(localStorage.getItem("productos")) || [];
    const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
    cuentaCarritoElement.innerText = cuenta;
}

actualizarCarrito();


