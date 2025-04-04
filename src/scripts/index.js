import { addProduct, fetchProducts, deleteProduct } from "../utils/api.js"
import {closePopup, openPopup} from '../../script.js'
import { addCustomer } from "../utils/api.js";
import { addNewCustomer } from "../utils/addCustomer.js";

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
      imageUrl: product.imageUrl || "",
      quantity: 1
    });
  }
  
  // Spara till localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Uppdatera kundvagnsvisningen och ikonen
  displayCart();
  updateCartIcon();
  

}

// Funktion för att visa kundvagnens innehåll
function displayCart() {
  const cartContainer = document.querySelector(".popup-content.cart");
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Rensa nuvarande innehåll
  if (cartContainer) {
  
    let fullCartHTML = '<h2>Varukorg</h2>';
    
    if (cart.length === 0) {
      fullCartHTML += '<p>Din kundvagn är tom</p>';
      cartContainer.innerHTML = fullCartHTML;
      return;
    }
    
    // Skapa HTML för kundvagnsinnehållet
    fullCartHTML += '<div class="cart-items">';
    let totalSum = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      totalSum += itemTotal;
      
      fullCartHTML += `
        <div class="cart-item">
          ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">` : '<div class="cart-item-image-placeholder"></div>'}
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p class="category">${item.category}</p>
          </div>
          <div class="wrapper">
          <div class="cart-item-price-actions">
            <div class="price">${item.price} kr</div>
            <button class="remove-item" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
          </div>
            <div class="quantity-controls">
              <button class="decrease-quantity" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
              <span>${item.quantity}</span>
              <button class="increase-quantity" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
        </div>
      `;
    });
    
    fullCartHTML += '</div>';
    fullCartHTML += `
      <div class="cart-summary">
        <div class="cart-total">
          <span>Totalt:</span>
          <span>${(Math.round(totalSum * 100) / 100).toFixed(2)} kr</span>
        </div>
        <button class="checkout-btn">Gå till kassan</button>
        <button class="clear-cart-btn">Töm kundvagn</button>
      </div>
    `;
    
  
    cartContainer.innerHTML = fullCartHTML;
    
    
    attachCartEventListeners();
  }
}

//Kundvagnsknappar
function attachCartEventListeners() {

  // Öka antal
  document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', () => {
      updateQuantity(button.dataset.id, 1);
    });
  });
  
  // Minska antal
  document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', () => {
      updateQuantity(button.dataset.id, -1);
    });
  });
  
  // Ta bort produkt
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      removeFromCart(button.dataset.id);
    });
  });
  
  // Töm kundvagnen
  const clearCartBtn = document.querySelector('.clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }
  
// Ska senare länkas till checkout/kassan
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      
      alert('Går till kassan...');
    });
  }
}

// Uppdatera antal av en produkt
function updateQuantity(id, change) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = cart.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;
    
    // Ta bort produkten om antalet är 0 eller mindre
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartIcon();
  }
}

// Ta bort en produkt från kundvagnen
function removeFromCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter(item => item.id !== id);
  
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  displayCart();
  updateCartIcon();
}

// Töm kundvagnen
function clearCart() {
  localStorage.removeItem('cart');
  displayCart();
  updateCartIcon();
}

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
    productImage.src = product.imageUrl || "";
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



const renderSingleProduct = (product) => {
  
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

  displayCart();
  
  
  const addToCartButton = document.querySelector('.single-product-button');
  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      if (currentPopupProduct) {
        saveToCart(currentPopupProduct);
      }
    });
  }
  
  
  const cartToggleButton = document.querySelector('.cart-toggle');
  if (cartToggleButton) {
    cartToggleButton.addEventListener('click', () => {
      const cartPopup = document.querySelector('.cart-popup');
      if (cartPopup) {
        cartPopup.classList.toggle('show');
      }
    });
  }
});

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

const updateCartIcon = () => {
  const cartNumber = document.querySelector('.cart-item-number');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let numberOfItems = 0;
  cart.forEach(item => {
    numberOfItems += item.quantity || 0;
  });
  cartNumber.innerHTML = numberOfItems;
}




const addCustomerBtn = document.querySelector('.create-account-btn')
addCustomerBtn.addEventListener('click', addNewCustomer)

searchField.addEventListener("input", changeSearchInput);

updateCartIcon()
fetchAndRenderProducts();

