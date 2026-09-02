const API_URL = "https://dummyjson.com/products";

// Selección de elementos del DOM
const loadProductsButton = document.getElementById("load-products");
const nameFilter = document.getElementById("name-filter");
const productsContainer = document.getElementById("products-container");
const productsCounter = document.getElementById("products-counter");

// Asignación de eventos
loadProductsButton.addEventListener("click", loadProducts);
nameFilter.addEventListener("input", applyFilters);

// Variable global para almacenar los productos
let products = [];

// Función para consultar los productos del API
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        products = data.products;
        
        if (productsCounter) {
            productsCounter.textContent = `Cantidad de productos: ${products.length}`;
        }

        displayProducts(products);

    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Función para pintar las tarjetas en el HTML
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = "";

    productsToDisplay.forEach(product => {
        const card = document.createElement("article");
        card.classList.add("product-card");
        
        card.innerHTML = `
            <span class="product-id">ID: ${product.id}</span>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="product-price">$${product.price}</p>
        `;
        
        productsContainer.appendChild(card);
    });
}

// Función para aplicar filtrado por nombre
function applyFilters() {
    const searchTerm = nameFilter.value.toLowerCase();
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
    );

    if (productsCounter) {
        productsCounter.textContent = `Cantidad de productos: ${filteredProducts.length}`;
    }

    displayProducts(filteredProducts);
}