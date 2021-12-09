import React from 'react'

const Recipe = ({title, image, ingredients}) => {
    return (
        <div className="main-recipe-conatiner">
        <div className="recipe-div">
            <img className="recipe-img" src={image} alt=""></img>
           <p className="recipe-name">{title}</p>
           <div className="accordion-div">
           <button>Ingredients</button> 
           <div className="accordion-content">
                <ol className="recipe-ingredients">
                    {ingredients.map((ingredient) => (
                        <li>{ingredient.text}</li>
                    ))}
                </ol>
            </div>     
           </div>
        </div>
        </div>
    )
}

export default Recipe
