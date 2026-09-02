const initializeContactForm = () => {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  const button = form?.querySelector(".submit-button");
  const label = form?.querySelector(".button-label");

  if (!form || !status || !button || !label) return;

  const setStatus = (message, type = "") => {
    status.textContent = message;
    status.className = `form-status ${type}`.trim();
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("Confira os campos obrigatórios antes de continuar.", "error");
      return;
    }

    const formData = new FormData(form);
    if (formData.get("_honey")) return;

    const name = String(formData.get("Nome") || "").trim();
    const phone = String(formData.get("Telefone") || "").trim();
    const message = String(formData.get("Mensagem") || "").trim();
    const whatsappText = [
      "Olá, Profª Cris! Enviei estes dados pelo site:",
      "",
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Mensagem: ${message}`,
    ].join("\n");
    const whatsappUrl = `https://wa.me/5511950574561?text=${encodeURIComponent(whatsappText)}`;

    button.disabled = true;
    label.textContent = "Enviando...";
    setStatus("Enviando uma cópia por e-mail...", "");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/cristianerosendo@gmail.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Falha no envio");

      setStatus("E-mail enviado. Abrindo o WhatsApp para confirmar a mensagem...", "success");
      window.setTimeout(() => window.location.assign(whatsappUrl), 650);
    } catch {
      setStatus("Não foi possível enviar o e-mail agora. Tente novamente ou use o botão do WhatsApp.", "error");
      button.disabled = false;
      label.textContent = "Enviar por e-mail e WhatsApp";
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeContactForm, { once: true });
} else {
  initializeContactForm();
}
