// === MRV Percorso Cane – Gestione Form Iscrizione ===
// Versione base 2025-10
document.addEventListener("DOMContentLoaded", () => {
  console.log("🐶 MRV Percorso Cane JS attivo");

  // Gestione flip card
  document.querySelectorAll(".mrv-flip-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // evita che il click sul form ri-giri la card
      if (!e.target.closest("form")) {
        card.classList.toggle("active");
      }
    });
  });

  // Gestione invio form
  document.querySelectorAll(".mrv-form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const card = form.closest(".mrv-flip-card");
      const endpoint = card.dataset.endpoint;
      const msg = form.querySelector(".mrv-msg");
      const name = form.querySelector("input[name='name']").value.trim();
      const email = form.querySelector("input[name='email']").value.trim();

      if (!email) {
        msg.textContent = "Inserisci una email valida.";
        msg.style.color = "#ffdddd";
        return;
      }

      msg.textContent = "⏳ Invio in corso...";
      msg.style.color = "#fff";

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });

        const data = await res.json();
        if (data.success) {
          msg.textContent = "🎉 Iscrizione completata! Controlla la tua email.";
          msg.style.color = "#c8ffcf";
          form.reset();
        } else {
          msg.textContent = "⚠️ Errore: " + (data.message || "riprovare più tardi.");
          msg.style.color = "#ffdddd";
        }
      } catch (err) {
        console.error("Errore iscrizione:", err);
        msg.textContent = "❌ Errore di connessione. Riprova.";
        msg.style.color = "#ffdddd";
      }
    });
  });
});
