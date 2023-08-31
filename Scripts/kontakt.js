import { menuButton, toggleMenuHandler } from "./navigation.js";


const mailForm = document.querySelector("form");
const sendMailButton = mailForm.querySelector("button");

emailjs.init("5GZD6bKI9widLn-mj");

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

menuButton.addEventListener("click", toggleMenuHandler);
mailForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  sendMailButton.addEventListener("click", sendMail);
 
  export { validateEmail, sendMail};