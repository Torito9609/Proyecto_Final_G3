async function loadProducts() {
  try {
    const response = await fetch("productos_json.json");

    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }

    const data = await response.json();
    displayProducts(data.productos);

    console.log(data);
    

  } catch (error) {
    console.error("Error:", error);
  }
}



function displayProducts(productos) {
  const productContainer = document.querySelector(".product-container");

  productos.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productHTML = `
        <h2>${product.nombre}</h2>
        <img src="${product.imagen}" alt="${
      product.nombre
    }" style="width: 100px; height: 100px;">
        <p><strong>Categoría:</strong> ${product.categoría}</p>
        <p><strong>Descripción:</strong> ${product.descripción}</p>
        <p><strong>Presentaciones:</strong></p>
        <ul>
          ${product.cantidad
            .map(
              (cantidad, index) =>
                `<li>${cantidad}: $${product.precio[index].toFixed(2)}</li>`
            )
            .join("")}
        </ul>
      `;

    productCard.innerHTML = productHTML;

    productContainer.appendChild(productCard);
  });
}



document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});
