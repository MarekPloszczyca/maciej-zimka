import { menuButton, toggleMenuHandler } from "./navigation.js";

const developingArrows = document.querySelectorAll(".down-arrow");

function developReviewHandler(event) {
  const review = this.closest(".review");
  event.target.classList.toggle("transformed");
  review.children[2].classList.toggle("hidden");
}

developingArrows.forEach((arrow) => {
  arrow.addEventListener("click", developReviewHandler);
});
menuButton.addEventListener("click", toggleMenuHandler);
