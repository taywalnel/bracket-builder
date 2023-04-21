import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import "./SavedBracketListItem.css";

function SavedBracketListItem({ bracket }) {
  const navigate = useNavigate();
  const formattedDate = format(new Date(bracket.dateCreated), "MM/dd/yyyy");

  function selectTournamentHandler() {
    navigate(`/saved/${bracket.id}`);
  }

  return (
    <div className="saved-bracket-item-root" onClick={selectTournamentHandler}>
      <div className="saved-bracket-item-column">{bracket.title}</div>
      <div className="saved-bracket-item-column">{formattedDate}</div>
      <div className="saved-bracket-item-column">{bracket.tournamentSize}</div>
      <div className="saved-bracket-item-column">{bracket.status}</div>
    </div>
  );
}

export default SavedBracketListItem;
