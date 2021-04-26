import React, { useEffect } from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = ({ noAlc }) => {
  const {
    cocktails,
    loading,
    setUrl,
    urlSearch,
    urlNonAlcoholic,
    isIngredient,
    urlFilter,
  } = useGlobalContext();

  useEffect(() => {
    setUrl(() => {
      if (noAlc) {
        return urlNonAlcoholic;
      } else if (isIngredient) {
        return urlFilter;
      } else {
        return urlSearch;
      }
    });
  }, [noAlc, setUrl, urlSearch, urlNonAlcoholic, isIngredient, urlFilter]);

  if (loading) {
    return <Loading />;
  }
  if (cocktails.length < 1) {
    return <h2 className="section-title">no cocktail mached your criteria</h2>;
  }
  return (
    <section className="section">
      <h2 className="section-title">
        {noAlc ? "Non Alcoholic Drinks" : "cocktails"}
      </h2>
      <div className="cocktails-center">
        {cocktails.map((item) => {
          return <Cocktail key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
