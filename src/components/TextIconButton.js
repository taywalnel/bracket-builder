import React from "react";
import IconButton from "./IconButton";
import "./TextIconButton.css";

function TextIconButton({ label, iconType, iconBackgroundColor }) {
  return (
    <div className="text-icon-container">
      <div
        className="text-icon-icon-container"
        style={{ backgroundColor: iconBackgroundColor }}
      >
        <IconButton diameter="30" iconType={iconType} />
      </div>
      <span>{label}</span>
    </div>
  );
}

export default TextIconButton;
