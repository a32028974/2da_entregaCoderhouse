const productos = [
    { nombre: "Lente recetado", precio: 50000, img: "img/lente_recetado.jpg" },
    { nombre: "Lente de sol", precio: 15000, img: "img/lente_sol.jpg" },
    { nombre: "Lentes de contacto", precio: 20000, img: "img/lentes_contacto.jpg" },
    { nombre: "Lentes polarizados", precio: 25000, img: "img/lentes_polarizados.jpg" },
    { nombre: "Reparacion de anteojo", precio: 300, img: "img/reparacion_anteojo.jpg" },
    { nombre: "Sujetador", precio: 3500, img: "img/sujetador.jpg" },
    { nombre: "Patilla de anteojo", precio: 4000, img: "img/patilla_anteojo.jpg" },
    { nombre: "Limpia cristales", precio: 4050, img: "img/limpia_cristales.jpg" },
    { nombre: "Estuche de antojos de sol", precio: 2500, img: "img/estuche_sol.jpg" },
    { nombre: "Estuche de anteojo de receta", precio: 3550, img: "img/estuche_receta.jpg" }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarProductos() {
    const productosContainer = document.getElementById('productos');
    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        productoDiv.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <div>
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button onclick="agregarProducto(${index})">Agregar al Carrito</button>
            </div>
        `;
        productosContainer.appendChild(productoDiv);
    });
}

function agregarProducto(indice) {
    carrito.push(productos[indice]);
    mostrarModal(`Has agregado ${productos[indice].nombre} al carrito.`);
    actualizarCarrito();
    guardarCarrito();
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById('lista-carrito');
    carritoContainer.innerHTML = '';
    carrito.forEach((producto, index) => {
        const item = document.createElement('li');
        item.innerText = `${producto.nombre} - $${producto.precio}`;
        carritoContainer.appendChild(item);
    });
    document.getElementById('total').innerText = `Total: $${calcularTotal()}`;
}

function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarModal(mensaje) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.innerText = mensaje;
    modal.style.display = "block";
}

function cerrarModal(modal) {
    modal.style.display = "none";
}

const modal = document.getElementById('modal');
const carritoModal = document.getElementById('carrito-modal');
const closeButtons = document.getElementsByClassName('close');

for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
        cerrarModal(this.parentElement.parentElement);
    };
}

window.onclick = function(event) {
    if (event.target == modal) {
        cerrarModal(modal);
    } else if (event.target == carritoModal) {
        cerrarModal(carritoModal);
    }
}

document.getElementById('ver-carrito').addEventListener('click', () => {
    actualizarCarrito();
    carritoModal.style.display = "block";
});

document.getElementById('finalizar-compra').addEventListener('click', () => {
    if (carrito.length > 0) {
        mostrarModal(`Has comprado:\n${carrito.map(producto => producto.nombre).join('\n')}\nTotal a pagar: $${calcularTotal()}.-`);
        carrito = [];
        actualizarCarrito();
        guardarCarrito();
        cerrarModal(carritoModal);
    } else {
        mostrarModal("No has seleccionado ningún producto.");
    }
});

mostrarProductos();
actualizarCarrito();
