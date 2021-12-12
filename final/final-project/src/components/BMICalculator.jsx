import React from "react";
import { useState } from "react";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);

  function calculateBMI() {
    if (weight === "" || height === "" || !setBmiResult) {
      setError(true);
    }
    let bmi = Number(weight / (height / 100) ** 2).toFixed(2);
    setBmiResult(bmi);

    let bmiStatus = getStatus(bmi);

    setStatus(bmiStatus);
    setError(false);
    setHeight("");
    setWeight("");
  }

  function getStatus(bmi) {
    if (bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi < 24.9) return "Normal";
    else if (bmi >= 25 && bmi < 29.9) return "Overweight";
    else return "Obese";
  }

  return (
    <div className="tool-container">
      <div className="tool-tab-content">
        <p>
          This calculator provides you with your BMI(Body Mass Index), which is
          a measure of body weight based on your hight and weight
        </p>
      </div>
      <form className="tool-form">
        <div className="user-input-entry-div">
          <label className="user-input-label">Height (cm)</label>
          <input
            className="user-input"
            id="Height "
            type="number"
            placeholder="Height in cm"
            min="100"
            max="300"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="user-input-entry-div">
          <label className="user-input-label">Weight (kg)</label>
          <input
            className="user-input"
            id="Weight"
            type="number"
            placeholder="Weight in kg"
            min="1"
            max="300"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="calculation-div">
          <button className="btn-new" type="button" onClick={calculateBMI}>
            Calculate BMI
          </button>
        </div>
        {bmiResult && (
          <div className="result-div">
            <p>Your BMI is: {bmiResult} </p>
            <p>You are currently: {status}</p>
          </div>
        )}
      </form>
      <div className="tool-tab-content">
        <p>
          Studies have shown that a BMI of 25 or more is associated with an
          increased health risk
        </p>
      </div>
    </div>
  );
}

export default BMICalculator;
