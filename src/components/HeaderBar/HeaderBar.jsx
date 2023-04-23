import React from "react";
import { Link } from "react-router-dom";
import "./HeaderBar.css";

function HeaderBar() {
  return (
    <div className="header-bar-container">
      <Link className="react-link" to="/">
        <h1 style={{ color: "#38BDFF" }}>Bracket builder</h1>
      </Link>
    </div>
  );
}

export default HeaderBar;
