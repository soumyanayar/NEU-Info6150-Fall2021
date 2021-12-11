import React from 'react'
//import FoodList from '../components/FoodList'
import SearchForm from '../components/SearchForm';
import "../App.css"

const Home = () => {
  return (
    <div>
      <div className="introduction">
        <h2 className="introduction-title"> Introduction </h2>
        <p>
        We are World's most trusted Food batabase. 
        We analyse the food you entered and provide the most accurate nutritional value in the food.
        Our services designed to educate, motivate and inspire lifelong weight control.To achieve this, we have determined that everything we do should be science-based, and equally important, our products and programs must produce the results our members and visitors desire.
        Our web-based and clinical tools and software include reliable information in a format that is useful every day. We believe this approach will lead to positive permanent change and better health.
      </p>
      {/* <p>
      An important component of the Calorie Visualiser product 
      suite is our food database. Calorie Visualiser food data is 
      widely recognized as the best available for weight control. 
      This is important, because everyday we are bombarded with
       half-truths about food. For the most part, the messages 
       have the same objective - to get us to buy and consume more 
       of it. CalorieKing food data sets the record straight about 
       the caloric value of the foods we encounter each day.
      </p> */}
      </div>  
    <SearchForm/>
    </div>
  )
}

export default Home;