const initializeSite = () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#menu-principal");

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const willOpen = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(willOpen));
      menu.classList.toggle("is-open", willOpen);
      document.body.classList.toggle("menu-open", willOpen);
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.matchMedia("(min-width: 851px)").addEventListener("change", closeMenu);
  }

  const recordEvent = (eventName, details = {}) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, details);
    }
    window.dispatchEvent(new CustomEvent("profacris:interaction", {
      detail: { event: eventName, ...details },
    }));
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    if (link.href.includes("wa.me/")) {
      recordEvent("whatsapp_click", {
        location: link.classList.contains("whatsapp-float") ? "floating_button" : "page_content",
      });
    }

    if (link.pathname.includes("/regioes/")) {
      recordEvent("region_page_click", { path: link.pathname });
    }
  });

  document.querySelector("#contact-form")?.addEventListener("submit", () => {
    recordEvent("contact_form_submit");
  });

  window.addEventListener("profacris:contact-sent", () => {
    recordEvent("generate_lead", { method: "contact_form" });
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSite, { once: true });
} else {
  initializeSite();
}
