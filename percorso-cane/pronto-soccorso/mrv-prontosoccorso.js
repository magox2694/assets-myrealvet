// MRV – Pronto Soccorso (versione aggiornata 08/10/2025)
document.addEventListener("DOMContentLoaded", () => {
  console.log("🐾 MRV Pronto Soccorso – JS attivo");

  const form = document.getElementById("mrv-form-prontosoccorso");
  if (!form) {
    console.warn("❌ Form pronto soccorso non trovato");
    return;
  }

  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const submitBtn = form.querySelector("button");
  const successMessage = form.querySelector(".mrv-success-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!email) {
      alert("Inserisci la tua email!");
      emailInput.focus();
      return;
    }
    if (!name) {
      alert("Inserisci il tuo nome!");
      nameInput.focus();
      return;
    }

    // Feedback visivo
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Invio...";

    try {
      const res = await fetch("https://diet.myrealvet.it/subscribe-prontosoccorso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      console.log("📬 Risposta server:", data);

      if (data.success) {
        successMessage.style.display = "block";
        successMessage.textContent = "✅ Guida inviata! Controlla la tua email.";
        nameInput.value = "";
        emailInput.value = "";

        // opzionale: redirect o download automatico
        // setTimeout(() => {
        //   window.open("https://raw.githubusercontent.com/magox2694/assets-myrealvet/main/footer-payhip/regalo-corso-alimentazione/Guida_5_errori_alimentazione.pdf", "_blank");
        // }, 1200);
      } else {
        alert("❌ Errore: " + (data.message || "Si è verificato un problema."));
      }
    } catch (err) {
      console.error("Errore di rete:", err);
      alert("⚠️ Errore di connessione. Riprova più tardi.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
});
