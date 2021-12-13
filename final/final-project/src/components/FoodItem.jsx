import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import env from "react-dotenv";

const FoodItem = () => {
  const [nutrients, setNutrients] = useState("");
  const { id } = useParams();

  const getNutrients = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${env.APP_ID}&app_key=${env.APP_KEY}`
    );
    const nutrientsResponse = await response.json();
    setNutrients(nutrientsResponse);
  };

  useEffect(() => {
    getNutrients();
  }, []);

  return (
    <div>
      {nutrients && (
        <div className="food-container">
          <h3>{nutrients.recipe.label}</h3>
          <img src={nutrients.recipe.image} alt="name"></img>
          <div>
            {Object.keys(nutrients.recipe.totalNutrients).map((keyName, i) => (
              <li key={i}>
                <span>
                  {nutrients.recipe.totalNutrients[keyName].label}
                  {"    "}
                  {nutrients.recipe.totalNutrients[keyName].quantity.toFixed(2)}
                  {nutrients.recipe.totalNutrients[keyName].unit}
                </span>
              </li>
            ))}
          </div>
          <div>
            <h4>Daily Value</h4>
            {Object.keys(nutrients.recipe.totalDaily).map((keyName, i) => (
              <li key={i}>
                <span>
                  {nutrients.recipe.totalDaily[keyName].label}
                  {"    "}
                  {nutrients.recipe.totalDaily[keyName].quantity.toFixed(2)}
                  {nutrients.recipe.totalDaily[keyName].unit}
                </span>
              </li>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodItem;
