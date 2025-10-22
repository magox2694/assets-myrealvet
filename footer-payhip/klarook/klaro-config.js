// =====================================================
// Klaro config per Payhip – MyRealVet ©2025
// Autore: Mihai Muhulica
// Gestore: Dott.ssa Angelica Spaccini
// =====================================================

console.log("⚙️ Hook di sicurezza Klaro attivo");

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
      title: "Formspree – Invio dei moduli di contatto",
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
          console.log("✅ Chat Tawk.to attivata dopo consenso");
          const s1 = document.createElement("script");
          s1.src = "https://embed.tawk.to/68d5c3d5d8d13a194ecaa6d8/1j61g9vd4";
          s1.async = true;
          s1.charset = "UTF-8";
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
          console.log("✅ Analytics attivo dopo consenso");
          const s = document.createElement("script");
          s.src = "https://www.googletagmanager.com/gtag/js?id=G-74MREDQSG1";
          s.async = true;
          document.head.appendChild(s);
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag("js", new Date());
          gtag("config", "G-74MREDQSG1");
        } else {
          console.log("❌ Analytics bloccato finché non accetta");
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
        } else {
          console.log("❌ Popup MRV bloccato finché non accetta");
        }
      }
    }
  ]
};

// Inizializza Klaro
console.log("✅ Klaro avviato su Payhip");
klaro.setup(klaroConfig);

// =====================================================
// 🔧 FIX PAYHIP DEFINITIVO – gestisce "Accetta tutti" e "Salva preferenze"
// =====================================================
(function () {
  function applyConsentsRespectingUserChoice(forceAll = false) {
    try {
      const manager = klaro.getManager ? klaro.getManager() : null;
      if (!manager) return console.warn("⚠️ Nessun manager Klaro disponibile.");

      if (forceAll) {
        const names = Object.keys(manager.consents || {});
        names.forEach(name => manager.updateConsent(name, true));
        manager.saveAndApplyConsents();
        console.log("✅ Tutti i consensi forzati su TRUE (sandbox Payhip)");
      } else {
        manager.saveAndApplyConsents();
        console.log("💾 Consensi salvati rispettando la scelta utente");
      }

      const consents = manager.consents;
      console.log("📦 Stato consensi:", consents);

      // --- Esegui solo i servizi realmente consentiti ---
      if (consents["tawk"]) {
        console.log("⚡ Attivo Tawk.to");
        const s1 = document.createElement("script");
        s1.src = "https://embed.tawk.to/68d5c3d5d8d13a194ecaa6d8/1j61g9vd4";
        s1.async = true;
        s1.charset = "UTF-8";
        document.head.appendChild(s1);
      }

      if (consents["google-analytics"]) {
        console.log("⚡ Attivo Google Analytics");
        const s = document.createElement("script");
        s.src = "https://www.googletagmanager.com/gtag/js?id=G-74MREDQSG1";
        s.async = true;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag("js", new Date());
        gtag("config", "G-74MREDQSG1");
      }

      if (consents["mrvPopup"] && typeof mrvRegaloInit === "function") {
        console.log("⚡ Attivo popup MRV");
        mrvRegaloInit();
      }
    } catch (err) {
      console.error("❌ Errore nel gestire consensi:", err);
    }
  }

  // 👉 “Accetta tutti” → forza TUTTI su TRUE
  document.addEventListener("click", e => {
    if (e.target && e.target.textContent && e.target.textContent.includes("Accetta tutti")) {
      console.log("🧩 Click su 'Accetta tutti' intercettato – forza tutti i consensi...");
      setTimeout(() => applyConsentsRespectingUserChoice(true), 800);
    }
  });

  // 👉 “Salva preferenze” → rispetta le scelte effettive
  document.addEventListener("click", e => {
    if (e.target && e.target.textContent && e.target.textContent.includes("Salva preferenze")) {
      console.log("🧩 Click su 'Salva preferenze' intercettato – rispetto la scelta utente...");
      setTimeout(() => applyConsentsRespectingUserChoice(false), 800);
    }
  });
})();
