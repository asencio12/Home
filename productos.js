let PRODUCTS_API_URL = "https://fakestoreapi.com/products";
const productsContainer = document.getElementById("products-container");
const buttonShowProducts = document.getElementById("button-show-products");
buttonShowProducts.addEventListener("click", getProducts);


async function getProducts() {
   console.log("Ejecutando API de productos");
   const response = await fetch(PRODUCTS_API_URL);
   const productsList = await response.json();

   productsContainer.innerHTML = "";

   productsList.forEach(element => {
      console.log("Descripción: ", element.description);
      console.log("Imagen: ", element.image);

      const newTag = document.createElement("article");
      newTag.className = "article-container";

      newTag.innerHTML = `
         <img src="${element.image}">
         <p>
            <strong>Descripción:</strong> ${element.description}
         </p>
      `;
      productsContainer.appendChild(newTag);

   });

}
