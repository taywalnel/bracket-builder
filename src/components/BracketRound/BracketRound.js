import React from "react";
import "./BracketRound.css";
import BracketMatchUp from "../BracketMatchUp/BracketMatchUp";

function BracketRound({ round, setRound, index }) {
  function updateMatchUpHandler(matchUp) {
    const updatedRound = round.map((m) => {
      if (m.id === matchUp.id) return matchUp;
      return m;
    });
    setRound(updatedRound, index);
  }

  return (
    <div className="bracket-round-container">
      <div className="bracket-round-inner-container">
        {round.map((matchUp) => (
          <BracketMatchUp
            key={matchUp.id}
            matchUp={matchUp}
            setMatchUp={updateMatchUpHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default BracketRound;
