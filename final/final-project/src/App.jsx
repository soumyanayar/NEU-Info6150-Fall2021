import React from 'react';
import './App.css'
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
    <Navbar/>
    <div className="footer">
           <button className="tabs">
                COPYRIGHT 2021, Calorie Visualiser
            </button>
        </div>
   </div>
  )
}

export default App
