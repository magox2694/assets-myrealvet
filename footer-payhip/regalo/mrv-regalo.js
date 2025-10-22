// =====================================================
// MRV Regalo Popup – Versione controllata da Klaro GDPR
// ©2025 MyRealVet – Dott.ssa Angelica Spaccini
// Gestore tecnico: Mihai Muhulica
// =====================================================

// Evita l'esecuzione automatica: attendi Klaro
if (typeof klaro !== "undefined" && klaro.getManager) {
  const manager = klaro.getManager();
  const hasConsent = manager.getConsent("mrvPopup");
  if (!hasConsent) {
    console.log("🚫 MRV Popup non caricato (manca consenso marketing)");
  } else {
    console.log("🎁 MRV Popup caricato dopo consenso già espresso");
    mrvRegaloInit();
  }
} else {
  console.log("🕓 Klaro non ancora pronto, il popup sarà gestito dal callback GDPR");
}

// =====================================================
// Funzione di inizializzazione (richiamata da Klaro o sopra)
// =====================================================
function mrvRegaloInit() {
  console.log("🎁 MRV Regalo – Avvio dopo consenso Klaro");

  // === HTML del popup ===
  const popupHTML = `
    <div id="mrv-popup" class="mrv-popup" style="display:none;">
      <div class="mrv-popup-content">
        <button class="mrv-close" aria-label="Chiudi popup">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none"
              stroke="#333" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div class="mrv-popup-grid">
          <div class="mrv-popup-text" id="mrv-popup-body">
            <h2>🎁 2 eBook GRATIS</h2>
            <p>Proteggi il tuo cane e il tuo gatto scoprendo subito le sostanze tossiche più comuni.</p>
            <p class="trust">✔ Già oltre <strong>2.000 download</strong></p>

            <form id="mrv-form">
              <input type="text" id="mrv-name" placeholder="Il tuo nome" required />
              <input type="email" id="mrv-email" placeholder="La tua email" required />
              <label>
                <input type="checkbox" id="mrv-consent" required />
                Acconsento a ricevere email con offerte e sconti
              </label>
              <button type="submit">📘 Scarica subito GRATIS</button>
            </form>

            <p id="mrv-message" style="margin-top:10px;font-size:0.9em;"></p>
          </div>
        </div>
      </div>
    </div>
  `;

  // === Inserisci popup nel DOM ===
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const popup = document.getElementById("mrv-popup");
  popup.style.display = "block";

  const form = document.getElementById("mrv-form");
  const message = document.getElementById("mrv-message");
  const popupBody = document.getElementById("mrv-popup-body");
  const closeBtn = document.querySelector(".mrv-close");

  // === Mostra popup dopo 6 secondi ===
  setTimeout(() => popup.classList.add("active"), 6000);

  // === Chiudi popup (X o clic esterno) ===
  closeBtn.addEventListener("click", closePopup);
  popup.addEventListener("click", (e) => {
    if (e.target.id === "mrv-popup") closePopup();
  });

  // === Sticky button ===
  const stickyBtn = document.createElement("button");
  stickyBtn.className = "mrv-sticky-btn";
  stickyBtn.innerHTML = "🎁 Scarica i 2 eBook gratuiti";
  stickyBtn.style.display = "none";
  document.body.appendChild(stickyBtn);

  stickyBtn.addEventListener("click", () => {
    popup.classList.add("active");
    stickyBtn.style.display = "none";
  });

  function closePopup() {
    popup.classList.remove("active");
    stickyBtn.style.display = "block";
  }

  // Mostra sticky button anche se popup non aperto dopo 30s
  setTimeout(() => {
    if (!popup.classList.contains("active")) stickyBtn.style.display = "block";
  }, 30000);

  // === Invio form ===
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    message.style.color = "#555";
    message.textContent = "⏳ Invio in corso...";

    const name = document.getElementById("mrv-name").value.trim();
    const email = document.getElementById("mrv-email").value.trim();
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
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();
      if (result.success) {
        popupBody.innerHTML = `
          <h2 style="color:#1697c7;">🎉 Congratulazioni!</h2>
          <p style="font-size:1.1em; color:#0b1220;">
            Il tuo regalo è stato inviato alla tua email.<br>
            Controlla anche <strong>Promozioni</strong> o <strong>Spam</strong>.
          </p>
          <p style="margin-top:1em; font-size:0.9em; color:#28a745;">
            Grazie per aver scelto <strong>MyRealVet</strong> 🐾
          </p>
        `;
      } else {
        message.style.color = "red";
        message.textContent = "❌ Errore di invio, riprova più tardi.";
      }
    } catch (err) {
      console.error("Errore:", err);
      message.style.color = "red";
      message.textContent = "❌ Problema di connessione, riprova.";
    }
  });

  console.log("✅ MRV Regalo Popup pronto e visibile");
}
