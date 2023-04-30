import React from "react";
import "./ModalTemplate.css";

function ModalTemplate({ children }) {
  return (
    <div className="modal-wrapper">
      <div className="modal">{children}</div>
    </div>
  );
}

export default ModalTemplate;
