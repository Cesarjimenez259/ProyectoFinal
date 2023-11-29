function Servicio(nombre, precioPorHora) {
    this.nombre = nombre;
    this.precioPorHora = precioPorHora;
}

let carrito = [];

function agregarAlCarrito(servicio, horas) {
    const servicioExistente = carrito.find(item => item.servicio.nombre === servicio.nombre);

    if (servicioExistente) {
        servicioExistente.horas += horas;
    } else {
        carrito.push({ servicio, horas });
    }

    gCarritoLStorage();
    mostrarCarrito();
    limpiarFormulario();
}

function eliminarDelCarrito(nombreServicio) {
    carrito = carrito.filter(item => item.servicio.nombre !== nombreServicio);
    gCarritoLStorage();
    mostrarCarrito();
}

function gCarritoLStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cCarritoLStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

function mostrarCarrito() {
    const carritoContainer = document.getElementById('carritoContainer');
    carritoContainer.innerHTML = ''; // Limpiar contenido previo

    carrito.forEach(item => {
        const servicioInfo = document.createElement('div');
        servicioInfo.textContent = `${item.servicio.nombre} - Horas: ${item.horas}`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', () => {
            eliminarDelCarrito(item.servicio.nombre);
        });

        servicioInfo.appendChild(eliminarBtn);
        carritoContainer.appendChild(servicioInfo);
    });

    document.getElementById('totalCarrito').textContent = `Total del carrito: $${resultado()}`;
}

function resultado() {
    let total = 0;
    carrito.forEach(item => {
        total += item.servicio.precioPorHora * item.horas;
    });
    return total.toFixed(2); // Redondear a 2 decimales
}

function limpiarFormulario() {
    document.getElementById("nombreServicio").value = "";
    document.getElementById("precioPorHora").value = "";
    document.getElementById("horas").value = "";
}

cCarritoLStorage();

document.getElementById('formularioServicio').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const nombreServicio = document.getElementById("nombreServicio").value;
    const precioPorHora = parseFloat(document.getElementById("precioPorHora").value);
    const horas = parseInt(document.getElementById("horas").value);

    const nuevoServicio = new Servicio(nombreServicio, precioPorHora);
    agregarAlCarrito(nuevoServicio, horas);
});

mostrarCarrito();