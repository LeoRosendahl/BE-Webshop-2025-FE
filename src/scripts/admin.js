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

// Funktion för att stänga popups
function closePopup() {
    const popups = document.querySelectorAll('.popup-overlay');
    popups.forEach(popup => {
        popup.style.display = "none";
    });
}
// Eventlistener för produkt-knappen
document.getElementById("toggle-form-btn").addEventListener("click", function() {
    openPopup("popupOverlay", ".popup-content.productform");
});
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