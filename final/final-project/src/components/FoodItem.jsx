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

  return <div>{nutrients && <h1>{nutrients.recipe.label}</h1>}</div>;
};

export default FoodItem;
