import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <nav>
          <Link to="/">Accueil</Link> | <Link to="/login">Connexion</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;