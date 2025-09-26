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
        </div>

        <div class="mrv-popup-img">
          <img src="https://via.placeholder.com/250" alt="eBook gratuiti">
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
    e.preventDefault(); // 🔴 blocca il redirect

    const name = this.firstName.value;
    const email = this.email.value;

    try {
      const res = await fetch("https://emailoctopus.com/api/1.6/lists/TUA_LIST_ID/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          api_key: "TUA_API_KEY",
          email_address: email,
          fields: { FirstName: name },
          tags: ["sostanze tossiche"]
        })
      });

      if (res.ok) {
        window.location.href = "https://angelica-spaccini.myrealvet.it/sostanze-tossiche-per-il-cane-e-gatto";
      } else {
        alert("Errore nell'iscrizione, riprova.");
      }
    } catch(err) {
      console.error(err);
      alert("Errore di connessione.");
    }
  });
});
