import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null); // Ajouté
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
          setTimeout(() => navigate("/"), 1000); // Redirection après 1s
        } else {
          setMessage(data.message || "Erreur de connexion");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white" style={{ maxWidth: 400, margin: "2em auto" }}>
      <h2 className="mb-3">Connexion</h2>
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

const Agenda = () => {
  const { user } = useContext(UserContext);
  const [jpos, setJpos] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=getJpos")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJpos(data.jpos);
        } else {
          setMessage("Erreur de chargement des JPO");
        }
      });
  }, []);

  const inscrireAJPO = (idJpo) => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=inscrireAJpo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idJpo, userId: user.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Inscription réussie !");
          setJpos(jpos.map(jpo => jpo.id === idJpo ? { ...jpo, inscrit: true } : jpo));
        } else {
          setMessage("Erreur d'inscription");
        }
      });
  };

  return (
    <div>
      <h2>L'agenda des JPO</h2>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {jpos.length === 0 ? (
        <p>Aucune JPO à venir.</p>
      ) : (
        <ul>
          {jpos.map((jpo) => (
            <li key={jpo.id}>
              <strong>{jpo.titre}</strong> - {jpo.etablissement_nom} ({jpo.ville})<br />
              {new Date(jpo.date_debut).toLocaleString()}<br />
              {jpo.description}
              <br />
              {user ? (
                <button onClick={() => inscrireAJPO(jpo.id)}>
                  S’inscrire à la JPO
                </button>
              ) : (
                <span style={{ color: "gray" }}>
                  Connectez-vous pour vous inscrire
                </span>
              )}
              <CommentairesJPO idJpo={jpo.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

