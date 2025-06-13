import React from "react";

const Footer = () => (
  <footer className="bg-light text-center py-3 mt-5 border-top">
    <div className="container">
      <span className="text-muted">&copy; {new Date().getFullYear()} JPO Connect - Tous droits réservés</span>
    </div>
  </footer>
);

export default Footer;