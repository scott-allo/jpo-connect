import React, { useEffect, useState } from "react";

const AdminInscritsJPO = ({ idJpo }) => {
  const [inscrits, setInscrits] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=liste_inscrits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_jpo: idJpo }),
    })
      .then(res => res.json())
      .then(setInscrits);
  }, [idJpo, message]);

  const handleDelete = (id_utilisateur) => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=desinscription_jpo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_utilisateur, id_jpo: idJpo }),
    })
      .then(res => res.json())
      .then(data => setMessage(data.message));
  };

  return (
    <div>
      <h3>Liste des inscrits</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <ul className="list-group">
        {inscrits.map(i => (
          <li key={i.id_utilisateur} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              {i.nom} {i.prenom} ({i.email})<br />
              <input
                type="number"
                min="1"
                value={i.nombre_personnes}
                onChange={e => {
                  const val = e.target.value;
                  fetch("http://localhost/jpo-connect/backend/public/index.php?action=modifier_inscription", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_utilisateur: i.id_utilisateur, id_jpo: idJpo, nombre_personnes: val }),
                  })
                    .then(res => res.json())
                    .then(data => setMessage(data.message));
                }}
                style={{ width: 60, marginRight: 10 }}
              />
              personnes
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(i.id_utilisateur)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminInscritsJPO;