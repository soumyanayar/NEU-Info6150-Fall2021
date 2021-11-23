import React, {useState} from 'react';
import Reorder from './Reorder';
import  './app.css'


function App() {
  const [counter, setCounter] = useState(1);
 
  const incrementCounter = () => {
    return setCounter(counter + 1);
  }

  const decrementCounter = () => {    
    return setCounter(counter - 1);
  }

  const reorderFunction = () => {
    setCounter(5);
  }
    
  return (
    <div className="app-container"> 
      <h2 >Counter App </h2>
      <p class="text">Counter Value = {counter}</p>
      <div class="app-sub-container"> 
        <div className="counter-div">
          <button className="btn" onClick = {incrementCounter}> + </button>
        </div>  
        <div className="reorder-div">
          {
            counter === 0 ? <Reorder onReorder = {reorderFunction}/>  : ""
          }
        </div>
        <div className="counter-div">
          <button className="btn" disabled={!counter} onClick = {decrementCounter}> - </button>
        </div>

      </div>
    </div>
  );
} 
export default App
