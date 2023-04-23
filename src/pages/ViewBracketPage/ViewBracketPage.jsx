import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewBracketPage.css";
import BracketRound from "../../components/BracketRound/BracketRound";

function ViewBracketPage({ brackets, setBrackets }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentTournament = brackets.find((b) => b.id === id);

  const bracketRounds = currentTournament?.bracket.map((round, index) => (
    <BracketRound
      key={`round-${index}`}
      round={round}
      selectWinner={selectWinnerHandler}
      index={index}
    />
  ));

  useEffect(() => {
    if (!currentTournament) {
      navigate("/");
    }
  }, [currentTournament, navigate]);

  function selectWinnerHandler(matchupResult) {
    updateBracketAfterWinnerSelected(matchupResult);
    updateTournament(currentTournament);
  }

  function updateBracketAfterWinnerSelected(matchupResult) {
    updateMatchup(matchupResult);
    moveWinnerToNextRound(matchupResult);
  }

  function updateMatchup(matchupResult) {
    currentTournament.bracket[matchupResult.roundIndex]?.find((matchup) => {
      if (matchup.id === matchupResult.matchupId) {
        matchup.winner = matchupResult.winner;
      }
    });
  }

  function moveWinnerToNextRound(matchupResult) {
    const { roundIndex, matchupId, winner } = matchupResult;
    const currentRound = currentTournament.bracket[roundIndex];
    const nextRound = currentTournament.bracket[roundIndex + 1];
    if (!nextRound) {
      setTournamentStatusToComplete();
      return;
    }

    const indexOfUpdatedMatchup = currentRound.findIndex(
      (matchup) => matchup.id === matchupId
    );
    const indexOfMatchupToMovePlayerTo = Math.floor(indexOfUpdatedMatchup / 2);
    const playerToUpdateInNextRound =
      indexOfUpdatedMatchup % 2 === 0 ? "player1" : "player2";
    nextRound[indexOfMatchupToMovePlayerTo][playerToUpdateInNextRound] = winner;
  }

  function setTournamentStatusToComplete() {
    currentTournament.status = "complete";
    updateTournament(currentTournament);
  }

  function updateTournament(updatedTournament) {
    const updatedTournaments = brackets.map((b) => {
      if (b.id === id) return updatedTournament;
      return b;
    });
    setBrackets(updatedTournaments);
  }

  if (!currentTournament) {
    return null;
  }

  return (
    <div className="view-page-root">
      <div className="needs-name">
        <h2 className="view-page-header">{currentTournament.title}</h2>
        <div className="view-page-bracket-container">
          <div className="view-page-round-labels">
            {currentTournament.bracket.map((round, index) => (
              <div className="view-page-round-label" key={index}>
                Round {index + 1}
              </div>
            ))}
          </div>
          <div className="view-page-bracket">{bracketRounds}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewBracketPage;