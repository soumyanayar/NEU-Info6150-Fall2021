import React from 'react'
import Accordion from './Accordian'

const Recipe = ({title, image, ingredients}) => {
    return (
        <div className="main-recipe-conatiner">
        <div className="recipe-div">
            <img className="recipe-img" src={image} alt=""></img>
           <p className="recipe-name">{title}</p>
           <Accordion title={title} ingredients={ingredients}></Accordion>
        </div>
        </div>
    )
}

export default Recipe;
