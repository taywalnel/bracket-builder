import React from "react";
import IconButton from "../IconButton/IconButton";
import "./BracketPlayerRow.css";

function BracketPlayerRow({
  player,
  isWinner,
  selectWinner,
  allowSelectWinner,
}) {
  function setWinnerHandler() {
    if (isWinner) return;
    if (!allowSelectWinner) return;
    selectWinner(player);
  }

  return player.name ? (
    <div
      onClick={setWinnerHandler}
      className={`matchup-player-container ${isWinner ? "is-winner" : ""} ${
        allowSelectWinner ? "show-winner-button" : ""
      }`}
    >
      <div className="matchup-player-details-container">
        <p style={{ color: "grey" }}>{player.rank}</p>
        <p>{player.name}</p>
      </div>
      <div className="matchup-player-won-button-container">
        <IconButton diameter="40" iconType="tick" />
      </div>
    </div>
  ) : (
    <div className="matchup-player-empty-container"></div>
  );
}

export default BracketPlayerRow;
