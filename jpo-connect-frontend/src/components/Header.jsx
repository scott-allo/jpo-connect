import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">JPO Connect</Link>
      <nav className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/agenda">Agenda</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mes-inscriptions">Mes inscriptions</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Connexion</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Inscription</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;