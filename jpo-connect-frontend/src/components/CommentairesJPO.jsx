import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const CommentairesJPO = ({ idJpo }) => {
  const { user } = useContext(UserContext);
  const [commentaires, setCommentaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contenu, setContenu] = useState("");
  const [note, setNote] = useState(5);
  const [message, setMessage] = useState("");

  // À remplacer par l'ID utilisateur connecté (exemple statique ici)
  const idUtilisateur = user?.id;

  useEffect(() => {
    fetch(`http://localhost/jpo-connect/backend/public/index.php?action=commentaires_jpo&id_jpo=${idJpo}`)
      .then((res) => res.json())
      .then((data) => {
        setCommentaires(data);
        setLoading(false);
      });
  }, [idJpo, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=ajouter_commentaire", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contenu,
        id_utilisateur: idUtilisateur,
        id_jpo: idJpo,
        note,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setContenu("");
        setNote(5);
      });
  };

  if (loading) return <div>Chargement des commentaires...</div>;

  return (
    <div>
      <h3>Commentaires</h3>
      {commentaires.length === 0 ? (
        <p>Aucun commentaire pour cette JPO.</p>
      ) : (
        <ul>
          {commentaires.map((c) => (
            <li key={c.id}>
              <strong>{c.nom} {c.prenom}</strong> : {c.contenu}
              {c.note && <> <span> - Note : {c.note}/5</span></>}
              <br />
              <small>{new Date(c.date_creation).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      {user ? (
        <form onSubmit={handleSubmit} style={{ marginTop: "1em" }}>
          <textarea
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            placeholder="Votre commentaire"
            required
          />
          <br />
          <label>
            Note :
            <select value={note} onChange={(e) => setNote(Number(e.target.value))}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <br />
          <button type="submit">Poster un commentaire</button>
        </form>
      ) : (
        <div style={{ color: "gray" }}>Connectez-vous pour commenter</div>
      )}
      {message && <div style={{ color: "green" }}>{message}</div>}
    </div>
  );
};

export default CommentairesJPO;