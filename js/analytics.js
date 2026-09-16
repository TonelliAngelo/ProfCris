const PROFACRIS_GA_ID = "G-BWMLRKPWWM";

window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

window.gtag = gtag;

// O gtag.js é carregado diretamente pelo <head> do index.html.
gtag("js", new Date());

gtag("config", PROFACRIS_GA_ID);

// Mantém os eventos personalizados já utilizados pelo site.
window.profacrisTrack = function (eventName, details = {}) {
  gtag("event", eventName, details);
};
