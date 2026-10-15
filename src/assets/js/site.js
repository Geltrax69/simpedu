/* Theme toggle with a single state. No theme flash: the inline script in
   base.njk sets data-theme before paint. */
(function () {
  var root = document.documentElement;
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    try { localStorage.setItem("simpedu-theme", t); } catch (e) {}
    var label = document.querySelector("[data-theme-label]");
    if (label) label.textContent = t === "dark" ? "Light" : "Dark";
  }
  var btn = document.querySelector("[data-theme-toggle]");
  if (btn) {
    // Set initial label
    var initialLabel = document.querySelector("[data-theme-label]");
    if (initialLabel) {
      initialLabel.textContent = root.getAttribute("data-theme") === "dark" ? "Light" : "Dark";
    }
    btn.addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }
})();

/* Accessible tabs: click, touch, arrow keys. */
(function () {
  var tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
    });
    tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { select(tab); });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") next = tabs[0];
      if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next); }
    });
  });
})();

/* ID-card front/back toggle. Explicit buttons, not hover. Each
   [data-flip-group] owns its buttons and image; buttons outside any group
   fall back to document scope, which keeps the homepage pair working. */
document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-flip]");
  if (!btn) return;
  var scope = btn.closest("[data-flip-group]") || document;
  var side = btn.getAttribute("data-flip");
  scope.querySelectorAll("[data-flip]").forEach(function (b) {
    b.setAttribute("aria-pressed", b === btn ? "true" : "false");
  });
  var img = scope.querySelector("[data-flip-img]");
  if (img && (side === "front" || side === "back")) {
    var src = img.getAttribute("data-" + side + "-src");
    var alt = img.getAttribute("data-" + side + "-alt");
    if (src) {
      img.classList.add("flipping");
      setTimeout(function () {
        img.setAttribute("src", src);
        if (alt) img.setAttribute("alt", alt);
        img.classList.remove("flipping");
      }, 180);
    } else if (alt) {
      img.setAttribute("alt", alt);
    }
  }
});

/* Enlarge: copy the card's front/back into the shared dialog, match its
   orientation and current side, then show it. */
(function () {
  var dialog = document.getElementById("card-viewer");
  if (!dialog) return;
  var dialogImg = dialog.querySelector("[data-flip-img]");
  var dialogFrame = dialog.querySelector("[data-dialog-frame]");
  if (!dialogImg || !dialogFrame) return;
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-enlarge]");
    if (!btn) return;
    var group = btn.closest("[data-flip-group]");
    var cardImg = group && group.querySelector("[data-flip-img]");
    if (!cardImg) return;
    var current = group.querySelector('[data-flip][aria-pressed="true"]');
    var side = current ? current.getAttribute("data-flip") : "front";
    ["front", "back"].forEach(function (s) {
      dialogImg.setAttribute("data-" + s + "-src", cardImg.getAttribute("data-" + s + "-src"));
      dialogImg.setAttribute("data-" + s + "-alt", cardImg.getAttribute("data-" + s + "-alt"));
    });
    dialogImg.setAttribute("width", cardImg.getAttribute("width"));
    dialogImg.setAttribute("height", cardImg.getAttribute("height"));
    dialogFrame.classList.remove("id-card-frame--portrait", "id-card-frame--landscape");
    dialogFrame.classList.add("id-card-frame--" + group.getAttribute("data-orientation"));
    var dialogBtn = dialog.querySelector('[data-flip="' + side + '"]');
    if (dialogBtn) dialogBtn.click();
    if (typeof dialog.showModal === "function") dialog.showModal();
  });
})();

/* Contact form: Web3Forms JSON submission as a small state machine.
   States: idle -> pending -> success | failure. Inputs are preserved on
   failure and cleared only on success. */
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  
  // Preselect subject from ?service= query param
  var params = new URLSearchParams(window.location.search);
  var service = params.get("service");
  var subject = form.querySelector("#cf-subject");
  if (service && subject) {
    var map = {
      "id-cards": "ID-card printing enquiry",
      "demo": "Book a demo",
      "support": "Support for an existing setup"
    };
    var target = map[service];
    if (target) {
      for (var i = 0; i < subject.options.length; i++) {
        if (subject.options[i].value === target) {
          subject.selectedIndex = i;
          break;
        }
      }
    }
  }
  
  var status = form.querySelector("[data-form-status]");
  var submit = form.querySelector("[data-submit]");
  var submitLabel = submit.querySelector("[data-submit-label]");
  var idleLabel = submitLabel.textContent;
  var state = "idle";

  function setState(next, message, tone) {
    state = next;
    status.textContent = "";
    if (message) status.appendChild(message);
    status.setAttribute("data-state", tone || "");
    submit.disabled = next === "pending";
    submitLabel.textContent = next === "pending" ? "Sending\u2026" : idleLabel;
    form.setAttribute("aria-busy", next === "pending" ? "true" : "false");
  }

  function failureMessage() {
    var p = document.createElement("span");
    p.appendChild(document.createTextNode("Something went wrong sending your message. Please try again, or write to us directly at "));
    var a = document.createElement("a");
    a.href = "mailto:humanresource@simpedu.in";
    a.textContent = "humanresource@simpedu.in";
    p.appendChild(a);
    p.appendChild(document.createTextNode("."));
    return p;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (state === "pending") return;
    var payload = {
      access_key: "1fe9a410-42c5-4523-af7c-024a2a4ce144",
      from_name: "Simpedu Contact Form",
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      company: form.company.value.trim(),
      subject: form.subject.value,
      message: form.message.value.trim()
    };
    setState("pending");
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 15000);
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    })
      .then(function (res) { return res.json().then(function (json) { return json && json.success; }); })
      .then(function (ok) {
        clearTimeout(timeout);
        if (ok) {
          var done = document.createElement("span");
          done.textContent = "Thanks — your message is on its way. We reply within one working day.";
          setState("success", done, "success");
          form.reset();
        } else {
          setState("failure", failureMessage(), "error");
        }
      })
      .catch(function (err) {
        clearTimeout(timeout);
        var msg = failureMessage();
        if (err && err.name === "AbortError") {
          var timeoutMsg = document.createElement("span");
          timeoutMsg.appendChild(document.createTextNode("The request timed out. Please try again, or write to us directly at "));
          var a = document.createElement("a");
          a.href = "mailto:humanresource@simpedu.in";
          a.textContent = "humanresource@simpedu.in";
          timeoutMsg.appendChild(a);
          timeoutMsg.appendChild(document.createTextNode("."));
          msg = timeoutMsg;
        }
        setState("failure", msg, "error");
      });
  });
})();

/* Accessible mobile menu: toggle, Escape to close, focus management. */
(function () {
  var btn = document.querySelector(".menu-btn");
  var nav = document.getElementById("primary-nav");
  if (!btn || !nav) return;
  function setOpen(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("open", open);
  }
  btn.addEventListener("click", function () {
    setOpen(btn.getAttribute("aria-expanded") !== "true");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      btn.focus();
    }
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false);
  });
})();
