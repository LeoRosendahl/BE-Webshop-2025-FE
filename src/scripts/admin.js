import {
  addProduct,
  fetchProducts,
  deleteProduct,
  updateProduct,
  fetchCategories,
  addCategory,
  deleteCategory,
  deleteUser
} from "../utils/api.js";
import { closePopup, openPopup } from "../../script.js";
import { isUserAdmin } from "../utils/isUserAdmin.js";

if (!isUserAdmin()) {
  window.location.href = "/pages/index.html";
}

const productsContainer = document.querySelector(".products-container");

const fruitBtn = document.querySelectorAll(".fruit");
const meatBtn = document.querySelectorAll(".meat");
const dairyBtn = document.querySelectorAll(".dairy");
const otherBtn = document.querySelectorAll(".other");
const allbtn = document.querySelectorAll(".all");

let allProducts = [];

const renderProducts = async (productsToRender) => {
  productsContainer.innerHTML = "";

  productsToRender.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.addEventListener("click", () => {
      renderSingleProduct(product);
    });

    const productImage = document.createElement("img");
    productImage.src = product.imageUrl;
    productImage.alt = product.name;
    productImage.classList.add("product-image");

    const priceHeading = document.createElement("h2");
    priceHeading.classList.add("price");
    priceHeading.textContent = `${product.price}:-`;

    const nameCategoryContainer = document.createElement("div");
    nameCategoryContainer.classList.add("name-category-container");

    const productName = document.createElement("h3");
    productName.classList.add("product-name");
    productName.textContent = product.name;

    const productCategory = document.createElement("p");
    productCategory.classList.add("category");
    productCategory.textContent = product.category?.name || 'Okänt kategori';

    const updateButton = document.createElement("button");
    updateButton.textContent = "Ändra";
    updateButton.classList.add("update-button");

    updateButton.addEventListener("click", (event) => {
      openPopup("mainOverlay", ".popup-content.single-product");
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(updateButton);

    const nameButtonContainer = document.createElement("div");
    nameButtonContainer.classList.add("name-button-container");

    nameCategoryContainer.appendChild(productName);
    nameCategoryContainer.appendChild(productCategory);
    nameButtonContainer.appendChild(nameCategoryContainer);
    nameButtonContainer.appendChild(buttonContainer);

    productDiv.appendChild(productImage);
    productDiv.appendChild(priceHeading);
    productDiv.appendChild(nameButtonContainer);

    productsContainer.appendChild(productDiv);
  });
};

const addNewProduct = async () => {
  const productName = document.getElementById("product-name").value.trim();
  const productDesc = document
    .getElementById("product-description")
    .value.trim();
  const productCategory = document.getElementById("category").value;
  const productQuantity = parseInt(
    document.getElementById("product-quantity").value
  );
  const productPrice = parseFloat(
    document.getElementById("product-price").value
  );
  const productImage = document.getElementById("product-img").value.trim();

  if (
    !productName ||
    !productDesc ||
    !productCategory ||
    isNaN(productQuantity) ||
    isNaN(productPrice) ||
    !productImage
  ) {
    alert("Fyll i alla fält korrekt!");
    return;
  }

  const newProduct = {
    name: productName,
    category: productCategory,
    price: productPrice,
    description: productDesc,
    stock: productQuantity,
    imageUrl: productImage,
  };
  await addProduct(newProduct);
  await fetchAndRenderProducts();
  closePopup();
  clearForm();
};

const clearForm = () => {
  document.getElementById("product-name").value = "";
  document.getElementById("product-description").value = "";
  document.getElementById("category").value = "";
  document.getElementById("product-quantity").value = "";
  document.getElementById("product-price").value = "";
  document.getElementById("product-img").value = "";
};

