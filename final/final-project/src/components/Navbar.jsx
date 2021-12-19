import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

const Navbar = () => {
  return (
    <nav className="navbar" role="navigation">
      <div className="nav-title">
        <Link to="/">
          <img className="logo" src={logo} alt="food"></img>
        </Link>
        <Link to="/" className="title-text">
          CALORIE EXPERT{" "}
        </Link>
      </div>
      <div className="nav-center">
        <ul className="nav-links">
          <li role="menuitem">
            <Link to="/">HOME</Link>
          </li>
          <li role="menuitem">
            <Link to="/tools">TOOLS</Link>
          </li>
          <li role="menuitem">
            <Link to="/recipes">RECIPES</Link>
          </li>
          <li role="menuitem">
            <Link to="/feedback">FEEDBACK</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

// import logo from "../logo.png";
// import Home from "../pages/Home";
// import Recipes from "../pages/Recipes"
// import Tools from "../pages/Tools"
// import Feedback from "../pages/Feedback";

// function Navbar() {
//   const [toggleTabs, setToggleTabs] = useState(1);

//   const toggleTab = (tabNumber) => {
//     setToggleTabs(tabNumber);
//   };

//   return (
//     <div className="container">
//       <div className="header">
//       <div className="title-container">
//       <img className="logo" src={logo} alt=""></img>
//       <h3>CALORIE VISUALISER</h3>
//       </div>
//       <div className="tabs-div">
//         <button
//           className={toggleTabs === 1 ? "tabs current-tab" : "tabs"}
//           onClick={() => toggleTab(1)}
//         >
//           HOME
//         </button>
//         <button
//           className={toggleTabs === 2 ? "tabs current-tab" : "tabs"}
//           onClick={() => toggleTab(2)}
//         >
//           TOOLS
//         </button>
//         <button
//           className={toggleTabs === 3 ? "tabs current-tab" : "tabs"}
//           onClick={() => toggleTab(3)}
//         >
//          RECIPES
//         </button>
//         <button
//           className={toggleTabs === 4 ? "tabs current-tab" : "tabs"}
//           onClick={() => toggleTab(4)}
//         >
//          FEEDBACK
//         </button>
//       </div>
//       </div>

//       <div className="content-tabs">
//         <div
//           className={toggleTabs === 1 ? "content  current-content" : "content"}
//         >
//           <Home/>
//         </div>

//         <div
//           className={toggleTabs === 2 ? "content  current-content" : "content"}
//         >
//           <Tools/>
//         </div>

//         <div
//           className={toggleTabs === 3 ? "content  current-content" : "content"}
//         >
//          <Recipes/>
//         </div>
//         <div
//           className={toggleTabs === 4 ? "content  current-content" : "content"}
//         >
//           <Feedback/>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
