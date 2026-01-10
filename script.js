function initPortfolio() {

  const views = ["home", "about", "projects", "contact", "footer"];


  // SHOW SECTION
  window.showSection = function (id) {
    views.forEach(view => {
      const el = document.getElementById(view);
      if (el) el.style.display = "none";
    });

    const active = document.getElementById(id);
    if (!active) return;

    active.style.display = "block";
    active.style.opacity = "0";
    active.style.transform = "translateY(30px)";

    requestAnimationFrame(() => {
      active.style.transition = "all 0.6s ease";
      active.style.opacity = "1";
      active.style.transform = "translateY(0)";
    });
  };

  // 🔥 BACK = FULL REFRESH
  window.goBack = function () {
    location.reload();
  };

  /* CONTACT FORM (UNCHANGED) */
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const btn = form.querySelector("button");

  form.addEventListener("submit", async e => {
    e.preventDefault();

    btn.disabled = true;
    btn.textContent = "Sending...";
    status.textContent = "Sending...";
    status.style.color = "#3b82f6";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      status.textContent = "✅ Message sent!";
      status.style.color = "#22c55e";
      form.reset();
    } catch {
      status.textContent = "❌ Failed to send.";
      status.style.color = "#ef4444";
    } finally {
      btn.disabled = false;
      btn.textContent = "Send Message";
    }
  });
}

document.addEventListener("DOMContentLoaded", initPortfolio);
