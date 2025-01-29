document.addEventListener("DOMContentLoaded", () => {
  // Recuperamos el carrito del localStorage
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  renderizarCarrito(carrito);
});

function renderizarCarrito(carrito) {
  const cartItemsContainer = document.getElementById("cart-items");
  const vaciarCarritoBtn = document.querySelector(".vaciar-carrito");

  // Verificamos si hay productos en el carrito
  if (carrito.length === 0) {
    cartItemsContainer.innerHTML = "";

    const mensajeVacio = document.createElement("p");
    mensajeVacio.textContent = "Tu carrito está vacío.";
    cartItemsContainer.appendChild(mensajeVacio);

    const enlaceAnadir = document.createElement("a");
    enlaceAnadir.href = "/html/productos.html"; // Asegúrate de que la ruta sea correcta
    enlaceAnadir.textContent = "Añadir items al carrito";
    cartItemsContainer.appendChild(enlaceAnadir);
    if (vaciarCarritoBtn) {
      vaciarCarritoBtn.style.display = "none";
    }
  } else {
    //Limpiamos el contenedor
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    const productosEnCarrito = document.createElement("h2");
    productosEnCarrito.textContent = "Productos en tu carrito";
    cartItems.appendChild(productosEnCarrito);

    // Si hay productos, los mostramos
    carrito.forEach((producto) => {
      const productCard = document.createElement("div");
      productCard.classList.add("cartItems");
      productCard.innerHTML = `
      <div class="cart-item-info">
        <p class="nombre-producto">${producto.nombre}</p>
        <p class=".cantidad">${producto.cantidad}</p>
      </div>
      <div class = "cantidad-producto">
      <i id="${producto.id}" cantidad="${
        producto.cantidad
      }" class='bx bxs-minus-circle'></i>
      <p class="cantidad-productoP">${producto.cantidad_carrito}</p>
      <i id="${producto.id}" cantidad="${
        producto.cantidad
      }"class='bx bxs-plus-circle' ></i>
       </div>
      <div class="cart-item-price">${(
        producto.precio * producto.cantidad_carrito
      ).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
      })}
      </div>
      <button class="dismiss" data-id="${producto.id}" cantidad="${
        producto.cantidad
      }" onclick="eliminarDelCarrito(event)"> X </button>
      
      `;
      cartItemsContainer.appendChild(productCard);
    });
    calcularTotalCompra();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-items");

  cartContainer.addEventListener("click", (event) => {
    // Check if the clicked element is the plus button
    if (event.target.classList.contains("bxs-plus-circle")) {
      incrementQuantity(event);
    }
    // Check if the clicked element is the minus button
    else if (event.target.classList.contains("bxs-minus-circle")) {
      decrementQuantity(event);
    }
  });

  // Renderizar carrito cuando la página se carga
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  renderizarCarrito(carrito);
});

function incrementQuantity(event) {
  const productId = event.target.getAttribute("id");
  const peso = event.target.getAttribute("cantidad");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito = carrito.map((producto) => {
    if (producto.id === productId && producto.cantidad == peso) {
      producto.cantidad_carrito += 1; // Incrementar la cantidad
    }
    return producto;
  });

  // Guardar en localStorage y volver a renderizar el carrito
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito(carrito);
}

function decrementQuantity(event) {
  const productId = event.target.getAttribute("id");
  const peso = event.target.getAttribute("cantidad");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito = carrito.map((producto) => {
    if (
      producto.id === productId &&
      producto.cantidad_carrito > 1 &&
      producto.cantidad == peso
    ) {
      producto.cantidad_carrito -= 1; // Decrementar la cantidad si es mayor a 1
    }
    return producto;
  });

  // Guardar en localStorage y volver a renderizar el carrito
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito(carrito);
}

function calcularTotalCompra() {
  let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
  if (!productosCarrito || productosCarrito.length === 0) {
    productosCarrito = []; // Aseguramos que sea un array vacío si no hay productos
  }
  let precioTotal = 0;
  productosCarrito.forEach((producto) => {
    let cantidad = producto.cantidad_carrito;
    let precio = producto.precio;
    let total = cantidad * precio;
    precioTotal += total;
  });
  //Se muestra la suma total de productos
  const sumaTotal = document.getElementById("total-cost");
  if (sumaTotal) {
    sumaTotal.innerText = precioTotal.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    });
  }
}

//Eliminar productos del carrito
function eliminarDelCarrito(event) {
  const idProductoEliminado = event.target.getAttribute("data-id");
  console.log(idProductoEliminado);
  const cantidadProductoEliminado = event.target.getAttribute("cantidad");
  console.log(cantidadProductoEliminado);

  let carritoActualizado = [];
  //Se hace una copia del carrito que está en Localstorage
  let carritoActual = JSON.parse(localStorage.getItem("carrito"));

  //Se agregan a otra lista los productos cuyo id es diferente del id del producto seleccionado
  console.log("carritoActual: ", carritoActual);
  carritoActual.forEach((producto) => {
    if (
      producto.cantidad != cantidadProductoEliminado ||
      producto.id != idProductoEliminado
    ) {
      carritoActualizado.push(producto);
    }
  });

  //Se actualiza el localstorage
  localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  showNotification("producto eliminado");
  renderizarCarrito(carritoActualizado);
  calcularTotalCompra();
}

function vaciarCarrito() {
  localStorage.removeItem("carrito");

  carrito_actualizado = [];
  renderizarCarrito(carrito_actualizado);
  calcularTotalCompra();
}

const notification = document.querySelector("#notification");
const notificationMessage = document.querySelector("#notification-message");
const notificationClose = document.querySelector("#notification-close");

// Función para mostrar la notificación
function showNotification(message) {
  notificationMessage.textContent = message;
  notification.style.display = "block";

  // Oculta la notificación después de 5 segundos
  setTimeout(() => {
    notification.style.display = "none";
  }, 5000);
}

// Cerrar la notificación manualmente
notificationClose.addEventListener("click", () => {
  notification.style.display = "none";
});
