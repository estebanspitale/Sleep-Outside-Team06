import ProductData from "./ProductData.mjs";
import { getParam, loadHeaderFooter, updateCartCount } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer
loadHeaderFooter().then(() => {
  updateCartCount();
});

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
