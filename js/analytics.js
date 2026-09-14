const PROFACRIS_GA_ID = "G-BWMLRKPWWM";
const PROFACRIS_CONSENT_KEY = "profacris_analytics_consent";

window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

window.gtag = gtag;
window.profacrisAnalyticsAllowed = false;

gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  security_storage: "granted",
  wait_for_update: 500,
});

const loadAnalytics = () => {
  if (document.querySelector(`script[data-ga-id="${PROFACRIS_GA_ID}"]`)) return;

  window.profacrisAnalyticsAllowed = true;
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("js", new Date());
  gtag("config", PROFACRIS_GA_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${PROFACRIS_GA_ID}`;
  script.dataset.gaId = PROFACRIS_GA_ID;
  document.head.append(script);
};

const disableAnalytics = () => {
  window.profacrisAnalyticsAllowed = false;
  gtag("consent", "update", { analytics_storage: "denied" });
};

window.profacrisTrack = (eventName, details = {}) => {
  if (!window.profacrisAnalyticsAllowed) return;
  gtag("event", eventName, details);
};

const readConsent = () => {
  try {
    return localStorage.getItem(PROFACRIS_CONSENT_KEY);
  } catch {
    return null;
  }
};

const saveConsent = (value) => {
  try {
    localStorage.setItem(PROFACRIS_CONSENT_KEY, value);
  } catch {
    // O consentimento permanece válido durante a visita atual.
  }
};

const buildConsentBanner = () => {
  const banner = document.createElement("section");
  banner.className = "privacy-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-live", "polite");
  banner.setAttribute("aria-label", "Preferências de privacidade");

  const copy = document.createElement("div");
  const title = document.createElement("strong");
  const text = document.createElement("p");
  const actions = document.createElement("div");
  const essentialButton = document.createElement("button");
  const acceptButton = document.createElement("button");

  title.textContent = "Sua privacidade importa";
  text.textContent = "Usamos métricas opcionais para entender como o site é utilizado e melhorar a experiência. Você pode aceitar ou continuar somente com os recursos essenciais.";
  essentialButton.type = "button";
  essentialButton.className = "privacy-button privacy-button-secondary";
  essentialButton.textContent = "Somente essenciais";
  acceptButton.type = "button";
  acceptButton.className = "privacy-button privacy-button-primary";
  acceptButton.textContent = "Aceitar métricas";

  copy.append(title, text);
  actions.append(essentialButton, acceptButton);
  banner.append(copy, actions);

  const choose = (value) => {
    saveConsent(value);
    value === "granted" ? loadAnalytics() : disableAnalytics();
    banner.remove();
  };

  essentialButton.addEventListener("click", () => choose("denied"));
  acceptButton.addEventListener("click", () => choose("granted"));

  return banner;
};

const initializePrivacyControls = () => {
  const consent = readConsent();

  if (consent === "granted") loadAnalytics();
  if (consent === "denied") disableAnalytics();
  if (!consent) document.body.append(buildConsentBanner());

  const footer = document.querySelector("footer .container");
  if (!footer) return;

  const settingsButton = document.createElement("button");
  settingsButton.type = "button";
  settingsButton.className = "privacy-settings";
  settingsButton.textContent = "Preferências de privacidade";
  settingsButton.addEventListener("click", () => {
    document.querySelector(".privacy-banner")?.remove();
    document.body.append(buildConsentBanner());
  });
  footer.append(settingsButton);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePrivacyControls, { once: true });
} else {
  initializePrivacyControls();
}
