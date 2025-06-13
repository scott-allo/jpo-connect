import React, { useEffect, useState } from "react";

const AdminCommentaires = () => {
  const [commentaires, setCommentaires] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=commentaires_non_moderes")
      .then(res => res.json())
      .then(setCommentaires);
  }, [message]);

  const handleModeration = (id_commentaire, modere) => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=moderer_commentaire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_commentaire, modere }),
    })
      .then(res => res.json())
      .then(data => setMessage(data.message));
  };

  return (
    <div>
      <h2>Modération des commentaires</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <ul className="list-group">
        {commentaires.map(c => (
          <li key={c.id} className="list-group-item">
            <b>{c.nom} {c.prenom}</b> sur <i>{c.jpo_titre}</i> : {c.contenu}
            <br />
            <button className="btn btn-success btn-sm me-2" onClick={() => handleModeration(c.id, 1)}>Valider</button>
            <button className="btn btn-danger btn-sm" onClick={() => handleModeration(c.id, 2)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCommentaires;