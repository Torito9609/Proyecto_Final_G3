document.addEventListener("DOMContentLoaded", () => {
    // Recuperamos el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    const cartItemsContainer = document.getElementById('cartItems');
  
    // Verificamos si hay productos en el carrito
    if (carrito.length === 0) {
      cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
      // Si hay productos, los mostramos
      carrito.forEach((producto) => {
        const productCard = document.createElement('div');
        productCard.classList.add('cart-item');
        productCard.innerHTML = `
          <h3>${producto.nombre}</h3>
          <p>Cantidad: ${producto.cantidad_carrito}</p>
          <p>Precio: $${(producto.precio * producto.cantidad_carrito).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(productCard);
      });
    }
  });