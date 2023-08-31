
const menuButton = document.querySelector(".menu-icon");
const burgerMenu = document.querySelector(".hidden");
const burgerDropdown = document.querySelector(".burger-dropdown");
const icon = burgerDropdown.querySelector("ion-icon");
const bands = burgerDropdown.querySelector("ul");
const content = document.querySelector(".container");


const toggleMenuHandler = () => {
    menuButton.classList.toggle("change");
    content.classList.toggle("hidden");
    burgerMenu.classList.toggle("hidden");
  };


  const dropdownHandler = () => {
    icon.classList.toggle("transformed");
    bands.classList.toggle("hidden");
  }

  burgerDropdown.addEventListener("click", dropdownHandler);
  menuButton.addEventListener("click", toggleMenuHandler);
  export {menuButton, toggleMenuHandler};