// ✅ RegisterForm.jsx – Complet et corrigé
import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccess(data.success);
        setMessage(data.message);
        if (data.success) {
          setNom("");
          setPrenom("");
          setEmail("");
          setPassword("");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-md mx-auto mt-8 border">
      <h2 className="text-xl font-semibold text-center mb-4">Inscription</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nom"
          value={nom}
          onChange={e => setNom(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Prénom"
          value={prenom}
          onChange={e => setPrenom(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
      <Link to="/login" className="btn btn-link w-100 text-center mt-3">Déjà inscrit ? Connectez-vous</Link>
      {message && <div className={`alert mt-3 ${success ? "alert-success" : "alert-danger"}`}>{message}</div>}
    </form>
  );
};

export default RegisterForm;
