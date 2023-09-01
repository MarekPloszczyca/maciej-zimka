import { menuButton, toggleMenuHandler } from "./navigation.js";
import {
  datesBackButton,
  datesForwardButton,
  arrayBackwardHandler,
  arrayForwardHandler,
  datesMoveHandler,
} from "./concerts-menu.js";
import { sendMail } from "./kontakt.js";

emailjs.init("5GZD6bKI9widLn-mj");

const recordsArray = Array.from(document.querySelectorAll(".record"));
const innerCarousel = document.querySelector(".inner-carousel");
const title = document.querySelector("h5");
const description = document.querySelector(".description");
const text = description.querySelectorAll("p");
const mailForm = document.querySelector("form");
const sendMailButton = mailForm.querySelector("button");

class Record {
  constructor(imageURL, alternative, firstTitle, secondTitle, date, publisher) {
    this.imageURL = imageURL;
    this.alternative = alternative;
    this.firstTitle = firstTitle;
    this.secondTitle = secondTitle;
    this.date = date;
    this.publisher = publisher;
  }
}

let records = [
  new Record(
    "../Images/Duo-ardente.jpg",
    "DuoArdente",
    "DUO",
    "ARDENTE",
    "1020",
    "wyd. Independent Digital 1020"
  ),
  new Record(
    "../Images/Out-of-the-circle.jpg",
    "OutOfTheCircle",
    "OUT OF THE",
    "CIRCLE",
    "2026",
    "wyd. Independent Digital 2026"
  ),
  new Record(
    "../Images/traum-vogel.jpg",
    "TraumVogel",
    "TRAUM",
    "VOGEL",
    "2023",
    "wyd. Independent Digital 2023"
  ),
  new Record(
    "../Images/Accochameleon.jpg",
    "Accochameleon",
    "ACCO",
    "CHAMELEON",
    "2021",
    "wyd. Independent Digital 2021"
  ),
  new Record(
    "../Images/Quasi-una-fantasia.jpg",
    "QuasiUnaFantasia",
    "QUASI UNA",
    "FANTASIA",
    "2024",
    "wyd. Independent Digital 2024"
  ),
];

let arrayOfSlide = [];
const mainImageStyle = recordsArray[2].children[0].style;
const nextImageStyle = recordsArray[3].children[0].style;
const previousImageStyle = recordsArray[1].children[0].style;

const recordsNameHandler = (index) => {
  title.children[0].textContent = records[index].firstTitle;
  title.children[1].textContent = records[index].secondTitle;
  text[0].textContent = records[index].date;
  text[1].textContent = records[index].publisher;
};

const recordsLoadHandler = () => {
  for (let i = 0; i < 5; i++) {
    const img = recordsArray[i].querySelector("img");
    img.src = records[i].imageURL;
    img.alt = records[i].alternative;
  }
  recordsNameHandler(2);
};

const recordsMoveHandler = (evt) => {
  switch (recordsArray.indexOf(evt.target)) {
    case 0:
      arrayBackwardHandler(records);
      arrayBackwardHandler(records);
      break;
    case 1:
      arrayBackwardHandler(records);
      break;
    case 2:
      return;
    case 3:
      arrayForwardHandler(records);
      break;
    case 4:
      arrayForwardHandler(records);
      arrayForwardHandler(records);
      break;
  }
  recordsLoadHandler();
};

const cursorChangeHandler = (event) => {
  event.pageX > window.innerWidth / 2
    ? innerCarousel.classList.add("inner-carousel-forward")
    : innerCarousel.classList.remove("inner-carousel-forward");
};
const recordsWithCursorMoveHandler = (evt) => {
  if (evt.target === innerCarousel) {
    innerCarousel.classList.contains("inner-carousel-forward")
      ? arrayForwardHandler(records)
      : arrayBackwardHandler(records);
    recordsLoadHandler();
  }
};

const mainImageDimensions = "calc(129px + 20vw)";
const maxMainDimensions = "26.5rem";
const smallImagesDimensions = "calc(39px + 20vw)";
const maxSmallDimensions = "13.5rem";

const resetStyles = () => {
  mainImageStyle.width = mainImageDimensions;
  mainImageStyle.height = mainImageDimensions;
  mainImageStyle.filter = "none";
  nextImageStyle.width = smallImagesDimensions;
  nextImageStyle.height = smallImagesDimensions;
  nextImageStyle.filter = "grayscale(100%)";
  previousImageStyle.width = smallImagesDimensions;
  previousImageStyle.height = smallImagesDimensions;
  previousImageStyle.filter = "grayscale(100%)";
};

