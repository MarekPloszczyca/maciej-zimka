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
    "2020",
    "sads"
  ),
  new Record(
    "../Images/Out-of-the-circle.jpg",
    "OutOfTheCircle",
    "OUT OF THE",
    "CIRCLE",
    "2020",
    "sads"
  ),
  new Record(
    "../Images/traum-vogel.jpg",
    "TraumVogel",
    "TRAUM",
    "VOGEL",
    "2020",
    "sads"
  ),
  new Record(
    "../Images/Accochameleon.jpg",
    "Accochameleon",
    "ACCO",
    "CHAMELEON",
    "2020",
    "sads"
  ),
  new Record(
    "../Images/Quasi-una-fantasia.jpg",
    "QuasiUnaFantasia",
    "QUASI UNA",
    "FANTASIA",
    "2020",
    "sads"
  ),
];

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

const recordsLoadHandler = () => {
  for (let i = 0; i < 5; i++) {
    const img = recordsArray[i].querySelector("img");
    img.src = records[i].imageURL;
    img.alt = records[i].alternative;
    if (i == 2) {
      const title = document.querySelector("h5");
      const description = document.querySelector(".description");
      const text = description.querySelectorAll("p");
      title.children[0].textContent = records[i].firstTitle;
      title.children[1].textContent = records[i].secondTitle;
      text[0].textContent = records[i].date;
      text[1].textContent = records[i].publisher;
    }
  }
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
innerCarousel.addEventListener("touchmove", (event) => {
  console.log(innerCarousel.style.transform = "translateX(45px)");
  console.log(event.changedTouches[0].pageX);
}, {passive: true});
innerCarousel.addEventListener("touchend",() => {
  console.log(innerCarousel.style.transform = "translateX(0)");
}, {passive: true});
mailForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
sendMailButton.addEventListener("click", sendMail);
