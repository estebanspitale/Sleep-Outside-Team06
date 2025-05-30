import { getLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateAndDisplaySubtotal();
    }

    // This method iterates through the list of items, calculates the total price for each item
    calculateAndDisplaySubtotal() {
        this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice * item.Quantity, 0);
        const subtotalElement = document.getElementById('order-subtotal');
        if (subtotalElement) subtotalElement.innerHTML = `$${this.itemTotal.toFixed(2)}`;
    }

    // Calculates the tax, shipping, and total order amount
    // and updates the respective HTML elements
    calculateOrderTotals() {
        // Tax of 6% on the item total
        this.tax = this.itemTotal * 0.06;

        // Freight cost is $10 for the first item, and $2 for each additional item
        // If there are no items, shipping is $0
        const totalItems = this.list.reduce((sum, item) => sum + item.Quantity, 0);
        this.shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;

        // Total order amount is the sum of item total, tax, and shipping
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        // Display the calculated totals in the HTML
        this.displayOrderTotals();
    }

    // Update the HTML elements with the calculated values
    displayOrderTotals() {
        const taxElement = document.getElementById('order-tax');
        if (taxElement) taxElement.innerHTML = `$${this.tax.toFixed(2)}`;

        const shippingElement = document.getElementById('order-shipping');
        if (shippingElement) shippingElement.innerHTML = `$${this.shipping.toFixed(2)}`;

        const totalElement = document.getElementById('order-total');
        if (totalElement) totalElement.innerHTML = `<strong>$${this.orderTotal.toFixed(2)}</strong>`;
    }
}