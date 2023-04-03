import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div
      style={{
        height: "100%",
        width: "80px",
        backgroundColor: "#333",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          paddingTop: "15px",
        }}
      >
        {" "}
        <Link to="/create-tournament">
          <Button imageSrc="/assets/plus.svg" />
        </Link>
        <Link to="/saved-tournaments">
          <Button imageSrc="/assets/folder.svg" />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          paddingBottom: "15px",
        }}
      >
        <Button imageSrc="/assets/settings.svg" />
        <Button imageSrc="/assets/log-out.svg" />
      </div>
    </div>
  );
}

export default SideBar;
