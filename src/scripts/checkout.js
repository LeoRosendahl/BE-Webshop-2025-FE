document.addEventListener('DOMContentLoaded', () => {
  displayCartItems();
  updateCartIcon();
  setupCheckoutButton();
});

function displayCartItems() {
  // Your existing displayCartItems function remains unchanged
  const cartContainer = document.querySelector(".get-cart-items");
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  if (!cartContainer) return;
  
  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="popup-content cart">
        <h2>Varukorg</h2>
        <p>Din kundvagn är tom</p>
      </div>
    `;
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
            <span>${item.quantity}</span>
          </div>
        </div>
      </div>
    `;
  });
  
  cartHTML += `
      </div>
      <div class="cart-summary">
        <div class="cart-total">
          <span>Totalt:</span>
          <span>${(Math.round(totalSum * 100) / 100).toFixed(2)} kr</span>
        </div>
      </div>
    </div>
  `;
  
  cartContainer.innerHTML = cartHTML;
}

function updateCartIcon() {
  // Your existing updateCartIcon function remains unchanged
  const cartNumber = document.querySelector('.cart-item-number');
  if (!cartNumber) return;
  
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let numberOfItems = 0;
  
  cart.forEach(item => {
    numberOfItems += item.quantity || 0;
  });
  
  cartNumber.innerHTML = numberOfItems;
}

function setupCheckoutButton() {
  const checkoutButton = document.querySelector('.checkout-button');
  if (!checkoutButton) return;

  checkoutButton.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Get all required input fields
    const form = document.getElementById('checkout-form');
    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const postalCode = document.getElementById('postal-code').value.trim();
    
    // Validate all fields are filled
    if (!name || !surname || !email || !address || !postalCode) {
      alert('Vänligen fyll i alla fält innan du slutför köpet.');
      return;
    }
    
    // Get cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // If cart is empty, don't proceed
    if (cart.length === 0) {
      alert('Din kundvagn är tom. Lägg till produkter innan du slutför köpet.');
      return;
    }
    
    // Calculate total
    let totalAmount = 0;
    cart.forEach(item => {
      totalAmount += item.price * item.quantity;
    });
    
    // Create order object with all information
    const order = {
      customerInfo: {
        name,
        surname,
        email,
        address,
        postalCode
      },
      items: cart,
      totalAmount: (Math.round(totalAmount * 100) / 100).toFixed(2),
      orderDate: new Date().toISOString()
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear the cart
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Show confirmation and redirect or show confirmation message
    alert('Tack för din beställning! Din order har mottagits.');
    
    // Optional: Clear form
    form.reset();
    
    // Optional: Redirect to confirmation page or refresh the page
    // window.location.href = '/pages/confirmation.html';
    // Or update the page to show the cart is now empty
    displayCartItems();
    updateCartIcon();
  });
}