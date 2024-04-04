import { menuButton, toggleMenuHandler } from "./navigation.js";

const recordsArray = Array.from(document.querySelectorAll(".record"));
const innerCarousel = document.querySelector(".inner-carousel");
const title = document.querySelector("h5");
const publisher = document.querySelector(".publisher");
const buyButton = document.querySelector(".info button");
const image = document.querySelector(".details img");

let firstLoad = true;

class Record {
  constructor(
    imageURL,
    alternative,
    firstTitle,
    secondTitle,
    date,
    publisher,
    toBuy
  ) {
    this.imageURL = imageURL;
    this.alternative = alternative;
    this.firstTitle = firstTitle;
    this.secondTitle = secondTitle;
    this.date = date;
    this.publisher = publisher;
    this.toBuy = toBuy;
  }
}

let records = [
  new Record(
    "../Images/Duo-ardente.jpg",
    "DuoArdente",
    "DUO",
    "ARDENTE",
    "2020",
    "wyd. Independent Digital 2020",
    false
  ),
  new Record(
    "../Images/Out-of-the-circle.jpg",
    "OutOfTheCircle",
    "OUT OF THE",
    "CIRCLE",
    "2021",
    "wyd. Independent Digital 2021",
    false
  ),
  new Record(
    "../Images/traum-vogel.jpg",
    "TraumVogel",
    "TRAUM",
    "VOGEL",
    "2018",
    "wyd. Independent Digital 2018",
    true
  ),
  new Record(
    "../Images/Accochameleon.jpg",
    "Accochameleon",
    "ACCO",
    "CHAMELEON",
    "2021",
    "wyd. Independent Digital 2021",
    false
  ),
  new Record(
    "../Images/Quasi-una-fantasia.jpg",
    "QuasiUnaFantasia",
    "QUASI UNA",
    "FANTASIA",
    "2015",
    "wyd. Independent Digital 2015",
    false
  ),
];

const arrayBackwardHandler = (array) => {
  let element = array.pop();
  array.unshift(element);
};
const arrayForwardHandler = (array) => {
  let element = array.shift();
  array.push(element);
};

let arrayOfSlide = [];
const mainImageStyle = recordsArray[2].children[0].style;
const nextImageStyle = recordsArray[3].children[0].style;
const previousImageStyle = recordsArray[1].children[0].style;

const recordsNameHandler = (index) => {
  if (!window.location.search.substring(1) || !firstLoad) {
    image.src = records[index].imageURL;
    title.children[0].textContent = records[index].firstTitle;
    title.children[1].textContent = records[index].secondTitle;
    publisher.textContent = records[index].publisher;
    return !records[index].toBuy
      ? buyButton.classList.add("hidden")
      : buyButton.classList.remove("hidden");
  } else {
    for (let record of records) {
      if (
        record.alternative.toLowerCase() ===
        window.location.search.substring(1).replace(/record=/g, "")
      ) {
        image.src = record.imageURL;
        title.children[0].textContent = record.firstTitle;
        title.children[1].textContent = record.secondTitle;
        publisher.textContent = record.publisher;
        !record.toBuy
          ? buyButton.classList.add("hidden")
          : buyButton.classList.remove("hidden");
        return (firstLoad = false);
      }
    }
  }
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
  pageScroll();
};

const cursorChangeHandler = (event) => {
  event.pageX > window.innerWidth / 2
    ? innerCarousel.classList.add("inner-carousel-forward")
    : innerCarousel.classList.remove("inner-carousel-forward");
};

const pageScroll = () => {
  window.scrollTo({
    top: 200,
    left: 0,
    behavior: "smooth",
  });
};

const recordsWithCursorMoveHandler = (evt) => {
  if (evt.target === innerCarousel) {
    innerCarousel.classList.contains("inner-carousel-forward")
      ? arrayForwardHandler(records)
      : arrayBackwardHandler(records);
    recordsLoadHandler();
    pageScroll();
  }
};

const resetStyles = () => {
  mainImageStyle.width = "calc(129px + 20vw)";
  mainImageStyle.height = "calc(129px + 20vw)";
  mainImageStyle.filter = "none";
  nextImageStyle.width = "calc(39px + 20vw)";
  nextImageStyle.height = "calc(39px + 20vw)";
  nextImageStyle.filter = "grayscale(100%)";
  previousImageStyle.width = "calc(39px + 20vw)";
  previousImageStyle.height = "calc(39px + 20vw)";
  previousImageStyle.filter = "grayscale(100%)";
};

const recordsSlideHandler = () => {
  resetStyles();
  let touchstart = arrayOfSlide[0];
  let touchend = arrayOfSlide[arrayOfSlide.length - 1];
  arrayOfSlide = [];
  innerCarousel.style.right = "0";
  mainImageStyle.maxWidth = "26.5rem";
  mainImageStyle.maxHeight = "26.5rem";
  nextImageStyle.maxWidth = "13.5rem";
  nextImageStyle.maxHeight = "13.5rem";
  previousImageStyle.maxWidth = "13.5rem";
  previousImageStyle.maxHeight = "13.5rem";
  if (touchstart === touchend) return;
  touchstart > touchend
    ? arrayForwardHandler(records)
    : arrayBackwardHandler(records);
  recordsLoadHandler();
  pageScroll();
};
let mainImageLeft = recordsArray[2].getBoundingClientRect().left;
let mainImageRight = recordsArray[2].getBoundingClientRect().right;

const recordsMoveAnimation = (event) => {
  arrayOfSlide.push(event.changedTouches[0].pageX);
  let numberOfPageX = arrayOfSlide[0] - arrayOfSlide[arrayOfSlide.length - 1];
  let calculatedNumber = Math.abs(numberOfPageX);
  innerCarousel.style.right = `${numberOfPageX}px`;
  mainImageStyle.minWidth = "calc(39px + 20vw)";
  mainImageStyle.minHeight = "calc(39px + 20vw)";
  previousImageStyle.maxWidth = "calc(130px + 20vw)";
  previousImageStyle.maxHeight = "calc(130px + 20vw)";
  nextImageStyle.maxWidth = "calc(130px + 20vw)";
  nextImageStyle.maxHeight = "calc(130px + 20vw)";
  mainImageStyle.width = `calc(129px + 20vw  - ${calculatedNumber}px)`;
  mainImageStyle.height = `calc(129px + 20vw - ${calculatedNumber}px)`;
  mainImageStyle.filter = `grayscale(${
    (window.innerWidth * calculatedNumber) / 326
  }%)`;
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

menuButton.addEventListener("click", toggleMenuHandler);
innerCarousel.addEventListener("mousemove", cursorChangeHandler);
innerCarousel.addEventListener("click", recordsWithCursorMoveHandler);
innerCarousel.addEventListener("touchmove", recordsMoveAnimation, {
  passive: true,
});
innerCarousel.addEventListener("touchend", recordsSlideHandler, {
  passive: true,
});
recordsLoadHandler();
