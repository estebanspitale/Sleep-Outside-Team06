import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, updateCartCount } from "./utils.mjs";

loadHeaderFooter().then(() => {
  updateCartCount();
});

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();