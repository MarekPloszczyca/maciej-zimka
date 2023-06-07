export {menuButton, toggleMenuHandler};
const menuButton = document.querySelector(".menu-icon");
const burgerMenu = document.querySelector(".hidden");
const content = document.querySelector(".container");

const toggleMenuHandler = () => {
    menuButton.classList.toggle("change");
    content.classList.toggle("hidden");
    burgerMenu.classList.toggle("hidden");
  };

  menuButton.addEventListener("click", toggleMenuHandler);