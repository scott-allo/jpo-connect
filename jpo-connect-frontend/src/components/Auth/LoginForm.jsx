// ✅ LoginForm.jsx – Complet et corrigé
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccess(data.success);
        if (data.success) {
          setUser(data.user);
          setMessage("Connexion réussie !");
          setTimeout(() => navigate("/"), 1000);
        } else {
          setMessage(data.message || "Erreur de connexion");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-md mx-auto mt-8 border">
      <h2 className="text-xl font-semibold text-center mb-4">Connexion</h2>
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
      <button type="submit" className="btn btn-primary w-100">Se connecter</button>
      {message && <div className={`alert mt-3 ${success ? "alert-success" : "alert-danger"}`}>{message}</div>}
    </form>
  );
};

export default LoginForm;
