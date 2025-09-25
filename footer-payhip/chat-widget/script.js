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
  // Sostituisci con il numero reale in formato internazionale (senza +)
  const mikNumber = "3348906079"; 
  const waUrl = "https://wa.me/" + mikNumber + "?text=Ciao%20Mik%2C%20ho%20bisogno%20di%20aiuto!";
  window.open(waUrl, "_blank");
}
// Collego il click del pulsante alla funzione toggle
document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById("myrealvet-chat-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleMyRealVetChat);
  }
});
