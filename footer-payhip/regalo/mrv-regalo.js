// Inietta HTML popup nel body
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
            <input type="text" id="mrv-name" placeholder="Il tuo nome" required>
            <input type="email" id="mrv-email" placeholder="La tua email" required>
            <label>
              <input type="checkbox" id="mrv-consent" required> Acconsento a ricevere email con offerte e sconti
            </label>
            <button type="submit">📘 Scarica subito GRATIS</button>
          </form>
        </div>

        <div class="mrv-popup-img">
          <img src="https://placekitten.com/300/200" alt="eBook gratuiti">
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

  // 🔗 Collegamento a EmailOctopus
  document.getElementById("mrv-form").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("mrv-name").value;
    const email = document.getElementById("mrv-email").value;

    fetch("https://eocampaign1.com/form/ca568b10-4c78-11f0-a826-4362ab4bc29a", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        field_0: name,
        field_1: email
      })
    })
    .then(res => {
      if (res.ok) {
        alert("✅ Iscrizione avvenuta con successo!");
        // Redirect alla pagina regalo
        window.location.href = "https://angelica-spaccini.myrealvet.it/sostanze-tossiche-per-il-cane-e-gatto";
      } else {
        alert("❌ Si è verificato un errore, riprova.");
      }
    })
    .catch(err => alert("Errore: " + err));
  });
});
