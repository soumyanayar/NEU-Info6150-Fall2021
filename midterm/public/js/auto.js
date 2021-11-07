const carPrice = document.querySelector("#car-price");
const downPayment = document.querySelector("#car-down-payment");
const interestRate = document.querySelector("#car-apr");
const numberOfMonths = document.querySelector("#loan-months");
const calculateBtn = document.querySelector(".calculate-btn");
const autoloanOutput = document.querySelector(".output");
const autoloanForm = document.getElementById("auto-form");
autoloanForm.onsubmit = (event) => {
  event.preventDefault();
  calculateCarLoan();
  return false;
};

downPayment.addEventListener("change", (event) => {
  if (parseFloat(carPrice.value) < parseFloat(downPayment.value)) {
    downPayment.setCustomValidity(
      "Down Payment cannot be greater than Car Price"
    );
    autoloanOutput.value = "";
  }
});

carPrice.addEventListener("change", (event) => {
  if (!isNaN(downPayment.value)) {
    if (parseFloat(carPrice.value) < parseFloat(downPayment.value)) {
      carPrice.setCustomValidity(
        "Car Price cannot be lesser than Down Payment"
      );
      autoloanOutput.value = "";
    }
  }
});

const calculateCarLoan = () => {
  const carPriceCurrent = parseFloat(carPrice.value);
  const downPaymentCurrent = parseFloat(downPayment.value);
  const currentInterestRate = parseFloat(interestRate.value) / 1200;
  const currentnumberOfMonths = parseInt(numberOfMonths.value);
  if (
    isNaN(carPriceCurrent) ||
    isNaN(downPaymentCurrent) ||
    isNaN(currentInterestRate) ||
    isNaN(currentnumberOfMonths)
  ) {
    autoloanOutput.value = "";
  } else {
    const principleAmount = carPriceCurrent - downPaymentCurrent;
    const paymentTermsPerYear = currentnumberOfMonths * 12;

    const autoloanNumerator =
      currentInterestRate * (1 + currentInterestRate) ** paymentTermsPerYear;

    const autoloanDenominator =
      (1 + currentInterestRate) ** paymentTermsPerYear - 1;

    let autoloanAmount =
      principleAmount * (autoloanNumerator / autoloanDenominator);
    autoloanOutput.value = autoloanAmount.toFixed(2);
  }
};
