const products = [
    { "ImagePath": "https://drive.google.com/uc?id=1HVPH-cUKmMHWWGzmTCYw_BhJITQwkzPJ", "ProductName": "Canela", "ProductWeight": 10, "WeightUnit": "gr", "Precio": 10000 },
    { "ImagePath": "../img/paprika.png", "ProductName": "Paprika", "ProductWeight": 10, "WeightUnit": "gr", "Precio": 15000 },
    { "ImagePath": "../img/pimienta.png", "ProductName": "Pimienta en polvo", "ProductWeight": 10, "WeightUnit": "gr", "Precio": 5000 },
    { "ImagePath": "../img/paprika.png", "ProductName": "Paprika", "ProductWeight": 10, "WeightUnit": "gr", "Precio": 15000 },
    { "ImagePath": "../img/pimienta.png", "ProductName": "Pimienta en polvo", "ProductWeight": 10, "WeightUnit": "gr", "Precio": 5000 }
]

console.log("products: ", products);

function displayPopularProducts(products) {
    const carouselInner = document.querySelector('.carousel-inner');
    const indicators = document.querySelector('.carousel-indicators');

    const itemsPerPage = 3;//define max num of products to show per page
    const totalPages = Math.ceil(products.length / itemsPerPage);//calculate number of pages

    if(totalPages === 1){
        const carouselControls = document.querySelectorAll('.carousel-control');
        carouselControls.forEach(control =>{
            control.classList.add('hide-carousel-controls');
        });
        
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
    img.src = product.ImagePath;
    img.alt = product.ProductName;

    const lineDiv = document.createElement('div');
    lineDiv.classList.add('line-separation');

    //Create product info container for product name, price, weight, etc...
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('product-info-container');

    //Create elements for product name, price and weight
    const name = document.createElement('h3');
    name.classList.add('product-name');
    name.textContent = product.ProductName;

    const weight = document.createElement('p');
    weight.classList.add('product-info');
    weight.textContent = product.ProductWeight+' '+product.WeightUnit;

    const price = document.createElement('p');
    price.classList.add('product-info');
    price.textContent = '$'+product.Precio.toLocaleString();

    //Create card element that will contain the image container and product info container
    const productCard = document.createElement('div');
    productCard.classList.add('popular-product-card');

    imageContainer.appendChild(img);//Append img element to imgage container div

    infoContainer.appendChild(name);//Append product name (h3) to product info container div
    infoContainer.appendChild(weight);//Append product weight (p) to product info container div
    infoContainer.appendChild(price);//Append product price (p) to product info container div

    //Append image container and info container divs to product card
    productCard.appendChild(imageContainer);
    productCard.appendChild(lineDiv);
    productCard.appendChild(infoContainer);

    return productCard;
}

document.addEventListener("DOMContentLoaded", () => {
    displayPopularProducts(products);
});