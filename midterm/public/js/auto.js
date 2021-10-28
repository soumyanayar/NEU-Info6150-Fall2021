const carPrice = document.querySelector("#car-price");
const downPayment = document.querySelector("#car-down-payment");
const interestRate = document.querySelector("#car-apr");
const numberOfMonths = document.querySelector("#loan-months");
const calculateBtn = document.querySelector(".calculate-btn");
const creditScore = document.querySelector("credit-score");
const mortgageOutput = document.querySelector(".output");

calculateBtn.disabled = true;

const validateAllInputsArePresent = () => {
  if (
    carPrice.value !== "" &&
    downPayment.value !== "" &&
    interestRate.value !== ""
  ) {
    calculateBtn.disabled = false;
  } else {
    calculateBtn.disabled = true;
  }
  if (carPrice.value < 0) {
    carPrice.value = "";
  }
  if (downPayment.value < 0) {
    downPayment.value = "";
  }
  if (interestRate.value >= 100) {
    interestRate.value = "";
  }
  if (interestRate.value < 0) {
    interestRate.value = "";
  }
  if (numberOfMonths.value < 1) {
    numberOfMonths.value = "";
  }
  if (parseFloat(carPrice.value) < parseFloat(downPayment.value)) {
    downPayment.value = "";
  }
};

carPrice.onkeyup = validateAllInputsArePresent;
downPayment.onkeyup = validateAllInputsArePresent;
interestRate.onkeyup = validateAllInputsArePresent;

const calculateMortgage = () => {
  const carPriceCurrent = parseFloat(carPrice.value);
  const downPaymentCurrent = parseFloat(downPayment.value);
  const currentInterestRate = parseFloat(interestRate.value) / 1200;
  const currentnumberOfMonths = parseInt(numberOfMonths.value);
  if (
    isNaN(carPriceCurrent) ||
    isNaN(downPaymentCurrent) ||
    isNaN(currentInterestRate)
  ) {
    mortgageOutput.innerHTML = 0;
  } else {
    const principleAmount = carPriceCurrent - downPaymentCurrent;
    const paymentTermsPerYear = currentnumberOfMonths * 12;

    const mortgageNumerator =
      currentInterestRate * (1 + currentInterestRate) ** paymentTermsPerYear;

    const mortgageDenominator =
      (1 + currentInterestRate) ** paymentTermsPerYear - 1;

    let mortgage = principleAmount * (mortgageNumerator / mortgageDenominator);
    mortgageOutput.value = mortgage;
  }
};

calculateBtn.addEventListener("click", calculateMortgage);
