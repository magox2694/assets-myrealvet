form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;

  try {
    const res = await fetch("/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    const result = await res.json();

    if (result.success) {
      msg.textContent = "🎉 Iscrizione completata! Controlla la tua email.";
      msg.style.color = "green";
    } else {
      msg.textContent = "⚠️ Errore: " + (result.error || "riprovare");
      msg.style.color = "red";
    }
  } catch (err) {
    msg.textContent = "🚨 Errore di connessione.";
    msg.style.color = "red";
  }
});
