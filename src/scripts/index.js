import { addProduct, fetchProducts, deleteProduct } from "../utils/api.js"
import { closePopup } from "../../script.js";

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
  
  // Alert, kan senare göras om till en siffra vid sidan av kundvagnen
  alert(`${product.name} har lagts till i kundvagnen`);
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
          <span>${totalSum} kr</span>
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

let allProducts = [];

const renderProducts = async (productsToRender) => {
  productsContainer.innerHTML = "";

  productsToRender.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.addEventListener("click", () => {
      renderSingleProduct(product);
    });

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
  const productDesc = document
    .getElementById("product-description")
    .value.trim();
  const productCategory = document.getElementById("category").value;
  const productQuantity = parseInt(
    document.getElementById("product-quantity").value
  );
  const productPrice = parseFloat(
    document.getElementById("product-price").value
  );

  if (
    !productName ||
    !productDesc ||
    !productCategory ||
    isNaN(productQuantity) ||
    isNaN(productPrice)
  ) {
    alert("Fyll i alla fält korrekt!");
    return;
  }

  const newProduct = {
    name: productName,
    category: productCategory,
    price: productPrice,
    description: productDesc,
    stock: productQuantity,
  };
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
  const productName = document.querySelector(".single-product-title");
  const productNameTop = document.querySelector(".title");
  const productPrice = document.querySelector(".single-product-price");
  const productCategory = document.querySelector(".single-product-category");
  const productDesc = document.querySelector(".single-product-description");
  const deleteProductPopup = document.querySelector(".single-product-button");

  productName.innerHTML = product.name;
  productNameTop.innerHTML = product.name;
  productPrice.innerHTML = `${product.price}:-`;
  productCategory.innerHTML = product.category;
  productDesc.innerHTML = product.description;

  deleteProductPopup.addEventListener("click", async () => {
    await deleteProduct(product._id);
    renderProducts();
  });
};

const productAddButton = document.getElementById("product-add-btn");
if (productAddButton) {
  productAddButton.addEventListener("click", addNewProduct);
}

const fetchAndRenderProducts = async () => {
  allProducts = await fetchProducts();
  renderProducts(allProducts);
};

export const setFilter = (category) => {
  const filteredProducts =
    category === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === category);
  closePopup()
  renderProducts(filteredProducts);
};

fruitBtn.forEach((btn)=>btn.addEventListener("click", () => setFilter("Frukt")))
meatBtn.forEach((btn)=>btn.addEventListener("click", () => setFilter("Kött")))
dairyBtn.forEach((btn)=>btn.addEventListener("click", () => setFilter("Mejeri")))
otherBtn.forEach((btn)=>btn.addEventListener("click", () => setFilter("Övrigt")))

fetchAndRenderProducts();
