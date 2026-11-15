"use strict";

// The complete navigation remains available when JavaScript is disabled.
document.documentElement.classList.replace("no-js", "js");
const navigation = document.querySelector(".primary-nav");
const menuButton = document.querySelector(".menu-toggle");

if (navigation && menuButton) {
  menuButton.hidden = false;
  const setMenuOpen = (open) => {
    navigation.dataset.open = String(open);
    menuButton.setAttribute("aria-expanded", String(open));
  };
  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });
  navigation.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
}
