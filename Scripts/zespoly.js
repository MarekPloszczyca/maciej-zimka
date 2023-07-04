import { menuButton, toggleMenuHandler} from "./navigation.js";

const  bandNames = document.querySelectorAll(".other-bands .centered");

const imageSwitchHandler = (event) => {
console.log(event.target)
}

bandNames.forEach((name) =>{name.addEventListener("mouseover", imageSwitchHandler);})


menuButton.addEventListener("click", toggleMenuHandler);

