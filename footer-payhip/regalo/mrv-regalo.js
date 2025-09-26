document.addEventListener("DOMContentLoaded", function(){
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
            <input type="text" name="firstName" placeholder="Il tuo nome" required>
            <input type="email" name="email" placeholder="La tua email" required>
            <label>
              <input type="checkbox" required> Acconsento a ricevere email con offerte e sconti
            </label>
            <button type="submit">📘 Scarica subito GRATIS</button>
          </form>

          <div id="mrv-message" style="margin-top:1em; font-size:1rem;"></div>
        </div>

        <div class="mrv-popup-img">
          <img src="https://cdn.jsdelivr.net/gh/magox2694/assets-myrealvet/img/payhip/pg-alimentazione-cane/test-img.png" alt="eBook gratuiti">
        </div>
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  // Apri popup dopo 5 secondi
  setTimeout(() => { document.getElementById("mrv-popup").classList.add("active"); }, 5000);

  // Chiudi popup
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("mrv-close")) {
      document.getElementById("mrv-popup").classList.remove("active");
    }
  });

  // ---- INVIO DATI API EmailOctopus ----
  document.getElementById("mrv-form").addEventListener("submit", async function(e){
    e.preventDefault(); 

    const name = this.firstName.value;
    const email = this.email.value;
    const msgBox = document.getElementById("mrv-message");

    msgBox.textContent = "⏳ Invio in corso...";
    msgBox.style.color = "#555";

    try {
      const res = await fetch("https://emailoctopus.com/api/1.6/lists/ea5e537e-36f8-11f0-bee9-ef72d018156b/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          api_key: "eo_9d9435f8a573739cee7f245310eea71d4ff4f404abd52d83e78c6d9b66131823",
          email_address: email,
          fields: { FirstName: name },
          tags: ["sostanze tossiche"]
        })
      });

      const data = await res.json();
      console.log("Risposta API:", data); // 🔎 LOG per debug

      if (res.ok) {
        msgBox.textContent = "✅ Iscrizione completata! Controlla la tua email 🎉";
        msgBox.style.color = "green";
      } else {
        msgBox.textContent = `⚠️ Errore: ${data.error?.message || "Impossibile completare l'iscrizione"}`;
        msgBox.style.color = "red";
      }
    } catch(err) {
      console.error("Errore di rete:", err);
      msgBox.textContent = "❌ Errore di connessione. Riprova.";
      msgBox.style.color = "red";
    }
  });
});
