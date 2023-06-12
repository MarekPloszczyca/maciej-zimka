import { menuButton, toggleMenuHandler} from "./navigation.js";
import {
  datesBackButton,
  datesForwardButton,
  arrayBackwardHandler,
  arrayForwardHandler,
  datesMoveHandler
} from "./concerts-menu.js";
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
    "sads"
  ),
  new Record(
    "../Images/Out-of-the-circle.jpg",
    "OutOfTheCircle",
    "OUT OF THE",
    "CIRCLE",
    "2026",
    "sads"
  ),
  new Record(
    "../Images/traum-vogel.jpg",
    "TraumVogel",
    "TRAUM",
    "VOGEL",
    "2023",
    "sads"
  ),
  new Record(
    "../Images/Accochameleon.jpg",
    "Accochameleon",
    "ACCO",
    "CHAMELEON",
    "2021",
    "sads"
  ),
  new Record(
    "../Images/Quasi-una-fantasia.jpg",
    "QuasiUnaFantasia",
    "QUASI UNA",
    "FANTASIA",
    "2024",
    "sads"
  ),
];
let touchstart;
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

const resetStyles = () => {
  mainImageStyle.width = "66vw";
  mainImageStyle.height = "66vw";
  mainImageStyle.filter = "none";
  nextImageStyle.width = "34vw";
  nextImageStyle.height = "34vw";
  nextImageStyle.filter = "grayscale(100%)";
  previousImageStyle.width = "34vw";
  previousImageStyle.height = "34vw";
  previousImageStyle.filter = "grayscale(100%)";
};

const recordsSlideHandler = (event) => {
  resetStyles();
  arrayOfSlide = [];
  innerCarousel.style.right = "0";
  let touchend = event.changedTouches[0].screenX;
  if (touchstart === touchend) return;
  touchstart > touchend
    ? arrayForwardHandler(records)
    : arrayBackwardHandler(records);
  recordsLoadHandler();
};

const recordsMoveAnimation = (event) => {
  arrayOfSlide.push(event.changedTouches[0].pageX);
  let numberOfPageX = arrayOfSlide[0] - arrayOfSlide[arrayOfSlide.length - 1];
  let calculatedNumber = Math.abs(numberOfPageX);
  innerCarousel.style.right = `${numberOfPageX}px`;
  mainImageStyle.width = `calc(66vw - ${calculatedNumber * 0.25}vw)`;
  mainImageStyle.height = `calc(66vw - ${calculatedNumber * 0.25}vw)`;
  mainImageStyle.filter = `grayscale(${
    (window.innerWidth * calculatedNumber) / 326
  }%)`;
  title.children[0].textContent = records[2].firstTitle;
  title.children[1].textContent = records[2].secondTitle;
  text[0].textContent = records[2].date;
  text[1].textContent = records[2].publisher;
  if (numberOfPageX > 0) {
    nextImageStyle.width = `calc(34vw + ${calculatedNumber * 0.25}vw)`;
    nextImageStyle.height = `calc(34vw + ${calculatedNumber * 0.25}vw)`;
    nextImageStyle.filter = `grayscale(${
      100 - (window.innerWidth * calculatedNumber) / 326
    }%)`;
    if (recordsArray[3].children[0].clientWidth > window.innerWidth * 0.755) {
      arrayForwardHandler(records);
      recordsLoadHandler();
      resetStyles();
      arrayOfSlide = [];
      innerCarousel.style.right = "0"; 
    }
  }
  if (numberOfPageX < 0) {
    previousImageStyle.width = `calc(34vw + ${calculatedNumber * 0.25}vw)`;
    previousImageStyle.height = `calc(34vw + ${calculatedNumber * 0.25}vw)`;
    previousImageStyle.filter = `grayscale(${100 - calculatedNumber}%)`;
    if (recordsArray[1].children[0].clientWidth > window.innerWidth * 0.755) {
      arrayBackwardHandler(records);
      recordsLoadHandler();
      resetStyles();
      arrayOfSlide = [];
      innerCarousel.style.right = "0";
    }
  }
};

const validateEmail = (input) => {
  const correctEmailAdress =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return input.match(correctEmailAdress) ? true : false;
};

const sendMail = () => {
  const mailData = {
    email: document.querySelector(`input[type="email"]`).value,
    message: document.querySelector("textarea").value,
  };
  const serviceID = "service_oyz906t";
  const templateID = "template_x2slm9n";
  //if (validateEmail(mailData.email) && mailData.message.trim() !== "") {
  //emailjs
  //.send(serviceID, templateID, mailData)
  //.then(() => {
  document.querySelector(`input[type="email"]`).value = "";
  document.querySelector("textarea").value = "";
  sendMailButton.textContent = "";
  sendMailButton.classList.add("sent-out");
  //})
  //.catch(() => alert("Something went wrong, try again later"));
};
//else return ;
//};

recordsArray.forEach((record) => {
  record.addEventListener("click", recordsMoveHandler);
});
recordsLoadHandler();

menuButton.addEventListener("click", toggleMenuHandler);
datesBackButton.addEventListener("click", datesMoveHandler);
datesForwardButton.addEventListener("click", datesMoveHandler);
innerCarousel.addEventListener(
  "touchstart",
  (event) => {
    return (touchstart = event.changedTouches[0].screenX);
  },
  { passive: true }
);
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
