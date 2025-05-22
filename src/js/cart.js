import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Load header and footer
loadHeaderFooter();

// Declare the cart variable
// This will be used to manage the shopping cart
const cart = new ShoppingCart();

// Initialize the shopping cart
cart.init();


/*function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const productList = document.querySelector(".product-list");
  productList.innerHTML = htmlItems.join("");

  // Add event listeners to remove cart items
  // This will add a click event listener to each remove-item span
  document.querySelectorAll('.remove-item').forEach(span => {
    span.addEventListener('click', function() {
      const id = this.dataset.id;
      removeProductFromCart(id);
    });
  });

  // Handle cart total display
  const cartFooter = qs(".cart-footer");
  const cartTotalElement = qs(".cart-total");
  const clearCartBtn = document.getElementById("clearCartBtn");

  if (cartItems.length > 0) {
    cartFooter.classList.remove("hide");

    const total = cartItems.reduce((sum, item) => {
      const price = Number(item.FinalPrice) || 0;
      const qty = Number(item.Quantity) || 0;
      return sum + price * qty;
    }, 0);

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add("hide");
    clearCartBtn.style.display = "none";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.Quantity} <span class="remove-item" data-id="${item.Id}">X</span></p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

function clearCart() {
  localStorage.removeItem("so-cart");
  // Optionally, refresh the UI after clearing
  renderCartContents();
}
document.getElementById("clearCartBtn").addEventListener("click", clearCart);

// Function to remove a product from the cart
function removeProductFromCart(productId) {
  const cartItems = getLocalStorage("so-cart") || [];
  const updatedCart = cartItems.filter(item => item.Id !== productId);
  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
}*/
