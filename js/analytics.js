const PROFACRIS_GA_ID = "G-BWMLRKPWWM";
const PROFACRIS_CONSENT_KEY = "profacris_analytics_consent";

window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

window.gtag = gtag;

gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  functionality_storage: "granted",
  security_storage: "granted",
  wait_for_update: 500,
});

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

const updateAnalyticsConsent = (value) => {
  const granted = value === "granted";

  window.profacrisAnalyticsAllowed = granted;
  window.profacrisAnalyticsConsent = value;
  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
};

const loadGoogleTag = () => {
  if (document.querySelector(`script[data-ga-id="${PROFACRIS_GA_ID}"]`)) return;

  gtag("js", new Date());
  gtag("config", PROFACRIS_GA_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${PROFACRIS_GA_ID}`;
  script.dataset.gaId = PROFACRIS_GA_ID;
  document.head.append(script);
};

const storedConsent = readConsent();
window.profacrisAnalyticsAllowed = storedConsent === "granted";
window.profacrisAnalyticsConsent = storedConsent || "unset";

if (storedConsent) updateAnalyticsConsent(storedConsent);

// Consent Mode avançado: a tag é carregada com armazenamento negado por padrão.
// Sem aceite, o Google recebe apenas sinais sem cookies para modelagem agregada.
loadGoogleTag();

window.profacrisTrack = (eventName, details = {}) => {
  gtag("event", eventName, details);
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
  text.textContent = "Usamos métricas opcionais para entender como o site é utilizado e melhorar a experiência. Sem o aceite, não usamos cookies de análise nem armazenamos identificadores no dispositivo; o Google poderá receber apenas sinais técnicos limitados.";
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
    updateAnalyticsConsent(value);
    banner.remove();
  };

  essentialButton.addEventListener("click", () => choose("denied"));
  acceptButton.addEventListener("click", () => choose("granted"));

  return banner;
};

const initializePrivacyControls = () => {
  const consent = readConsent();

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
