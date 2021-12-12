import React from "react";
import { useState, useEffect } from "react";
import Recipe from "../components/Recipe";
import Loading from "../components/Loading";
import env from "react-dotenv";

const Recipes = () => {
  const [recipe, setRecipe] = useState([]);
  const [query, setQuery] = useState("oats");
  let recipeStore;

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${env.APP_ID}&app_key=${env.APP_KEY}`
    );
    recipeStore = await response.json();
    setRecipe(recipeStore.hits);
  };

  const searchRecipes = (e) => {
    e.preventDefault();
    getRecipes();
  };

  useEffect(() => {
    getRecipes();
  }, [setQuery]);

  return (
    <section className="recipe-search">
      <h2 className="section-title">Find Your Favourite Food Recipe</h2>
      <form className="search-form" onSubmit={searchRecipes}>
        <div className="form-control">
          <input
            className="search-input"
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
              // console.log(e.target.value);
            }}
          />
          <button type="submit" className="btn">
            Search
          </button>
        </div>
      </form>
      <div className="recipe-center">
        {recipe.map((item, key) => (
          <Recipe
            key={item.recipe.label}
            image={item.recipe.image}
            title={item.recipe.label}
            ingredients={item.recipe.ingredients}
          ></Recipe>
        ))}
      </div>
    </section>
  );
};

export default Recipes;
