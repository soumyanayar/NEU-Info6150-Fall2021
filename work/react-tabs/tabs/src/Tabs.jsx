import { useState } from "react";
import "./App.css";
import Feedback from "./Feedback";
import Recipes from "./Recipes";

function Tabs() {
  const [toggleTabs, setToggleTabs] = useState(1);

  const toggleTab = (tabNumber) => {
    setToggleTabs(tabNumber);
  };

  return (
    <div className="container">
      <div className="tabs-div">
        <button 
          className={toggleTabs === 1 ? "tabs current-tab" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          HOME
        </button>
        <button
          className={toggleTabs === 2 ? "tabs current-tab" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          ABOUT
        </button>
        <button
          className={toggleTabs === 3 ? "tabs current-tab" : "tabs"}
          onClick={() => toggleTab(3)}
        >
         RECIPES
        </button>
        <button
          className={toggleTabs === 4 ? "tabs current-tab" : "tabs"}
          onClick={() => toggleTab(4)}
        >
         FEEDBACK
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleTabs === 1 ? "content  current-content" : "content"}
        >
          <h2>Welcome To My Blog</h2>
          <p>
          Hi I’m Soumya! I created Cook with Soumya for you all to enjoy healthy yet tasty recipes with your family
          </p>
        </div>

        <div
          className={toggleTabs === 2 ? "content  current-content" : "content"}
        >
          <h2>About Me</h2>
          <p>
            I'm Soumya, MSIS Grad Student in Northeastern University, Seattle.
            My hobbies are cooking and gardening. I love to experiment new dishes that my family can savour. 
          </p>
        </div>

        <div
          className={toggleTabs === 3 ? "content  current-content" : "content"}
        >
          <h2>My Recipes</h2>
          <Recipes></Recipes>
        </div>
        <div
          className={toggleTabs === 4 ? "content  current-content" : "content"}
        >
          <h2>Your Feedback Is Valuable</h2>
          <Feedback/>
        </div>
      </div>
    </div>
  );
}

export default Tabs;


