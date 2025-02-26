//CONEXION CON EL BACKEND - PRODUCTOS

let allProducts = [];

async function loadProducts() {
  try {
   // const response = await fetch("/productos_json.json");
   const response = await fetch("http://localhost:8080/productos/traer");

    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }

    const data = await response.json();
    //

    console.log("Datos recibidos:",  data);
    let refactoredProductos = refactorJsonFromBackEnd(await data);
    displayProducts(refactoredProductos);

    allProducts = refactoredProductos; // Guardamos los productos antes de filtrar
    filterProducsByCategory(); // Aplicar filtro si hay una categoría guardada
    

  
  } catch (error) {
    console.error("Error:", error);
  }
}

function refactorJsonFromBackEnd(productos){
  console.log(productos);
  let refactoredProductos = [];
  
  if(productos.length > 0){
    productos.forEach(producto => {
      let variantes = producto.variantes != null ? producto.variantes : [];
      let variantesPrecio = [];
      let variantesTamano = [];
      variantes.forEach(variante => {
        variantesPrecio.push(variante.precioVariante);
        variantesTamano.push(variante.tamanoVariante);
        
      });
      let categorias = producto.categorias[0] != null ? producto.categorias[0] : null;

      let nuevoProducto = {
        "id": producto.idProducto != null ? producto.idProducto : "",
        "nombre": producto.nombreProducto != null ? producto.nombreProducto : "",
        "imagen": producto.imagenProducto != null ? producto.imagenProducto : "",
        "cantidad": variantesTamano ,
        "precio": variantesPrecio,
        "categoría": categorias !=null ? categorias.nombreCategoria : "",
        "descripción": categorias  !=null ? categorias.descripcionCategoria : ""
      }
      refactoredProductos.push(nuevoProducto);
    });
    console.log(refactoredProductos);
    
  }
  return refactoredProductos;
}
//----------------------------------------------
function displayProducts(productos) {
  const productContainer = document.querySelector(".product-container");

  productos.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    let precios = product.precio;
    console.log(precios);
    
    let precioMinimo;
    if(precios.length > 0){
      precioMinimo = Math.min(...precios);
    }

    const productHTML = `
    <img src="${product.imagen}" alt="${product.nombre}" class ="img-cards-modal">
    <div class="decoration-cards">
    <h2>${product.nombre}</h2>
       <p><strong>Categoría:</strong> ${product.categoría}</p>
       <p>$${precioMinimo}</p>
        <button class="btn_open_card">Añadir al carrito</button>
        </div>
      `;

    productCard.innerHTML = productHTML;

    // Añadir evento para abrir el modal
    const modalButton = productCard.querySelector(".btn_open_card");
    modalButton.addEventListener("click", () => {
      showModal(
        product.nombre,
        product.imagen,
        product.descripción,
        product.categoría,
        product.cantidad,
        product.precio,
        product.id
      );
    });

    productContainer.appendChild(productCard);
  });
}

// Mostrar el modal con los detalles del producto
function showModal(
  nombre,
  imagen,
  descripción,
  categoría,
  cantidad,
  precios,
  productoId
) {
  const modal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const modalCategory = document.getElementById("modalCategory");
  const modalPrices = document.getElementById("modalPrices");

  // Configurar el contenido del modal
  modalTitle.textContent = nombre;
  modalTitle.className = "modalTitle";
  modalImage.src = imagen;
  modalDescription.textContent = descripción;
  modalDescription.className = "modalDescription";
  modalCategory.textContent = `Categoría: ${categoría}`;
  modalCategory.className = "modalCategory";
  modalPrices.innerHTML = cantidad
    .map(
      (c, i) => `
          <button class="show-modal">
            ${c}: $${precios[i].toFixed(2)}
          </button>
        `
    )
    .join("");

  // Seleccionar todos los botones generados dentro de modalPrices
  const botones = modalPrices.querySelectorAll(".show-modal");

  // Agregar un atributo personalizado a cada botón
  botones.forEach((boton, index) => {
    boton.setAttribute("data-id", productoId); // Atributo personalizado con el id del producto
    boton.setAttribute("data-name", nombre); // Atributo personalizado con el id del producto
    boton.setAttribute("data-quantity", cantidad[index]); //Atributo personalizado con la cantidad del producto
    boton.setAttribute("data.price", precios[index]); // Ejemplo: agregar la cantidad como atributo
    boton.setAttribute("data-image", imagen);
  });

  // Mostrar el modal
  modal.style.display = "flex";
}

