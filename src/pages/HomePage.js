import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        width: "100%",
      }}
    >
      <Link to="/create" className="home-page-navigation-box react-link">
        <div
          className="home-page-navigation-box grid-center"
          style={{ backgroundColor: "#38BDFF" }}
        >
          <h1>New bracket</h1>
        </div>
      </Link>
      <Link to="/saved" className="home-page-navigation-box react-link">
        <div
          className="home-page-navigation-box grid-center"
          style={{ backgroundColor: "#FF7645" }}
        >
          <h1>Saved brackets</h1>
        </div>
      </Link>
    </div>
  );
}

export default HomePage;
