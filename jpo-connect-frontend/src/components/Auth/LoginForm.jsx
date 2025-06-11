import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          setMessage("Connexion réussie !");
        } else {
          setMessage(data.message || "Erreur de connexion");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>
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
      <button type="submit">Se connecter</button>
      {message && <div style={{ color: data?.success ? "green" : "red" }}>{message}</div>}
    </form>
  );
};

export default LoginForm;