import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const MesInscriptions = () => {
  const { user } = useContext(UserContext);
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchInscriptions = () => {
    fetch(`http://localhost/jpo-connect/backend/public/index.php?action=mes_inscriptions&id_utilisateur=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setInscriptions(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) fetchInscriptions();
  }, [user]);

  const handleDesinscrire = (id_jpo) => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=desinscription_jpo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_utilisateur: user.id, id_jpo }),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        fetchInscriptions();
      });
  };

  if (!user) return <div className="container mt-4">Veuillez vous connecter.</div>;
  if (loading) return <div className="container mt-4">Chargement...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mes inscriptions aux JPO</h2>
      {message && <div className="alert alert-info">{message}</div>}
      {inscriptions.length === 0 ? (
        <div className="alert alert-info">Vous n'êtes inscrit à aucune JPO.</div>
      ) : (
        <ul className="list-group">
          {inscriptions.map((i) => (
            <li key={i.id} className="list-group-item mb-3 d-flex justify-content-between align-items-center">
              <div>
                <strong>{i.titre}</strong> - {i.etablissement_nom} ({i.ville})<br />
                <span className="text-muted">{new Date(i.date_debut).toLocaleString()}</span>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDesinscrire(i.id_jpo)}
              >
                Se désinscrire
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MesInscriptions;