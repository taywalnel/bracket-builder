import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateBracketPage from "./pages/CreateBracketPage/CreateBracketPage";
import { useState } from "react";
import ViewBracketPage from "./pages/ViewBracketPage/ViewBracketPage";
import SavedBracketsPage from "./pages/SavedBracketsPage/SavedBracketsPage";
import { AuthProvider } from "./contexts/AuthContext";
import MainPageWrapper from "./components/MainPageWrapper/MainPageWrapper";
import PrivateRoutes from "./components/PrivateRoute/PrivateRoute";
import SignInPage from "./pages/SignInPage/SignInPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const [brackets, setBrackets] = useState([]);
  function saveNewTournament(newBracket) {
    setBrackets((currentBrackets) => [...currentBrackets, newBracket]);
  }

  function updateTournamentsHandler(updatedBrackets) {
    setBrackets(updatedBrackets);
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={
              <MainPageWrapper>
                <CreateBracketPage saveNewBracket={saveNewTournament} />
              </MainPageWrapper>
            }
          ></Route>
          <Route
            path="/saved"
            element={
              <MainPageWrapper>
                <SavedBracketsPage brackets={brackets} />
              </MainPageWrapper>
            }
          ></Route>
          <Route
            path="/saved/:id"
            element={
              <MainPageWrapper>
                <ViewBracketPage
                  brackets={brackets}
                  setBrackets={updateTournamentsHandler}
                />
              </MainPageWrapper>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <MainPageWrapper>
                <ProfilePage />
              </MainPageWrapper>
            }
          ></Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
