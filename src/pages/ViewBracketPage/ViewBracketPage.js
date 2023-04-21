import React from "react";
import { useParams } from "react-router-dom";
import "./ViewBracketPage.css";
import BracketRound from "../../components/BracketRound/BracketRound";

function ViewBracketPage({ brackets, setBrackets }) {
  const { id } = useParams();
  const currentTournament = brackets.find((b) => b.id === id);

  function selectWinnerHandler(matchupResult) {
    updateBracketAfterWinnerSelected(matchupResult);
    updateTournament(currentTournament);
  }

  function updateBracketAfterWinnerSelected(matchupResult) {
    updateMatchup(matchupResult);
    moveWinnerToNextRound(matchupResult);
  }

  function updateMatchup(matchupResult) {
    currentTournament.bracket[matchupResult.roundIndex].map((matchup) => {
      if (matchup.id === matchupResult.matchupId) {
        matchup.winner = matchupResult.winner;
      }
    });
  }

  function moveWinnerToNextRound(matchupResult) {
    const currentRound = currentTournament.bracket[matchupResult.roundIndex];
    const nextRound = currentTournament.bracket[matchupResult.roundIndex + 1];
    if (!nextRound) return;

    const indexOfUpdatedMatchup = currentRound.findIndex(
      (matchup) => matchup.id === matchupResult.matchupId
    );
    const indexOfMatchupToMovePlayerTo = Math.floor(indexOfUpdatedMatchup / 2);
    const playerToUpdateInNextRound =
      indexOfUpdatedMatchup % 2 === 0 ? "player1" : "player2";
    nextRound[indexOfMatchupToMovePlayerTo][playerToUpdateInNextRound] =
      matchupResult.winner;
  }

  function updateTournament(updatedTournament) {
    const updatedTournaments = brackets.map((b) => {
      if (b.id === id) return updatedTournament;
      return b;
    });
    setBrackets(updatedTournaments);
  }

  return currentTournament ? (
    <div className="view-page-root">
      <div className="needs-name">
        <h2 style={{ color: "white", flexBasis: "20px" }}>
          {currentTournament.title}
        </h2>

        <div
          style={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div className="view-page-round-labels">
            {currentTournament.bracket.map((round, index) => (
              <p
                key={index}
                style={{
                  display: "inline-block",
                  width: "200px",
                  flexShrink: "0",
                }}
              >
                Round {index + 1}
              </p>
            ))}
          </div>
          <div className="view-page-root2">
            {currentTournament.bracket.map((round, index) => (
              <BracketRound
                key={index}
                round={round}
                selectWinner={selectWinnerHandler}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default ViewBracketPage;
