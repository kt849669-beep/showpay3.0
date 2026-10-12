(() => {
  "use strict";

  const root = document.querySelector('.showpay-guide');
  if (!root) return;
  const config = { usdtRate:108.12, orderCommissionPercent:3.6, bonusPercent:2, inviteCode:'1eashowpb2dp' };
  const defaults = {
    registerUrl: "https://app-web.showpayweb.com/regist?code=1eashowpb2dp",
    downloadUrl: "https://app-web.showpayweb.com/regist?code=1eashowpb2dp",
    appUrl: "https://app-showpay.in/",
    forgotPasswordUrl: "https://app-web.showpayweb.com/forgetPassword",
    telegramUrl: "https://t.me/showpayyoffical"
  };
  const inr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function readNumber(value, fallback, minimum, maximum) {
    if (value === undefined || value === null || value === "") return fallback;
    const number = Number(value);
    return Number.isFinite(number) && number >= minimum && number <= maximum
      ? number
      : fallback;
  }

  function readUrl(value, fallback) {
    try {
      const url = new URL(value);
      if (url.protocol === "https:" && !url.username && !url.password) return url;
    } catch {
      // Invalid settings leave the supplied default link in place.
    }
    return new URL(fallback);
  }

  const rate = readNumber(config.usdtRate, 108.12, 0.01, 1000000);
  const commission = readNumber(config.orderCommissionPercent, 3.6, 0, 100);
  const bonus = readNumber(config.bonusPercent, 2, 0, 100);
  const registration = readUrl(config.registerUrl, defaults.registerUrl);
  const inviteCode = registration.searchParams.get("code") || String(config.inviteCode || "1eashowpb2dp");

  function updatePageDetails() {
    const details = [
      ["[data-rate]", rate.toLocaleString("en-IN", { maximumFractionDigits: 2 })],
      ["[data-commission-rate]", commission.toLocaleString("en-IN", { maximumFractionDigits: 2 })],
      ["[data-bonus-rate]", bonus.toLocaleString("en-IN", { maximumFractionDigits: 2 })],
      ["[data-invite-code]", inviteCode],
      ["[data-year]", String(new Date().getFullYear())]
    ];
    details.forEach(([selector, value]) => {
      root.querySelectorAll(selector).forEach((item) => { item.textContent = value; });
    });
    root.querySelectorAll("[data-order-value]").forEach((item) => {
      const amount = Number(item.dataset.orderValue);
      if (Number.isFinite(amount)) item.textContent = inr.format(amount * commission / 100);
    });

    const links = [
      [".app-link", registration],
      [".download-link", readUrl(config.downloadUrl, defaults.downloadUrl)],
      [".login-link", readUrl(config.appUrl, defaults.appUrl)],
      [".forgot-link", readUrl(config.forgotPasswordUrl, defaults.forgotPasswordUrl)],
      [".telegram-link-inline", readUrl(config.telegramUrl, defaults.telegramUrl)]
    ];
    links.forEach(([selector, destination]) => {
      root.querySelectorAll(selector).forEach((link) => { link.href = destination.href; });
    });
  }

  function setupMenu() {
    const button = root.querySelector(".menu-toggle");
    const nav = root.querySelector('#main-nav');
    if (!button || !nav) return;
    const mobile = window.matchMedia("(max-width: 760px)");

    function closeMenu() {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    }
    function syncMenu() {
      button.hidden = !mobile.matches;
      closeMenu();
    }
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") !== "true";
      nav.classList.toggle("is-open", open);
      button.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        button.focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header")) closeMenu();
    });
    mobile.addEventListener("change", syncMenu);
    syncMenu();
    root.classList.add("js");
  }

  function setupCalculator() {
    const input = root.querySelector('#usdt-amount');
    const output = root.querySelector('#inr-result');
    const error = root.querySelector('#amount-error');
    const presets = root.querySelectorAll("[data-amount]");
    if (!input || !output || !error) return;

    function calculate() {
      const value = input.value.trim();
      const amount = Number(value);
      const valid = /^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(value)
        && Number.isFinite(amount) && amount >= 0 && amount <= 100000000;
      input.setAttribute("aria-invalid", String(value !== "" && !valid));
      error.textContent = value === "" || valid
        ? ""
        : "Enter an amount from 0 to 10,00,00,000, with up to 2 decimal places.";
      output.textContent = valid ? inr.format(amount * rate) : "₹—";
      presets.forEach((button) => {
        button.setAttribute("aria-pressed", String(valid && amount === Number(button.dataset.amount)));
      });
    }
    input.addEventListener("input", calculate);
    presets.forEach((button) => {
      button.addEventListener("click", () => {
        input.value = button.dataset.amount;
        calculate();
      });
    });
    calculate();
  }

  function setupInviteCopy() {
    const button = root.querySelector('#copy-invite');
    const status = root.querySelector('#copy-status');
    if (!button || !status || !navigator.clipboard?.writeText) return;
    button.hidden = false;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(inviteCode);
        status.textContent = "Invite code copied.";
      } catch {
        status.textContent = `Copy is unavailable. Your invite code is ${inviteCode}.`;
      }
    });
  }

  function setupMotion() {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root.classList.contains("sp-intro-active")) root.classList.add("sp-hero-ready");
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    root.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
    function syncPreference() {
      root.classList.toggle("motion-ready", !preference.matches);
    }
    preference.addEventListener("change", syncPreference);
    syncPreference();
  }

  if (root.classList.contains('showpay-guide--embedded') && window.IntersectionObserver) {
    new IntersectionObserver(([entry]) => root.classList.toggle('is-in-view', entry.isIntersecting)).observe(root);
  }

  updatePageDetails();
  setupMenu();
  setupCalculator();
  setupInviteCopy();
  setupMotion();
})();
