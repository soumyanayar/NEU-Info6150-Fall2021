const principal = document.querySelector("#deposit-input");
const compoundsPerYear = document.querySelector("#contribution-input");
const interestRate = document.querySelector("#apr");
const numberOfTerms = document.querySelector("#terms-input");
const calculateBtn = document.querySelector(".calculate-btn");
const compoundOutput = document.querySelector(".output");
const compundForm = document.getElementById("compound-form");
compundForm.onsubmit = (event) => {
  event.preventDefault();
  calculateCompoundInterest();
  return false;
};

const calculateCompoundInterest = () => {
  const depositCurrent = parseFloat(principal.value);
  const compoundsPerYearCurrent = parseFloat(compoundsPerYear.value) * 12;
  const currentInterestRate = parseFloat(interestRate.value) / 100;
  const currentnumberOfTerms = parseInt(numberOfTerms.value);
  if (
    isNaN(depositCurrent) ||
    isNaN(compoundsPerYearCurrent) ||
    isNaN(currentInterestRate) ||
    isNaN(currentnumberOfTerms)
  ) {
    compoundOutput.innerHTML = "";
  } else {
    const compoundRatio = currentInterestRate / compoundsPerYearCurrent;

    let compundAmount =
      depositCurrent *
      (1 + compoundRatio) ** (compoundsPerYearCurrent * currentnumberOfTerms);
    compoundOutput.value = compundAmount.toFixed(2);
  }
};
