import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const serializeBracket = (bracket) => {
  // need to update this to bracket.rounds
  bracket.bracket = convertArrayToObject(bracket.bracket);
  return bracket;
};

export const deserializeBracket = (serializedBracket) => {
  serializedBracket.bracket = convertObjectToArray(serializedBracket.bracket);
  serializedBracket.dateCreated = new Date(
    serializedBracket.dateCreated.seconds * 1000 +
      serializedBracket.dateCreated.nanoseconds / 1000000
  );
  return serializedBracket;
};

export const getBrackets = async (uid) => {
  const savedBrackets = [];
  const querySnapshot = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("brackets")
    .get();
  querySnapshot.forEach((doc) => {
    const deserializedBracket = deserializeBracket(doc.data());
    savedBrackets.push(deserializedBracket);
  });
  return savedBrackets;
};

export const createBracket = async (uid, bracket) => {
  const serializedBracket = serializeBracket(bracket);
  await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("brackets")
    .doc(serializedBracket.id)
    .set(serializedBracket);
};

export const updateBracket = async (uid, bracket) => {
  const serializedBracket = serializeBracket(bracket);
  await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("brackets")
    .doc(serializedBracket.id)
    .update(serializedBracket);
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
