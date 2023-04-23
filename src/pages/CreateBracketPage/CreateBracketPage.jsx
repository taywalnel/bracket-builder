import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { GenerateTournament } from "../../services/TournamentBuilderService";
import { useNavigate } from "react-router-dom";
import "./CreateBracketPage.css";
import TextButton from "../../components/TextButton/TextButton";
import AddPlayerInput from "../../components/AddPlayerInput/AddPlayerInput";

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

  const bracketNameValidationErrorMessage =
    showTournamentNameValidationError && (
      <span className="required-field-text">Required field</span>
    );

  const playerNameValidationErrorMessage = showPlayersValidationError && (
    <span className="required-field-text">Please add at least 2 players</span>
  );

  const playerInputs = players.map((player, index) => (
    <AddPlayerInput
      key={player.id}
      index={index}
      player={player}
      disabled={players.length < 2}
      removePlayer={removePlayer}
      onPlayerInputChange={onPlayerInputChange}
    />
  ));

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
    return players.filter((player) => player.name).length > 1;
  }

  function navigateToViewNewBracket(id) {
    navigate(`/saved/${id}`);
  }

  return (
    <div className="create-page-root">
      <h2 className="create-page-header">Create bracket</h2>
      <div className="create-page-form-container">
        <div className="create-page-field-wrapper">
          <div className="create-page-label-wrapper">
            <label htmlFor="name">Bracket name</label>
            {bracketNameValidationErrorMessage}
          </div>

          <input required onChange={updateTournamentName} name="name" />
        </div>

        <div className="create-page-field-wrapper">
          <div className="create-page-label-wrapper">
            <label htmlFor="rank-by">Rank players by</label>
          </div>
          <select required onChange={updateRankBy} name="rank-by">
            <option>Order entered</option>
            <option>Randomize</option>
          </select>
        </div>
        <div className="create-page-field-wrapper flex-1">
          <div className="create-page-label-wrapper">
            <label htmlFor="players">Players</label>
            <div className="create-page-player-count">
              {players.filter((p) => !!p.name).length}
            </div>
            {playerNameValidationErrorMessage}
          </div>
          <div className="create-page-players-input-wrapper1">
            <div className="create-page-players-input-wrapper2">
              <div className="create-page-players-input-wrapper3">
                {playerInputs}
              </div>
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
    </div>
  );
}

export default CreateBracketPage;