import React from "react";
import BracketMatchUp from "../BracketMatchUp/BracketMatchUp";
import "./BracketRound.css";

function BracketRound({ round, selectWinner, index }) {
  function selectWinnerHandler(matchupResult) {
    selectWinner({ ...matchupResult, roundIndex: index });
  }
  return (
    <div className="bracket-round__container">
      <div className="bracket-round__inner-container">
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