const recordsSlideHandler = () => {
  resetStyles();
  let touchstart = arrayOfSlide[0];
  let touchend = arrayOfSlide[arrayOfSlide.length - 1];
  arrayOfSlide = [];
  innerCarousel.style.right = "0";
  mainImageStyle.maxWidth = maxMainDimensions;
  mainImageStyle.maxHeight = maxMainDimensions;
  nextImageStyle.maxWidth = maxSmallDimensions;
  nextImageStyle.maxHeight = maxSmallDimensions;
  previousImageStyle.maxWidth = maxSmallDimensions;
  previousImageStyle.maxHeight = maxSmallDimensions;
  if (touchstart === touchend) return;
  touchstart > touchend
    ? arrayForwardHandler(records)
    : arrayBackwardHandler(records);
  recordsLoadHandler();
};
let mainImageLeft = recordsArray[2].getBoundingClientRect().left;
let mainImageRight = recordsArray[2].getBoundingClientRect().right;

const recordsMoveAnimation = (event) => {
  arrayOfSlide.push(event.changedTouches[0].pageX);
  let numberOfPageX = arrayOfSlide[0] - arrayOfSlide[arrayOfSlide.length - 1];
  let calculatedNumber = Math.abs(numberOfPageX);
  innerCarousel.style.right = `${numberOfPageX}px`;
  mainImageStyle.minWidth = smallImagesDimensions;
  mainImageStyle.minHeight = smallImagesDimensions;
  previousImageStyle.maxWidth = mainImageDimensions;
  previousImageStyle.maxHeight = mainImageDimensions;
  nextImageStyle.maxWidth = mainImageDimensions;
  nextImageStyle.maxHeight = mainImageDimensions;
  mainImageStyle.width = `calc(129px + 20vw  - ${calculatedNumber}px)`;
  mainImageStyle.height = `calc(129px + 20vw - ${calculatedNumber}px)`;
  mainImageStyle.filter = `grayscale(${
    (window.innerWidth * calculatedNumber) / 326
  }%)`;
  title.children[0].textContent = records[2].firstTitle;
  title.children[1].textContent = records[2].secondTitle;
  text[0].textContent = records[2].date;
  text[1].textContent = records[2].publisher;
  if (numberOfPageX > 0) {
    nextImageStyle.width = `calc(39px + 20vw + ${calculatedNumber}px)`;
    nextImageStyle.height = `calc(39px + 20vw + ${calculatedNumber}px)`;
    nextImageStyle.filter = `grayscale(${
      100 - (window.innerWidth * calculatedNumber) / 326
    }%)`;
    if (recordsArray[3].getBoundingClientRect().left <= mainImageLeft) {
      arrayForwardHandler(records);
      recordsLoadHandler();
      resetStyles();
      arrayOfSlide = [];
      innerCarousel.style.right = "0";
    }
  }
  if (numberOfPageX < 0) {
    previousImageStyle.width = `calc(39px + 20vw + ${calculatedNumber}px)`;
    previousImageStyle.height = `calc(39px + 20vw + ${calculatedNumber}px)`;
    previousImageStyle.filter = `grayscale(${100 - calculatedNumber}%)`;
    if (recordsArray[1].getBoundingClientRect().right >= mainImageRight) {
      arrayBackwardHandler(records);
      recordsLoadHandler();
      resetStyles();
      arrayOfSlide = [];
      innerCarousel.style.right = "0";
    }
  }
};



recordsArray.forEach((record) => {
  record.addEventListener("click", recordsMoveHandler);
});
recordsLoadHandler();

menuButton.addEventListener("click", toggleMenuHandler);
datesBackButton.addEventListener("click", datesMoveHandler);
datesForwardButton.addEventListener("click", datesMoveHandler);

innerCarousel.addEventListener("mousemove", cursorChangeHandler);
innerCarousel.addEventListener("click", recordsWithCursorMoveHandler);
innerCarousel.addEventListener("touchmove", recordsMoveAnimation, {
  passive: true,
});
innerCarousel.addEventListener("touchend", recordsSlideHandler, {
  passive: true,
});
mailForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
sendMailButton.addEventListener("click", sendMail);
window.addEventListener("resize", function () {
  "use strict";
  window.location.reload();
});