const renderSingleProduct = async (product) => {
  // Hämta DOM-element
  const productName = document.querySelector(".single-product-title");
  const productNameTop = document.querySelector(".title");
  const productPrice = document.querySelector(".single-product-price");
  const productCategory = document.querySelector(".category");
  const productDesc = document.querySelector(".single-product-description");
  const deleteProductPopup = document.querySelector(".single-product-button");
  const updateProductPopup = document.querySelector(".update-product-button");
  const productImage = document.querySelector(".single-product-image");
  const productQuantity = document.querySelector(".single-product-quantity");


  const categoryData = await fetchCategories()
  const categories = categoryData.map((category) => category.name)

  // Rensa bort eventuella redigeringsläget-element
  const existingImageContainer = document.querySelector(
    ".image-edit-container"
  );
  if (existingImageContainer) {
    existingImageContainer.remove();
  }

  const existingSaveButton = document.querySelector(".save-product-button");
  if (existingSaveButton) {
    existingSaveButton.remove();
  }

  // Sätt tillbaka originaltexten (inte inputfält)
  productName.innerHTML = product.name;
  productNameTop.innerHTML = product.name;
  productPrice.innerHTML = `${product.price}:-`;
  productCategory.innerHTML = product.category?.name || 'Okänt kategori';
  productDesc.innerHTML = product.description;
  productQuantity.innerHTML = `Lagersaldo: ${product.stock} st`;
  productImage.src = product.imageUrl;
  productImage.alt = product.name;

  // Rensa eventuella tidigare eventlyssnare genom att klona och ersätta
  const newDeleteBtn = deleteProductPopup.cloneNode(true);
  deleteProductPopup.parentNode.replaceChild(newDeleteBtn, deleteProductPopup);

  const newUpdateBtn = updateProductPopup.cloneNode(true);
  updateProductPopup.parentNode.replaceChild(newUpdateBtn, updateProductPopup);

  // Se till att "Ändra"-knappen alltid är synlig när en ny produkt renderas
  newUpdateBtn.style.display = "";

  // Uppdatera referenser till de nya elementen
  const updatedDeleteBtn = document.querySelector(".single-product-button");
  const updatedUpdateBtn = document.querySelector(".update-product-button");

  // Lägg till eventlyssnare för delete-knappen
  updatedDeleteBtn.addEventListener("click", async () => {
    await deleteProduct(product._id);
    allProducts = allProducts.filter((p) => p._id !== product._id);
    renderProducts(allProducts);
    closePopup();
  });

  // Lägg till eventlyssnare för update-knappen
  updatedUpdateBtn.addEventListener("click", async () => {
    // Dölj uppdateringsknappen när den klickas
    updatedUpdateBtn.style.display = "none";



    // Skapa en spara-knapp om den inte redan finns
    if (!document.querySelector(".save-product-button")) {
      const saveButton = document.createElement("button");
      saveButton.textContent = "Spara";
      saveButton.classList.add("save-product-button");
      updatedUpdateBtn.parentNode.insertBefore(
        saveButton,
        updatedUpdateBtn.nextSibling
      );

      // Lägg till eventlyssnare för att spara ändringar
      saveButton.addEventListener("click", async () => {
        // Hämta uppdaterade värden från formuläret
        const nameInput = productName.querySelector("input");
        const priceInput = productPrice.querySelector("input");
        const categorySelect = productCategory.querySelector("select");
        const descTextarea = productDesc.querySelector("textarea");
        const imageInput = document.querySelector(
          ".image-edit-container input"
        );
        const quantityInput = productQuantity.querySelector("input");

        if (
          !nameInput ||
          !priceInput ||
          !categorySelect ||
          !descTextarea ||
          !imageInput
        ) {
          console.error("Kan inte hitta input-element för att spara");
          return;
        }

        const updatedProduct = {
          name: nameInput.value.trim(),
          price: parseFloat(priceInput.value),
          category: categorySelect.value,
          description: descTextarea.value.trim(),
          imageUrl: imageInput.value.trim(),
          stock: parseInt(quantityInput.value),
        };

        if (
          !updatedProduct.name ||
          !updatedProduct.description ||
          isNaN(updatedProduct.price) ||
          !updatedProduct.imageUrl ||
          isNaN(updatedProduct.stock)
        ) {
          alert("Fyll i alla fält korrekt!");
          return;
        }

        try {
          await updateProduct(product._id, updatedProduct);
          await fetchAndRenderProducts();

          // Visa uppdateringsknappen igen
          updatedUpdateBtn.style.display = "";

          // Stäng popup-fönstret
          closePopup();
        } catch (error) {
          console.error("Fel vid uppdatering:", error);
          alert("Det gick inte att uppdatera produkten. Försök igen.");
          // Visa uppdateringsknappen igen vid fel
          updatedUpdateBtn.style.display = "";
        }
      });
    }

    // Gör endast huvudproduktnamnet redigerbart
    const nameInput = document.createElement("input");
    nameInput.value = product.name;
    nameInput.classList.add("edit-input");
    productName.innerHTML = "";
    productName.appendChild(nameInput);

    // Gör priset redigerbart (ta bort :- från priset)
    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.value = product.price;
    priceInput.classList.add("edit-input");
    productPrice.innerHTML = "";
    productPrice.appendChild(priceInput);

    const priceLabel = document.createElement("span");
    priceLabel.textContent = ":-";
    productPrice.appendChild(priceLabel);

    // Gör lagersaldot redigerbart
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.value = product.stock;
    quantityInput.classList.add("edit-input");
    productQuantity.innerHTML = "";
    productQuantity.appendChild(quantityInput);
    const quantityLabel = document.createElement("span");
    quantityLabel.textContent = "st";
    productQuantity.appendChild(quantityLabel);

    // Gör kategorin redigerbar
    const categorySelect = document.createElement("select");
    categorySelect.classList.add("edit-input");

    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      if (cat === product.category?.name || "Okänd kategori") option.selected = true;
      categorySelect.appendChild(option);
    });

    productCategory.innerHTML = "";
    productCategory.appendChild(categorySelect);

    // Gör beskrivningen redigerbar
    const descTextarea = document.createElement("textarea");
    descTextarea.value = product.description;
    descTextarea.classList.add("edit-input");
    productDesc.innerHTML = "";
    productDesc.appendChild(descTextarea);

    // Gör bild-URL redigerbar
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-edit-container");
    const imageLabel = document.createElement("label");
    imageLabel.textContent = "Bild URL:";
    const imageInput = document.createElement("input");
    imageInput.value = product.imageUrl;
    imageInput.classList.add("edit-input");

    imageContainer.appendChild(imageLabel);
    imageContainer.appendChild(imageInput);

    // Lägg till bild-redigeringscontainern efter bilden
    productImage.parentNode.insertBefore(
      imageContainer,
      productImage.nextSibling
    );
  });

  const closeBtn = document.querySelector(".close-btn");
  const newCloseBtn = closeBtn.cloneNode(true);
  closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);

  newCloseBtn.addEventListener("click", () => {
    const updateBtn = document.querySelector(".update-product-button");
    if (updateBtn) updateBtn.style.display = "";
    closePopup();
  });
};

