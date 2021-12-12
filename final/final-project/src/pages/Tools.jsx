import { useState } from "react";
import BMICalculator from "../components/BMICalculator";
import CalorieConsumption from "../components/CalorieConsumption";
import WaistHipRatio from "../components/WaistHipRatio";
function Tools() {
  const [toggleTabs, setToggleTabs] = useState(1);

  const toggleTab = (tabNumber) => {
    setToggleTabs(tabNumber);
  };

  return (
    <div className="main-div">
      <h2 className="section-title">TOOLS AND CALCULATORS</h2>
      <div className="introduction">
        <p>
          Try out the Calculators of Calorie Visualiser, more interactive and
          helps you find out more about your health.
        </p>
      </div>
      <div className="tool-tabs-container">
        <div className="tool-tabs-div">
          <button
            className={
              toggleTabs === 1 ? "tools-tabs current-tools-tab" : "tools-tabs"
            }
            onClick={() => toggleTab(1)}
          >
            BMI CACLULATOR
          </button>
          <button
            className={
              toggleTabs === 2 ? "tools-tabs current-tools-tab" : "tools-tabs"
            }
            onClick={() => toggleTab(2)}
          >
            CALORIES TO CONSUME
          </button>
          <button
            className={
              toggleTabs === 3 ? "tools-tabs current-tools-tab" : "tools-tabs"
            }
            onClick={() => toggleTab(3)}
          >
            WAIST TO HIP RATIO
          </button>
        </div>

        <div className="content-tabs-div">
          <div
            className={
              toggleTabs === 1
                ? "tools-content  current-tools-content"
                : "tools-content"
            }
          >
            <BMICalculator></BMICalculator>
          </div>

          <div
            className={
              toggleTabs === 2
                ? "tools-content  current-tools-content"
                : "tools-content"
            }
          >
            <CalorieConsumption></CalorieConsumption>
          </div>

          <div
            className={
              toggleTabs === 3
                ? "tools-content  current-tools-content"
                : "tools-content"
            }
          >
            <WaistHipRatio></WaistHipRatio>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tools;
