import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import CommentairesJPO from "./CommentairesJPO";

const Agenda = () => {
  const { user } = useContext(UserContext);
  const [jpos, setJpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [ville, setVille] = useState(""); // Ajouté

  const idUtilisateur = user?.id;

  const inscrireAJPO = (idJpo) => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=inscription_jpo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_utilisateur: idUtilisateur,
        id_jpo: idJpo,
        nombre_personnes: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  useEffect(() => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=jpo")
      .then((res) => res.json())
      .then((data) => {
        setJpos(data);
        setLoading(false);
      })
      .catch((err) => {
        setMessage("Erreur de chargement des JPO");
        setLoading(false);
      });
  }, []);

  // Récupère la liste des villes uniques
  const villes = Array.from(new Set(jpos.map(jpo => jpo.ville)));

  // Filtre les JPO selon la ville sélectionnée
  const jposFiltres = ville ? jpos.filter(jpo => jpo.ville === ville) : jpos;

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">L'agenda des JPO</h2>
      <div className="mb-3">
        <label>Filtrer par ville : </label>
        <select
          className="form-select w-auto d-inline-block ms-2"
          value={ville}
          onChange={e => setVille(e.target.value)}
        >
          <option value="">Toutes</option>
          {villes.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>
      {message && <div className="alert alert-success">{message}</div>}
      {jposFiltres.length === 0 ? (
        <div className="alert alert-info">Aucune JPO à venir.</div>
      ) : (
        <ul className="list-group">
          {jposFiltres.map((jpo) => (
            <li key={jpo.id} className="list-group-item mb-3">
              <strong>{jpo.titre}</strong> - {jpo.etablissement_nom} ({jpo.ville})<br />
              <span className="text-muted">{new Date(jpo.date_debut).toLocaleString()}</span><br />
              <span>{jpo.description}</span>
              <br />
              {user ? (
                <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => inscrireAJPO(jpo.id)}
                >
                  S’inscrire à la JPO
                </button>
              ) : (
                <span className="text-secondary">
                  Connectez-vous pour vous inscrire
                </span>
              )}
              <div className="mt-3">
                <CommentairesJPO idJpo={jpo.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Agenda;