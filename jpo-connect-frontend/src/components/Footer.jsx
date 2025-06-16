import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-200 py-6 mt-12 border-t">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-sm">
      <p>&copy; {new Date().getFullYear()} JPO Connect. Tous droits réservés.</p>
      <div className="space-x-4 mt-2 md:mt-0">
        <Link to="/" className="hover:underline">Accueil</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/mentions" className="hover:underline">Mentions légales</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
