import React from "react";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <ul
        className="section-title nav-links"
        style={{ justifyContent: "center", marginBottom: 0 }}
      >
        <li>
          <Link to="/about">
            <button className="btn">About this web site</button>
          </Link>
        </li>
      </ul>
      <SearchForm />
      <CocktailList />
    </main>
  );
};

export default Home;
