import React from "react";
import { useState } from "react";

function WaistHipRatio() {
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState("");
  const [gender, setGender] = useState("1");
  const [status, setStatus] = useState("");

  function calculateBMI(e) {
    e.preventDefault();
    let ratio = Number(waist / hip).toFixed(2);
    setResult(ratio);

    let status = getStatus(ratio);
    setStatus(status);
    setHip("");
    setWaist("");
  }

  function getStatus(result) {
    if (gender === "1" && result > 0.8) return "High Health Risks";
    else if (gender === "1" && result < 0.8) return "Low Health Risks";
    else if (gender === "2" && result > 0.95) return "High Health Risks";
    else if (gender === "2" && result > 0.95) return "Low Health Risks";
  }

  return (
    <div className="tool-container">
      <div className="tool-tab-content">
        <p>
          Waist Hip Ratio indicates your body shape, which indicates the
          potential health risks.
        </p>
      </div>
      <form className="tool-form-new" onSubmit={calculateBMI}>
        <div className="bmr-div">
          <div className="user-input-entry-div">
            <label className="user-input-label">Gender</label>
            <div className="gender-div">
              <label className="user-input-gender-label">Female</label>
              <input
                type="radio"
                className="user-input-radio-btn"
                name="gender"
                value="1"
                required
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="user-input-gender-label">Male</label>
              <input
                type="radio"
                className="user-input-radio-btn"
                name="gender"
                value="2"
                required
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
          <div className="user-input-entry-div">
            <label className="user-input-label">Waist (cm)</label>
            <input
              className="user-input"
              type="number"
              placeholder="cm"
              min="100"
              max="300"
              value={waist}
              required
              onChange={(e) => setWaist(e.target.value)}
            />
          </div>
          <div className="user-input-entry-div">
            <label className="user-input-label">Hip (cm)</label>
            <input
              className="user-input"
              type="number"
              placeholder="cm"
              min="1"
              max="300"
              value={hip}
              required
              onChange={(e) => setHip(e.target.value)}
            />
          </div>
        </div>
        <div className="calculation-div">
          <button className="tool-btn" type="submit" aria-label="calculate">
            Calculate Ratio
          </button>
        </div>
        {result && (
          <div className="result-div">
            <p>Your Waist Hip ratio is : {result}</p>
            <p>{status}</p>
          </div>
        )}
      </form>
      <div className="tool-tab-content">
        <p>
          In order to calculate the right hip and waist ratio, measurement of
          hip and waist must be taken from narrowest and widest points
          respectively
        </p>
      </div>
    </div>
  );
}

export default WaistHipRatio;
