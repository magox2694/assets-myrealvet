// MRV – Form interattivo Pronto Soccorso Canino
document.addEventListener("DOMContentLoaded", function () {
  console.log("🐾 MRV Form Pronto Soccorso attivo");

  const form = document.querySelector('form[action="/subscribe-prontosoccorso"]');
  if (!form) return;

  // Iniezione dinamica wrapper
  form.classList.add("mrv-form-wrapper");

  const btn = form.querySelector("button");
  btn.classList.add("mrv-btn-submit");

  // Messaggio di successo
  const successMessage = document.createElement("div");
  successMessage.className = "mrv-success-message";
  successMessage.textContent = "✅ Guida inviata! Controlla la tua email.";
  form.appendChild(successMessage);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[name="email"]').value.trim();
    if (!email) return alert("Inserisci la tua email!");

    btn.disabled = true;
    btn.textContent = "Invio...";

    try {
      const res = await fetch("https://diet.myrealvet.it/subscribe-prontosoccorso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        successMessage.style.display = "block";
        form.querySelector('input[name="email"]').value = "";
      } else {
        alert("Si è verificato un errore: " + data.message);
      }
    } catch (err) {
      console.error("Errore:", err);
      alert("Errore di connessione. Riprova tra poco.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Scarica gratis";
    }
  });
});
