import React from "react";
import "./LoadingDots.css";

function LoadingDots({ color = "#fff" }) {
  return (
    <div className="load-dot__wrapper">
      <div style={{ backgroundColor: color }} className="dot"></div>
      <div style={{ backgroundColor: color }} className="dot"></div>
      <div style={{ backgroundColor: color }} className="dot"></div>
    </div>
  );
}

export default LoadingDots;
