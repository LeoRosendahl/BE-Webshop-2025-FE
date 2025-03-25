export function getBaseUrl() {
    return 'https://webshop-2025-be-g8.vercel.app/'
}

export async function fetchProducts(endpoint = "api/products") {
  //! DONT USE THIS IN PRODUCTION
  const url = `${getBaseUrl()}${endpoint}`;
  const response = await fetch(url);
  if(response.ok){
    const data = await response.json();
    return data;
  }
  return [];    
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