import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const urlSearch = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const urlNonAlcoholic =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
const urlFilter = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cocktails, setCocktails] = useState([]);
  const [url, setUrl] = useState(urlSearch);
  const [isError, setIsError] = useState(false);
  const [isIngredient, setIsIngredient] = useState(false);
  /* fetching selected cocktails */
  //per evitare il warning: React Hook useEffect has a missing dependency: 'fetchDrinks'. Either include it or remove the dependency array  react-hooks/exhaustive-deps,
  // si aggiunge useCallback (solo se cambia qualcosa nella funzione[searchTerm], allora ricrea la funzione!)
  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
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
      setIsError(false);

      setLoading(false);
    } catch (error) {
      setIsError(true);
      console.log("error >> " + error);
      setLoading(false);
    }
  }, [searchTerm, url]);
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
        setUrl,
        isError,
        urlSearch,
        urlNonAlcoholic,
        isIngredient,
        setIsIngredient,
        urlFilter,
        url,
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
