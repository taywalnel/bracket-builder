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
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createBracketPage = <CreateBracketPage createNewBracket={createNewBracket} />;
  const savedBracketsPage = <SavedBracketsPage brackets={brackets} />;
  const viewBracketsPage = <ViewBracketPage brackets={brackets}  setBrackets={updateBracketsHandler} />;
  const profilePage = <ProfilePage setIsModalOpen={setIsModalOpen} setModalContent={setModalContent} />; 
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainPageWrapper isModalOpen={isModalOpen}>{createBracketPage}</MainPageWrapper>} />
          <Route path="/saved" element={<MainPageWrapper isModalOpen={isModalOpen}>{savedBracketsPage}</MainPageWrapper>} />
          <Route path="/saved/:id" element={<MainPageWrapper isModalOpen={isModalOpen}>{viewBracketsPage}</MainPageWrapper>} />
          <Route path="/profile" element={<MainPageWrapper isModalOpen={isModalOpen} modalContent={modalContent}>{profilePage}</MainPageWrapper>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
