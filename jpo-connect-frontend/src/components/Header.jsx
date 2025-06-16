import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = () => setUser(null);

  return (
    <header className="sticky top-0 z-50 bg-blue-700 bg-opacity-90 backdrop-blur-md text-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <Link to="/" className="text-2xl font-bold tracking-tight">JPO Connect</Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm">
          <Link to="/" className="hover:underline">Accueil</Link>
          {!user && (
            <>
              <Link to="/login" className="hover:underline">Connexion</Link>
              <Link to="/register" className="hover:underline">Inscription</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/mes-inscriptions" className="hover:underline">Mes inscriptions</Link>
              {user.id_role === 1 && <Link to="/admin-jpo" className="hover:underline">Admin JPO</Link>}
              <span className="font-medium text-white">{user.prenom} {user.nom}</span>
              <button onClick={handleLogout} className="bg-white text-blue-700 font-semibold px-2 py-1 rounded hover:bg-gray-200">Déconnexion</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
