import React, { useEffect, useState } from "react";
import CommentairesJPO from "./CommentairesJPO";

const Agenda = () => {
  const [jpos, setJpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // À remplacer par l'ID utilisateur connecté (exemple statique ici)
  const idUtilisateur = 1;

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
      });
  }, []);

  if (loading) return <div>Chargement...</div>;

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
              <button onClick={() => inscrireAJPO(jpo.id)}>
                S’inscrire à la JPO
              </button>
              <CommentairesJPO idJpo={jpo.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Agenda;