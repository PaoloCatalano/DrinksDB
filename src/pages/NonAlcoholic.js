import React from "react";
import CocktailList from "../components/CocktailList";
import { Link } from "react-router-dom";

const NonAlcoholic = () => {
  return (
    <main>
      <ul
        className="section-title nav-links"
        style={{ justifyContent: "center", marginBottom: 0 }}
      >
        <li>
          <Link to="/" className="btn btn-primary">
            back home
          </Link>
        </li>
      </ul>
      <CocktailList noAlc />
    </main>
  );
};

export default NonAlcoholic;
