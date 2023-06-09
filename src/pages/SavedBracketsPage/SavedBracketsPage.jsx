import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import React, { useEffect } from "react";
import SavedBracketListItem from "../../components/SavedBracketListItem/SavedBracketListItem";
import { getBrackets } from "../../services/BracketService";
import "./SavedBracketsPage.css";

function SavedBracketsPage({ brackets, setBrackets }) {
  const headers = ["Title", "Created on", "Players", "Status"];
  const currentUser = firebase.auth().currentUser;

  const savedBrackets = brackets.map((bracket) => (
    <SavedBracketListItem
      key={bracket.id}
      bracket={bracket}
      setBrackets={setBrackets}
    />
  ));
  const authMessage = (
    <span className="firebase-error" style={{ color: "white" }}>
      You must sign in to save brackets
    </span>
  );

  useEffect(() => {
    const getSavedBrackets = async () => {
      const currentUser = firebase.auth().currentUser;

      if (currentUser && !currentUser.isAnonymous) {
        try {
          const savedBrackets = await getBrackets(currentUser.uid);
          setBrackets(savedBrackets);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getSavedBrackets();
  }, []);

  return (
    <div className="page__root ">
      <h1 className="page-header">Saved brackets</h1>
      <div className="saved-page__list">
        <div className="saved-page__list-headers">
          {headers.map((header, index) => (
            <div key={`header-${index}`} className="saved-page__list-header">
              {header}
            </div>
          ))}
        </div>
        <div className="saved-page__list-items-wrapper1">
          <div className="saved-page__list-items-wrapper2">
            <div className="saved-page__list-items-wrapper3">
              {currentUser && !currentUser.isAnonymous
                ? savedBrackets
                : authMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedBracketsPage;
