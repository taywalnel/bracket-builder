import { format } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SavedBracketListItem.css";

function SavedBracketListItem({ bracket }) {
  const navigate = useNavigate();
  const formattedDate = format(new Date(bracket.dateCreated), "MM/dd/yyyy");

  function selectTournamentHandler() {
    navigate(`/saved/${bracket.id}`);
  }

  return (
    <div className="saved-item__root" onClick={selectTournamentHandler}>
      <div className="saved-item__column">{bracket.title}</div>
      <div className="saved-item__column">{formattedDate}</div>
      <div className="saved-item__column">{bracket.tournamentSize}</div>
      <div className="saved-item__column">{bracket.status}</div>
    </div>
  );
}

export default SavedBracketListItem;
