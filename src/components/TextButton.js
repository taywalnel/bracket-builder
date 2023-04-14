import React from "react";

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
      className={`text-button-component grid-center ${
        disabled ? "disabled" : ""
      }`}
      style={{
        width,
        height: "40px",
        backgroundColor,
        borderRadius: "20px",
        color,
        cursor: "pointer",
      }}
    >
      {buttonText}
    </div>
  );
}

export default TextButton;
