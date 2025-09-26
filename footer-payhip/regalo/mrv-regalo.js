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

          <!-- Form personalizzato collegato a EmailOctopus -->
          <form id="mrv-form">
            <input type="text" id="mrv-name" name="field_0" placeholder="Il tuo nome" required>
            <input type="email" id="mrv-email" name="field_1" placeholder="La tua email" required>
            <label>
              <input type="checkbox" id="mrv-consent" required> Acconsento a ricevere email con offerte e sconti
            </label>
            <button type="submit">📘 Scarica subito GRATIS</button>
          </form>
          <!-- Fine Form -->
        </div>

        <div class="mrv-popup-img">
          <img src="https://cdn.jsdelivr.net/gh/magox2694/assets-myrealvet/img/payhip/pg-alimentazione-cane/recap.png" alt="eBook gratuiti">
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

  // Invio dati a EmailOctopus + redirect al regalo
  document.addEventListener("submit", function(e){
    if(e.target && e.target.id === "mrv-form"){
      e.preventDefault();

      const name = document.getElementById("mrv-name").value;
      const email = document.getElementById("mrv-email").value;

      fetch("https://eocampaign1.com/form/ca568b10-4c78-11f0-a826-4362ab4bc29a", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          field_0: name,
          field_1: email
        })
      })
      .then(() => {
        // Redirect al regalo
        window.location.href = "https://angelica-spaccini.myrealvet.it/sostanze-tossiche-per-il-cane-e-gatto";
      })
      .catch(() => {
        alert("❌ Errore di connessione. Riprova.");
      });
    }
  });
});
