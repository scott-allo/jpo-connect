import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MesInscriptions from "./pages/MesInscriptions";
import { UserProvider, UserContext } from "./contexts/UserContext";

function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => setUser(null);

  return (
    <nav>
      <Link to="/">Accueil</Link> | <Link to="/login">Connexion</Link> |{" "}
      <Link to="/register">S'inscrire</Link>
      {user && (
        <>
          {" "} | <Link to="/mes-inscriptions">Mes inscriptions</Link>
          {" "} | Connecté en tant que <b>{user.prenom} {user.nom}</b>
          {" "} <button onClick={handleLogout}>Déconnexion</button>
        </>
      )}
    </nav>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mes-inscriptions" element={<MesInscriptions />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;