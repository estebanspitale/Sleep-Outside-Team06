import { getParam, loadHeaderFooter, updateCartCount } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

// Load header and footer
loadHeaderFooter().then(() => {
  updateCartCount();
});

const dataSource = new ExternalServices();
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
