import React from "react";
import { useState } from "react";

const CalorieConsumption = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("1");
  const [activity, setActivity] = useState("1");
  const [caloriesToConsume, setCaloriesToConsume] = useState("");
  const calculateCaloriesToConsume = () => {
    let bmr;
    if (gender === "1") {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    } else {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    }
    setCaloriesToConsume(bmr * activity);
  };

  return (
    <div className="tool-container">
      <div className="tool-tab-content">
        <p>
          Find out how many calories you should consume everyday based on your
          weight and activity level
        </p>
      </div>
      <form className="tool-form">
        <div className="bmr-div">
          <div className="user-input-entry-div">
            <label className="user-input-label">Gender</label>
            <div className="gender-div">
              <label className="user-input-label">Female</label>
              <input
                type="radio"
                className="user-input-radio-btn"
                name="gender"
                value="1"
                onChange={(e) => setGender(e.target.value)}
              />
              <label className="user-input-label">Male</label>
              <input
                type="radio"
                className="user-input-radio-btn"
                name="gender"
                value="2"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>

          <div className="user-input-entry-div">
            <label className="user-input-label">Age (years)</label>
            <input
              className="user-input"
              type="number"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
          </div>
          <div className="user-input-entry-div">
            <label className="user-input-label">Height (cm)</label>
            <input
              className="user-input"
              id="Height "
              type="number"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
          </div>
          <div className="user-input-entry-div">
            <label className="user-input-label">Weight (kg)</label>
            <input
              className="user-input"
              id="Weight "
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>
          <div className="user-input-entry-div">
            <select
              className="user-input"
              name="activity"
              value={activity}
              onChange={(e) => setActivity(parseFloat(e.target.value))}
            >
              <option value="1">Select Your Activity</option>
              <option value="1.2">Very little</option>
              <option value="1.375">Light Activity</option>
              <option value="1.55">Moderately Active</option>
              <option value="1.72">Very Active</option>
              <option value="1.9">Extremely Active</option>
            </select>
          </div>
          <div className="calculation-div">
            <button
              className="btn-new"
              type="button"
              onClick={calculateCaloriesToConsume}
            >
              Calculate Calories
            </button>
            {caloriesToConsume && (
              <div className="result-div">
                <p>Your calorie Consumption per day is: {caloriesToConsume} </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CalorieConsumption;
