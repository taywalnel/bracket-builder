import React from "react";

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
      className={`icon-button-component grid-center ${
        disabled ? "disabled" : ""
      }`}
      style={{
        width: `${diameter}px`,
        height: `${diameter}px`,
        backgroundColor,
        borderRadius: "100%",
        cursor: "pointer",
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