const productAddButton = document.getElementById("product-add-btn");
if (productAddButton) {
  productAddButton.addEventListener("click", addNewProduct);
}

const fetchAndRenderProducts = async () => {
  allProducts = await fetchProducts();
  console.log(allProducts)
  renderProducts(allProducts);
};

//FILTER OCH SORTERING
let currentCategory = "All";
let currentSortOption = "";
let filteredAndSortedProducts = [];

const sortSelect = document.querySelector(".sort-select");

const setFilter = (category) => {
  currentCategory = category;
  updateProducts();
  closePopup();
};

sortSelect.addEventListener("change", function () {
  currentSortOption = this.value;
  updateProducts();
});

const updateProducts = () => {
  //Filter
  filteredAndSortedProducts =
    currentCategory === "All"
      ? [...allProducts]
      : allProducts.filter((product) => product.category?.name === currentCategory)

  //Sortering
  if (currentSortOption) {
    switch (currentSortOption) {
      case "price-asc":
        filteredAndSortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredAndSortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filteredAndSortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filteredAndSortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }

  renderProducts(filteredAndSortedProducts);
};

fruitBtn.forEach((btn) =>
  btn.addEventListener("click", () => setFilter("Frukt"))
);
meatBtn.forEach((btn) =>
  btn.addEventListener("click", () => setFilter("Kött"))
);
dairyBtn.forEach((btn) =>
  btn.addEventListener("click", () => setFilter("Mejeri"))
);
otherBtn.forEach((btn) =>
  btn.addEventListener("click", () => setFilter("Övrigt"))
);
allbtn.forEach((btn) => btn.addEventListener("click", () => setFilter("All")));

fetchAndRenderProducts();

const navSearchContainer = document.querySelector(".nav-search-container");
const searchField = document.querySelector(".search-mobile");
const searchProducts = document.querySelector(".search-products");

let searchInput = "";

const changeSearchInput = () => {
  searchInput = searchField.value.trim(); // Remove leading/trailing spaces
  renderSearchedProducts();
};

const renderSearchedProducts = () => {
  // Clear previous results
  searchProducts.innerHTML = "";

  if (searchInput === "") {
    return; // Exit if input is empty
  }

  let searchedProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (searchedProducts.length === 0) {
    searchProducts.innerHTML = "<p>Inga produkter matchade din sökning.</p>";
    return;
  }

  searchedProducts.forEach((product) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("search-product-container");

    productContainer.addEventListener("click", () => {
      renderSingleProduct(product);
      openPopup("mainOverlay", ".popup-content.single-product");
      searchProducts.innerHTML = "";
      searchField.value = "";
    });

    // Create and set up the product image
    const productImg = document.createElement("img");
    productImg.className = "search-product-img";
    productImg.src = product.imageUrl;
    productImg.alt = product.name;

    // Create the info container
    const infoContainer = document.createElement("div");
    infoContainer.className = "search-product-info-container";

    // Create and set up the product name
    const productName = document.createElement("h3");
    productName.textContent = product.name;

    // Create and set up the product category
    const productCategory = document.createElement("p");
    productCategory.textContent = product.category.name;

    // Create and set up the price
    const productPrice = document.createElement("h2");
    productPrice.className = "search-price";
    productPrice.textContent = `${product.price}:-`;

    // Append everything
    infoContainer.appendChild(productName);
    infoContainer.appendChild(productCategory);
    productContainer.appendChild(productImg);
    productContainer.appendChild(infoContainer);
    productContainer.appendChild(productPrice);
    searchProducts.appendChild(productContainer);
    navSearchContainer.appendChild(searchProducts);
  });
};

