import { menuButton, toggleMenuHandler } from "./navigation.js";

const concertsContainer = document.querySelector(".inner-dates");
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

let allConcerts = [
  new Concert(
    "2024.08.19",
    "Concert for a poems",
    "Duo Ardente",
    "Kraków",
    "Kościół pw. św. Katarzyny Aleksandryjskiej",
    "Ul. Augustiańska 7",
    "17:00",
    "Maciej Zimka | Mikołaj Makusiak | Wiesław Ochwat"
  ),
  new Concert(
    "2022.01.04",
    "Recital Magdaleny Cornelius-Kulig: mezzosopran oraz Macieja Zimki",
    "Quasi una Fantasia",
    "Taranto (Włochy)",
    "Kościół San Francesca di Paola"
  ),
  new Concert(
    "2022.01.05",
    "Recital Magdaleny Cornelius-Kulig: mezzosopran oraz Macieja Zimki",
    "Quasi una Fantasia",
    "Conversano (Włochy)",
    "Pinacotca Civica"
  ),
  new Concert(
    "2022.03.05",
    "Recital Magdaleny Cornelius-Kulig: mezzosopran oraz Macieja Zimki",
    "Quasi una Fantasia",
    "Beausoleil (Francja)",
    "Centre Culturel Prince Jacques"
  ),
  new Concert(
    "2022.03.13",
    "Recital Marii Sławek - skrzypce, Maciej Zimka - akordeon",
    "Duo",
    "Warszawa",
    "Dom Polonii"
  ),
  new Concert("2023.01.26", "Recital Marii Sławek - skrzypce, Maciej Zimka - akordeon",
  "Duo",
  "Warszawa",
  "Dom Polonii"),
  new Concert("2022.12.26", "Recital Marii Sławek - skrzypce, Maciej Zimka - akordeon",
  "Duo",
  "Warszawa",
  "Dom Polonii"),
  new Concert("2030.11.26", "Recital Marii Sławek - skrzypce, Maciej Zimka - akordeon",
  "Duo",
  "Warszawa",
  "Dom Polonii"),
  new Concert(
    "2024.02.04",
    "Na drodze do nowej harmonii, koncert z udziałem Macieja Zimki",
    "Maciej Zimka",
    "Sopot",
    "Filharmonia Sopocka",
    "ul. Rzemieślnicza 2",
    "20:45",
    "Maciej Zimka"
  ),
  new Concert(
    "2023.11.17",
    "Na drodze do nowej harmonii, koncert z udziałem Macieja Zimki",
    "Maciej Zimka",
    "Katowice",
    "NOSPR"
  ),
  new Concert(
    "2023.11.11",
    "Na drodze do nowej harmonii, koncert z udziałem Macieja Zimki",
    "Maciej Zimka",
    "Kraków",
    "Filharmonia"
  ),
  new Concert(
    "2023.09.21",
    "Recital Magdaleny Cornelius-Kulig: mezzosopran, Macieja Zimki: akordeon",
    "Quasi una Fantasia",
    "Catania (Włochy)"
  ),
  new Concert("2024.05.21",  "Recital Marii Sławek - skrzypce, Maciej Zimka - akordeon",
  "Duo Ardente",
  "Warszawa",
  "Dom Polonii"),
  new Concert("2024.05.22",  "Na drodze do nowej harmonii, koncert z udziałem Macieja Zimki",
  "Maciej Zimka",
  "Katowice",
  "Filharmonia"),
  new Concert("2024.06.11",  "Na drodze do nowej harmonii, koncert z udziałem Macieja Zimki",
  "Maciej Zimka",
  "Kraków",
  "Filharmonia"),
  new Concert("2024.06.12",  "Na drodze do nowej harmonii, koncert z udziałem Macieja Zimki",
  "Maciej Zimka",
  "Katowice",
  "Filharmonia"),
  new Concert( "2024.05.05",
  "Recital Magdaleny Cornelius-Kulig: mezzosopran oraz Macieja Zimki",
  "Quasi una Fantasia",
  "Beausoleil (Francja)",
  "Centre Culturel Prince Jacques"),
];

let concerts = allConcerts
  .filter((single) => {
    return (
      new Date() < new Date(single.date) ||
      new Date().toDateString() === new Date(single.date).toDateString()
    );
  })
  .sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

const firstConcert = concerts[0];
const lastConcert = concerts[concerts.length - 1];

const hidingButtonsHandler = () => {
  const width = window.innerWidth;
  visibleConcerts[0].children[0].textContent === firstConcert.date
    ? datesBackButton.classList.add("non-clickable")
    : datesBackButton.classList.remove("non-clickable");
  if (
    width < 768 &&
    visibleConcerts[0].children[0].textContent === lastConcert.date
  ) {
    return datesForwardButton.classList.add("non-clickable");
  }
  if (
    width >= 768 &&
    width < 1200 &&
    visibleConcerts[1].children[0].textContent === lastConcert.date
  ) {
    return datesForwardButton.classList.add("non-clickable");
  }
  if (
    width >= 1200 &&
    visibleConcerts[2].children[0].textContent === lastConcert.date
  ) {
    return datesForwardButton.classList.add("non-clickable");
  } else {
    return datesForwardButton.classList.remove("non-clickable");
  }
};

