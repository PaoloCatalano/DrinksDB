import React from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const SearchForm = () => {
  const {
    cocktails,
    searchTerm,
    setSearchTerm,
    isError,
    setIsIngredient,
    isIngredient,
  } = useGlobalContext();

  const searchValue = React.useRef("");
  const select = React.useRef("");

  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };

  const handleCange = () => {
    setIsIngredient(() => {
      if (select.current.value === "name") {
        return false;
      } else {
        return true;
      }
    });
  };

  React.useEffect(() => {
    searchValue.current.value = searchTerm;
  }, [searchTerm]);

  React.useEffect(() => {
    select.current.options[0].defaultSelected = !isIngredient; //search by name
    select.current.options[1].defaultSelected = isIngredient; //search by ingredient
  }, [isIngredient]);

  return (
    <section className="section search">
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-control">
          <label htmlFor="name">search your favorite cocktail by </label>
          <select
            id="criteria"
            onChange={handleCange}
            ref={select}
            className="btn"
          >
            <option value="name">name</option>
            <option value="ingredient">main ingredient</option>
          </select>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
          {isError ? (
            <p>value not found!</p>
          ) : (
            <p>{cocktails.length} cocktails found! </p>
          )}
        </div>
        <Link
          to="/non-alcoholic-list"
          className="btn link"
          onClick={() => {
            setSearchTerm("");
          }}
        >
          Non Alcoholic Drinks
        </Link>
      </form>
    </section>
  );
};

export default SearchForm;
