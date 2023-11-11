// Objeto Servicio - funcion
function Servicio(nombre, precioPorHora) {
    this.nombre = nombre;
    this.precioPorHora = precioPorHora;
}

// variable
let carrito = [];

// Función
function agregarAlCarrito(servicio, horas) {
    // filter verifica la existencia del dato ingresado
    const servicioExistente = carrito.filter(item => item.servicio.nombre === servicio.nombre)[0];

    if (servicioExistente) {
        // Si el servicio ya está en el carrito, simplemente actualiza las horas
        servicioExistente.horas += horas;
    } else {
        // pushea un dato nuevop
        carrito.push({ servicio, horas });
    }
}

// ingreso de datos 
let nombreServicio = prompt("Que servicio tomará?:");
let precioPorHora = parseFloat(prompt(" Precio por Hora:"));
let horas = parseInt(prompt("Cuantas Horas necesita de mi ayuda?:"));

// Crea un nuevo dato
let nuevoServicio = new Servicio(nombreServicio, precioPorHora);

// agrega datos al carrito
agregarAlCarrito(nuevoServicio, horas);

// Mostrar servicios en el carrito
console.log("Servicios en el carrito:");
//bucle
for (let i = 0; i < carrito.length; i= i + 1) {
    console.log(`${carrito[i].servicio.nombre} - Horas: ${carrito[i].horas}`);
}

//total del Carrito
function resultado() {
    let total = 0;
    //iterar
    carrito.forEach(function(item) {
        total += item.servicio.precioPorHora * item.horas;
    });
    return total;
}
//imprime el total 
console.log(`Total del carrito: $${resultado()}`);
