const menuButton = document.querySelector(".menu-icon");
const burgerMenu = document.querySelector(".hidden");
const burgerDropdown = document.querySelector(".burger-dropdown");
const icon = burgerDropdown.querySelector("ion-icon");
const bands = burgerDropdown.querySelector("ul");
const content = document.querySelector(".container");
const upButton = document.querySelector(".button-container");

const toggleMenuHandler = () => {
  menuButton.classList.toggle("change");
  content.classList.toggle("hidden");
  burgerMenu.classList.toggle("hidden");
};

const dropdownHandler = () => {
  icon.classList.toggle("transformed");
  bands.classList.toggle("hidden");
};

const upButtonHandler = () => {
  const scrollIndex = window.scrollY;
  scrollIndex < 800
    ? upButton.classList.add("hidden")
    : upButton.classList.remove("hidden");
};

burgerDropdown.addEventListener("click", dropdownHandler);
menuButton.addEventListener("click", toggleMenuHandler);
document.addEventListener("scroll", upButtonHandler);
export { menuButton, toggleMenuHandler };
