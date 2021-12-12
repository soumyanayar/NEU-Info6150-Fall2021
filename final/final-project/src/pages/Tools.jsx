import { useState } from "react";
import BMICalculator from "../components/BMICalculator";
import CalorieConsumption from "../components/CalorieConsumption"
function Tools() {
  const [toggleTabs, setToggleTabs] = useState(1);

  const toggleTab = (tabNumber) => {
    setToggleTabs(tabNumber);
  };

  return (
    <div className="tool-tabs-container">
      <div className="tool-tabs-div">
        <button 
          className={toggleTabs === 1 ? "tools-tabs current-tools-tab" : "tools-tabs"}
          onClick={() => toggleTab(1)}
        >
          BMI CACLULATOR
        </button>
        <button 
          className={toggleTabs === 2 ? "tools-tabs current-tools-tab" : "tools-tabs"}
          onClick={() => toggleTab(2)}
        >
          CALORIES TO CONSUME
        </button>
        <button 
          className={toggleTabs === 3 ? "tools-tabs current-tools-tab" : "tools-tabs"}
          onClick={() => toggleTab(3)}
        >
          HIP TO WEIGHT RATIO
        </button>
      </div> 

      <div className="content-tabs-div">
        <div
          className={toggleTabs === 1 ? "tools-content  current-tools-content" : "tools-content"}
        >
          <BMICalculator></BMICalculator>
        </div>

        <div
          className={toggleTabs === 2 ? "tools-content  current-tools-content" : "tools-content"}
        >
         <CalorieConsumption></CalorieConsumption>
        </div>

        <div
          className={toggleTabs === 3 ? "tools-content  current-tools-content" : "tools-content"}
        >
          ghjhjhk
        </div>
      </div>
    </div>
  );
}

export default Tools;