import React from "react";
import "./SavedBracketsPage.css";
import SavedBracketListItem from "../../components/SavedBracketListItem/SavedBracketListItem";

function SavedBracketsPage({ brackets }) {
  const headers = ["Title", "Date created", "Tournament size", "Status"];
  return (
    <div className="saved-page-root ">
      <h2 className="page-header">Saved brackets</h2>
      <div className="saved-page-list">
        <div className="saved-page-list-headers">
          {headers.map((header) => (
            <div className="saved-page-list-header">{header}</div>
          ))}
        </div>
        <div className="saved-page-list-items-wrapper1">
          <div className="saved-page-list-items-wrapper2">
            <div className="saved-page-list-items-wrapper3">
              {brackets.map((bracket) => (
                <SavedBracketListItem bracket={bracket} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedBracketsPage;
