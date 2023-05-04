import firebase from "firebase/compat/app";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function signOut() {
    return auth.signOut();
  }

  function signInAsGuest() {
    return auth.signInAnonymously();
  }

  function deleteAccount() {
    return currentUser.delete();
  }

  function changePassword(newPassword) {
    return currentUser.updatePassword(newPassword);
  }

  function sendPasswordResetEmail(email) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
          setLoading(false);
        });
        return unsubscribe;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    signInAsGuest,
    signOut,
    deleteAccount,
    changePassword,
    sendPasswordResetEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
