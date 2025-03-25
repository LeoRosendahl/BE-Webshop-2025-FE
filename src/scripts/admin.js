//FUNKTION FÖR POPUP
// Funktion för att öppna popup  
function openPopup() {
    const popup = document.getElementById("popupOverlay");
    popup.style.display = "flex";
}

// Funktion för att stänga popup
function closePopup() {
    const popup = document.getElementById("popupOverlay");
    popup.style.display = "none";
}

// Lägg till event listener för att öppna popup
document.getElementById("toggle-form-btn").addEventListener("click", openPopup);

// Stäng popup om användaren klickar utanför innehållsrutan
window.onclick = function(event) {
    const popup = document.getElementById("popupOverlay");
    if (event.target === popup) {
        popup.style.display = "none";
    }
}