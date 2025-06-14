// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}


export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = true) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// render a single template with a list of data
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// this function will load a template from a path and return it as a string
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// this function will take the header and footer partial templates and render them into the html file.
export async function loadHeaderFooter() {
  // load the header and footer templates
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  // load the header and footer data
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");
  // render the header and footer templates
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  // Soma todas as quantidades dos itens
  const totalQty = cartItems.reduce((sum, item) => sum + (Number(item.Quantity) || 1), 0);
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) {
    return; // Exit early if the cart-count element is not found
  }
  if (totalQty > 0) {
    cartCount.textContent = totalQty;
    cartCount.classList.add("cart-count");
  } else {
    cartCount.textContent = "";
    cartCount.classList.remove("cart-count");
  }
}

export function alertMessage(messages, type = 'danger', scroll = true) {
  // Remove existing alerts
  removeAllAlerts();

  const alert = document.createElement("div");
  alert.classList.add("alert", type);
    
  // Set the contents with message and close button
  alert.innerHTML = `
      <div class="alert-message">${messages}</div>
      <button class="alert-close">&times;</button>
  `;

  // Add click handler to remove alert when close button is clicked
  alert.addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON' || e.target.innerText === '×') {
          this.remove();
      }
  });

  // Add the alert to the top of main
  const main = document.querySelector('main');
  if (main) {
      main.prepend(alert);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
          alert.remove();
      }, 5000);

      // Scroll to top if requested
      if (scroll) {
          window.scrollTo(0, 0);
      }
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
