import { format } from "date-fns";
import firebase from "firebase/compat/app";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SavedBracketListItem.css";
import { deleteBracket } from "../../services/BracketService";

function SavedBracketListItem({ bracket, setBrackets }) {
  const currentUser = firebase.auth().currentUser;
  const navigate = useNavigate();
  const formattedDate = format(new Date(bracket.dateCreated), "MM/dd/yyyy");

  function selectTournamentHandler() {
    navigate(`/saved/${bracket.id}`);
  }

  async function deleteBracketHandler() {
    setBrackets((prevBrackets) =>
      prevBrackets.filter((prevBracket) => prevBracket.id !== bracket.id)
    );
    await deleteBracket(currentUser.uid, bracket.id);
  }

  return (
    <div className="saved-item__root">
      <div
        className="saved-item__columns-wrapper"
        onClick={selectTournamentHandler}
      >
        <div className="saved-item__column">{bracket.title}</div>
        <div className="saved-item__column">{formattedDate}</div>
        <div className="saved-item__column">{bracket.tournamentSize}</div>
        <div className="saved-item__column">{bracket.status}</div>
      </div>
      <div className="icon-hover-wrapper">
        <div
          className="icon-wrapper saved-item__icon-wrapper"
          onClick={deleteBracketHandler}
        >
          <img className="icon" src="/assets/delete.svg" alt="delete" />
        </div>
      </div>
    </div>
  );
}

export default SavedBracketListItem;
