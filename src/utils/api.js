export function getBaseUrl() {
  return 'https://webshop-2025-be-g8.vercel.app/'
}

export async function fetchProducts(endpoint = "api/products") {
  const url = `${getBaseUrl()}${endpoint}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return [];
}

export async function signIn(userData) {
  const url = `${getBaseUrl()}api/auth/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      alert('Fel användarnamn eller lösenord!')
      return false; // Returnera false vid fel
    }

    const data = await response.json();
    const token = data.accessToken;

    if (token) {
      localStorage.setItem('token', token);
      return true; // Returnera true vid framgång
    } else {
      console.warn('No token received');
      return false; // Returnera false om inget token
    }
  } catch (error) {
    alert('Fel användarnamn eller lösenord!')
    console.error('Error during login:', error);
    return false; // Returnera false vid error
  }
}

export async function addProduct(productData) {
  const url = `${getBaseUrl()}api/products`; // Backend API endpoint

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add product: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
}

//function to add customer to database
export async function addCustomer(customerData) {
  const url = `${getBaseUrl()}api/auth/register`; // Backend API endpoint

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add new customer: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding new customer:", error);
    return null;
  }
}



export async function deleteProduct(productId) {
  const url = `${getBaseUrl()}api/products/${productId}`; // Construct API endpoint

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.statusText}`);
    }

    console.log("Product deleted successfully!");
    return true; // Return success
  } catch (error) {
    console.error("Error deleting product:", error);
    return false; // Return failure
  }
}

export async function updateProduct(productId, productData) {
  const url = `${getBaseUrl()}api/products/${productId}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.statusText}`);
    }

    console.log("Product updated successfully!");
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
}

export async function getUserProfile() {
  const token = localStorage.getItem('token');
  const url = `${getBaseUrl()}api/minasidor`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export const updateUserInfo = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const url = `${getBaseUrl()}api/minasidor`;

    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update user information');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    throw error;
  }
};

export async function fetchCategories() {
  const url = `${getBaseUrl()}api/categories`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function addCategory(categoryName) {
  const url = `${getBaseUrl()}api/categories`; // Backend API endpoint
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify({ name: categoryName }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add new category: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding new category:", error);
    return null;
  }
}

export async function deleteCategory(categoryId) {
  const url = `${getBaseUrl()}api/categories/${categoryId}`; // Construct API endpoint

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete category: ${response.statusText}`);
    }

    console.log("category deleted successfully!");
    return true; // Return success
  } catch (error) {
    console.error("Error deleting category:", error);
    return false; // Return failure
  }
}

export async function deleteUser(userId) {
  const token = localStorage.getItem('token');
  const url = `${getBaseUrl()}api/minasidor${userId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

