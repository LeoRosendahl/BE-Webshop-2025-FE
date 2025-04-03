
// Funktion för att öppna popups
function openPopup(popupId, contentSelector) {
  const popup = document.getElementById(popupId);
  
  // Dölj alla popup-content först
  const allContents = document.querySelectorAll('.popup-content');
  allContents.forEach(content => {
      content.style.display = "none";
  });
  
  // Visa bara den önskade popup-content
  const targetContent = document.querySelector(contentSelector);
  if (targetContent) {
      targetContent.style.display = "flex";
  }
  
  // Visa popup overlay
  popup.style.display = "flex";
}
  // Eventlistener för register-knappen
  document.querySelector(".register-btn").addEventListener("click", function() {
    // Stäng den nuvarande login-popupen och öppna registreringspopupen
    openPopup("mainOverlay", ".popup-content.register");
    });
    
    document.querySelector(".back-to-login-btn").addEventListener("click", function() {
    openPopup("mainOverlay", ".popup-content.user");
    });

// Funktion för att stänga popups
export function closePopup() {
  const popups = document.querySelectorAll('.popup-overlay');
  popups.forEach(popup => {
      popup.style.display = "none";
  });
}
// Eventlistener för produkt-knappen
const addProductButton = document.getElementById("toggle-form-btn")
if(addProductButton){

  addProductButton.addEventListener("click", function() {
    openPopup("popupOverlay", ".popup-content.productform");
  });
}
// Eventlistener för hamburger-ikonen
document.querySelector(".hamburger-trigger").addEventListener("click", function() {
  openPopup("mainOverlay", ".popup-content.hamburger-menu");
});
//Eventlistner för kundvagns-ikonen
document.querySelector(".cart-trigger").addEventListener("click", function() {
  openPopup("mainOverlay", ".popup-content.cart");
});
//Eventlistner för user-ikonen
document.querySelector(".user-trigger").addEventListener("click", function() {
  openPopup("mainOverlay", ".popup-content.user");
});
// Eventlistener för stängknappar
document.querySelectorAll(".close-btn").forEach(button => {
  button.addEventListener("click", function() {
      closePopup();
  });
});
// Stäng popup om användaren klickar utanför innehållsrutan
window.onclick = function(event) {
  if (event.target.classList.contains("popup-overlay")) {
      closePopup();
  }
};


const deleteProductPopup = document.querySelector('.single-product-button');
if (deleteProductPopup) {
  deleteProductPopup.addEventListener('click', closePopup);
}

document.addEventListener('click', (event) => {
  // If the target is a button, do nothing (prevent event propagation)
  if (event.target.tagName.toLowerCase() === 'button') {
      return;
  }
  // Check if the click is on a .product (or its descendants)
  const product = event.target.closest('.product');
  if (product) {
      openPopup("mainOverlay", ".popup-content.single-product");
  }
});


