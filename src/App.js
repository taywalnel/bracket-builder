import "./App.css";
import HeaderBar from "./components/HeaderBar";
import { Routes, Route } from "react-router-dom";
import CreateTournamentPage from "./pages/CreateTournamentPage";
import { useState } from "react";
import ViewTournamentPage from "./pages/ViewTournamentPage";

function App() {
  const [tournaments, setTournaments] = useState([]);

  function saveNewTournament(newBracket) {
    setTournaments((currentBrackets) => [...currentBrackets, newBracket]);
  }

  function updateTournamentsHandler(updatedBrackets) {
    setTournaments(updatedBrackets);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <HeaderBar />
      <div
        className="grid-center"
        style={{
          flex: "1",
          backgroundColor: "#333",
          padding: "40px",
        }}
      >
        <div className="root-page-route-outlet grid-center">
          <Routes>
            <Route
              path="/create"
              element={
                <CreateTournamentPage saveNewBracket={saveNewTournament} />
              }
            ></Route>
            <Route path="/saved" element={<h1>saved</h1>}></Route>
            <Route
              path="/saved/:id"
              element={
                <ViewTournamentPage
                  tournaments={tournaments}
                  setTournaments={updateTournamentsHandler}
                />
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
