import { getLocalStorage, qs } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Handle cart total display
  const cartFooter = qs('.cart-footer');
  const cartTotalElement = qs('.cart-total');
  const clearCartBtn = document.getElementById('clearCartBtn');

  if (cartItems.length > 0) {
    cartFooter.classList.remove('hide');

    const total = cartItems.reduce((sum, item) => {
    const price = Number(item.FinalPrice) || 0;
    const qty = Number(item.Quantity) || 0;
    return sum + price * qty;
  }, 0);

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
} else {
  cartFooter.classList.add("hide");
  clearCartBtn.style.display = 'none';
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
  <p class="cart-card__quantity">qty: ${item.Quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();

/*document.addEventListener('DOMContentLoaded', () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartFooter = document.querySelector('.cart-footer');
  const cartTotalElement = document.querySelector('.cart-total');

  if (cartItems.length > 0) {
    cartFooter.classList.remove('hide');

    // Assuming each item has a `price` and `quantity` property
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Format to 2 decimal places
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add('hide'); // just in case it's showing
  }
});*/


function clearCart() {
  localStorage.removeItem("so-cart");
  // Optionally, refresh the UI after clearing
  renderCartContents();
}
document.getElementById('clearCartBtn').addEventListener('click', clearCart);
