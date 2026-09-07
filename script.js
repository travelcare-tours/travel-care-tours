/*
  TRAVEL CARE TOURS - QUICK SETUP
  1. Replace the WhatsApp number below with your full international number,
     digits only. Example for India: 919876543210
  2. Save this file and upload the whole folder to free hosting.
*/
const WHATSAPP_NUMBER = "918129070109";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

function whatsappUrl(message = "Hello Travel Care Tours, I would like to plan a Kerala trip.") {
  if (WHATSAPP_NUMBER === "YOUR_WHATSAPP_NUMBER") {
    alert("Please add your WhatsApp number in script.js first.");
    return "#";
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach(el => {
  el.href = whatsappUrl();
});

const display = document.getElementById("whatsapp-display");
if (display) {
  display.textContent = WHATSAPP_NUMBER === "YOUR_WHATSAPP_NUMBER"
    ? "Add your WhatsApp number in script.js"
    : `+${WHATSAPP_NUMBER}`;
}

document.querySelectorAll("[data-package]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.querySelector('select[name="package"]');
    if (select) {
      [...select.options].forEach(option => {
        if (option.text === link.dataset.package) option.selected = true;
      });
    }
  });
});

document.querySelectorAll("[data-destination]").forEach(link => {
  link.addEventListener("click", () => {
    const box = document.querySelector('textarea[name="message"]');
    if (box) {
      const current = box.value.trim();
      const destination = link.dataset.destination;
      if (!current.toLowerCase().includes(destination.toLowerCase())) {
        box.value = current ? `${current}, ${destination}` : destination;
      }
    }
  });
});

document.getElementById("enquiryForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const message = [
    "Hello Travel Care Tours! I would like a Kerala tour quote.",
    "",
    `Name: ${data.get("name") || "-"}`,
    `Phone/WhatsApp: ${data.get("phone") || "-"}`,
    `Arrival Date: ${data.get("date") || "-"}`,
    `Nights: ${data.get("nights") || "-"}`,
    `Adults: ${data.get("adults") || "-"}`,
    `Children: ${data.get("children") || "0"}`,
    `Package: ${data.get("package") || "-"}`,
    `Destinations / Requirements: ${data.get("message") || "-"}`
  ].join("\n");

  const url = whatsappUrl(message);
  if (url !== "#") window.open(url, "_blank");
});

document.getElementById("year").textContent = new Date().getFullYear();

// Load the editable content bridge used by Netlify Visual Editor.
const visualEditorScript = document.createElement("script");
visualEditorScript.src = "/editor.js";
visualEditorScript.defer = true;
document.head.appendChild(visualEditorScript);
