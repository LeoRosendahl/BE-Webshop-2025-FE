# Popup System - Simple Guide

## Structure
- Use **one** popup overlay per type:
  - `popupOverlay` - for product form
  - `mainOverlay` - for menu, cart, and user profile

## HTML Example
```html
<div id="mainOverlay" class="popup-overlay">
  <!-- Hamburger menu -->
  <div class="popup-content hamburger-menu">
    <span class="close-btn">&times;</span>
    <!-- content here -->
  </div>
  
  <!-- Cart -->
  <div class="popup-content cart">
    <span class="close-btn">&times;</span>
    <!-- content here -->
  </div>
</div>
```

## Functions
- `openPopup(popupId, contentSelector)` - Opens a popup and displays selected content
- `closePopup()` - Closes all popups

## Event Handling
- Different buttons open different popup content:
  - Product button → product form
  - Hamburger icon → menu
  - Cart icon → shopping cart
  - User icon → user profile
- Close buttons and clicks outside the content close popups

## Remember
- Each ID must be unique (don't use the same ID multiple times)
- Keep all content types (menu, cart, etc.) within the same overlay
- CSS display is "none" by default and "flex" when shown