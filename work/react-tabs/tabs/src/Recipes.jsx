import React from 'react';
import smoothie from './smoothie.png';
import salad from './salad.png';
import wrap from './wrap.png';
import './recipe.css'

function Recipes() {
    return (
        <div className="recipes">
            <div className="food-images">
            <div>
                <h3>Banana Smoothie</h3>
                <img src={smoothie} alt=""></img>
            </div>   
            <div>
                <h3>Quinoa Salad</h3>
                <img src={salad} alt=""></img>
            </div> 
            <div>
                <h3>Lettuce Wrap</h3>
                <img src={wrap} alt=""></img>
            </div> 
            </div>
                   
            <div className="credits">
            <p>
            I use fresh vegetables and fruits in my recipes. They have most vitamins and nutritions required for body. 
          </p>
          <h4>Image Credits : </h4>
          <div className="image-links">     
                <a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thespruceeats.com%2Fbanana-smoothie-recipes-759606&psig=AOvVaw3S3z0q12fQKSQxx4uclfok&ust=1637386500642000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCODvnZrao_QCFQAAAAAdAAAAABAD">Banan Smoothie</a>
                <a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.inspiredtaste.net%2F38096%2Fquinoa-salad-recipe%2F&psig=AOvVaw0H9pjnmL04OXSkCR893_YB&ust=1637387752533000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOCJnO3eo_QCFQAAAAAdAAAAABAD">Quinoa Salad</a>
                <a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fchefjulieyoon.com%2F2015%2F08%2Fasian-lettuce-wraps%2F&psig=AOvVaw3FGvTsBZ5XQrxfYLa3asX8&ust=1637387805658000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIDouYbfo_QCFQAAAAAdAAAAABAD">Lettuce Wrap</a>
          </div>
                
            </div>    
        </div>
    )
}

export default Recipes
