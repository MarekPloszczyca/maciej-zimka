import { menuButton, toggleMenuHandler } from "./navigation.js";
const image = document.querySelector(".text-image-container div");
const bandNames = document.querySelectorAll(".other-bands .centered");

const mainImage = image.className;

const imageSwitchHandler = (event) => {
  switch (event.target.id) {
    case "quasi":
      image.className = "band-image-3";
      break;
    case "duo":
        image.className = "band-image-2";
      break;
    case "ochwat":
        image.className = "band-image";
      break;
  }
};

const defaultImageHandler = () => {
    image.className = mainImage;
}

bandNames.forEach((name) => {
  name.addEventListener("mouseover", imageSwitchHandler);
  name.addEventListener("mouseout", defaultImageHandler)
});

menuButton.addEventListener("click", toggleMenuHandler);
