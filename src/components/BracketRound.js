import React from "react";
import BracketMatchUp from "./BracketMatchUp";

function BracketRound({ round, setRound, index }) {
  function updateMatchUpHandler(matchUp) {
    const updatedRound = round.map((m) => {
      if (m.id === matchUp.id) return matchUp;
      return m;
    });
    setRound(updatedRound, index);
  }

  return (
    <div className="view-page-column">
      <div className="bracket-round">
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
