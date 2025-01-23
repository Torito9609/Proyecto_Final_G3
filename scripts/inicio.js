async function loadJson() {
    try {
        const response = await fetch("../productos_json.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Productos cargados:", data);
        return data;
    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
        return []; // Retorna un arreglo vacío si ocurre un error
    }
}


async function displayPopularProducts(productsFromJson) {
    //console.log(products);
    let products = [];
    products =  await productsFromJson.productos;
    
    const carouselInner = document.querySelector('.carousel-inner');
    const indicators = document.querySelector('.carousel-indicators');

    const itemsPerPage = 3;//define max num of products to show per page
    const productsSize = products.length;
    console.log(products);
    console.log(products.length);
    console.log(productsSize);
    
    const totalPages = Math.ceil(productsSize / itemsPerPage);//calculate number of pages

    if(totalPages === 1){
        const carouselControls = document.querySelectorAll('.carousel-control');
        carouselControls.forEach(control =>{
            control.classList.add('hide-carousel-controls');
        });
        const carouselIndicators = document.querySelector('.carousel-indicators');
        carouselIndicators.classList.add('hide-carousel-controls');     
    }

    for (let i = 0; i < totalPages; i++) {
        // Create carousel item and Set first page as active
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        if (i === 0){
            itemDiv.classList.add('active'); 
        } 

        // Create a row to hold product cards
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        // Create and append product cards for this page
        const start = i * itemsPerPage;
        const end = Math.min(start + itemsPerPage, products.length);
        for (let j = start; j < end; j++) {
            const productCard = createProductCard(products[j]);

            // Wrap each card in a Bootstrap grid column
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-sm-4'); // 3 columns per row

            colDiv.appendChild(productCard);
            rowDiv.appendChild(colDiv);
        }

        itemDiv.appendChild(rowDiv);
        carouselInner.appendChild(itemDiv);

        // Create indicator for this page
        const indicator = document.createElement('li');
        indicator.dataset.target = '#productCarousel';
        indicator.dataset.slideTo = i.toString();
        if (i === 0) {
            indicator.classList.add('active');
        }
        indicators.appendChild(indicator);
    }
}

function createProductCard(product){
    //Create image container div and image element
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('product-image-container');

    const img = document.createElement('img');
    img.src = product.imagen;
    img.alt = product.nombre;

    //Create product info container for product name, price, weight, etc...
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('product-info-container');

    //Create elements for product name, price and weight
    const name = document.createElement('h3');
    name.classList.add('product-name');
    name.textContent = product.nombre;

    const weight = document.createElement('p');
    weight.classList.add('product-info');
    weight.textContent = 'Sobre de '+product.cantidad[2];

    const price = document.createElement('p');
    price.classList.add('product-info');
    price.classList.add('product-price');
    price.textContent = '$'+product.precio[2].toLocaleString();

    //Create card element that will contain the image container and product info container
    const productCard = document.createElement('div');
    productCard.classList.add('popular-product-card');

    //TODO: CREAR BOTON Y ASIGNAR CLASES DE ESTILOS

    const boton = document.createElement('button');
    boton.classList.add('add-button');
    boton.textContent = 'Añadir al carrito';

    imageContainer.appendChild(img);//Append img element to imgage container div

    infoContainer.appendChild(name);//Append product name (h3) to product info container div
    infoContainer.appendChild(weight);//Append product weight (p) to product info container div
    infoContainer.appendChild(price);//Append product price (p) to product info container div
    infoContainer.appendChild(boton);
    //TODO: Append botoin a info container

    //Append image container and info container divs to product card
    productCard.appendChild(imageContainer);
    productCard.appendChild(infoContainer);

    return productCard;
}

document.addEventListener("DOMContentLoaded", async () => {
    const products = await loadJson();
    displayPopularProducts(products);
});