const handleLogOut = () => {
  localStorage.removeItem("token");
  window.location.href = "/pages/index.html";
};
const logoutBtn = document.querySelector(".admin-logout");
logoutBtn.addEventListener("click", handleLogOut);

searchField.addEventListener("input", changeSearchInput);

fetchAndRenderProducts();

// Function to display order history
// Function to display order history
function displayOrderHistory() {
  const orderHistoryContainer = document.querySelector('.order-history');
  if (!orderHistoryContainer) return;

  // Get all orders from localStorage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  if (orders.length === 0) {
    orderHistoryContainer.innerHTML = '<p>Inga beställningar har gjorts ännu.</p>';
    return;
  }

  // Sort orders by date (newest first)
  orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  let orderHistoryHTML = '<div class="orders-list">';

  orders.forEach((order) => {
    // Generate a random 5-digit order number if it doesn't already exist
    if (!order.orderNumber) {
      order.orderNumber = Math.floor(10000 + Math.random() * 90000);
    }

    const orderDate = new Date(order.orderDate).toLocaleString('sv-SE');

    orderHistoryHTML += `
      <div class="order-card">
        <div class="order-header">
          <h3>Order #${order.orderNumber}</h3>
          <span class="order-date">${orderDate}</span>
        </div>
        <div class="customer-info">
          <p><strong>Kund:</strong> ${order.customerInfo.name} ${order.customerInfo.surname}</p>
          <p><strong>E-post:</strong> ${order.customerInfo.email}</p>
          <p><strong>Adress:</strong> ${order.customerInfo.address}, ${order.customerInfo.postalCode}</p>
        </div>
        <div class="order-items">
          <h4>Produkter:</h4>
          <ul>
    `;

    order.items.forEach(item => {
      orderHistoryHTML += `
        <li>
          ${item.name} - ${item.quantity} st × ${item.price} kr = ${(item.quantity * item.price).toFixed(2)} kr
        </li>
      `;
    });

    orderHistoryHTML += `
          </ul>
        </div>
        <div class="order-total">
          <p><strong>Totalsumma:</strong> ${order.totalAmount} kr</p>
        </div>
      </div>
    `;
  });

  orderHistoryHTML += '</div>';
  orderHistoryContainer.innerHTML = orderHistoryHTML;

  // Save back to localStorage to persist the order numbers
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Now, let's add a click event listener for the history icon to show the order history popup

