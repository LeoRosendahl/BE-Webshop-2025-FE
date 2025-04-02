import { addProduct, fetchProducts, deleteProduct } from "../utils/api.js"
import { closePopup } from "../../script.js";

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
      renderProducts();
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
    renderProducts();
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
    renderProducts();
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

const setFilter = (category) => {
  const filteredProducts =
    category === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === category);
  console.log(category)
  closePopup()
  renderProducts(filteredProducts);
};

fruitBtn.forEach((btn)=>btn.addEventListener("click", () => setFilter("Frukt")));
meatBtn.forEach((btn)=>btn.addEventListener("click", () => setFilter("Kött")));
dairyBtn.forEach((btn)=>btn.addEventListener("click", () => setFilter("Mejeri")));
otherBtn.forEach((btn)=>btn.addEventListener("click", () => setFilter("Övrigt")));
allbtn.forEach((btn)=>btn.addEventListener("click", () => setFilter("All")));


fetchAndRenderProducts(); 
