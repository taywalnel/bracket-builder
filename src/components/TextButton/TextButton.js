import React from "react";
import "./TextButton.css";

function TextButton({
  buttonText,
  clickHandler,
  width = "50px",
  disabled = false,
  backgroundColor = "white",
  color = "black",
}) {
  return (
    <div
      onClick={disabled ? null : clickHandler}
      className={`text-button-container ${disabled ? "disabled" : ""}`}
      style={{
        width,
        backgroundColor,
        color,
      }}
    >
      {buttonText}
    </div>
  );
}

export default TextButton;
