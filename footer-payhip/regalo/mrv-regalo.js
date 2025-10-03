// MRV Regalo Popup
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ MRV Regalo JS caricato e DOM pronto");

  const popupHTML = `
  <div id="mrv-popup" class="mrv-popup">
    <div class="mrv-popup-content">
      <button class="mrv-close" aria-label="Chiudi popup">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" 
            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      
      <div class="mrv-popup-grid">
        <div class="mrv-popup-text" id="mrv-popup-body">
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
      </div>
    </div>
  </div>
  `;

  // Inietta il popup nel body
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const popup = document.getElementById("mrv-popup");
  const form = document.getElementById("mrv-form");
  const message = document.getElementById("mrv-message");
  const popupBody = document.getElementById("mrv-popup-body");

  // Mostra popup dopo 3 secondi
  setTimeout(() => {
    popup.classList.add("active");
  }, 6000);

  // Chiudi popup se cliccano fuori dal contenuto
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("mrv-close")) {
      popup.classList.remove("active");
    }
    if (e.target.id === "mrv-popup") {
      popup.classList.remove("active");
    }
 });


  // Funzione helper: messaggi di errore più carini
  function formatError(err) {
    if (err.includes("MEMBER_EXISTS_WITH_EMAIL_ADDRESS")) {
      return "⚠️ Sei già iscritto con questa email! Controlla la tua posta (anche in Spam/Promozioni).";
    }
    if (err.includes("API_KEY_INVALID")) {
      return "❌ Errore tecnico, contatta l’amministratore.";
    }
    return "❌ Si è verificato un errore. Riprova più tardi.";
  }

  // Submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.style.color = "#555";
    message.textContent = "⏳ Invio in corso...";

    const name = document.getElementById("mrv-name").value;
    const email = document.getElementById("mrv-email").value;
    const consent = document.getElementById("mrv-consent").checked;

    if (!consent) {
      message.style.color = "red";
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
        // Messaggio di successo con stile MRV
        popupBody.innerHTML = `
          <h2 style="color:#1697c7; font-family:Quicksand, sans-serif;">🎉 Congratulazioni!</h2>
          <p style="font-size:1.1em; color:#0b1220;">
            Il tuo regalo è stato inviato alla tua email. <br>
            Controlla anche la cartella <strong>Promozioni</strong> o <strong>Spam</strong>.
          </p>
          <p style="margin-top:1em; font-size:0.9em; color:#28a745;">
            Grazie per aver scelto <strong>MyRealVet</strong> 🐾
          </p>
        `;
      } else {
        message.style.color = "red";
        message.textContent = formatError(result.message || "");
      }
    } catch (err) {
      console.error("Errore API:", err);
      message.style.color = "red";
      message.textContent = "❌ Problema di connessione, riprova.";
    }
  });
});
