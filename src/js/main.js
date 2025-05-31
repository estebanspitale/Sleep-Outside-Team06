import { loadHeaderFooter, updateCartCount } from "./utils.mjs";
import Alert from './alert.js';

document.addEventListener('DOMContentLoaded', () => {
  const alertSystem = new Alert();
  alertSystem.showAlerts();
});

loadHeaderFooter().then(() => {
  updateCartCount();
});