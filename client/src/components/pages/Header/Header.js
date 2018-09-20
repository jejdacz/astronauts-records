import React from "react";
import { Link } from "react-router-dom";

const Header = ({ link, heading }) => (
  <header className="container-fluid">
    <div className="container">
      <h1>{heading}</h1>
      <Link to={link}>...return</Link>
    </div>
  </header>
);

export default Header;
