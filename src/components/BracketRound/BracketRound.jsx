import React from "react";
import "./BracketRound.css";
import BracketMatchUp from "../BracketMatchUp/BracketMatchUp";

function BracketRound({ round, selectWinner, index }) {
  function selectWinnerHandler(matchupResult) {
    selectWinner({ ...matchupResult, roundIndex: index });
  }
  return (
    <div className="bracket-round-container">
      <div className="bracket-round-inner-container">
        {round.map((matchup) => (
          <BracketMatchUp
            key={matchup.id}
            matchup={matchup}
            selectWinner={selectWinnerHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default BracketRound;
