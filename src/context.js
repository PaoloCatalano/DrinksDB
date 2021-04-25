import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const urlFilter = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
const urlNON =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktails, setCocktails] = useState([]);

  /* fetching selected cocktails */
  //per evitare il warning: React Hook useEffect has a missing dependency: 'fetchDrinks'. Either include it or remove the dependency array  react-hooks/exhaustive-deps,
  // si aggiunge useCallback (solo se cambia qualcosa nella funzione[searchTerm], allora ricrea la funzione!)
  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      console.log(data);
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const {
            idDrink: id,
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strGlass: glass,
          } = item;
          return {
            id,
            name,
            image,
            info,
            glass,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);
  return (
    <AppContext.Provider
      value={{
        loading,
        setSearchTerm,
        cocktails,
        searchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
