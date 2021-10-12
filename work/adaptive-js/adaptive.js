let count = 0;
let previous;

// Removing the default behavior of form submit inorder to avoid
// form elements being reset
let form = document.querySelector(".add-form");
form.addEventListener("submit", (event) => event.preventDefault());

const infoReport = document.querySelector(".info__report");
let button = document.querySelector(".add-form__submit");

button.disabled = true;
let textBox = document.querySelector(".label__input");
let infoText = document.querySelector(".info__report");
let infoTextDefaultValue = infoText.textContent;

textBox.addEventListener("keyup", () => {
  if (textBox.value !== "") {
    button.disabled = false;
  } else {
    button.disabled = true;
    infoText.innerHTML = infoTextDefaultValue;
    count = 0;
  }
});

button.addEventListener("click", () => {
  let textBoxValue = textBox.value.trim();
  if (textBoxValue) {
    if (textBoxValue !== previous) {
      count = 0;
    }

    ++count;
    infoText.innerHTML = `The count for ${textBoxValue} is ${count}`;
    previous = textBoxValue;
  }
});
