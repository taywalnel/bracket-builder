import MatchUpPlayer from "../MatchUpPlayer/MatchUpPlayer";
import "./BracketMatchUp.css";

function BracketMatchUp({ matchup, selectWinner }) {
  function isWinner(player) {
    if (!matchup.winner) return false;
    return matchup.winner.id === player.id;
  }

  function selectWinnerHandler(player) {
    selectWinner({ winner: player, matchupId: matchup.id });
  }

  function allowSelectWinner() {
    return !matchup.winner && bothPlayersReadyForMatchup();
  }

  function bothPlayersReadyForMatchup() {
    return matchup.player1.name && matchup.player2.name;
  }

  return (
    <div className="matchup-container">
      <MatchUpPlayer
        player={matchup.player1}
        isWinner={isWinner(matchup.player1)}
        selectWinner={selectWinnerHandler}
        allowSelectWinner={allowSelectWinner()}
      />
      <MatchUpPlayer
        player={matchup.player2}
        isWinner={isWinner(matchup.player2)}
        selectWinner={selectWinnerHandler}
        allowSelectWinner={allowSelectWinner()}
      />
    </div>
  );
}

export default BracketMatchUp;