async function openSavedProductModal() {
  const selectedProductId = localStorage.getItem("selectedProduct");

  if (!selectedProductId) return; // Si no hay producto guardado, no hacemos nada

  // Esperar a que los productos se hayan cargado
  if (allProducts.length === 0) {
    console.log("Esperando a que los productos se carguen...");
    await new Promise((resolve) => setTimeout(resolve, 500)); // Espera medio segundo
  }

  // Buscar el producto
  const producto = allProducts.find((p) => p.id.toString() === selectedProductId);
  console.log("Producto encontrado:", producto);

  if (producto) {
    showModal(
      producto.nombre,
      producto.imagen,
      producto.descripción,
      producto.categoría,
      producto.cantidad,
      producto.precio,
      producto.id
    );

    // Limpiar el localStorage después de abrir el modal
    localStorage.removeItem("selectedProduct");
  } else {
    console.log("No se encontró el producto con ID:", selectedProductId);
  }
}

//Muestra los productos filtrados por categoría cuando se selecciona una categoría en la página de inicio
function filterProducsByCategory() {
  const selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    let filteredProducts = allProducts.filter(
      (producto) => producto.categoría === selectedCategory
    );

    // Limpiar los productos actuales en la interfaz
    const productContainer = document.querySelector(".product-container");
    productContainer.innerHTML = "";

    // Mostrar los productos filtrados
    displayProducts(filteredProducts);

    // Eliminar la categoría seleccionada para evitar aplicar el filtro repetidamente
    localStorage.removeItem("selectedCategory");
  }
}

//Solicitud GET al backEnd para traer categorías dinámicamente
async function fetchCategories() {
  try {
      const response = await fetch("http://localhost:8080/categorias/traer"); 
      if (!response.ok) {
          throw new Error("Error al obtener las categorías");
      }
      const categories = await response.json();
      console.log(categories);
      

      populateCategoryFilter(categories);
  } catch (error) {
      console.error("Error:", error);
  }
}



document.getElementById("apply-filters").addEventListener("click", function () {
  applyFilters();
});

// Llena las opciones de categoría en el filtro dinámicamente
function populateCategoryFilter() {
  const categoryFilter = document.getElementById("category-filter");

  // Limpiar opciones previas
  categoryFilter.innerHTML = '<option value="Todas">Todas</option>';

  // Obtener categorías únicas y evitar valores vacíos o undefined
  const uniqueCategories = [...new Set(allProducts.map(p => p.categoría?.trim() || "Sin categoría"))];

  // Agregar las opciones al select
  uniqueCategories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });

  console.log("Categorías añadidas:", uniqueCategories); // Verifica en la consola
}


// Filtrar y ordenar los productos
function applyFilters() {
  let filteredProducts = [...allProducts]; // Se inicializa con todos los productos

  // Filtrar por categoría
  const selectedCategory = document.getElementById("category-filter").value.trim();
  if (selectedCategory && selectedCategory !== "Todas") {  
    filteredProducts = filteredProducts.filter(p => p.categoría === selectedCategory);
  }

  // Filtrar por precio
  const minPrice = parseFloat(document.getElementById("min-price").value) || 0;
  const maxPrice = parseFloat(document.getElementById("max-price").value) || Infinity;

  filteredProducts = filteredProducts.filter(p => {
      const price = Math.min(...p.precio); // Usar el precio más bajo del producto
      return price >= minPrice && price <= maxPrice;
  });

  // Ordenar los productos
  const sortValue = document.getElementById("sort-filter").value;
  if (sortValue.includes("name")) {
      filteredProducts.sort((a, b) => sortValue === "name-asc"
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre)
      );
  } else if (sortValue.includes("price")) {
      filteredProducts.sort((a, b) => sortValue === "price-asc"
          ? Math.min(...a.precio) - Math.min(...b.precio)
          : Math.min(...b.precio) - Math.min(...a.precio)
      );
  }

  // Actualizar la UI
  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = "";

  if (filteredProducts.length > 0) {
      displayProducts(filteredProducts);
  } else {
      productContainer.innerHTML = "<p>No se encontraron productos para esta categoría.</p>";
  }
}



let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Inicializamos carrito desde localStorage si existe, de lo contrario, es un array vacío
let productoSeleccionado = null; // Para almacenar el producto seleccionado

// Seleccionar la lista de productos generados, aqui fue donde se renderizaron los botones de los
// diferentes pesos (500g, 10g... etc)
const modalPrices = document.querySelector("#modalPrices");

