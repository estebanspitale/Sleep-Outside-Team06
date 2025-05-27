import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
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

export default class ShoppingCart {
  constructor() {
    this.cartItems = [];
    this.cartFooter = null;
    this.cartTotalElement = null;
    this.clearCartBtn = null;
  }

  async init() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.cartFooter = qs(".cart-footer");
    this.cartTotalElement = qs(".cart-total");
    this.clearCartBtn = document.getElementById("clearCartBtn");

    if (this.clearCartBtn) {
      this.clearCartBtn.addEventListener("click", () => {
        this.clearCart();
      });
    }

    // Render the cart contents
    this.renderCartContents();
  }

  renderCartContents() {
    const productList = document.querySelector(".product-list");

    if (!productList) return;

    // Si el carrito está vacío
    if (this.cartItems.length === 0) {
      productList.innerHTML = '<p>Tu carrito está vacío.</p>';
      this.cartFooter?.classList.add("hide");
      if (this.clearCartBtn) this.clearCartBtn.style.display = "none";
      return;
    }

    // Si hay productos
    const htmlItems = this.cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");

    // Botón de eliminar producto
    document.querySelectorAll(".remove-item").forEach((span) => {
      span.addEventListener("click", () => {
        const id = span.dataset.id;
        this.removeProductFromCart(id);
      });
    });

    // Mostrar total y footer
    this.cartFooter?.classList.remove("hide");

    const total = this.cartItems.reduce((sum, item) => {
      const price = Number(item.FinalPrice) || 0;
      const qty = Number(item.Quantity) || 0;
      return sum + price * qty;
    }, 0);

    if (this.cartTotalElement) {
      this.cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  }

  clearCart() {
    localStorage.removeItem("so-cart");
    this.cartItems = [];
    this.renderCartContents();
  }

  removeProductFromCart(productId) {
    const updatedCart = this.cartItems.filter((item) => item.Id !== productId);
    setLocalStorage("so-cart", updatedCart);
    this.cartItems = updatedCart;
    this.renderCartContents();
  }
}
