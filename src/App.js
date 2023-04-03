import "./App.css";
import HeaderBar from "./components/HeaderBar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <HeaderBar />
      <div style={{ display: "flex", height: "100%" }}>
        <SideBar />
        <Routes>
          <Route
            element={<h1>Create tournament</h1>}
            path="/create-tournament"
          ></Route>
          <Route
            element={<h1>My tournaments</h1>}
            path="/saved-tournaments"
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
