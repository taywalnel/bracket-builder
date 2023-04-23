import React from "react";
import "./SavedBracketsPage.css";
import SavedBracketListItem from "../../components/SavedBracketListItem/SavedBracketListItem";

function SavedBracketsPage({ brackets }) {
  const headers = ["Title", "Created on", "Players", "Status"];
  return (
    <div className="saved-page-root ">
      <h2 className="page-header">Saved brackets</h2>
      <div className="saved-page-list">
        <div className="saved-page-list-headers">
          {headers.map((header, index) => (
            <div key={`header-${index}`} className="saved-page-list-header">
              {header}
            </div>
          ))}
        </div>
        <div className="saved-page-list-items-wrapper1">
          <div className="saved-page-list-items-wrapper2">
            <div className="saved-page-list-items-wrapper3">
              {brackets.map((bracket) => (
                <SavedBracketListItem key={bracket.id} bracket={bracket} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedBracketsPage;
