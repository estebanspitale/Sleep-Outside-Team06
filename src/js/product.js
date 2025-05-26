import ProductData from "./ProductData.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Load header and footer
loadHeaderFooter();

const dataSource = new ProductData("tent");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
