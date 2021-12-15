import React from "react";
import { useState, useEffect } from "react";
import Recipe from "../components/Recipe";
import env from "react-dotenv";
import Loading from "../components/Loading";

const Recipes = () => {
  const [recipe, setRecipe] = useState([]);
  const [query, setQuery] = useState("oats");
  const [loading, setLoading] = useState(false);
  let recipeStore;

  const getRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${env.APP_ID}&app_key=${env.APP_KEY}`
      );
      recipeStore = await response.json();
      setRecipe(recipeStore.hits);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const searchRecipes = (e) => {
    e.preventDefault();
    getRecipes();
  };

  useEffect(() => {
    getRecipes();
  }, [setQuery]);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="recipe-search">
      <h2 className="section-title">
        Find Your Favourite Food Recipe's Ingredients
      </h2>
      <form className="search-form" onSubmit={searchRecipes}>
        <div className="form-control">
          <input
            className="search-input"
            type="text"
            required
            onChange={(e) => {
              setQuery(e.target.value);
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
