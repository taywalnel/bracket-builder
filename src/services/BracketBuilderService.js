import { v4 as uuidv4 } from "uuid";

export const BuildBracket = (tournamentName, players) => {
  function generateTournamentRounds(players) {
    const arrayOfPlayersIncludingByes = getArrayOfAllPlayersWithByes(players);
    const firstRound = createFirstRoundMatchUps(arrayOfPlayersIncludingByes);
    const allRounds = generateNextRounds(firstRound);
    return allRounds;
  }

  function getArrayOfAllPlayersWithByes(players) {
    const sizeOfTournament = getSizeOfTournament(players.length);
    const arrayOfPlayersIncludingByes = [];
    let index = 0;
    while (index < sizeOfTournament) {
      if (index <= players.length - 1) {
        arrayOfPlayersIncludingByes.push(players[index]);
      } else {
        arrayOfPlayersIncludingByes.push({
          name: null,
          rank: null,
          isBye: true,
        });
      }
      index++;
    }
    return arrayOfPlayersIncludingByes;
  }

  function createFirstRoundMatchUps(players) {
    const reversedPlayers = [...players].reverse();
    const firstRoundMatchUps = [];

    let index = 0;
    while (index < players.length / 2) {
      const player1 = players[index];
      const player2 = reversedPlayers[index];
      firstRoundMatchUps.push({
        player1,
        player2,
        winner: getWinner(player1, player2),
        id: uuidv4(),
      });
      index++;
    }

    const orderedMatchups = [];
    const reversedFirstRoundMatchUps = [...firstRoundMatchUps].reverse();
    index = 0;
    while (index < firstRoundMatchUps.length / 2) {
      orderedMatchups.push(firstRoundMatchUps[index]);
      orderedMatchups.push(reversedFirstRoundMatchUps[index]);
      index++;
    }

    return orderedMatchups;
  }

  function getWinner(player1, player2) {
    if (player1.name && !player2.name) {
      return player1;
    }
    if (player2.nme && !player1.name) {
      return player2;
    }
    return null;
  }

  function getSizeOfTournament(numberOfPlayers) {
    let tournamentSize = 2;
    while (tournamentSize < numberOfPlayers) {
      tournamentSize = tournamentSize * 2;
    }
    return tournamentSize;
  }

  const rounds = generateTournamentRounds(players);
  return {
    title: tournamentName,
    bracket: rounds,
    id: uuidv4(),
  };
};

export const generateNextRounds = (startingRound) => {
  const bracket = [startingRound];

  let additionalRoundsToGenerate = Math.log2(startingRound.length);
  let additionalRoundsGenerated = 0;
  while (additionalRoundsGenerated < additionalRoundsToGenerate) {
    const previousRound = bracket[bracket.length - 1];
    const nextRound = generateNextRound(previousRound);
    bracket.push(nextRound);
    additionalRoundsGenerated++;
  }

  function generateNextRound(originalRound) {
    const nextRound = [];
    const playersInNextRound = [];

    originalRound.forEach((round) => {
      if (!round.winner) {
        playersInNextRound.push({
          name: null,
          rank: null,
        });
      } else {
        playersInNextRound.push(round.winner);
      }
    });

    let index = 0;
    while (index < originalRound.length) {
      nextRound.push({
        player1: playersInNextRound[index],
        player2: playersInNextRound[index + 1],
        winner: null,
        id: uuidv4(),
      });
      index += 2;
    }

    return nextRound;
  }
  return bracket;
};
