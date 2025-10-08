// MRV – Pronto Soccorso: aggiunge automaticamente il campo Nome se manca
document.addEventListener("DOMContentLoaded", function () {
  console.log("🐾 MRV Pronto Soccorso – JS attivo");

  const form = document.querySelector('form[action="/subscribe-prontosoccorso"]');
  if (!form) return;

  form.classList.add("mrv-form-wrapper");

  // 1) Trova gli elementi esistenti
  const emailInput = form.querySelector('input[name="email"]');
  const submitBtn  = form.querySelector('button');

  // 2) Se il campo NOME non c'è, lo creo e lo inserisco prima dell'email
  let nameInput = form.querySelector('input[name="name"]');
  if (!nameInput) {
    nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Il tuo nome";
    nameInput.required = true; // se vuoi renderlo facoltativo, metti false
    nameInput.className = "mrv-input";
    // Inserisco PRIMA dell'email
    if (emailInput && emailInput.parentNode) {
      emailInput.parentNode.insertBefore(nameInput, emailInput);
    } else {
      form.prepend(nameInput);
    }
  }

  // 3) Messaggio di successo (dentro la card)
  let successMessage = form.querySelector(".mrv-success-message");
  if (!successMessage) {
    successMessage = document.createElement("div");
    successMessage.className = "mrv-success-message";
    successMessage.textContent = "✅ Guida inviata! Controlla la tua email.";
    form.appendChild(successMessage);
  }

  // 4) Gestione submit AJAX
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name  = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (!email) {
      alert("Inserisci la tua email!");
      emailInput.focus();
      return;
    }
    if (nameInput.required && !name) {
      alert("Inserisci il tuo nome!");
      nameInput.focus();
      return;
    }

    // Feedback bottone (non cambiamo stile Payhip)
    if (submitBtn) {
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.dataset._original = originalText || "";
      submitBtn.textContent = "Invio...";
    }

    try {
      const res = await fetch("https://diet.myrealvet.it/subscribe-prontosoccorso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });

      const data = await res.json();

      if (data.success) {
        successMessage.style.display = "block";
        emailInput.value = "";
        if (nameInput) nameInput.value = "";

        // Se vuoi far partire un download automatico, scommenta:
        // setTimeout(() => {
        //   window.location.href = "https://raw.githubusercontent.com/....pdf";
        // }, 1200);
      } else {
        alert("Si è verificato un errore: " + (data.message || "Errore sconosciuto"));
      }
    } catch (err) {
      console.error("Errore:", err);
      alert("Errore di connessione. Riprova tra poco.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset._original || "Scarica gratis";
      }
    }
  });
});
