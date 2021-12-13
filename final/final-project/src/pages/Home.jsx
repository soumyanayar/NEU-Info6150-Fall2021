import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import FoodList from '../components/FoodList'
import "../App.css";
import env from "react-dotenv";
import Carousel from "../components/Carousel";

const Home = () => {
  const slides = [
    {
      src: "https://placekitten.com/150/150/?image=1",
      alt: "you should have better alt text",
    },
    {
      src: "https://placekitten.com/150/150/?image=2",
      alt: "that actually describes the image",
    },
    {
      src: "https://placekitten.com/150/150/?image=3",
      alt: "because useless text like this will lose points",
    },
  ];
  const [recipe, setRecipe] = useState([]);
  const [query, setQuery] = useState("");
  let recipeStore;

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${env.APP_ID}&app_key=${env.APP_KEY}`
    );
    recipeStore = await response.json();
    // if (recipeStore.hit.length <= 0 && query !== "") {
    //   console.log("error");
    // }
    if (
      recipeStore.hits.length > 0 &&
      !recipeStore.hits[0].recipe.label.includes(query)
    ) {
      setRecipe(recipeStore.hits.slice(1));
    } else {
      setRecipe(recipeStore.hits);
    }
  };

  const searchRecipes = (e) => {
    e.preventDefault();
    getRecipes();
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <section className="recipe-search">
      <div className="introduction">
        <h2 className="introduction-title"> Introduction </h2>
        <p>
          We are World's most trusted Food batabase. We analyse the food you
          entered and provide the most accurate nutritional value in the food.
          Our services designed to educate, motivate and inspire lifelong weight
          control.To achieve this, we have determined that everything we do
          should be science-based, and equally important, our products and
          programs must produce the results our members and visitors desire. Our
          web-based and clinical tools and software include reliable information
          in a format that is useful every day. We believe this approach will
          lead to positive permanent change and better health.
        </p>
      </div>
      <form className="search-form" onSubmit={searchRecipes}>
        <div className="form-control">
          <input
            className="search-input"
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button type="submit" className="btn">
            Search
          </button>
        </div>
      </form>
      <div>
        {recipe.map((item) => {
          return (
            <div key={item.recipe.uri}>
              <Link to={`/nutrients/${item.recipe.uri.split("_")[1]}`}>
                {item.recipe.label}
              </Link>
            </div>
          );
        })}
      </div>
      {/* <div className="app">
        <Carousel slides={slides} />
      </div> */}
    </section>
  );
};

export default Home;
