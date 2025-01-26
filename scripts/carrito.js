const notification = document.querySelector('#notification');
const notificationMessage = document.querySelector('#notification-message');
const notificationClose = document.querySelector('#notification-close');

document.addEventListener("DOMContentLoaded", () => {
    // Recuperamos el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    renderizarCarrito(carrito);
})

function renderizarCarrito(carrito) {
  const cartItemsContainer = document.getElementById("cart-items");

  // Verificamos si hay productos en el carrito
  if (carrito.length === 0) {
    cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    //Limpiamos el contenedor
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = '';

    const productosEnCarrito = document.createElement('h2');
    productosEnCarrito.textContent = 'Productos en tu carrito';
    cartItems.appendChild(productosEnCarrito);

    // Si hay productos, los mostramos
    carrito.forEach((producto) => {
      const productCard = document.createElement("div");
      productCard.classList.add("cartItems");
      productCard.innerHTML = `
      <div class="cart-item-info">
        <p>${producto.nombre}</p>
      </div>
      <p>${producto.cantidad_carrito}</p>
      <div class="cart-item-price">$${(
        producto.precio * producto.cantidad_carrito
      ).toFixed(2)}
      </div>
      <button class="dismiss" data-id="${producto.id}" onclick="eliminarDelCarrito(event)"> X </button>
      `;
      cartItemsContainer.appendChild(productCard);
    });
  }
}

function eliminarDelCarrito(event){ 
  console.log(event.target.getAttribute("data-id"));

  const idProductoEliminado = event.target.getAttribute("data-id");
  let carritoActualizado = [];

  let carritoActual =JSON.parse(localStorage.getItem("carrito"));

  console.log("carritoActual: ", carritoActual);
  carritoActual.forEach((producto) => {
    if(producto.id != idProductoEliminado){
      carritoActualizado.push(producto);
    }
  });
  
  localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  showNotification('producto eliminado');
  renderizarCarrito(carritoActualizado);
}

// Función para mostrar la notificación
function showNotification(message) {
  notificationMessage.textContent = message;
  notification.style.display = 'block';

  // Oculta la notificación después de 5 segundos
  setTimeout(() => {
      notification.style.display = 'none';
  }, 5000);
}

// Cerrar la notificación manualmente
notificationClose.addEventListener('click', () => {
  notification.style.display = 'none';
});
