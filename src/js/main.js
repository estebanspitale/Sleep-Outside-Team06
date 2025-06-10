import { loadHeaderFooter, updateCartCount } from "./utils.mjs";
import Alert from './alert.js';

document.addEventListener('DOMContentLoaded', () => {
  const alertSystem = new Alert();
  alertSystem.showAlerts();
});

loadHeaderFooter().then(() => {
  updateCartCount();
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const message = document.getElementById("newsletter-message");

  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = document.getElementById("newsletter-email");
      const email = emailInput.value.trim();

      if (email) {
        message.textContent = "Thanks for subscribing!";
        message.className = "success"; // Add this class in CSS
        form.reset();
      } else {
        message.textContent = "Please enter a valid email address.";
        message.className = "error"; // Add this class in CSS
      }
    });
  }
});