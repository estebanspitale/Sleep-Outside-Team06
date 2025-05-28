import { getLocalStorage, setLocalStorage, qs, updateCartCount } from "./utils.mjs";

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
  <p class="cart-card__quantity">
    qty: 
    <input type="number" min="1" value="${item.Quantity}" class="quantity-input" data-id="${item.Id}" style="width:35px; readonly">
    <span class="remove-item" data-id="${item.Id}">X</span></p>
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

    /*async init() {
        this.cartItems = getLocalStorage("so-cart") || [];
        this.cartFooter = qs(".cart-footer");
        this.cartTotalElement = qs(".cart-total");
        this.clearCartBtn = document.getElementById("clearCartBtn");
        this.clearCartBtn.addEventListener("click", () => {
            this.clearCart();
        });
        // Render the cart contents
        this.renderCartContents();
    }
    
    renderCartContents() {
        const htmlItems = this.cartItems.map((item) => cartItemTemplate(item));
        const productList = document.querySelector(".product-list");
        productList.innerHTML = htmlItems.join("");
    
        // Add event listeners to remove cart items
        document.querySelectorAll('.remove-item').forEach(span => {
          span.addEventListener('click', () => {
              const id = span.dataset.id;
              this.removeProductFromCart(id);
          });
        });

        // Add event listeners to update quantity
        document.querySelectorAll('.quantity-input').forEach(input => {
          input.addEventListener('change', (event) => {
            const id = input.dataset.id;
            let newQty = parseInt(input.value);
            if (isNaN(newQty) || newQty < 1) {
              newQty = 1;
              input.value = 1;
            }
            this.updateProductQuantity(id, newQty);
          });
          // Prevent default behavior of input by disabling keydown events
          // This is to prevent users from typing in the input field
          input.addEventListener('keydown', (e) => {
            e.preventDefault();
          });
        });
    
        // Handle cart total display
        if (this.cartItems.length > 0) {
          this.cartFooter.classList.remove("hide");
      
          const total = this.cartItems.reduce((sum, item) => {
              const price = Number(item.FinalPrice) || 0;
              const qty = Number(item.Quantity) || 0;
              return sum + price * qty;
          }, 0);
      
          this.cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        } else {
          this.cartFooter.classList.add("hide");
          this.clearCartBtn.style.display = "none";
        }
        
    }*/

    clearCart() {
        localStorage.removeItem("so-cart");
        // Update the cart count in the header
        updateCartCount();
        this.cartItems = [];
        // Optionally, refresh the UI after clearing
        this.renderCartContents();
    }
    
    // Function to remove a product from the cart
    removeProductFromCart(productId) {
        // const cartItems = getLocalStorage("so-cart") || [];
        const updatedCart = this.cartItems.filter(item => item.Id !== productId);
        setLocalStorage("so-cart", updatedCart);
        // Update the cart count in the header
        updateCartCount();
        this.cartItems = updatedCart;
        // Optionally, refresh the UI after removing the product
        this.renderCartContents();
    }

    // Function to update the quantity of a product in the cart
    updateProductQuantity(productId, newQty) {
        const updatedCart = this.cartItems.map(item => {
            if (item.Id === productId) {
                return { ...item, Quantity: newQty };
            }
            return item;
        });
        setLocalStorage("so-cart", updatedCart);
        // Update the cart count in the header
        updateCartCount(); 
         // Update the cartItems property with the new cart
         // This ensures that the cart state is consistent
        this.cartItems = updatedCart;
        // Optionally, refresh the UI after updating the quantity
        this.renderCartContents();
    }
}