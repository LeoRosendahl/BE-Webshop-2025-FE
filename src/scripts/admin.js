
// Funktion för knapp
document.addEventListener('DOMContentLoaded', function() {
    
    const sidebar = document.querySelector('.admin-sidebar');
    const toggleButton = document.getElementById('toggle-form-btn');
    const addButton = document.getElementById('product-add-btn');
    
  
    sidebar.style.display = 'none';
    
   
    toggleButton.addEventListener('click', function() {
        // Växla mellan att visa och dölja formuläret
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'flex';
            toggleButton.textContent = 'Dölj';
        } else {
            sidebar.style.display = 'none';
            toggleButton.textContent = 'Lägg till produkt';
        }
    });
    
    if (addButton) {
        addButton.addEventListener('click', function() {
            
            toggleButton.click();
        });
    }
});