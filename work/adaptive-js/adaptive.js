let count = 0;
let previous;

const infoReport = document.querySelector(".info__report");
const button = document.querySelector(".add-form__submit");

// Removing the default behavior of form submit inorder to avoid
// form elements being reset
let form = document.querySelector(".add-form");
form.addEventListener("submit", (event) => event.preventDefault());

button.addEventListener("click", () => {
  let labelValue = document.querySelector(".label__input").value;
  if (labelValue) {
    if (labelValue !== previous) {
      count = 0;
    }

    ++count;
    let textChange = document.querySelector(".info__report");
    textChange.innerHTML = `The ${labelValue} has ${count} count`;
    previous = labelValue;
  }
});