const datesLoadHandler = () => {
  for (let i = 0; i < 3; i++) {
    visibleConcerts[i].children[0].textContent = concerts[i].date;
    visibleConcerts[i].children[1].textContent = concerts[i].title;
    visibleConcerts[i].children[2].textContent = concerts[i].band;
    visibleConcerts[i].children[3].textContent = `- ${concerts[
      i
    ].city.toUpperCase()} -`;
  }
  hidingButtonsHandler();
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

const togglingListenersHandler = (removed) => {
  if (!removed) {
    datesForwardButton.removeEventListener("click", datesOnClickMoveHandler);
    datesBackButton.removeEventListener("click", datesOnClickMoveHandler);
    concertsContainer.removeEventListener("touchstart", datesTouch, {
      passive: true,
    });
    concertsContainer.removeEventListener("touchend", datesTouch, {
      passive: true,
    });
    concertsContainer.removeEventListener("touchmove", datesOnTouchHandler, {
      passive: true,
    });
  } else {
    setTimeout(() => {
      datesForwardButton.addEventListener("click", datesOnClickMoveHandler);
      datesBackButton.addEventListener("click", datesOnClickMoveHandler);
      concertsContainer.addEventListener("touchstart", datesTouch, {
        passive: true,
      });
      concertsContainer.addEventListener("touchend", datesTouch, {
        passive: true,
      });
      concertsContainer.addEventListener("touchmove", datesOnTouchHandler, {
        passive: true,
      });
    }, 1000);
  }
};

const datesOnClickMoveHandler = (evt) => {
  togglingListenersHandler(false);
  if (evt.target.className.includes("back")) {
    arrayBackwardHandler(concerts);
    dateSwipeAnimation("-10rem");
  } else {
    arrayForwardHandler(concerts);
    dateSwipeAnimation("10rem");
  }
  togglingListenersHandler(true);
  datesLoadHandler();
};

let arrayOfDatesSlide = [];
let slideNumber;

const datesOnTouchHandler = (event) => {
  arrayOfDatesSlide.push(event.changedTouches[0].pageX);
  slideNumber =
    arrayOfDatesSlide[0] - arrayOfDatesSlide[arrayOfDatesSlide.length - 1];
  if (slideNumber > 100 || slideNumber < -100) {
    return slideNumber;
  }
  concertsContainer.style.right = `${slideNumber}px`;
  return slideNumber;
};

const datesTouch = (evt) => {
  const width = window.innerWidth;
  if (evt.type === "touchstart") {
    datesBackButton.classList.add("non-clickable");
    datesForwardButton.classList.add("non-clickable");
  }
  if (evt.type === "touchend") {
    if (
      (width < 768 &&
        visibleConcerts[0].children[0].textContent === firstConcert.date &&
        slideNumber < 0) ||
      (width < 768 &&
        visibleConcerts[0].children[0].textContent === lastConcert.date &&
        slideNumber > 0)
    ) {
      hidingButtonsHandler();
      return (concertsContainer.style.right = "0");
    }
    if (
      (width >= 768 &&
        visibleConcerts[0].children[0].textContent === firstConcert.date &&
        slideNumber < 0) ||
      (width >= 768 &&
        visibleConcerts[1].children[0].textContent === lastConcert.date &&
        slideNumber > 0)
    ) {
      hidingButtonsHandler();
      return (concertsContainer.style.right = "0");
    }
    if (slideNumber === 0) {
      return hidingButtonsHandler();
    }

    datesOnTouchMoveHandler();
  }
  concertsContainer.style.right = "0";
  arrayOfDatesSlide = [];
  slideNumber = 0;
};

const datesOnTouchMoveHandler = () => {
  togglingListenersHandler(false);
  if (slideNumber <= 0) {
    arrayBackwardHandler(concerts);
    dateSwipeAnimation("-10rem");
  } else {
    arrayForwardHandler(concerts);
    dateSwipeAnimation("10rem");
  }
  togglingListenersHandler(true);
  datesLoadHandler();
};

datesLoadHandler();
menuButton.addEventListener("click", toggleMenuHandler);
concertsContainer.addEventListener("touchstart", datesTouch, {
  passive: true,
});
concertsContainer.addEventListener("touchend", datesTouch, {
  passive: true,
});
concertsContainer.addEventListener("touchmove", datesOnTouchHandler, {
  passive: true,
});
datesBackButton.addEventListener("click", datesOnClickMoveHandler);
datesForwardButton.addEventListener("click", datesOnClickMoveHandler);


export {
  allConcerts,
  concerts,
  datesBackButton,
  datesForwardButton,
  datesLoadHandler,
  arrayBackwardHandler,
  arrayForwardHandler,
  datesOnClickMoveHandler as datesMoveHandler,
};
