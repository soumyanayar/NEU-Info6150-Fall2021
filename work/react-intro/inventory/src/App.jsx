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
    <div className="app"> 
      <p class="text">Your counter value is {counter} </p>
      <button className="btn" onClick = {incrementCounter}> + </button>
      <button className="btn" disabled={!counter} onClick = {decrementCounter}> - </button>
      {
        counter === 0 ? <Reorder onReorder = {reorderFunction}/>  : ""
      }
    </div>
  );
} 
export default App
