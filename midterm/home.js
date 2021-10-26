const homePrice = parseFloat(document.querySelector("#home-price-input").value);
const downPayment = document.querySelector("#down-payment-input");
const interestRate = document.querySelector("#mrt-interest-input");
const numberOfTerms = document.querySelector("#loan-term-input");
const calculateBtn = document.querySelector(".calculate-btn");

let principleAmount =
  parseFloat(homePrice.innerHTML) - parseFloat(downPayment.innerHTML);
let paymentTermsPerYear = numberOfTerms.innerHTML * 12;

let ratioOfInterestToTerms = interestRate.innerHTML / numberOfTerms.innerHTML;

let ratioOfTermsTopaymentTermsPerYear =
  numberOfTerms.innerHTML / paymentTermsPerYear;

let mortgageNumerator =
  principleAmount *
  ratioOfInterestToTerms *
  (1 + ratioOfInterestToTerms) ** ratioOfTermsTopaymentTermsPerYear;

let mortgageDenominator =
  (1 + ratioOfInterestToTerms) ** (ratioOfTermsTopaymentTermsPerYear - 1);

let mortgage = mortgageNumerator / mortgageDenominator;

const validateHomePriceInput = () => {};

calculateBtn.addEventListener("click", () => {
  console.log(mortgage);
});
