import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import "../App.css";
import env from "react-dotenv";
import Carousel from "../components/Carousel";

const Home = () => {
  const slides = [
    {
      src: "https://www.edamam.com/web-img/c75/c755a75617c903f23739e7e7a9a083d8.jpg",
      alt: "milkshake",
    },
    {
      src: " https://www.edamam.com/web-img/72e/72ebeef4f13b029165ce5fc4a675130e.jpg",
      alt: "Salad",
    },
    {
      src: "https://www.edamam.com/web-img/16c/16c9f7a2bcf8a7643ada8729cd693c9d.jpg",
      alt: "CrispyEgg",
    },
    {
      src: " https://www.edamam.com/web-img/9a4/9a48eba8331850cac217738f647c2500.jpg",
      alt: "Chowmein",
    },
    {
      src: "https://www.edamam.com/web-img/22c/22c27bdc6b8dc67215c7478cb4e5dc42.jpg",
      alt: "BlueberryPancakes",
    },
  ];
  const [recipe, setRecipe] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  let recipeStore;

  const getRecipes = async () => {
    setLoading(true);
    try {
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
  }, []);

  if (loading) {
    return <Loading />;
  }

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
