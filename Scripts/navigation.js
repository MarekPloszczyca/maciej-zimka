emailjs.init("5GZD6bKI9widLn-mj");

const menuButton = document.querySelector(".menu-icon");
const burgerMenu = document.querySelector(".hidden");
const content = document.querySelector(".container");
const visibleConcerts = document.querySelectorAll(".single-concert");
const datesBackButton = document.querySelector(".back");
const datesForwardButton = document.querySelector(".forward");
const recordsArray = Array.from(document.querySelectorAll(".record"));
const outerCarousel = document.querySelector(".carousel");
const innerCarousel = document.querySelector(".inner-carousel");
const title = document.querySelector("h5");
const description = document.querySelector(".description");
const text = description.querySelectorAll("p");
const mailForm = document.querySelector("form");
const sendMailButton = mailForm.querySelector("button");

class Concert {
  constructor(date, title, band, place) {
    this.date = date;
    this.title = title;
    this.band = band;
    this.place = place;
  }
}

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

let concerts = [
  new Concert("2024.02.01", "Concert for a poems", "Duo Ardente", "Cracow"),
  new Concert("1992.12.21", "Concert v2", "Quasi una Fantasia", "Warsaw"),
  new Concert("2023.04.25", "SDSAD", "sAd", "myślenice"),
  new Concert("2024.11.20", "Concert v3", "SOAD", "Berlin"),
  new Concert("2027.12.02", "XXXX", "Duo", "Somewhere"),
  new Concert("2023.01.26", "SDSAD", "sAd", "myslenice"),
  new Concert("2025.12.26", "SDSssdsdAD", "svbgh", "fdge"),
  new Concert("2030.11.26", "asdasd", "sdffd", "ghhge"),
]
  .filter((single) => {
    return (
      new Date() < new Date(single.date) ||
      new Date().toDateString() === new Date(single.date).toDateString()
    );
  })
  .sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

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

const toggleMenuHandler = () => {
  menuButton.classList.toggle("change");
  content.classList.toggle("hidden");
  burgerMenu.classList.toggle("hidden");
};

const datesLoadHandler = () => {
  for (let i = 0; i < 3; i++) {
    visibleConcerts[i].children[0].textContent = concerts[i].date;
    visibleConcerts[i].children[1].textContent = concerts[i].title;
    visibleConcerts[i].children[2].textContent = concerts[i].band;
    visibleConcerts[i].children[3].textContent = `- ${concerts[
      i
    ].place.toUpperCase()} -`;
  }
};

const arrayBackwardHandler = (array) => {
  let element = array.pop();
  array.unshift(element);
};
const arrayForwardHandler = (array) => {
  let element = array.shift();
  array.push(element);
};

const dateSwipeAnimation = (direction) => {
  visibleConcerts.forEach((single) => {
    single.classList.add("swipe");
    single.style.setProperty("--direction", direction);
    setTimeout(() => {
      single.classList.remove("swipe");
    }, 1000);
  });
};

const datesMoveHandler = (evt) => {
  datesForwardButton.removeEventListener("click", datesMoveHandler);
  datesBackButton.removeEventListener("click", datesMoveHandler);
  if (evt.target.className.includes("back")) {
    arrayBackwardHandler(concerts);
    dateSwipeAnimation("-40rem");
  } else {
    arrayForwardHandler(concerts);
    dateSwipeAnimation("40rem");
  }
  setTimeout(() => {
    datesForwardButton.addEventListener("click", datesMoveHandler);
    datesBackButton.addEventListener("click", datesMoveHandler);
  }, 1000);
  datesLoadHandler();
};

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
  mainImageStyle.width = `calc(66vw - ${
    (window.innerWidth * calculatedNumber) / 326
  }px)`;
  mainImageStyle.height = `calc(66vw - ${
    (window.innerWidth * calculatedNumber) / 326
  }px)`;
  mainImageStyle.filter = `grayscale(${
    (window.innerWidth * calculatedNumber) / 326
  }%)`;
  title.children[0].textContent = records[2].firstTitle;
  title.children[1].textContent = records[2].secondTitle;
  text[0].textContent = records[2].date;
  text[1].textContent = records[2].publisher;
  if (numberOfPageX > 0) {
    nextImageStyle.width = `calc(34vw + ${
      (0.7 * window.innerWidth * calculatedNumber) / 326
    }px)`;
    nextImageStyle.height = `calc(34vw + ${
      (0.7 * window.innerWidth * calculatedNumber) / 326
    }px)`;
    nextImageStyle.filter = `grayscale(${
      100 - (window.innerWidth * calculatedNumber) / 326
    }%)`;

    if (recordsArray[3].children[0].clientWidth >= window.innerWidth * 0.66) {
      recordsNameHandler(3);
    }
  }
  if (numberOfPageX < 0) {
    previousImageStyle.width = `calc(34vw + ${
      (0.7 * window.innerWidth * calculatedNumber) / 326
    }px)`;
    previousImageStyle.height = `calc(34vw + ${
      (0.7 * window.innerWidth * calculatedNumber) / 326
    }px)`;
    previousImageStyle.filter = `grayscale(${
      100 - (window.innerWidth * calculatedNumber) / 326
    }%)`;
    if (recordsArray[1].children[0].clientWidth >= window.innerWidth * 0.66) {
      recordsNameHandler(1);
    }
  }
  console.log(
    recordsArray[1].children[0].clientWidth,
    window.innerWidth * 0.66
  );
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
datesLoadHandler();
recordsLoadHandler();

datesBackButton.addEventListener("click", datesMoveHandler);
datesForwardButton.addEventListener("click", datesMoveHandler);
menuButton.addEventListener("click", toggleMenuHandler);
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