const historyIcon = document.querySelector('.history-link i');
if (historyIcon) {
  historyIcon.addEventListener('click', () => {
    // Show the order history popup
    openPopup("mainOverlay", ".popup-content.orderhistory");
    // Load the order history data
    displayOrderHistory();
  });
}

// Also add an event listener to the close button for the order history popup
document.querySelectorAll('.popup-content.orderhistory .close-btn').forEach(btn => {
  btn.addEventListener('click', closePopup);
});


const categoryInput = document.querySelector('.addcategory-container input');
const addCategoryBtn = document.querySelector('.addCategory-btn');


// Get reference to the category dropdown selector
const categorySelect = document.getElementById("category");

// Get reference to the category buttons container
const categoryBtnsContainers = document.querySelectorAll(".category-btns");

const renderCategories = async () => {
  const categoryList = await fetchCategories();
  categoryBtnsContainers.forEach(categoryBtnsContainer => {

    const AllcategoryButton = document.createElement("button");
    categoryBtnsContainer.innerHTML = "";
    categorySelect.innerHTML = ""
    AllcategoryButton.classList.add("category-btn");
    AllcategoryButton.classList.add("Alla");
    AllcategoryButton.textContent = "Alla";
    AllcategoryButton.addEventListener("click", () => setFilter("All"));
    categoryBtnsContainer.appendChild(AllcategoryButton);

    categoryList.forEach((category) => {
      const btnContainer = document.createElement("div");
      btnContainer.classList.add("btn-container");

      const catButton = document.createElement("button");
      catButton.classList.add("category-btn");
      catButton.textContent = category.name;
      catButton.addEventListener('click', () => setFilter(category.name))
      const closeIcon = document.createElement("i");
      closeIcon.classList.add("fa-solid", "fa-xmark", "fa-xl");
      closeIcon.addEventListener('click', async () => {
        await deleteCategory(category._id);
        renderCategories();
        fetchAndRenderProducts();
      })

      btnContainer.appendChild(catButton);
      btnContainer.appendChild(closeIcon);

      categoryBtnsContainer.appendChild(btnContainer);
    });
    categoryList.forEach((category) => {
      const categoryOption = document.createElement("option");
      categoryOption.textContent = category.name;
      categoryOption.value = category.name;
      categorySelect.appendChild(categoryOption);
    });
  });
  const catSelect = document.querySelector('.edit-input')
  if (catSelect) {
    categoryList.forEach((category) => {
      const catOption = document.createElement('option')
      catOption.textContent = category.name
      catOption.value = category.name
      catSelect.appendChild(catOption)
    })
  }

};

renderCategories()

// Function to add a new category
const addNewCategory = async () => {
  const categoryName = categoryInput.value.trim();

  if (!categoryName) {
    alert("Ange ett kategorinamn!");
    return;
  }
  await addCategory(categoryName);
  renderCategories();
  // Clear the input field
  categoryInput.value = "";
};

// Add event listener to the add category button
if (addCategoryBtn) {
  addCategoryBtn.addEventListener("click", addNewCategory);
}

// Also add event listener for Enter key in the input field
if (categoryInput) {
  categoryInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addNewCategory();
    }
  });
}

document.querySelectorAll(".delete-user-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const confirmed = confirm("Är du säker på att du vill radera användaren?");
    if (!confirmed) return;

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const success = await deleteUser(userId);
    if (success) {
      alert("Användare raderades!");
      window.location.reload();
    } else {
      alert("Kunde inte radera användaren.");
    }
  });
});
