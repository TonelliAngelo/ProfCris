// Google Analytics 4 - Profª Cris
// Measurement ID oficial do fluxo Web: G-BWMLRKPWWM
(function () {
  "use strict";

  const GA_ID = "G-BWMLRKPWWM";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  // Configura primeiro: os comandos ficam em fila até gtag.js terminar de carregar.
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, {
    send_page_view: true,
    cookie_domain: "auto"
  });

  // Carrega a biblioteca oficial uma única vez.
  if (!document.querySelector('script[data-profacris-ga="true"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    script.dataset.profacrisGa = "true";
    document.head.appendChild(script);
  }

  // Função disponível para eventos personalizados futuros.
  window.profacrisTrack = function (eventName, details) {
    if (!eventName) return;
    window.gtag("event", eventName, details || {});
  };
})();
