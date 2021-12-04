import { useState } from "react";
import logo from "../logo.png";
import Home from "../pages/Home"


function Navbar() {
  const [toggleTabs, setToggleTabs] = useState(1);

  const toggleTab = (tabNumber) => {
    setToggleTabs(tabNumber);
  };

  return (
    <div className="container">
      <div classname="header">
      <div className="title-container">
      <img className="logo" src={logo} alt=""></img>
      <h3>CALORIE VISUALISER</h3>
      </div>
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
          TOOLS
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
         ABOUT
        </button>
      </div>
      </div>
      <div className="content-tabs">
        <div
          className={toggleTabs === 1 ? "content  current-content" : "content"}
        >
          <h2>Welcome To My Blog</h2>
          <Home/>
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
       
        </div>
        <div
          className={toggleTabs === 4 ? "content  current-content" : "content"}
        >
          <h2>Your Feedback Is Valuable</h2>
        
        </div>
      </div>
    </div>
  );
}





export default Navbar;


