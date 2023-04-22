import React from "react";
import IconButton from "../IconButton/IconButton";
import "./AddPlayerInput.css";

function AddPlayerInput({
  player,
  index,
  disabled,
  removePlayer,
  onPlayerInputChange,
}) {
  return (
    <div className="create-page-add-player-input-container" key={player.id}>
      <input
        value={player.name}
        placeholder={`Player ${index + 1}`}
        onChange={(event) => onPlayerInputChange(event, player.id)}
        style={{ flex: 1 }}
      ></input>

      <IconButton
        clickHandler={() => removePlayer(player.id)}
        iconType="delete"
        diameter="40"
        disabled={disabled}
        backgroundColor="#FF622B"
      />
    </div>
  );
}

export default AddPlayerInput;
