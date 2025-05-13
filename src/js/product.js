import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // get the cart from local storage
  const items = getLocalStorage("so-cart") || [];
  // check if the product is already in the cart
  const existingProduct = items.find((item) => item.Id === product.Id);
  // if the product is already in the cart, update the quantity
  if (existingProduct) {
    existingProduct.Quantity += 1;
  } else {
    // if the product is not in the cart, add it
    product.Quantity = 1;
    // set the product to be a cart item
    items.push(product);
  }
  setLocalStorage("so-cart", items);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
