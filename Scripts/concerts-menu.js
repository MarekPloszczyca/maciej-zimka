import { menuButton, toggleMenuHandler } from "./navigation.js";
export {
  datesBackButton,
  datesForwardButton,
  datesLoadHandler,
  arrayBackwardHandler,
  arrayForwardHandler,
  datesMoveHandler,
};

const visibleConcerts = document.querySelectorAll(".single-concert");
const datesBackButton = document.querySelector(".back");
const datesForwardButton = document.querySelector(".forward");

class Concert {
  constructor(date, title, band, city, place, street, time, artists) {
    this.date = date;
    this.title = title;
    this.band = band;
    this.city = city;
    this.place = place;
    this.street = street;
    this.time = time;
    this.artists = artists;
  }
}
let concerts = [
  new Concert(
    "2023.06.19",
    "Concert for a poems",
    "Duo Ardente",
    "Cracow",
    "Kościół pw. św. Katarzyny Aleksandryjskiej",
    "Ul. Augustiańska 7",
    "17:00",
    "Maciej Zimka | Mikołaj Makusiak | Wiesław Ochwat | Ktoś tam"
  ),
  new Concert("1992.12.21", "Concert v2", "Quasi una Fantasia", "Warsaw"),
  new Concert("2023.04.25", "SDSAD", "sAd", "myślenice"),
  new Concert("2024.11.12", "Concert v3", "SOAD", "Berlin"),
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

const datesLoadHandler = () => {
  for (let i = 0; i < 3; i++) {
    visibleConcerts[i].children[0].textContent = concerts[i].date;
    visibleConcerts[i].children[1].textContent = concerts[i].title;
    visibleConcerts[i].children[2].textContent = concerts[i].band;
    visibleConcerts[i].children[3].textContent = `- ${concerts[
      i
    ].city.toUpperCase()} -`;
  }
};

const closestConcertHandler = () => {
  const closest = concerts[0];
  let day = document.querySelector(".schedule .tablet-hidden");
  let moreInfo = document.querySelectorAll(".schedule p");
  let addressInfo = document.querySelectorAll(".place");
  const date = new Date(concerts[0].date).getDay();
  const dayOfWeek = {
    1: "Poniedziałek",
    2: "Wtorek",
    3: "Środa",
    4: "Czwartek",
    5: "Piątek",
    6: "Sobota",
    7: "Niedziela",
  };
  moreInfo[0].textContent = closest.date;
  day.textContent = dayOfWeek[date].toUpperCase();
  moreInfo[3].textContent = closest.title;
  addressInfo[0].textContent = closest.city.toUpperCase();
  addressInfo[1].textContent = closest.place.toUpperCase();
  addressInfo[2].textContent = closest.street.toUpperCase();
  moreInfo[5].textContent = "GODZ. " + `${closest.time}`;
  moreInfo[6].textContent = closest.artists;
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
    dateSwipeAnimation("-10rem");
  } else {
    arrayForwardHandler(concerts);
    dateSwipeAnimation("10rem");
  }
  setTimeout(() => {
    datesForwardButton.addEventListener("click", datesMoveHandler);
    datesBackButton.addEventListener("click", datesMoveHandler);
  }, 1000);
  datesLoadHandler();
};

closestConcertHandler();
datesLoadHandler();
menuButton.addEventListener("click", toggleMenuHandler);
datesBackButton.addEventListener("click", datesMoveHandler);
datesForwardButton.addEventListener("click", datesMoveHandler);
