# Popup-system - Enkel Guide

## Struktur
- Använd **en** popup-overlay per typ:
  - `popupOverlay` - för produktformulär
  - `mainOverlay` - för meny, kundvagn och användarprofil

## HTML-exempel
```html
<div id="mainOverlay" class="popup-overlay">
  <!-- Hamburger-meny -->
  <div class="popup-content hamburger-menu">
    <span class="close-btn">&times;</span>
    <!-- innehåll här -->
  </div>
  
  <!-- Kundvagn -->
  <div class="popup-content cart">
    <span class="close-btn">&times;</span>
    <!-- innehåll här -->
  </div>
</div>
```

## Funktionerna
- `openPopup(popupId, contentSelector)` - Öppnar en popup och visar valt innehåll
- `closePopup()` - Stänger alla popups

## Event-hantering
- Olika knappar öppnar olika popup-innehåll:
  - Produkt-knapp → produktformulär
  - Hamburger-ikon → menyn
  - Kundvagns-ikon → kundvagnen
  - Användar-ikon → användarmenyn
- Stäng-knappar och klick utanför innehållet stänger popups

## Kom ihåg
- Varje ID måste vara unikt (använd inte samma ID flera gånger)
- Ha alla innehållstyper (meny, kundvagn, etc.) inom samma overlay
- CSS-display är "none" som standard och "flex" när de visas