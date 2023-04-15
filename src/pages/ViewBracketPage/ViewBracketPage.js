import React from "react";
import { useParams } from "react-router-dom";
import "./ViewBracketPage.css";
import { generateNextRounds } from "../../services/BracketBuilderService";
import BracketRound from "../../components/BracketRound/BracketRound";

function ViewBracketPage({ tournaments, setTournaments }) {
  const { id } = useParams();
  const currentTournament = tournaments.find((b) => b.id === id);

  function updateRoundHandler(updatedRound, index) {
    const updatedRounds = generateNextRounds(updatedRound);
    currentTournament.bracket.length = index;
    currentTournament.bracket = currentTournament.bracket.concat(updatedRounds);

    updateTournamentHandler(currentTournament);
  }

  function updateTournamentHandler(updatedTournament) {
    const updatedTournaments = tournaments.map((b) => {
      if (b.id === id) return updatedTournament;
      return b;
    });
    setTournaments(updatedTournaments);
  }

  return currentTournament ? (
    <div className="view-page-root">
      <div className="needs-name">
        <h1 style={{ color: "white", flexBasis: "20px" }}>
          {currentTournament.title}
        </h1>

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
                setRound={updateRoundHandler}
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
