import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IconButton from "../../components/IconButton/IconButton";
import { GenerateTournament } from "../../services/TournamentBuilderService";
import { Link, useNavigate } from "react-router-dom";
import "./CreateBracketPage.css";
import TextButton from "../../components/TextButton/TextButton";

function CreateBracketPage({ saveNewBracket }) {
  const [players, setPlayers] = useState([
    { name: "", isBye: false, id: uuidv4() },
  ]);
  const [tournamentName, setTournamentName] = useState();
  const [rankBy, setRankBy] = useState();
  const [showTournamentNameValidationError, setTournamentNameValidationError] =
    useState(false);
  const [showPlayersValidationError, setPlayersValidationError] =
    useState(false);
  const navigate = useNavigate();

  function onPlayerInputChange(event, id) {
    if (isLastPlayer(id)) {
      addPlayer();
    }
    updatePlayerName(event, id);
  }

  function isLastPlayer(id) {
    const lastPlayer = players[players.length - 1];
    return id === lastPlayer.id;
  }

  function updatePlayerName(event, id) {
    if (players.length > 1) {
      setPlayersValidationError(false);
    }

    const playerName = event.target.value;
    setPlayers((currentPlayers) =>
      currentPlayers.map((x) => (x.id === id ? { ...x, name: playerName } : x))
    );
  }

  function updateTournamentName(event) {
    setTournamentNameValidationError(false);
    setTournamentName(event.target.value);
  }

  function updateRankBy(event) {
    setRankBy(event.target.value);
  }

  function addPlayer() {
    const newPlayer = { name: "", isBye: false, id: uuidv4() };
    setPlayers((currentPlayers) => [...currentPlayers, newPlayer]);
  }

  function removePlayer(id) {
    setPlayers((currentPlayers) => currentPlayers.filter((p) => p.id !== id));
  }

  function generateBracketHandler() {
    if (!inputsAreValid()) return;
    const updatedPlayers = removeBlankPlayers();
    const playersWithRanking = applyRankingToPlayers(updatedPlayers);
    const newBracket = GenerateTournament(tournamentName, playersWithRanking);
    saveNewBracket(newBracket);
    navigateToViewNewBracket(newBracket.id);
  }

  function removeBlankPlayers() {
    return players.filter((p) => p.name);
  }

  function applyRankingToPlayers(players) {
    if (rankBy === "Randomize") {
      players = randomizePlayers(players);
    }
    return players.map((player, index) => ({ ...player, rank: index + 1 }));
  }

  function randomizePlayers(players) {
    let currentIndex = players.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [players[currentIndex], players[randomIndex]] = [
        players[randomIndex],
        players[currentIndex],
      ];
    }

    return players;
  }
  function inputsAreValid() {
    let inputsAreValid = true;
    if (!tournamentName) {
      setTournamentNameValidationError(true);
      inputsAreValid = false;
    }
    if (!atLeastTwoValidPlayers()) {
      setPlayersValidationError(true);
      inputsAreValid = false;
    }
    return inputsAreValid;
  }

  function atLeastTwoValidPlayers() {
    let validPlayers = 0;
    players.forEach((player) => {
      if (player.name) validPlayers += 1;
    });
    return validPlayers > 1;
  }

  function navigateToViewNewBracket(id) {
    navigate(`/saved/${id}`);
  }

  return (
    <div className="create-page-root">
      <div className="create-page-form-container">
        <div className="create-page-form-field-container">
          <p>Tournament name</p>
          {showTournamentNameValidationError ? (
            <span className="required-field-text">Required field</span>
          ) : null}
          <input onChange={updateTournamentName} name="name"></input>
        </div>
        <div className="create-page-form-field-container">
          <p>Rank players by</p>
          <select onChange={updateRankBy} name="ranking">
            <option>Order entered</option>
            <option>Randomize</option>
          </select>
        </div>
        <div className="create-page-form-field-container">
          <div>
            <span style={{ paddingRight: "10px" }}>Players</span>
            <div className="create-page-player-count">
              {players.filter((p) => !!p.name).length}
            </div>
          </div>

          {showPlayersValidationError ? (
            <span className="required-field-text">
              Please add at least 2 players
            </span>
          ) : null}
          <div className="create-page-add-players-input-container">
            {players.map((player, index) => (
              <div
                className="create-page-add-player-input-container"
                key={player.id}
              >
                <input
                  value={player.name}
                  placeholder={`Player ${index + 1}`}
                  onChange={(event) => onPlayerInputChange(event, player.id)}
                  style={{ flex: 1 }}
                ></input>

                <IconButton
                  clickHandler={() => removePlayer(player.id)}
                  iconType="delete"
                  diameter="40"
                  disabled={players.length < 2}
                  backgroundColor="#FF622B"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <TextButton
        buttonText="Generate"
        width="100%"
        clickHandler={generateBracketHandler}
        backgroundColor="#6BFF8E"
      />
    </div>
  );
}

export default CreateBracketPage;
