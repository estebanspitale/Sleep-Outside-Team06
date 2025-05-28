export default class Alert {
  constructor(jsonPath = "/json/alerts.json") {
    this.jsonPath = jsonPath;
  }

  async showAlerts() {
    try {
      const response = await fetch(this.jsonPath);
      const alerts = await response.json();

      if (!Array.isArray(alerts) || alerts.length === 0) return;

      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");

      alerts.forEach((alert) => {
        const div = document.createElement("div");
        div.classList.add("alert");
        div.textContent = alert.message;
        div.style.backgroundColor = alert.background;
        div.style.color = alert.color;

        // Botón de cierre
        const closeBtn = document.createElement("button");
        closeBtn.innerHTML = "&times;";
        closeBtn.classList.add("close-btn");
        closeBtn.onclick = () => {
          div.classList.add("closing");
          setTimeout(() => div.remove(), 300);
        };

        div.appendChild(closeBtn);
        alertSection.appendChild(div);
      });

      const main = document.querySelector("main");
      if (main) {
        main.prepend(alertSection);
      } else {
        console.warn("The main element was not found on the page.");
      }
    } catch (error) {
      console.error("Error loading alerts:", error);
    }
  }
}
