// async function loadProducts() {
//   try {
//     const response = await fetch("productos_json.json");

//     if (!response.ok) {
//       throw new Error("Error al cargar el archivo JSON");
//     }

//     const data = await response.json();
//     displayProducts(data.productos);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// function displayProducts(productos) {
//   const productContainer = document.querySelector(".product-container");

//   productos.forEach((product) => {
//     const productCard = document.createElement("div");
//     productCard.classList.add("product-card");

//     const productHTML = `
//         <h2>${product.nombre}</h2>
//         <img src="${product.imagen}" alt="${
//       product.nombre
//     }" style="width: 100px; height: 100px;">
//         <p><strong>Categoría:</strong> ${product.categoría}</p>
//         <p><strong>Descripción:</strong> ${product.descripción}</p>
//         <p><strong>Presentaciones:</strong></p>
//         <ul>
//           ${product.cantidad
//             .map(
//               (cantidad, index) =>
//                 `<li>${cantidad}: $${product.precio[index].toFixed(2)}</li>`
//             )
//             .join("")}
//         </ul>
//       `;

//     productCard.innerHTML = productHTML;

//     productContainer.appendChild(productCard);
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   loadProducts();
// });






async function loadProducts() {
  try {
    const response = await fetch("/productos_json.json");

    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }

    const data = await response.json();
    displayProducts(data.productos);
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
    <img src="${product.imagen}" alt="${product.nombre}" class ="img-cards-modal">
    <div class="decoration-cards">
    <h2>${product.nombre}</h2>
       <p><strong>Categoría:</strong> ${product.categoría}</p>
       <p>$${product.precio[2]}</p>
        <button class="show-modal_1">Ver detalles</button>
          
        </div>
      `;
        
        
     

    productCard.innerHTML = productHTML;

    // Añadir evento para abrir el modal
    const modalButton = productCard.querySelector(".show-modal_1");
    modalButton.addEventListener("click", () => {
      showModal(
        product.nombre,
        product.imagen,
        product.descripción,
        product.categoría,
        product.cantidad,
        product.precio
      );
    });

    productContainer.appendChild(productCard);
  });
}

// Mostrar el modal con los detalles del producto
function showModal(nombre, imagen, descripción, categoría, cantidad, precios) {
  const modal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const modalCategory = document.getElementById("modalCategory");
  const modalPrices = document.getElementById("modalPrices");

  // Configurar el contenido del modal
  modalTitle.textContent = nombre;
  modalImage.src = imagen;
  modalDescription.textContent = descripción;
  modalCategory.textContent = `Categoría: ${categoría}`;
  modalPrices.innerHTML = cantidad
    .map((c, i) => `
        <button class="show-modal">
    ${c}: $${precios[i].toFixed(2)}
   </button>
    
    
    `)
    .join("");

  
  modal.style.display = "flex";
}


function closeModal() {
  const modal = document.getElementById("productModal");
  modal.style.display = "none";
}


document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});
