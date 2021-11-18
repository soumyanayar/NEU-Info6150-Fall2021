import React from 'react';
import smoothie from './smoothie.png';
import salad from './salad.png';
import wrap from './wrap.png';
import './recipe.css'

function Recipes() {
    return (
        <div className="recipes">
            <div>
                <h3>Banana Smoothie</h3>
                <img src={smoothie} alt=""></img>
            </div>   
            <div>
                <h3>Quinoa Salad</h3>
                <img src={salad} alt=""></img>
            </div> 
            <div>
                <h3>Lettuce Wrap</h3>
                <img src={wrap} alt=""></img>
            </div>            
        </div>
    )
}

export default Recipes
