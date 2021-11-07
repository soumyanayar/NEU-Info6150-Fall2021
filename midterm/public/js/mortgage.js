const homePrice = document.querySelector("#home-price-input");
const downPayment = document.querySelector("#down-payment-input");
const interestRate = document.querySelector("#mrt-interest-input");
const numberOfTerms = document.querySelector("#loan-term-input");
const calculateBtn = document.querySelector(".calculate-btn");
const mortgageOutput = document.querySelector(".output");
const mortgageForm = document.getElementById("mortgage-form");
mortgageForm.onsubmit = (event) => {
  event.preventDefault();
  calculateMortgage();
  return false;
};

downPayment.addEventListener("change", (event) => {
  if (parseFloat(homePrice.value) < parseFloat(downPayment.value)) {
    downPayment.setCustomValidity(
      "Down Payment cannot be greater than Home Price"
    );
    mortgageOutput.value = "";
  }
});

homePrice.addEventListener("change", (event) => {
  if (!isNaN(downPayment.value)) {
    if (parseFloat(homePrice.value) < parseFloat(downPayment.value)) {
      homePrice.setCustomValidity(
        "Home Price cannot be lesser than Down Payment"
      );
      autoloanOutput.value = "";
    }
  }
});

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
    mortgageOutput.innerHTML = "";
  } else {
    const principleAmount = homePriceCurrent - downPaymentCurrent;
    const paymentTermsPerYear = currentNumberOfTerms * 12;

    const mortgageNumerator =
      currentInterestRate * (1 + currentInterestRate) ** paymentTermsPerYear;

    const mortgageDenominator =
      (1 + currentInterestRate) ** paymentTermsPerYear - 1;

    let mortgage = principleAmount * (mortgageNumerator / mortgageDenominator);
    mortgageOutput.value = mortgage.toFixed(2);
  }
};
