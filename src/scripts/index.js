import { addProduct, fetchProducts, deleteProduct } from "../utils/api.js"

const productsContainer = document.querySelector(".products-container");

// Funktion för att spara produkt i localStorage
function saveToCart(product) {
  // Hämta nuvarande kundvagn eller skapa en tom array
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Kolla om produkten redan finns i kundvagnen
  const existingItem = cart.find(item => item.id === product._id);
  
  if (existingItem) {
    // Öka antalet om produkten redan finns
    existingItem.quantity += 1;
  } else {
    // Lägg till produkten om den inte finns
    cart.push({
      id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: 1
    });
  }
  
  // Spara till localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Alert , kan senare göras om till en siffra vid sidan av kundvagnen
  alert(`${product.name} har lagts till i kundvagnen`);
}

const renderProducts = async () => {
  productsContainer.innerHTML = "";
  const products = await fetchProducts();

  products.forEach((product) => {
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

    // Skapa köp-knapp
    const buyButton = document.createElement("button");
    buyButton.textContent = "Köp";
    buyButton.classList.add("buy-button");
    
    buyButton.addEventListener("click", (event) => {
      event.stopPropagation();
      saveToCart(product);
    });

    const nameButtonContainer = document.createElement("div");
    nameButtonContainer.classList.add("name-button-container");

    nameCategoryContainer.appendChild(productName);
    nameCategoryContainer.appendChild(productCategory);
    nameButtonContainer.appendChild(nameCategoryContainer);
    nameButtonContainer.appendChild(buyButton);

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


let currentPopupProduct = null;

const renderSingleProduct = (product) => {
  currentPopupProduct = product;
  
  const productName = document.querySelector('.single-product-title')
  const productNameTop = document.querySelector('.title')
  const productPrice = document.querySelector('.single-product-price')
  const productCategory = document.querySelector('.single-product-category')
  const productDesc = document.querySelector('.single-product-description')

  productName.innerHTML = product.name
  productNameTop.innerHTML = product.name
  productPrice.innerHTML = `${product.price}:-`
  productCategory.innerHTML = product.category
  productDesc.innerHTML = product.description
  

  const lowerContainer = document.querySelector('.lower-container');
  
  const existingButton = lowerContainer.querySelector('.cart-add-button');
  if (existingButton) {
    existingButton.remove();
  }
  
  const newButton = document.createElement('button');
  newButton.textContent = 'Lägg i Kundvagn';
  newButton.classList.add('cart-add-button');
  

  newButton.addEventListener('click', () => {
    saveToCart(product);
  });
  
 
  lowerContainer.appendChild(newButton);
}


document.addEventListener('DOMContentLoaded', () => {
  const addToCartButton = document.querySelector('.single-product-button');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      if (currentPopupProduct) {
        saveToCart(currentPopupProduct);
      }
    });
  }
});

const productAddButton = document.getElementById("product-add-btn")
if(productAddButton){
  productAddButton.addEventListener("click", addNewProduct);
}

renderProducts();