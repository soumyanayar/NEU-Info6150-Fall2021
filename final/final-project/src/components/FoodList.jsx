import React from 'react'
import Food from './Food'
import Loading from './Loading'
import { useGlobalContext } from '../Context'

const FoodList = () => {
    const {foods, loading} = useGlobalContext();

    if(loading){
        return <Loading/>
    }

    if(foods.length < 1) {
       return(
        <h2 className="section-title">
        No Food items matched your search
            </h2>) 
    }
  return (
    <section>
      <h2 className="section-title">Popular Foods</h2>
      <div className="cocktail-center">
          {foods.map((foodItem) => {
              return <Food key={foodItem.id}{...foodItem}/>
          })}
      </div>
    </section>
  )
}

export default FoodList
