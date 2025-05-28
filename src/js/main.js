import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

import Alert from './alert.js';

document.addEventListener('DOMContentLoaded', () => {
  const alertSystem = new Alert();
  alertSystem.showAlerts();
});

loadHeaderFooter().then(() => {
  updateCartCount();
});

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

productList.init();