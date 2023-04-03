import React from "react";

function Button({ imageSrc }) {
  return (
    <div
      className="grid-center"
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "#D9D9D9",
        borderRadius: "100%",
      }}
    >
      <img
        alt="plus-icon"
        src={imageSrc}
        style={{ width: "20px", height: "20px" }}
      ></img>
    </div>
  );
}

export default Button;
