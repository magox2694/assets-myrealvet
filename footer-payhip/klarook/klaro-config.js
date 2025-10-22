// =====================================================
// Klaro config per Payhip – MyRealVet ©2025
// Autore: Mihai Muhulica
// Gestore: Dott.ssa Angelica Spaccini
// Versione compatibile: Klaro v0.7.22
// =====================================================

// --- PATCH DI SICUREZZA PAYHIP ---
(function () {
  console.log("⚙️ Hook di sicurezza Klaro attivo");
  // Evita errori 'n.update is not a function' su Payhip
  if (window.klaro && typeof window.klaro.update !== "function") {
    window.klaro.update = () => {
      console.warn("⚠️ Klaro.update non disponibile – sandbox Payhip");
    };
  }
})();

// --- CONFIGURAZIONE PRINCIPALE ---
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
    // =========================
    // ⚙️ COOKIE TECNICI PAYHIP
    // =========================
    {
      name: "payhip",
      title: "Funzioni base del sito (Payhip)",
      purposes: ["necessary"],
      required: true,
      default: true
    },
    {
      name: "stripe",
      title: "Stripe – Pagamenti sicuri",
      purposes: ["necessary"],
      required: true,
      default: true
    },
    {
      name: "paypal",
      title: "PayPal – Pagamenti sicuri",
      purposes: ["necessary"],
      required: true,
      default: true
    },

    // =========================
    // ⚙️ FUNZIONALI
    // =========================
    {
      name: "formspree",
      title: "Formspree – Invio moduli di contatto",
      purposes: ["functional"],
      default: true,
      cookies: [],
      callback: function (consent) {
        console.log("Formspree:", consent);
      }
    },
    {
      name: "tawk",
      title: "Tawk.to – Chat di assistenza",
      purposes: ["functional", "marketing"],
      default: false,
      cookies: [/^Tawk_/],
      callback: function (consent) {
        if (consent) {
          console.log("✅ Tawk.to attivo dopo consenso");
          var s1 = document.createElement("script");
          s1.async = true;
          s1.src = "https://embed.tawk.to/68d5c3d5d8d13a194ecaa6d8/1j61g9vd4";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          document.head.appendChild(s1);
        } else {
          console.log("❌ Chat Tawk.to bloccata finché non accetta");
        }
      }
    },

    // =========================
    // 📈 ANALYTICS
    // =========================
    {
      name: "google-analytics",
      title: "Google Analytics",
      purposes: ["analytics"],
      cookies: [/^_ga/, /^_gid/],
      default: false,
      callback: function (consent) {
        if (consent) {
          console.log("✅ Google Analytics attivo dopo consenso");
          var s = document.createElement("script");
          s.async = true;
          s.src = "https://www.googletagmanager.com/gtag/js?id=G-74MREDQSG1";
          document.head.appendChild(s);
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag("js", new Date());
          gtag("config", "G-74MREDQSG1");
        } else {
          console.log("❌ Google Analytics bloccato finché non accetta");
        }
      }
    },

    // =========================
    // 💌 MARKETING / POPUP
    // =========================
    {
      name: "emailoctopus",
      title: "EmailOctopus – Iscrizioni e newsletter",
      purposes: ["marketing"],
      default: false
    },
    {
      name: "mrvPopup",
      title: "Popup promozionale MyRealVet",
      purposes: ["marketing"],
      default: false,
      onlyOnce: true,
      callback: function (consent) {
        if (consent) {
          console.log("✅ Popup MRV attivato dopo consenso");
          if (typeof mrvRegaloInit === "function") mrvRegaloInit();
          else console.warn("⚠️ Funzione mrvRegaloInit non trovata");
        } else {
          console.log("❌ Popup MRV bloccato finché non accetta");
        }
      }
    }
  ]
};

// --- INIZIALIZZAZIONE POSTICIPATA PER PAYHIP ---
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (typeof klaro !== "undefined") {
      try {
        klaro.setup(klaroConfig);
        console.log("✅ Klaro avviato su Payhip");
      } catch (err) {
        console.error("❌ Errore inizializzazione Klaro:", err);
      }
    } else {
      console.warn("⚠️ Klaro non trovato dopo DOMContentLoaded");
    }
  }, 1000);
});
