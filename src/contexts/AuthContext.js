import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { useEffect } from "react";
import firebase from "firebase/compat/app";

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
    auth.signInAnonymously();
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
