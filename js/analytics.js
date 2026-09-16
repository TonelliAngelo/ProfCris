const PROFACRIS_GA_ID = "G-BWMLRKPWWM";

window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}

window.gtag = gtag;

gtag("js", new Date());

gtag("config", PROFACRIS_GA_ID);

const script = document.createElement("script");
script.async = true;
script.src =
  "https://www.googletagmanager.com/gtag/js?id=" +
  PROFACRIS_GA_ID;

document.head.appendChild(script);

// Mantém compatibilidade com os eventos personalizados do site.
window.profacrisTrack = function (eventName, details = {}) {
  gtag("event", eventName, details);
};
