import React from "react";
import { useState } from "react";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState("");
  const [status, setStatus] = useState("");

  function calculateBMI(e) {
    e.preventDefault();
    if (weight === "" || height === "" || !setBmiResult) {
    }
    let bmi = Number(weight / (height / 100) ** 2).toFixed(2);
    setBmiResult(bmi);

    let bmiStatus = getStatus(bmi);

    setStatus(bmiStatus);
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
          a measure of body weight based on your height & weight
        </p>
      </div>
      <div className="tool-sub-container">
        <form className="tool-form" onSubmit={calculateBMI}>
          <div className="user-input-entry-div">
            <label className="user-input-label">Height (cm)</label>
            <input
              className="user-input"
              id="Height "
              type="number"
              placeholder="cm"
              min="100"
              max="300"
              value={height}
              required
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="user-input-entry-div">
            <label className="user-input-label">Weight (kg)</label>
            <input
              className="user-input"
              id="Weight"
              type="number"
              placeholder="kg"
              min="1"
              max="300"
              value={weight}
              required
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="calculation-div">
            <button className="tool-btn" type="submit">
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
        <div className="bmi-status-div">
          <h4>Comapre Your Results</h4>
          <span>
            Below 18.5 : <span>Underweight</span>
          </span>
          <span>
            18.5—24.9 : <span>Healthy</span>
          </span>
          <span>
            25.0—29.9 : <span>Overweight</span>
          </span>
          <span>
            Above 30 : <span>Obese</span>
          </span>
        </div>
      </div>
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
