import React, { useState } from "react";

const RechercheJPO = () => {
  const [ville, setVille] = useState("");
  const [titre, setTitre] = useState("");
  const [resultats, setResultats] = useState([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSearch = e => {
    e.preventDefault();
    const params = [];
    if (ville) params.push(`ville=${encodeURIComponent(ville)}`);
    if (titre) params.push(`titre=${encodeURIComponent(titre)}`);
    fetch(`http://localhost/jpo-connect/backend/public/index.php?action=recherche_jpo&${params.join("&")}`)
      .then(res => res.json())
      .then(setResultats);
  };

  const handleInscription = (id_jpo) => {
    if (!user) {
      setMessage("Vous devez avoir un compte et être connecté pour vous inscrire à une JPO.");
      return;
    }
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=inscription_jpo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_jpo, id_utilisateur: user.id }),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.success ? "Inscription réussie !" : (data.message || "Erreur lors de l'inscription."));
      });
  };

  return (
    <div className="container my-4">
      <h4>Rechercher une JPO</h4>
      <form className="row g-2 mb-3" onSubmit={handleSearch}>
        <div className="col-md-4">
          <input className="form-control" placeholder="Ville (ex: Cannes)" value={ville} onChange={e => setVille(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input className="form-control" placeholder="Titre JPO" value={titre} onChange={e => setTitre(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" type="submit">Rechercher</button>
        </div>
      </form>
      {message && <div className="alert alert-info">{message}</div>}
      <ul className="list-group">
        {resultats.map(jpo => (
          <li key={jpo.id} className="list-group-item">
            <b>{jpo.titre}</b> - {jpo.etablissement_nom} ({jpo.ville})<br />
            {new Date(jpo.date_debut).toLocaleString()} → {new Date(jpo.date_fin).toLocaleString()}
            <div>
              {!user ? (
                <div className="alert alert-warning mt-2">
                  Connectez-vous pour vous inscrire à une JPO.
                </div>
              ) : (
                <button
                  className="btn btn-success btn-sm mt-2"
                  onClick={() => handleInscription(jpo.id)}
                >
                  S'inscrire à cette JPO
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RechercheJPO;