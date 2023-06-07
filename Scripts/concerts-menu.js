export {visibleConcerts, datesBackButton, datesForwardButton, Concert, concerts,datesLoadHandler,arrayBackwardHandler, arrayForwardHandler, dateSwipeAnimation,datesMoveHandler};

const visibleConcerts = document.querySelectorAll(".single-concert");
const datesBackButton = document.querySelector(".back");
const datesForwardButton = document.querySelector(".forward");

class Concert {
  constructor(date, title, band, place) {
    this.date = date;
    this.title = title;
    this.band = band;
    this.place = place;
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

datesLoadHandler();
datesBackButton.addEventListener("click", datesMoveHandler);
datesForwardButton.addEventListener("click", datesMoveHandler);
