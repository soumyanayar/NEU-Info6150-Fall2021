import { useState } from "react";
import logo from "../logo.png";
import Home from "../pages/Home";
import About from "../pages/About"
import Recipes from "../pages/Recipes"
import Tools from "../pages/Tools"

function Navbar() {
  const [toggleTabs, setToggleTabs] = useState(1);

  const toggleTab = (tabNumber) => {
    setToggleTabs(tabNumber);
  };

  return (
    <div className="container">
      <div className="header">
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
          <Home/>
        </div>

        <div
          className={toggleTabs === 2 ? "content  current-content" : "content"}
        >
          <Tools/>
        </div>

        <div
          className={toggleTabs === 3 ? "content  current-content" : "content"}
        >
         <Recipes/>
        </div>
        <div
          className={toggleTabs === 4 ? "content  current-content" : "content"}
        >
          <About/>
        
        </div>
      </div>
    </div>
  );
}

export default Navbar;