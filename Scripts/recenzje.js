import { menuButton, toggleMenuHandler } from "./navigation.js";

const developingArrows = document.querySelectorAll(".down-arrow");

function developReviewHandler(event) {
  const review = this.closest(".review");
  event.target.classList.toggle("transformed");
  review.children[2].classList.toggle("dropdown-review");
  review.children[2].classList.toggle("displayed")
}

developingArrows.forEach((arrow) => {
  arrow.addEventListener("click", developReviewHandler);
});
menuButton.addEventListener("click", toggleMenuHandler);
