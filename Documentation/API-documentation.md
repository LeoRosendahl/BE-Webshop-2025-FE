# API.js Documentation

This document describes the functions in the `api.js` file used to interact with the backend service at `https://webshop-2025-be-g8.vercel.app/`.

## Contents
- [Base URL](#base-url)
- [Products](#products)
- [Users](#users)
- [Shopping Cart](#shopping-cart)
- [Authentication](#authentication)

## Base URL

### `getBaseUrl()`
Returns the base URL for all API calls.

```javascript
// Usage
const baseUrl = getBaseUrl(); // Returns 'https://webshop-2025-be-g8.vercel.app/'
```

## Products

### `fetchProducts(endpoint = "api/products")`
Gets products from the API.

- **Input**: Optional endpoint (default: "api/products")
- **Output**: Product data or empty array if error

```javascript
// Usage
const products = await fetchProducts();
```

### `addProduct(productData)`
Adds a new product.

- **Input**: Object with product information
- **Output**: The created product or null if error

```javascript
// Usage
const newProduct = {
  name: "Product Name",
  price: 299,
  description: "Product description"
};

const result = await addProduct(newProduct);
```

### `deleteProduct(productId)`
Deletes a product.

- **Input**: Product ID
- **Output**: true if successful, false if error

```javascript
// Usage
const success = await deleteProduct("product-123");
```

### `updateProduct(productId, productData)`
Updates a product.

- **Input**: 
  - Product ID
  - Object with fields to update
- **Output**: Updated product or null if error

```javascript
// Usage
const updatedData = {
  price: 349,
  description: "Updated description"
};

const updatedProduct = await updateProduct("product-123", updatedData);
```

## Users

### `signIn(userData)`
Logs in a user and saves token in localStorage.

- **Input**: Object with login credentials (email/username and password)
- **Output**: true if login successful, false otherwise

```javascript
// Usage
const loginData = {
  email: "user@example.com",
  password: "password123"
};

const success = await signIn(loginData);
if (success) {
  // User is logged in
}
```

### `addCustomer(customerData)`
Registers a new customer.

- **Input**: Object with customer information
- **Output**: The new customer or null if error

```javascript
// Usage
const newCustomer = {
  name: "John Smith",
  email: "john@example.com",
  password: "password123"
};

const result = await addCustomer(newCustomer);
```

### `getUserProfile()`
Gets the logged in user's profile.

- **Output**: User profile data
- Throws error if request fails or no token found

```javascript
// Usage
try {
  const userProfile = await getUserProfile();
  // Use profile information
} catch (error) {
  // Handle error
}
```

### `updateUserInfo(userData)`
Updates the logged in user's profile.

- **Input**: Object with fields to update
- **Output**: Updated user information
- Throws error if request fails or no token found

```javascript
// Usage
try {
  const updatedData = {
    name: "New Name",
    email: "new.email@example.com"
  };
  
  const updatedProfile = await updateUserInfo(updatedData);
  // Use updated profile
} catch (error) {
  // Handle error
}
```

## Shopping Cart

The shopping cart functionality uses localStorage to save cart items between sessions.

### Cart Storage
- Cart items are stored in localStorage using the key `'cart'`
- Format is a JSON array of product objects with quantities

```javascript
// Example structure of cart in localStorage
const cart = [
  {
    id: "product-123",
    name: "Product Name",
    price: 299,
    quantity: 2
  },
  {
    id: "product-456",
    name: "Another Product",
    price: 199,
    quantity: 1
  }
];

// Save cart to localStorage
localStorage.setItem('cart', JSON.stringify(cart));

// Retrieve cart from localStorage
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
```

### Cart Management
To manage the cart, you can:
- Add items to cart: Add to the array and save to localStorage
- Update quantities: Modify quantity and save to localStorage 
- Remove items: Filter out the item and save to localStorage
- Clear cart: Set empty array to localStorage

This allows the cart to persist even when users close the browser or navigate away from the site.

## Authentication

### Token Storage
- Authentication tokens are stored in localStorage using the key `'token'`
- The token is automatically saved after successful login with `signIn()`
- The token is used for protected API calls like profile management

```javascript
// Token is saved during signIn function
localStorage.setItem('token', token);

// Retrieve token
const token = localStorage.getItem('token');

// Check if user is logged in
const isLoggedIn = !!localStorage.getItem('token');

// Log user out
localStorage.removeItem('token');
```

The functions `getUserProfile()` and `updateUserInfo()` automatically use the stored token for authentication.