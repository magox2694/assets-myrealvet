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

          <form action="https://angelica-spaccini.myrealvet.it" method="get">
            <input type="text" placeholder="Il tuo nome" required>
            <input type="email" placeholder="La tua email" required>
            <label>
              <input type="checkbox" required> Acconsento a ricevere email con offerte e sconti
            </label>
            <button type="submit">📘 Scarica subito GRATIS</button>
          </form>
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
});
