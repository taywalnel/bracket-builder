import React from "react";
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
      <div className={`icon-wrapper add-player__icon-wrapper ${disabled ? 'disabled' : ''}`} onClick={() => removePlayer(player.id)}>
        <img alt="delete icon" className="icon add-player__icon" src="/assets/delete.svg"></img>
      </div>
    </div>
  );
}

export default AddPlayerInput;
