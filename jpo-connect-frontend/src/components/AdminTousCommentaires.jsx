import React, { useEffect, useState } from "react";

const AdminTousCommentaires = () => {
  const [commentaires, setCommentaires] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=tous_commentaires")
      .then(res => res.json())
      .then(setCommentaires);
  }, [message]);

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce commentaire ?")) {
      fetch("http://localhost/jpo-connect/backend/public/index.php?action=supprimer_commentaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then(res => res.json())
        .then(data => setMessage(data.message));
    }
  };

  return (
    <div>
      <h2>Tous les commentaires</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <ul className="list-group">
        {commentaires.map(c => (
          <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <b>{c.nom} {c.prenom}</b> sur <i>{c.jpo_titre}</i> : {c.contenu}
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTousCommentaires;