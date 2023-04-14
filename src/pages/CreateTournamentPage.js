import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import IconButton from "../components/IconButton";
import TextButton from "../components/TextButton";
import { BuildBracket } from "../services/BracketBuilderService";
import { Link, useNavigate } from "react-router-dom";

function CreateTournamentPage({ saveNewBracket }) {
  const [players, setPlayers] = useState([
    { id: uuidv4(), name: "", score: null, isBye: false },
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
    const newPlayer = { id: uuidv4(), name: "", score: null, isBye: false };
    setPlayers((currentPlayers) => [...currentPlayers, newPlayer]);
  }

  function removePlayer(id) {
    setPlayers((currentPlayers) => currentPlayers.filter((p) => p.id !== id));
  }

  function generateBracketHandler() {
    if (!inputsAreValid()) return;
    const updatedPlayers = removeBlankPlayers();
    const playersWithRanking = applyRankingToPlayers(updatedPlayers);
    const newBracket = BuildBracket(tournamentName, playersWithRanking);
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
    <div
      className="create-page-root"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "40px",
      }}
    >
      <div
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p>Tournament name</p>
          {showTournamentNameValidationError ? (
            <span style={{ color: "red" }}>Required field</span>
          ) : null}
          <input onChange={updateTournamentName} name="name"></input>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <p>Rank players by</p>
          <select onChange={updateRankBy} name="ranking">
            <option>Order entered</option>
            <option>Randomize</option>
          </select>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div>
            <span style={{ paddingRight: "10px" }}>Players</span>
            <div
              style={{
                display: "inline-grid",
                placeItems: "center",
                width: "27px",
                height: "27px",
                backgroundColor: "#333",
                color: "white",
                borderRadius: "100%",
              }}
            >
              {players.filter((p) => !!p.name).length}
            </div>
          </div>

          {showPlayersValidationError ? (
            <span style={{ color: "red" }}>Please add at least 2 players</span>
          ) : null}
          <div
            style={{
              maxHeight: "170px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              alignContent: "start",
              gap: "10px",
              overflow: "scroll",
              backgroundColor: "#333",
              borderRadius: "20px",
            }}
          >
            {players.map((player, index) => (
              <div
                key={player.id}
                style={{
                  display: "flex",
                  gap: "10px",
                  minWidth: "200px",
                }}
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
      <div style={{ display: "flex", gap: "20px" }}>
        <Link className="react-link" to="/home" style={{ width: "100%" }}>
          <TextButton
            buttonText="Exit"
            width="100%"
            clickHandler={null}
            backgroundColor="#333"
            color="white"
          />
        </Link>

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

export default CreateTournamentPage;
