import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [foods, setFoods] = useState([])

  const fetchFoods = async () => {
    setLoading(true)
    try{
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json();
      const {eats} = data;

      if(eats){
        const newfood = eats.map((foodItem) => {
          const {
            id, 
            strDrink, 
            strDrinkThumb, 
            strAlcoholic, 
            strGlass} = foodItem;

          return(
            {
              id: id, 
              name:strDrink, 
              image:strDrinkThumb, 
              info:strAlcoholic, 
              glass:strGlass
            }
          )
        })
        setFoods(newfood)
      }
      else{
        setFoods([])
      }
      setLoading(false)
    }
    catch(error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFoods()
  },[searchTerm])
  return (
    <AppContext.Provider 
      value={{
            loading, 
            foods,
            setSearchTerm }}>{children}</AppContext.Provider> )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }