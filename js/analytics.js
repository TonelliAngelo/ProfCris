// Google Analytics 4 com Consent Mode — Profª Cris
(function () {
  "use strict";
  const GA_ID = "G-BWMLRKPWWM";
  const CONSENT_KEY = "profacris_analytics_consent";
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    analytics_storage: "denied", functionality_storage: "granted",
    security_storage: "granted", wait_for_update: 500
  });
  const readConsent = () => { try { return window.localStorage.getItem(CONSENT_KEY); } catch { return null; } };
  const saveConsent = (value) => { try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* indisponível */ } };
  const updateConsent = (value) => {
    window.profacrisAnalyticsAllowed = value === "granted";
    window.profacrisAnalyticsConsent = value;
    window.gtag("consent", "update", { analytics_storage: value });
  };
  const loadGoogleTag = () => {
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
    if (document.querySelector("script[data-profacris-ga]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    script.dataset.profacrisGa = "true";
    document.head.appendChild(script);
  };
  const storedConsent = readConsent();
  window.profacrisAnalyticsAllowed = storedConsent === "granted";
  window.profacrisAnalyticsConsent = storedConsent || "unset";
  if (storedConsent === "granted" || storedConsent === "denied") updateConsent(storedConsent);
  loadGoogleTag();
  window.profacrisTrack = (eventName, details) => { if (eventName) window.gtag("event", eventName, details || {}); };
  const initializePrivacyControls = () => {
    const footer = document.querySelector("footer .container");
    if (!footer || document.querySelector(".privacy-settings")) return;
    const settings = document.createElement("button");
    settings.type = "button";
    settings.className = "privacy-settings";
    settings.textContent = "Preferências de privacidade";
    footer.appendChild(settings);
    const showBanner = () => {
      document.querySelector(".privacy-banner")?.remove();
      const banner = document.createElement("aside");
      banner.className = "privacy-banner";
      banner.setAttribute("aria-label", "Preferências de privacidade");
      banner.innerHTML = '<div><strong>Sua privacidade importa</strong><p>Usamos métricas opcionais para entender como o site é utilizado e melhorar a experiência. Sem o aceite, não usamos cookies de análise nem armazenamos identificadores no dispositivo; o Google poderá receber apenas sinais técnicos limitados.</p></div><div><button class="privacy-button privacy-button-secondary" type="button" data-consent="denied">Somente essenciais</button><button class="privacy-button privacy-button-primary" type="button" data-consent="granted">Aceitar métricas</button></div>';
      banner.addEventListener("click", (event) => {
        const button = event.target.closest("[data-consent]");
        if (!button) return;
        const value = button.dataset.consent;
        saveConsent(value); updateConsent(value); banner.remove();
      });
      document.body.appendChild(banner);
    };
    settings.addEventListener("click", showBanner);
    if (!storedConsent) showBanner();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializePrivacyControls, { once: true });
  else initializePrivacyControls();
})();
