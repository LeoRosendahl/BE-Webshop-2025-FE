document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.admin-sidebar');
    const toggleButton = document.getElementById('toggle-form-btn');
    const addButton = document.getElementById('product-add-btn');
    
    // Funktion för att kontrollera om vi är i desktop-läge
    function isDesktopView() {
        return window.innerWidth >= 768; // Samma breakpoint som i CSS
    }
    
    // Funktion för att uppdatera sidbarens synlighet baserat på skärmstorlek
    function updateSidebarVisibility() {
        if (isDesktopView()) {
            // I desktop-läge ska sidebar alltid visas
            sidebar.style.display = 'flex';
        } else {
            // I mobil-läge är sidebar dold som standard
            if (!toggleButton.textContent.includes('Dölj')) {
                sidebar.style.display = 'none';
            }
        }
    }
    
    // Kör direkt vid laddning
    updateSidebarVisibility();
    
    // Lyssna på fönsterändring
    window.addEventListener('resize', updateSidebarVisibility);
    
    // Toggle-knappens funktionalitet (bara för mobil)
    toggleButton.addEventListener('click', function() {
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'flex';
            toggleButton.textContent = 'Dölj';
        } else {
            sidebar.style.display = 'none';
            toggleButton.textContent = 'Lägg till produkt';
        }
    });
    
    // Add-knappens funktionalitet
    if (addButton) {
        addButton.addEventListener('click', function() {
            if (!isDesktopView()) {
                toggleButton.click();
            }
            // I desktop-läge behöver vi inte göra något eftersom formuläret alltid syns
        });
    }
});