// MRV PopUp Regalo
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ MRV Regalo JS caricato e DOM pronto");

  // Inietto HTML del popup
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
            <input type="text" name="name" placeholder="Il tuo nome" required>
            <input type="email" name="email" placeholder="La tua email" required>
            <label>
              <input type="checkbox" required> Acconsento a ricevere email con offerte e sconti
            </label>
            <button type="submit">📘 Scarica subito GRATIS</button>
          </form>
          <div id="mrv-message" style="margin-top:10px;font-weight:600;"></div>
        </div>

        <div class="mrv-popup-img">
          <img src="https://placekitten.com/250/250" alt="eBook gratuiti">
        </div>
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  // Mostra popup dopo 5 secondi
  setTimeout(() => {
    document.getElementById("mrv-popup").classList.add("active");
  }, 5000);

  // Chiudi popup al click sulla X
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("mrv-close")) {
      document.getElementById("mrv-popup").classList.remove("active");
    }
  });

  // ---- 🎯 GESTIONE FORM ----
  const form = document.getElementById("mrv-form");
  const messageBox = document.getElementById("mrv-message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // blocco SUBITO il redirect
    console.log("🚀 Invio intercettato, niente redirect");

    const nome = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    console.log("📧 Nome:", nome, "Email:", email);

    // Chiamata API EmailOctopus
    try {
      const res = await fetch("https://emailoctopus.com/api/1.6/lists/TUA_LIST_ID/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: "LA_TUA_API_KEY",
          email_address: email,
          fields: { FirstName: nome },
          tags: ["sostanze tossiche"]
        }),
      });

      const data = await res.json();
      console.log("📩 Risposta EO:", data);

      if (res.ok) {
        messageBox.innerHTML = "✅ Iscrizione avvenuta con successo!";
        messageBox.style.color = "green";
      } else {
        messageBox.innerHTML = "⚠️ Errore: " + (data.error?.message || "riprovare");
        messageBox.style.color = "red";
      }
    } catch (err) {
      console.error("❌ Errore API:", err);
      messageBox.innerHTML = "❌ Problema di connessione, riprova.";
      messageBox.style.color = "red";
    }
  });
});
