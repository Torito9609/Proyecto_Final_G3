document.addEventListener("DOMContentLoaded", () => {
    // Recuperamos el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartCounter = document.getElementById("cartCounter");
  
    // Si el contador existe en la página, actualizamos su valor
    if (cartCounter) {
      cartCounter.innerText = carrito.length;
    }
  });