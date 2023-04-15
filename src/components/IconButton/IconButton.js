import React from "react";
import "./IconButton.css";

function IconButton({
  iconType,
  clickHandler,
  diameter = "50",
  disabled = false,
  backgroundColor,
}) {
  return (
    <div
      onClick={disabled ? null : clickHandler}
      className={`icon-button-container ${disabled ? "disabled" : ""}`}
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        backgroundColor,
      }}
    >
      <img
        alt="plus-icon"
        src={`/assets/${iconType}.svg`}
        style={{ width: `${diameter / 2}px`, height: `${diameter / 2}px` }}
      ></img>
    </div>
  );
}

export default IconButton;
