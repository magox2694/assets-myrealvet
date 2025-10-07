// @ts-nocheck
// MRV Corso Alimentazione – Popup regalo

document.addEventListener("DOMContentLoaded", function () {
  console.log("🎁 MRV Corso Alimentazione JS attivo");

  const popupHTML = `
    <div id="mrv-popup-alimentazione" class="mrv-popup-alimentazione">
      <div class="mrv-popup-content-alimentazione">
        <button class="mrv-close-alimentazione" aria-label="Chiudi popup">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
              viewBox="0 0 24 24" fill="none" 
              stroke="#333" stroke-width="2.5" 
              stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div class="mrv-popup-grid-alimentazione">
          <div class="mrv-popup-text-alimentazione" id="mrv-popup-body-alimentazione">
            <h2>🎁 Guida gratuita!</h2>
            <p>Scopri subito i <strong>5 errori da evitare nell’alimentazione del tuo cane</strong>.</p>
            <form id="mrv-form-alimentazione">
              <input type="text" id="mrv-name-alimentazione" placeholder="Il tuo nome" required />
              <input type="email" id="mrv-email-alimentazione" placeholder="La tua email" required />
              <button type="submit">📘 Scarica ora gratis</button>
            </form>
            <p id="mrv-message-alimentazione" style="margin-top:10px;font-size:0.9em;"></p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const popup = document.getElementById("mrv-popup-alimentazione");
  const form = document.getElementById("mrv-form-alimentazione");
  const message = document.getElementById("mrv-message-alimentazione");
  const popupBody = document.getElementById("mrv-popup-body-alimentazione");
  const closeBtn = document.querySelector(".mrv-close-alimentazione");

  // Mostra popup dopo 8 secondi
  setTimeout(() => {
    popup.classList.add("active");
  }, 8000);

  closeBtn.addEventListener("click", () => popup.classList.remove("active"));
  popup.addEventListener("click", (e) => {
    if (e.target.id === "mrv-popup-alimentazione") popup.classList.remove("active");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.style.color = "#555";
    message.textContent = "⏳ Invio in corso...";

    const name = document.getElementById("mrv-name-alimentazione").value;
    const email = document.getElementById("mrv-email-alimentazione").value;

    try {
      const response = await fetch("https://myrealvet.it/subscribe-corso-alimentazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });

      const result = await response.json();

      if (result.success) {
        popupBody.innerHTML = `
          <h2 style="color:#1697c7;">🎉 Ecco la tua guida!</h2>
          <p style="font-size:1.1em; color:#0b1220;">
            Il download inizierà tra pochi secondi...<br><br>
            <strong>Controlla anche la tua email</strong> per ricevere altri consigli da Angelica 🐾
          </p>
        `;

        // Avvia download automatico
        setTimeout(() => {
          window.location.href = "https://raw.githubusercontent.com/magox2694/assets-myrealvet/main/footer-payhip/regalo-corso-alimentazione/Guida_5_errori_alimentazione.pdf";
        }, 1500);

      } else {
        message.style.color = "red";
        message.textContent = "⚠️ " + (result.message || "Errore imprevisto");
      }

    } catch (err) {
      console.error("Errore:", err);
      message.style.color = "red";
      message.textContent = "❌ Connessione non riuscita, riprova.";
    }
  });
});
