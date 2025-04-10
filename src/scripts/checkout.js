import { getUserProfile } from "../utils/api.js"

document.addEventListener('DOMContentLoaded', () => {
  displayCartItems();
  updateCartIcon();
});

const fillInputsWithInfo = async () => {
  const userData = await getUserProfile();
  const userInfo = userData.user;
  
  const firstNameInput = document.getElementById('name');
  const lastNameInput = document.getElementById('surname');
  const emailInput = document.getElementById('email');
  const addressInput = document.getElementById('address'); 
  const postalCodeInput = document.getElementById('postal-code');
  
  if (userInfo.firstName) {
    firstNameInput.value = userInfo.firstName;
  }
  if (userInfo.lastName) {
    lastNameInput.value = userInfo.lastName;
  }
  if (userInfo.email) {
    emailInput.value = userInfo.email;
  }
  if (userInfo.streetAddress) {
    addressInput.value = userInfo.streetAddress;
  }
  if (userInfo.postalCode) {
    postalCodeInput.value = userInfo.postalCode;
  }
};

function displayCartItems() {
  const cartContainer = document.querySelector(".get-cart-items");
  const summaryContainer = document.querySelector(".summary-container");
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (!cartContainer) return;
  
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="popup-content cart">
        <h2>Varukorg</h2>
        <p>Din kundvagn är tom</p>
      </div>
    `;
    
    if (summaryContainer) {
      summaryContainer.innerHTML = ''; // Töm summary-containern om varukorgen är tom
    }
    return;
  }
  
  let cartHTML = `
    <div class="popup-content cart">
      <div class="cart-items">
  `;
  
  let totalSum = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalSum += itemTotal;
    
    cartHTML += `
      <div class="cart-item">
        ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">` : '<div class="cart-item-image-placeholder"></div>'}
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="category">${item.category}</p>
        </div>
        <div class="wrapper">
          <div class="cart-item-price-actions">
            <div class="price">${item.price} kr</div>
          </div>
          <div class="quantity-controls">
            <span>${item.quantity} st</span>
          </div>
        </div>
      </div>
    `;
  });
  
  cartHTML += `
      </div>
    </div>
  `;
  
 
  let summaryHTML = `
    <div class="cart-summary">
      <div class="cart-total">
        <span>Totalt:</span>
        <span>${(Math.round(totalSum * 100) / 100).toFixed(2)} kr</span>
      </div>
    </div>
  `;
  

  cartContainer.innerHTML = cartHTML;
  

  if (summaryContainer) {
    summaryContainer.innerHTML = summaryHTML;
  } 
}

// Uppdatera kundvagnsikonen
function updateCartIcon() {
  const cartNumber = document.querySelector('.cart-item-number');
  if (!cartNumber) return;
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let numberOfItems = 0;
  
  cart.forEach(item => {
    numberOfItems += item.quantity || 0;
  });
  
  cartNumber.innerHTML = numberOfItems;
}

// Checkout-funktion
document.querySelector('.checkout-button').addEventListener('click', function() {
  document.getElementById('checkout-form').submit();
});

fillInputsWithInfo();