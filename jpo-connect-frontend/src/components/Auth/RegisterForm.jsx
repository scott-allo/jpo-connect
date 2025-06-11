import React, { useState } from "react";

const RegisterForm = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
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
    <form onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={e => setNom(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="Prénom"
        value={prenom}
        onChange={e => setPrenom(e.target.value)}
        required
      /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      /><br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      /><br />
      <button type="submit">S'inscrire</button>
      {message && <div style={{ color: "green" }}>{message}</div>}
    </form>
  );
};

export default RegisterForm;