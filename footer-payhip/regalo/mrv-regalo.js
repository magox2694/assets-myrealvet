// MRV Regalo Popup
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ MRV Regalo JS caricato e DOM pronto");

  const popupHTML = `
  <div id="mrv-popup" class="mrv-popup">
    <div class="mrv-popup-content">
      <button class="mrv-close">&times;</button>
      
      <div class="mrv-popup-grid">
        <div class="mrv-popup-text">
          <h2>🎁 2 eBook GRATIS</h2>
          <p>Proteggi il tuo cane e il tuo gatto scoprendo subito le sostanze tossiche più comuni.</p>
          <p class="trust">✔ Già oltre <strong>2.000 download</strong></p>

          <form id="mrv-form">
            <input type="text" id="mrv-name" placeholder="Il tuo nome" required>
            <input type="email" id="mrv-email" placeholder="La tua email" required>
            <label>
              <input type="checkbox" id="mrv-consent" required> Acconsento a ricevere email con offerte e sconti
            </label>
            <button type="submit">📘 Scarica subito GRATIS</button>
          </form>
          <p id="mrv-message" style="margin-top:10px;font-size:0.9em;"></p>
        </div>

        <div class="mrv-popup-img">
          <img src="https://placekitten.com/250/250" alt="eBook gratuiti">
        </div>
      </div>
    </div>
  </div>
  `;

  // Inietta il popup nel body
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const popup = document.getElementById("mrv-popup");
  const form = document.getElementById("mrv-form");
  const message = document.getElementById("mrv-message");

  // Mostra popup dopo 3 secondi
  setTimeout(() => {
    popup.classList.add("active");
  }, 3000);

  // Chiudi popup
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("mrv-close")) {
      popup.classList.remove("active");
    }
  });

  // Submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.textContent = "⏳ Invio in corso...";

    const name = document.getElementById("mrv-name").value;
    const email = document.getElementById("mrv-email").value;
    const consent = document.getElementById("mrv-consent").checked;

    if (!consent) {
      message.textContent = "⚠ Devi accettare per continuare.";
      return;
    }

    try {
      const response = await fetch("https://myrealvet.it/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });

      const result = await response.json();
      if (result.success) {
        message.style.color = "green";
        message.textContent = "🎉 Iscrizione completata! Controlla la tua email.";
      } else {
        message.style.color = "red";
        message.textContent = "❌ Errore: " + (result.message || "riprovare");
      }
    } catch (err) {
      console.error("Errore API:", err);
      message.style.color = "red";
      message.textContent = "❌ Problema di connessione, riprova.";
    }
  });
});
