// Inietta HTML popup nel body e gestisce iscrizione EmailOctopus
document.addEventListener("DOMContentLoaded", function () {
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
              <input type="checkbox" required> Acconsento a ricevere email con offerte e sconti
            </label>
            <button type="submit">📘 Scarica subito GRATIS</button>
          </form>
        </div>

        <div class="mrv-popup-img">
          <img src="https://via.placeholder.com/250x350.png?text=Ebook+Gratis" alt="eBook gratuiti">
        </div>
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  // Apri popup dopo 5 secondi
  setTimeout(() => {
    document.getElementById("mrv-popup").classList.add("active");
  }, 5000);

  // Chiudi popup
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("mrv-close")) {
      document.getElementById("mrv-popup").classList.remove("active");
    }
  });

  // Invio dati a EmailOctopus
  document.getElementById("mrv-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("mrv-name").value.trim();
    const email = document.getElementById("mrv-email").value.trim();

    const API_KEY = "eo_9d9435f8a573739cee7f245310eea71d4ff4f404abd52d83e78c6d9b66131823";
    const LIST_ID = "ea5e537e-36f8-11f0-bee9-ef72d018156b";

    try {
      const response = await fetch(`https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: API_KEY,
          email_address: email,
          fields: { FirstName: name },
          tags: ["tag sostanze tossiche"], // 👈 il tag richiesto
          status: "SUBSCRIBED"
        })
      });

      if (response.ok) {
        alert("🎉 Iscrizione completata! Controlla la tua email per scaricare i tuoi eBook.");
        document.getElementById("mrv-form").reset();
      } else {
        const error = await response.json();
        alert("Errore: " + (error.error?.message || "Impossibile completare l’iscrizione."));
      }
    } catch (err) {
      alert("Errore di connessione: " + err.message);
    }
  });
});
