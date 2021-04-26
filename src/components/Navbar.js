import React from "react";
import { Link } from "react-router-dom";
import logoDark from "../DrinkDB.png";
import logoLight from "../DrinkDBwhite.png";
import { FaRegLightbulb } from "react-icons/fa";
const Navbar = ({ toggle, theme }) => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="">
          <img
            src={theme === "light-theme" ? logoLight : logoDark}
            alt="cocktail db logo"
            className="logo"
          />
        </Link>
        <ul className="nav-links">
          <li>
            <button onClick={toggle} className="btn btn-bulb">
              <FaRegLightbulb />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
