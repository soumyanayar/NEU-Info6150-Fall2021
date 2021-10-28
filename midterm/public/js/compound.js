const contributionType = document.getElementsByName("term-type");
const deposit = document.querySelector("#deposit-input");
const contribution = document.querySelector("#contribution-input");
const interestRate = document.querySelector("#apr");
const numberOfTerms = document.querySelector("#terms-input");
const calculateBtn = document.querySelector(".calculate-btn");
const mortgageOutput = document.querySelector(".output");

calculateBtn.disabled = true;

const validateAllInputsArePresent = () => {
  if (
    deposit.value !== "" &&
    contribution.value !== "" &&
    interestRate.value !== ""
  ) {
    calculateBtn.disabled = false;
  } else {
    calculateBtn.disabled = true;
  }
  if (deposit.value < 0) {
    deposit.value = "";
  }
  if (contribution.value < 0) {
    contribution.value = "";
  }
  if (interestRate.value >= 100) {
    interestRate.value = "";
  }
  if (interestRate.value < 0) {
    interestRate.value = "";
  }
  if (numberOfTerms.value < 1) {
    numberOfTerms.value = "";
  }
  if (parseFloat(deposit.value) < parseFloat(contribution.value)) {
    contribution.value = "";
  }
};

deposit.onkeyup = validateAllInputsArePresent;
contribution.onkeyup = validateAllInputsArePresent;
interestRate.onkeyup = validateAllInputsArePresent;
numberOfTerms.onkeyup = validateAllInputsArePresent;

const calculateMortgage = () => {
  const depositCurrent = parseFloat(deposit.value);
  const contributionCurrent = parseFloat(contribution.value) * 12;
  const currentInterestRate = parseFloat(interestRate.value) / 100;
  const currentnumberOfTerms = parseInt(numberOfTerms.value);
  if (
    isNaN(depositCurrent) ||
    isNaN(contributionCurrent) ||
    isNaN(currentInterestRate)
  ) {
    mortgageOutput.innerHTML = 0;
  } else {
    const paymentTermsPerYear = currentnumberOfTerms * 12;

    const mortgageRatio = currentInterestRate / contributionCurrent;

    let mortgage =
      depositCurrent *
      (1 + mortgageRatio) ** (contributionCurrent * currentnumberOfTerms);
    mortgageOutput.value = mortgage;
  }
};

calculateBtn.addEventListener("click", calculateMortgage);
