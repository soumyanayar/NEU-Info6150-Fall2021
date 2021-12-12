import React from "react";
//import FoodList from '../components/FoodList'
import SearchForm from "../components/SearchForm";
import "../App.css";
import env from "react-dotenv";

const Home = () => {
  return (
    <div>
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
      <SearchForm />
    </div>
  );
};

export default Home;
