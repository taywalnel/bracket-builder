import { v4 as uuidv4 } from "uuid";

export const GenerateTournament = (
  titleEnteredByUser,
  playersEnteredByUser
) => {
  const tournament = {
    title: titleEnteredByUser,
    bracket: generateBracket(playersEnteredByUser),
    id: uuidv4(),
  };
  return tournament;

  function generateBracket(players) {
    const allPlayers = addNecessaryByesToPlayerList(players);
    const orderedPlayers = setPlayersInOrderOfPositionInBracket(allPlayers);
    const firstRound = generateFirstRound(orderedPlayers);
    const allRounds = generateFullBracket(firstRound);
    return allRounds;
  }

  function addNecessaryByesToPlayerList(players) {
    const sizeOfTournament = getSizeOfTournament(players.length);
    const arrayOfPlayersIncludingByes = [...players];

    let additionalByesRequired = sizeOfTournament - players.length;
    while (additionalByesRequired > 0) {
      arrayOfPlayersIncludingByes.push({
        name: "Bye",
        isBye: true,
        id: uuidv4(),
        rank: arrayOfPlayersIncludingByes.length + 1,
      });

      additionalByesRequired--;
    }
    return arrayOfPlayersIncludingByes;
  }

  function getSizeOfTournament(numberOfPlayers) {
    let tournamentSize = 2;
    while (tournamentSize < numberOfPlayers) {
      tournamentSize = tournamentSize * 2;
    }
    return tournamentSize;
  }

  function setPlayersInOrderOfPositionInBracket(players) {
    const valueToFullyFlattenArray = Math.log2(players.length) * 2 - 2;
    let orderedPlayers = [];

    while (players.length / 2 >= 2) {
      let index = 0;
      while (index < players.length / 2) {
        orderedPlayers.push(players[index]);
        orderedPlayers.push(players[players.length - 1 - index]);
        index += 1;
      }
      players = groupEveryXElementsInArray(orderedPlayers, 2);
      orderedPlayers = [];
    }

    let timesFlattened = 0;
    while (timesFlattened < valueToFullyFlattenArray) {
      players.map((group, index) => {
        if (index % 2 === 0) return group;
        else return group.reverse();
      });
      players = players.flat();
      timesFlattened++;
    }
    return players;
  }

  function groupEveryXElementsInArray(array, groupSize) {
    const groupedArray = [];

    let index = 0;
    while (index < array.length) {
      groupedArray.push([array.slice(index, index + groupSize)]);
      index += groupSize;
    }
    return groupedArray;
  }

  function generateFirstRound(players) {
    const firstRoundMatchups = [];

    let index = 0;
    while (index < players.length) {
      const player1 = players[index];
      const player2 = players[index + 1];
      firstRoundMatchups.push({
        player1,
        player2,
        id: uuidv4(),
        winner: setWinnerIfBye(player1, player2),
      });
      index = index + 2;
    }
    return firstRoundMatchups;
  }

  function setWinnerIfBye(player1, player2) {
    if (player1.isBye) return player2;
    if (player2.isBye) return player1;
    return null;
  }
};

export const generateFullBracket = (startingRound) => {
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
          name: "",
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
