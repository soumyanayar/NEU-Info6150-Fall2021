const homePrice = document.querySelector("#home-price-input");
const downPayment = document.querySelector("#down-payment-input");
const interestRate = document.querySelector("#mrt-interest-input");
const numberOfTerms = document.querySelector("#loan-term-input");
const calculateBtn = document.querySelector(".calculate-btn");
const mortgageOutput = document.querySelector(".mortgage-output");

//calculateBtn.disabled = true;

const validateAllInputsArePresent = () => {
  // if (
  //   homePrice.value !== "" &&
  //   downPayment.value !== "" &&
  //   interestRate.value !== ""
  // ) {
  //   calculateBtn.disabled = false;
  // } else {
  //   calculateBtn.disabled = true;
  // }
  if (homePrice.value < 0) {
    homePrice.value = "";
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
  if (parseFloat(homePrice.value) < parseFloat(downPayment.value)) {
    downPayment.value = "";
  }
};

homePrice.onkeyup = validateAllInputsArePresent;
downPayment.onkeyup = validateAllInputsArePresent;
interestRate.onkeyup = validateAllInputsArePresent;

const calculateMortgage = () => {
  const homePriceCurrent = parseFloat(homePrice.value);
  const downPaymentCurrent = parseFloat(downPayment.value);
  const currentInterestRate = parseFloat(interestRate.value) / 1200;
  const currentNumberOfTerms = parseInt(numberOfTerms.value);
  if (
    isNaN(homePriceCurrent) ||
    isNaN(downPaymentCurrent) ||
    isNaN(currentInterestRate)
  ) {
    mortgageOutput.innerHTML = 0;
  } else {
    const principleAmount = homePriceCurrent - downPaymentCurrent;
    const paymentTermsPerYear = currentNumberOfTerms * 12;

    const mortgageNumerator =
      currentInterestRate * (1 + currentInterestRate) ** paymentTermsPerYear;

    const mortgageDenominator =
      (1 + currentInterestRate) ** paymentTermsPerYear - 1;

    let mortgage = principleAmount * (mortgageNumerator / mortgageDenominator);
    mortgageOutput.value = mortgage;
  }
};

calculateBtn.addEventListener("click", calculateMortgage);
