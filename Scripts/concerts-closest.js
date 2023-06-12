import {arrayForwardHandler ,arrayBackwardHandler ,allConcerts, concerts } from "./concerts-menu.js";

const buttons = document.querySelector(".buttons");


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

const yearButtonsLoader = () => {
  let years = [];
  allConcerts.forEach((concerts) => {
    years.push(new Date(concerts.date).getFullYear());
  });
  let uniqueYears = [...new Set(years)].sort((a, b) => {
    return a - b;
  });
  let index = uniqueYears.indexOf(new Date().getFullYear()) - 1;
  for(let i = 0; i < 3; i++){
    let button = document.createElement("button");
    button.classList.add("white");
    button.textContent = uniqueYears[index + i];
    buttons.appendChild(button);
  }
};

closestConcertHandler();
yearButtonsLoader();
