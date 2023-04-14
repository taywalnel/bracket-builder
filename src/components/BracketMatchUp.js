import "./BracketMatchUp.css";
import BracketPlayerRow from "./BracketPlayerRow";

function BracketMatchUp({ matchUp, setMatchUp }) {
  function isWinner(player) {
    if (!matchUp.winner) return false;
    return matchUp.winner.name === player.name;
  }

  function selectWinnerHandler(player) {
    setMatchUp({ ...matchUp, winner: player });
  }

  function arePlayersReady() {
    return matchUp.player1.name && matchUp.player2.name;
  }

  return (
    <div className="matchup-container">
      <BracketPlayerRow
        player={matchUp.player1}
        isWinner={isWinner(matchUp.player1)}
        selectWinner={selectWinnerHandler}
        allowSelectWinner={arePlayersReady()}
      />
      <BracketPlayerRow
        player={matchUp.player2}
        isWinner={isWinner(matchUp.player2)}
        selectWinner={selectWinnerHandler}
        allowSelectWinner={arePlayersReady()}
      />
    </div>
  );
}

export default BracketMatchUp;
