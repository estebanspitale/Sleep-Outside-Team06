import { loadHeaderFooter, updateCartCount } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

// Load header and footer
loadHeaderFooter().then(() => {
    // Update cart count after header and footer are loaded
    updateCartCount();
});

const outputSelector = document.querySelector('.checkout');
const key = 'so-cart';
const checkoutProcess = new CheckoutProcess(key, outputSelector);
checkoutProcess.init();

const zipCodeInput = document.getElementById('zip');
if (zipCodeInput) {
    zipCodeInput.addEventListener('blur', () => {
        checkoutProcess.calculateOrderTotals();
    });
}

document.forms['checkoutForm']
.addEventListener('submit', (e) => {
  e.preventDefault();
  // e.target would contain our form in this case
   checkoutProcess.checkout();
});
