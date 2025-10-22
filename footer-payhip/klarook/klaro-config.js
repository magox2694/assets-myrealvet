// =====================================================
// Klaro config per Payhip – MyRealVet ©2025
// Autore: Mihai Muhulica
// Gestore: Dott.ssa Angelica Spaccini
// Versione compatibile: Klaro v0.7.22
// =====================================================

// --- PATCH DI SICUREZZA PAYHIP ---
(function () {
  console.log("⚙️ Hook di sicurezza Klaro attivo");
  if (window.klaro && typeof window.klaro.update !== "function") {
    window.klaro.update = () => {
      console.warn("⚠️ Klaro.update non disponibile – sandbox Payhip");
    };
  }
})();

// --- CONFIGURAZIONE ---
var klaroConfig = {
  version: 1,
  elementID: "klaro",
  styling: {
    theme: ["light", "bottom", "wide"]
  },
  lang: "it",
  htmlTexts: true,
  embedded: false,
  groupByPurpose: true,

  translations: {
    it: {
      consentModal: {
        title: "Gestisci le preferenze sui cookie",
        description:
          "Usiamo cookie per garantire il corretto funzionamento del sito, analizzare il traffico e offrirti esperienze personalizzate. Puoi scegliere liberamente quali consentire."
      },
      ok: "Accetta tutti",
      acceptAll: "Accetta tutti",
      acceptSelected: "Solo selezionati",
      close: "Chiudi",
      save: "Salva preferenze",
      purposes: {
        necessary: "Necessari",
        functional: "Funzionali",
        analytics: "Statistiche",
        marketing: "Marketing"
      },
      service: {
        disableAll: {
          description: "Attiva o disattiva tutte le categorie"
        }
      }
    }
  },

  services: [
    // --- Necessari ---
    { name: "payhip", title: "Funzioni base del sito", purposes: ["necessary"], required: true, default: true },
    { name: "stripe", title: "Stripe – Pagamenti", purposes: ["necessary"], required: true, default: true },
    { name: "paypal", title: "PayPal – Pagamenti", purposes: ["necessary"], required: true, default: true },

    // --- Funzionali ---
    {
      name: "formspree",
      title: "Formspree – Invio moduli",
      purposes: ["functional"],
      default: true,
      callback: consent => console.log("Formspree:", consent)
    },
    {
      name: "tawk",
      title: "Tawk.to – Chat di assistenza",
      purposes: ["functional", "marketing"],
      default: false,
      cookies: [/^Tawk_/],
      callback: consent => {
        if (consent) {
          console.log("✅ Chat Tawk.to attivata dopo consenso");
          const s = document.createElement("script");
          s.src = "https://embed.tawk.to/68d5c3d5d8d13a194ecaa6d8/1j61g9vd4";
          s.async = true;
          s.charset = "UTF-8";
          document.head.appendChild(s);
        } else console.log("❌ Chat Tawk.to bloccata finché non accetta");
      }
    },

    // --- Analytics ---
    {
      name: "google-analytics",
      title: "Google Analytics",
      purposes: ["analytics"],
      cookies: [/^_ga/, /^_gid/],
      default: false,
      callback: consent => {
        if (consent) {
          console.log("✅ Analytics attivo dopo consenso");
          const s = document.createElement("script");
          s.src = "https://www.googletagmanager.com/gtag/js?id=G-74MREDQSG1";
          s.async = true;
          document.head.appendChild(s);
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag("js", new Date());
          gtag("config", "G-74MREDQSG1");
        } else console.log("❌ Analytics bloccato finché non accetta");
      }
    },

    // --- Marketing ---
    {
      name: "emailoctopus",
      title: "EmailOctopus – Newsletter",
      purposes: ["marketing"],
      default: false
    },
    {
      name: "mrvPopup",
      title: "Popup promozionale MyRealVet",
      purposes: ["marketing"],
      default: false,
      onlyOnce: true,
      callback: consent => {
        if (consent) {
          console.log("✅ Popup MRV attivato dopo consenso");
          if (typeof mrvRegaloInit === "function") mrvRegaloInit();
          else console.warn("⚠️ mrvRegaloInit non trovata");
        } else console.log("❌ Popup MRV bloccato finché non accetta");
      }
    }
  ]
};

// --- INIZIALIZZAZIONE SICURA ---
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (typeof klaro !== "undefined") {
      try {
        klaro.setup(klaroConfig);
        console.log("✅ Klaro avviato su Payhip");

        // 🎯 Listener globale: scatta ogni volta che l’utente salva o accetta
        if (window.klaro && typeof klaro.on === "function") {
          klaro.on("save", consents => {
            console.log("💾 Consenso aggiornato:", consents);

            // Se accetta tutti → forza i callback dei servizi
            if (consents["mrvPopup"]) {
              console.log("⚡ Attivo MRV popup post-consenso");
              if (typeof mrvRegaloInit === "function") mrvRegaloInit();
            }
            if (consents["tawk"]) {
              console.log("⚡ Attivo chat post-consenso");
              const s = document.createElement("script");
              s.src = "https://embed.tawk.to/68d5c3d5d8d13a194ecaa6d8/1j61g9vd4";
              s.async = true;
              document.head.appendChild(s);
            }
          });
        }
      } catch (err) {
        console.error("❌ Errore inizializzazione Klaro:", err);
      }
    } else {
      console.warn("⚠️ Klaro non trovato dopo DOMContentLoaded");
    }
  }, 800);
});
// --- PATCH: Forza callback dopo "Accetta tutti" (Payhip fix) ---
document.addEventListener("click", e => {
  if (e.target && e.target.textContent.includes("Accetta tutti")) {
    console.log("⚡ Forzo riattivazione callback dopo 'Accetta tutti' (Payhip sandbox)");
    setTimeout(() => {
      try {
        const consents = klaro.getManager().consents;
        if (consents["tawk"]) {
          console.log("⚡ Forzo chat post-consenso");
          const s = document.createElement("script");
          s.src = "https://embed.tawk.to/68d5c3d5d8d13a194ecaa6d8/1j61g9vd4";
          s.async = true;
          document.head.appendChild(s);
        }
        if (consents["mrvPopup"]) {
          console.log("⚡ Forzo popup post-consenso");
          if (typeof mrvRegaloInit === "function") mrvRegaloInit();
        }
        if (consents["google-analytics"]) {
          console.log("⚡ Forzo analytics post-consenso");
          const s = document.createElement("script");
          s.src = "https://www.googletagmanager.com/gtag/js?id=G-74MREDQSG1";
          s.async = true;
          document.head.appendChild(s);
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag("js", new Date());
          gtag("config", "G-74MREDQSG1");
        }
      } catch (err) {
        console.warn("⚠️ Errore nel forzare i callback:", err);
      }
    }, 1000);
  }
});
