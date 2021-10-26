const homePrice = document.querySelector("#home-price-input");
const downPayment = document.querySelector("#down-payment-input");
const interestRate = document.querySelector("#mrt-interest-input");
const numberOfTerms = document.querySelector("#loan-term-input");
const calculateBtn = document.querySelector(".calculate-btn");

function validateInput() {
  homePrice.style.backgroundColor = "red";
}

calculateBtn.addEventListener("click", () => {
  let homePriceCurrent = parseFloat(homePrice.value);
  let downPaymentCurrent = parseFloat(downPayment.value);
  let currentInterestRate = parseFloat(interestRate.value);
  let currentNumberOfTerms = parseInt(numberOfTerms.value);
  console.log(
    homePriceCurrent,
    downPaymentCurrent,
    currentInterestRate,
    currentNumberOfTerms
  );
  let principleAmount = homePriceCurrent - downPaymentCurrent;
  let paymentTermsPerYear = currentNumberOfTerms * 12;

  let ratioOfInterestToTerms = currentInterestRate / currentNumberOfTerms;

  let ratioOfTermsTopaymentTermsPerYear =
    currentNumberOfTerms / paymentTermsPerYear;

  let mortgageNumerator =
    principleAmount *
    ratioOfInterestToTerms *
    (1 + ratioOfInterestToTerms) ** ratioOfTermsTopaymentTermsPerYear;

  let mortgageDenominator =
    (1 + ratioOfInterestToTerms) ** (ratioOfTermsTopaymentTermsPerYear - 1);

  let mortgage = mortgageNumerator / mortgageDenominator;
  console.log(mortgage);
});
