// Klaro config per Payhip – MyRealVet ©2025
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
    // --- Cookie tecnici Payhip (sempre attivi)
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

    // --- Servizi funzionali aggiuntivi
    {
      name: "formspree",
      title: "Formspree – Invio dei moduli di contatto",
      purposes: ["functional"],
      default: true,
      cookies: [],
      callback: function(consent, service) {
        console.log("Formspree:", consent);
      }
    },
    {
      name: "tawk",
      title: "Tawk.to – Chat di assistenza",
      purposes: ["functional", "marketing"],
      default: true,
      cookies: [/^Tawk_/],
      callback: function(consent) {
        if (consent) {
          var s1 = document.createElement("script");
          s1.async = false;
          s1.src = "https://embed.tawk.to/68d5c3d5d8d13a194ecaa6d8/1j61g9vd4";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          document.head.appendChild(s1);
        }
      }
    },

    // --- Analitici
    {
      name: "google-analytics",
      title: "Google Analytics",
      purposes: ["analytics"],
      cookies: [/^_ga/, /^_gid/],
      default: false,
      callback: function(consent) {
        if (consent) {
          var s = document.createElement("script");
          s.async = true;
          s.src = "https://www.googletagmanager.com/gtag/js?id=G-74MREDQSG1";
          document.head.appendChild(s);
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag("js", new Date());
          gtag("config", "G-74MREDQSG1");
        }
      }
    },

    // --- Marketing / Newsletter
    {
      name: "emailoctopus",
      title: "EmailOctopus – Iscrizioni e popup",
      purposes: ["marketing"],
      default: false
    }
  ]
};
