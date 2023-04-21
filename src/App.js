import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateBracketPage from "./pages/CreateBracketPage/CreateBracketPage";
import { useState } from "react";
import ViewBracketPage from "./pages/ViewBracketPage/ViewBracketPage";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import SideNav from "./components/SideNav/SideNav";
import SavedBracketsPage from "./pages/SavedBracketsPage/SavedBracketsPage";

function App() {
  const [brackets, setBrackets] = useState([]);

  function saveNewTournament(newBracket) {
    setBrackets((currentBrackets) => [...currentBrackets, newBracket]);
  }

  function updateTournamentsHandler(updatedBrackets) {
    setBrackets(updatedBrackets);
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
              <Route
                path="/saved"
                element={<SavedBracketsPage brackets={brackets} />}
              ></Route>
              <Route
                path="/saved/:id"
                element={
                  <ViewBracketPage
                    brackets={brackets}
                    setBrackets={updateTournamentsHandler}
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
