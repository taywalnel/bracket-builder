import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateBracketPage from "./pages/CreateBracketPage/CreateBracketPage";
import { useState } from "react";
import ViewTournamentPage from "./pages/ViewBracketPage/ViewBracketPage";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import SideNav from "./components/SideNav/SideNav";

function App() {
  const [tournaments, setTournaments] = useState([]);

  function saveNewTournament(newBracket) {
    setTournaments((currentBrackets) => [...currentBrackets, newBracket]);
  }

  function updateTournamentsHandler(updatedBrackets) {
    setTournaments(updatedBrackets);
  }

  return (
    <div className="app-container">
      <HeaderBar />
      <div className="app-main-content-container">
        <SideNav />
        <div className="app-route-outlet-wrapper">
          <div className="app-route-outlet">
            <Routes>
              <Route
                path="/create"
                element={
                  <CreateBracketPage saveNewBracket={saveNewTournament} />
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
    </div>
  );
}

export default App;
