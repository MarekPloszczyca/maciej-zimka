import {
  arrayForwardHandler,
  arrayBackwardHandler,
  allConcerts,
  concerts,
} from "./concerts-menu.js";

const buttons = document.querySelector(".buttons");
const dateArrows = document.querySelectorAll(".date-buttons ion-icon");
const gridTable = document.querySelector(".archive");

let uniqueYears, yearConcerts, index;

const closestConcertHandler = () => {
  const closest = concerts[0];
  let day = document.querySelector(".schedule .tablet-hidden");
  let moreInfo = document.querySelectorAll(".schedule p");
  let addressInfo = document.querySelectorAll(".place");
  const date = new Date(concerts[0].date).getDay();
  const dayOfWeek = {
    0: "Niedziela",
    1: "Poniedziałek",
    2: "Wtorek",
    3: "Środa",
    4: "Czwartek",
    5: "Piątek",
    6: "Sobota",
  
  };
  moreInfo[0].textContent = closest.date;
  day.textContent = dayOfWeek[date].toUpperCase();
  moreInfo[2].textContent = closest.title;
  addressInfo[0].textContent = closest.city.toUpperCase();
  addressInfo[1].textContent = closest.place.toUpperCase();
  addressInfo[2].textContent = closest.street.toUpperCase();
  moreInfo[4].textContent = "GODZ. " + `${closest.time}`;
  moreInfo[5].textContent = closest.artists;
};

const yearsReload = () => {
  const buttonsArray = buttons.querySelectorAll("button");
  for (let i = 0; i < 3; i++) {
    buttonsArray[i].textContent = uniqueYears[index + i];
  }
  hidingButtonsHandler(buttonsArray);
};

const yearButtonsLoader = () => {
  let years = [];
  allConcerts.forEach((concerts) => {
    years.push(new Date(concerts.date).getFullYear());
  });
  uniqueYears = [...new Set(years)].sort((a, b) => {
    return a - b;
  });

  index = uniqueYears.indexOf(new Date().getFullYear()) - 1;
  for (let i = 0; i < 3; i++) {
    let button = document.createElement("button");
    button.classList.add("white");
    i % 2 === 0
      ? button.classList.add("tablet-hidden")
      : button.classList.add("main-year");

    button.textContent = uniqueYears[index + i];
    buttons.appendChild(button);
    if (i == 0) {
      button.addEventListener("click", () => {
        arrayBackwardHandler(uniqueYears);
        arrayBackwardHandler(yearConcerts);
        yearsReload();
        concertsAppender();
      });
    }
    if (i == 2) {
      button.addEventListener("click", () => {
        arrayForwardHandler(uniqueYears);
        arrayForwardHandler(yearConcerts);
        yearsReload();
        concertsAppender();
      });
    }
  }
};

const concertsAssignHandler = () => {
  yearConcerts = uniqueYears.map(() => new Array());
  const sortedConcerts = allConcerts.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  let i = 0;
  sortedConcerts.forEach((concert, index) => {
    yearConcerts[i].push(concert);
    if (
      index + 1 < sortedConcerts.length &&
      new Date(concert.date).getFullYear() !==
        new Date(sortedConcerts[index + 1].date).getFullYear()
    ) {
      i++;
    }
  });
};

const infoRemoval = () => {
  while (gridTable.firstChild) gridTable.removeChild(gridTable.firstChild);
};

const concertsAppender = () => {
  infoRemoval();
  for (let i = 0; i < yearConcerts[index + 1].length; i++) {
    const container = document.createElement("div");
    const dateContainer = document.createElement("div");
    const day = document.createElement("p");
    const month = document.createElement("p");
    const info = document.createElement("div");
    const place = document.createElement("p");
    const name = document.createElement("p");

    const transletedMonth = {
      0: "STY",
      1: "LUT",
      2: "MAR",
      3: "KWI",
      4: "MAJ",
      5: "CZE",
      6: "LIP",
      7: "SIE",
      8: "WRZ",
      9: "PAŹ",
      10: "LIS",
      11: "GRU",
    };

    container.classList.add("centered", "underscored", "archive-grid");
    if (i == 1) {
      container.classList.add("grid-2");
    }
    dateContainer.classList.add("first-word", "centered", "white", "date");
    place.classList.add("white");
    name.classList.add("colored");

    day.textContent = new Date(yearConcerts[index + 1][i].date).getDate();
    month.textContent =
      transletedMonth[new Date(yearConcerts[index + 1][i].date).getMonth()];
    place.textContent = yearConcerts[index + 1][i].city.toUpperCase();
    name.textContent = yearConcerts[index + 1][i].title;
    gridTable.append(container);
    container.append(dateContainer);
    dateContainer.append(day);
    dateContainer.append(month);
    container.append(info);
    info.append(place);
    info.append(name);
  }
};

closestConcertHandler();
yearButtonsLoader();
concertsAssignHandler();
concertsAppender();

const firstYear = uniqueYears[0];
const lastYear = uniqueYears[uniqueYears.length - 1];
const mainYear = document.querySelector(".main-year");

const hidingButtonsHandler = (array) => {
  if (firstYear.toString() === mainYear.textContent) {
    dateArrows[0].classList.add("non-clickable");
    return array[0].classList.add("non-clickable");
  }
  if (lastYear.toString() === mainYear.textContent) {
    dateArrows[1].classList.add("non-clickable");
    return array[2].classList.add("non-clickable");
  } else {
    dateArrows[0].classList.remove("non-clickable");
    array[0].classList.remove("non-clickable");
    dateArrows[1].classList.remove("non-clickable");
    return array[2].classList.remove("non-clickable");
  }
};

dateArrows[0].addEventListener("click", () => {
  arrayBackwardHandler(uniqueYears);
  arrayBackwardHandler(yearConcerts);
  yearsReload();
  concertsAppender();
});
dateArrows[1].addEventListener("click", () => {
  arrayForwardHandler(uniqueYears);
  arrayForwardHandler(yearConcerts);
  yearsReload();
  concertsAppender();
});
