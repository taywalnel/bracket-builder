import React from "react";
import "./MatchUpPlayer.css";

function MatchUpPlayer({
  player,
  isWinner,
  selectWinner,
  allowSelectWinner,
}) {
  function selectWinnerHandler() {
    if (isWinner) return;
    if (!allowSelectWinner) return;
    selectWinner(player);
  }

  return (
    <div
      onClick={selectWinnerHandler}
      className={`match-up-player__container ${isWinner ? "is-winner" : ""} ${
        allowSelectWinner ? "show-winner-button" : ""
      }`}
    >
      <div className="match-up-player__details-container">
        <p style={{ color: "grey" }}>{player.rank}</p>
        <p style={{ color: player.isBye ? "grey" : "black" }}>{player.name}</p>
      </div>
      <div className="match-up-player__button-container">
        <img
          className="match-up-player__winner-identifier"
          alt="tick-icon"
          src="/assets/tick.svg"
        ></img>
      </div>
    </div>
  );
}

export default MatchUpPlayer;