// Event listener para los botones que seleccionan productos
modalPrices.addEventListener("click", (event) => {
  if (event.target.classList.contains("show-modal")) {
    const add = event.target;

    // Desmarcar cualquier producto previamente seleccionado
    const botones = document.querySelectorAll(".show-modal");
    botones.forEach((boton) => boton.classList.remove("selected"));

    // Marcar el producto como seleccionado visualmente
    add.classList.add("selected");

    // Guardar la información del producto seleccionado
    productoSeleccionado = {
      id: add.getAttribute("data-id"),
      nombre: add.getAttribute("data-name"),
      cantidad: add.getAttribute("data-quantity"),
      precio: add.getAttribute("data.price"),
      cantidad_carrito: 1,
      imagen: add.getAttribute("data-image")
    };

    console.log("Producto seleccionado:", productoSeleccionado); //muestra el producto que se seleccionó.
  }
});

// Event listener para el botón "Añadir al carrito". Tener en cuenta que este botón no fue renderizado desde js
//sino que ya estaba en la estructura base del html, por eso requiere otro event listener.
const addToCartButton = document.querySelector(".carrito");

addToCartButton.addEventListener("click", () => {
  // Verificamos que se haya seleccionado un producto
  if (!productoSeleccionado) {
    showNotification("Por favor selecciona un tamaño primero.");
    console.log("Por favor selecciona un producto primero.");
    return;
  }

  // Capturamos la cantidad ingresada por el usuario
  const cantidadInput = document.querySelector(".cantidad-producto");
  const cantidad = cantidadInput ? cantidadInput.value : 1;

  // Actualizamos la cantidad del producto seleccionado
  productoSeleccionado.cantidad_carrito = parseInt(cantidad, 10);

  // Añadimos el producto al carrito
  agregarProducto(carrito, productoSeleccionado);

  // Reiniciamos la selección después de añadir al carrito
  productoSeleccionado = null;
  const botones = document.querySelectorAll(".show-modal");
  botones.forEach((boton) => boton.classList.remove("selected"));

  console.log(carrito);
  cantidadInput.value = "1";
  //Aqui imprimo el carrito por consola.
});

function agregarProducto(carrito, nuevo_producto) {
  // Verifico si el producto ya existe en el carrito, notar que también se comparan los pesos(500g, 10g, ... etc)
  //Esto porque aunque tengan el mismo id, pueden tener pesos diferentes.
  const productoExistente = carrito.find(
    (producto) =>
      producto.id === nuevo_producto.id &&
      producto.cantidad == nuevo_producto.cantidad
  );
  //Si el producto en id y cantidad(peso 500g, 125g, etc) ya existe, solo modifico la cantidad del que ya existe
  if (productoExistente) {
    // Si el producto existe, solo actualizo la cantidad
    productoExistente.cantidad_carrito += nuevo_producto.cantidad_carrito;
  } else {
    carrito.push(nuevo_producto); // si no, solo agrego un nuevo objeto a nuestro arreglo carrito.
    showNotification("Producto añadido al carrito");
  }

  // Guarda el carrito actualizado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Actualiza el contador
  actualizarContador();
}

function actualizarContador() {
  const cartCounter = document.getElementById("cartCounter");
  cartCounter.innerText = carrito.length; // Actualiza el número de productos en el carrito
}

// Este evento se ejecuta cuando la página se ha cargado completamente
document.addEventListener("DOMContentLoaded", () => {
  actualizarContador(); // Llama a la función para actualizar el contador
});

function closeModal() {
  const modal = document.getElementById("productModal");
  modal.style.display = "none";
}
// Seleccionamos los iconos de disminuir y aumentar usando las etiquetas <a> que envuelven a los íconos
const disminuirBtn = document.querySelector(".bx-minus").parentElement;
const aumentarBtn = document.querySelector(".bx-plus").parentElement;
const cantidadInput = document.querySelector(".cantidad-producto");

// Event listener para disminuir la cantidad
disminuirBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Previene el comportamiento por defecto del enlace <a>
  let cantidad = parseInt(cantidadInput.value, 10);
  if (cantidad > 1) {
    cantidadInput.value = cantidad - 1;
  }
});

// Event listener para aumentar la cantidad
aumentarBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Previene el comportamiento por defecto del enlace <a>
  let cantidad = parseInt(cantidadInput.value, 10);
  cantidadInput.value = cantidad + 1;
});

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

document.addEventListener("DOMContentLoaded", async () => {
  await loadProducts();
  openSavedProductModal();
  fetchCategories();
});
