// STEP 1: Script EmailOctopus (sempre presente)
(function(){
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://eocampaign1.com/form/ca568b10-4c78-11f0-a826-4362ab4bc29a.js";
  s.setAttribute("data-form", "ca568b10-4c78-11f0-a826-4362ab4bc29a");
  document.head.appendChild(s);
})();

// STEP 2: Aggiunge il path corrente al body
document.addEventListener("DOMContentLoaded", function(){
  document.body.setAttribute("data-path", window.location.pathname);
});
