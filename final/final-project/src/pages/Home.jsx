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
      src: "https://fortmyersoliveoil.com/wp-content/uploads/2019/01/chicken-lettuce-wraps_thecozyapron_1.jpg",
      alt: "image1",
    },
    {
      src: "https://fortmyersoliveoil.com/wp-content/uploads/2020/02/download-9.jpg",
      alt: "image2",
    },
    {
      src: "https://fortmyersoliveoil.com/wp-content/uploads/2020/02/download-21.jpg",
      alt: "image3",
    },
    {
      src: "https://fortmyersoliveoil.com/wp-content/uploads/2019/10/green-beans-almondine-1-29-600x900-e1571169761496.jpg",
      alt: "image4",
    },
    {
      src: "https://fortmyersoliveoil.com/wp-content/uploads/2019/09/Classic-Mimosa-f-1.jpg",
      alt: "image5",
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
          programs must produce the results our members and visitors desire.
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
            <div className="search-items-div" key={item.recipe.uri}>
              <Link
                className="search-item-list"
                to={`/nutrients/${item.recipe.uri.split("_")[1]}`}
              >
                {item.recipe.label}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="app">
        <Carousel slides={slides} />
      </div>
    </section>
  );
};

export default Home;
