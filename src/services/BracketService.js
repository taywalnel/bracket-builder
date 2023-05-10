export const serializeBracket = (bracket) => {
  // need to update this to bracket.rounds
  bracket.bracket = convertArrayToObject(bracket.bracket);
  return bracket;
};

export const deserializeBracket = (serializedBracket) => {
  serializedBracket.bracket = convertObjectToArray(serializedBracket.bracket);
  debugger;
  serializedBracket.dateCreated = new Date(
    serializedBracket.dateCreated.seconds * 1000 +
      serializedBracket.dateCreated.nanoseconds / 1000000
  );
  return serializedBracket;
};

const convertArrayToObject = (array) => {
  const object = {};
  array.forEach((item, index) => {
    object[index] = item;
  });
  return object;
};

const convertObjectToArray = (object) => {
  const array = [];
  Object.keys(object).forEach((key) => {
    array.push(object[key]);
  });
  return array;
};
