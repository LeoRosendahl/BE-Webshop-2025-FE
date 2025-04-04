import { addProduct, fetchProducts, deleteProduct } from "../utils/api.js"
import { closePopup, openPopup } from "../../script.js";

const productsContainer = document.querySelector(".products-container");


const fruitBtn = document.querySelectorAll(".fruit");
const meatBtn = document.querySelectorAll(".meat");
const dairyBtn = document.querySelectorAll(".dairy");
const otherBtn = document.querySelectorAll(".other");
const allbtn = document.querySelectorAll(".all");

let allProducts = [];


const renderProducts = async (productsToRender) => {
  productsContainer.innerHTML = "";

  productsToRender.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.addEventListener('click', ()=>{renderSingleProduct(product)})

    const productImage = document.createElement("img");
    productImage.src = "";
    productImage.alt = product.name;
    productImage.classList.add("product-image");

    const priceHeading = document.createElement("h2");
    priceHeading.classList.add("price");
    priceHeading.textContent = `${product.price}:-`;

    const nameCategoryContainer = document.createElement("div");
    nameCategoryContainer.classList.add("name-category-container");

    const productName = document.createElement("h3");
    productName.classList.add("product-name");
    productName.textContent = product.name;

    const productCategory = document.createElement("p");
    productCategory.classList.add("category");
    productCategory.textContent = product.category;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", async () => {
      await deleteProduct(product._id);
        
      allProducts = allProducts.filter(p => p._id !== product._id);
      renderProducts(allProducts);
      closePopup();
    });

    const nameButtonContainer = document.createElement("div");
    nameButtonContainer.classList.add("name-button-container");

    nameCategoryContainer.appendChild(productName);
    nameCategoryContainer.appendChild(productCategory);
    nameButtonContainer.appendChild(nameCategoryContainer);
    nameButtonContainer.appendChild(deleteButton);

    productDiv.appendChild(productImage);
    productDiv.appendChild(priceHeading);
    productDiv.appendChild(nameButtonContainer);

    productsContainer.appendChild(productDiv);
  });
};

const addNewProduct = async () => {
  const productName = document.getElementById("product-name").value.trim();
  const productDesc = document.getElementById("product-description").value.trim();
  const productCategory = document.getElementById("category").value;
  const productQuantity = parseInt(document.getElementById("product-quantity").value);
  const productPrice = parseFloat(document.getElementById("product-price").value);

  if (!productName || !productDesc || !productCategory || isNaN(productQuantity) || isNaN(productPrice)) {
    alert("Fyll i alla fält korrekt!");
    return;
  }

  const newProduct = {
    name: productName,
    category: productCategory,
    price: productPrice,
    description: productDesc,
    stock: productQuantity
}
    await addProduct(newProduct);
    await fetchAndRenderProducts();   
    closePopup()
    clearForm();
};

const clearForm = () => {
  document.getElementById("product-name").value = "";
  document.getElementById("product-description").value = "";
  document.getElementById("category").value = "";
  document.getElementById("product-quantity").value = "";
  document.getElementById("product-price").value = "";
};

const renderSingleProduct = (product) => {
  const productName = document.querySelector('.single-product-title')
  const productNameTop = document.querySelector('.title')
  const productPrice = document.querySelector('.single-product-price')
  const productCategory = document.querySelector('.single-product-category')
  const productDesc = document.querySelector('.single-product-description')
  const deleteProductPopup = document.querySelector('.single-product-button')

  productName.innerHTML = product.name
  productNameTop.innerHTML = product.name
  productPrice.innerHTML = `${product.price}:-`
  productCategory.innerHTML = product.category
  productDesc.innerHTML = product.description

  deleteProductPopup.addEventListener('click',  async () => {
    await deleteProduct(product._id);
    allProducts = allProducts.filter(p => p._id !== product._id);
    renderProducts(allProducts);
    closePopup(); 
  })

}
const productAddButton = document.getElementById("product-add-btn")
if(productAddButton){
  productAddButton.addEventListener("click", addNewProduct);
}


const fetchAndRenderProducts = async () => {
  allProducts = await fetchProducts();
  renderProducts(allProducts);
};


//FILTER OCH SORTERING

let currentCategory = "All";
let currentSortOption = "";
let filteredAndSortedProducts = [];

const sortSelect = document.querySelector(".sort-select");


const setFilter = (category) => {
  currentCategory = category;
  updateProducts();
  closePopup();
};

sortSelect.addEventListener("change", function() {
  currentSortOption = this.value;
  updateProducts();
});


const updateProducts = () => {
 //Filter
  filteredAndSortedProducts = 
    currentCategory === "All" 
      ? [...allProducts] 
      : allProducts.filter((product) => product.category === currentCategory);
  
 //Sortering
  if (currentSortOption) {
    switch (currentSortOption) {
      case "price-asc":
        filteredAndSortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredAndSortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filteredAndSortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredAndSortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }
  
  
  renderProducts(filteredAndSortedProducts);
};


fruitBtn.forEach((btn) => btn.addEventListener("click", () => setFilter("Frukt")));
meatBtn.forEach((btn) => btn.addEventListener("click", () => setFilter("Kött")));
dairyBtn.forEach((btn) => btn.addEventListener("click", () => setFilter("Mejeri")));
otherBtn.forEach((btn) => btn.addEventListener("click", () => setFilter("Övrigt")));
allbtn.forEach((btn) => btn.addEventListener("click", () => setFilter("All")));


fetchAndRenderProducts();

const navSearchContainer = document.querySelector(".nav-search-container");
const searchField = document.querySelector(".search-mobile");
const searchProducts = document.querySelector('.search-products')

let searchInput = "";

const changeSearchInput = () => {
  searchInput = searchField.value.trim(); // Remove leading/trailing spaces
  renderSearchedProducts();
};

const renderSearchedProducts = () => {
  // Clear previous results
  searchProducts.innerHTML = ""; 

  if (searchInput === "") {
    return; // Exit if input is empty
  }

  let searchedProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (searchedProducts.length === 0) {
    searchProducts.innerHTML = "<p>Inga produkter matchade din sökning.</p>";
    return;
  }

  searchedProducts.forEach((product) => {
  

    const productContainer = document.createElement("div");
    productContainer.classList.add('search-product-container')

    productContainer.addEventListener('click', ()=>{
      renderSingleProduct(product);
      openPopup("mainOverlay", ".popup-content.single-product");
      searchProducts.innerHTML = ""; 
      searchField.value = ""

    })

    // Create and set up the product image
    const productImg = document.createElement("img");
    productImg.className = "search-product-img";
    productImg.src = product.imageUrl 
    productImg.alt = product.name;

    // Create the info container
    const infoContainer = document.createElement("div");
    infoContainer.className = "search-product-info-container";

    // Create and set up the product name
    const productName = document.createElement("h3");
    productName.textContent = product.name;

    // Create and set up the product category
    const productCategory = document.createElement("p");
    productCategory.textContent = product.category;

    // Create and set up the price
    const productPrice = document.createElement("h2");
    productPrice.className = "search-price";
    productPrice.textContent = `${product.price}:-`;

    // Append everything
    infoContainer.appendChild(productName);
    infoContainer.appendChild(productCategory);
    productContainer.appendChild(productImg);
    productContainer.appendChild(infoContainer);
    productContainer.appendChild(productPrice);
    searchProducts.appendChild(productContainer);
    navSearchContainer.appendChild(searchProducts);
  });
};



searchField.addEventListener("input", changeSearchInput);

fetchAndRenderProducts();




