// Inserisce HTML widget in pagina
document.addEventListener("DOMContentLoaded", function() {
  document.body.insertAdjacentHTML("beforeend", `
    <button id="myrealvet-chat-toggle" aria-label="Chat">💬</button>
    <div id="myrealvet-chat">
      <header>
        🐾 Chatta con Mik
        <span class="close-btn" onclick="toggleMyRealVetChat()">✕</span>
      </header>
      <div class="chat-choice">
        <div class="chat-user" onclick="selectMik()">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Mik">
          <span>Mik<br><small>Manager</small></span>
        </div>
      </div>
    </div>
  `);

  // Collego evento al pulsante
  const toggleBtn = document.getElementById("myrealvet-chat-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleMyRealVetChat);
  }
});

// Funzioni widget
function toggleMyRealVetChat() {
  const chat = document.getElementById("myrealvet-chat");
  const toggleBtn = document.getElementById("myrealvet-chat-toggle");
  if (chat.style.display === "flex") {
    chat.style.display = "none";
    toggleBtn.style.display = "flex";
  } else {
    chat.style.display = "flex";
    chat.style.flexDirection = "column";
    toggleBtn.style.display = "none";
  }
}

function selectMik() {
  const mikNumber = "393348906079"; // numero WhatsApp in formato internazionale
  const waUrl = "https://wa.me/" + mikNumber + "?text=Ciao%20Mik%2C%20ho%20bisogno%20di%20aiuto!";
  window.open(waUrl, "_blank");
}
