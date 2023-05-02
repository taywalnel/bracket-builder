import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { useState } from "react";
import MainPageWrapper from "./components/MainPageWrapper/MainPageWrapper";
import PrivateRoutes from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

import CreateBracketPage from "./pages/CreateBracketPage/CreateBracketPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SavedBracketsPage from "./pages/SavedBracketsPage/SavedBracketsPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import ViewBracketPage from "./pages/ViewBracketPage/ViewBracketPage";


function App() {
  const [brackets, setBrackets] = useState([]);
  const createNewBracket = (newBracket) => {
    setBrackets((currentBrackets) => [...currentBrackets, newBracket]);
  }
  const updateBracketsHandler = (updatedBrackets) => {
    setBrackets(updatedBrackets);
  }

  const createBracketPage = <CreateBracketPage createNewBracket={createNewBracket} />;
  const savedBracketsPage = <SavedBracketsPage brackets={brackets} />;
  const viewBracketsPage = <ViewBracketPage brackets={brackets}  setBrackets={updateBracketsHandler} />;
  const profilePage = <ProfilePage />; 
  
  

  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainPageWrapper>{createBracketPage}</MainPageWrapper>} />
          <Route path="/saved" element={<MainPageWrapper>{savedBracketsPage}</MainPageWrapper>} />
          <Route path="/saved/:id" element={<MainPageWrapper>{viewBracketsPage}</MainPageWrapper>} />
          <Route path="/profile" element={<MainPageWrapper>{profilePage}</MainPageWrapper>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
