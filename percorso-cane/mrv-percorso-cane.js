// === MRV Percorso Cane – Gestione Unificata ===
// Compatibile con Flask /subscribe/<slug> – MyRealVet.it
// Versione 2025-10-10

document.addEventListener("DOMContentLoaded", () => {
  console.log("🐶 MRV Percorso Cane – JS unificato attivo");

  // --- Effetto flip card ---
  document.querySelectorAll(".mrv-flip-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest("form")) {
        card.classList.toggle("active");
      }
    });
  });

  // --- Gestione invio form e download automatico ---
  document.querySelectorAll(".mrv-form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const card = form.closest(".mrv-flip-card");
      const endpoint = card.dataset.endpoint;
      const downloadURL = card.dataset.download;
      const slug = card.dataset.slug || "(sconosciuto)";
      const msg = form.querySelector(".mrv-msg");

      const name = form.querySelector("input[name='name']").value.trim();
      const email = form.querySelector("input[name='email']").value.trim();

      if (!email || !email.includes("@")) {
        msg.textContent = "Inserisci una email valida.";
        msg.style.color = "#222";
        return;
      }

      msg.textContent = "⏳ Invio in corso...";
      msg.style.color = "#444";

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        });

        const data = await res.json();

        if (data.success) {
          msg.textContent = "🎉 Iscrizione completata! Download in corso...";
          msg.style.color = "#222";
          form.reset();

          console.log(`✅ Iscrizione completata per ${slug}`);

          // 🔽 Download automatico file
          setTimeout(() => {
            if (downloadURL) {
              const link = document.createElement("a");
              link.href = downloadURL;
              link.setAttribute("download", "");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              console.warn(`⚠️ Nessun URL di download per ${slug}`);
            }
          }, 700);
        } else {
          msg.textContent = "⚠️ " + (data.message || "Errore, riprova più tardi.");
          msg.style.color = "#222";
          console.warn(`⚠️ Errore backend (${slug}):`, data.message);
        }
      } catch (err) {
        console.error(`❌ Errore iscrizione ${slug}:`, err);
        msg.textContent = "❌ Errore di connessione. Riprova.";
        msg.style.color = "#222";
      }
    });
  });
});
