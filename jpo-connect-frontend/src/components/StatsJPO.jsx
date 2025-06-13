import React, { useState } from "react";

const StatsJPO = ({ jpos }) => {
  const [stats, setStats] = useState({});
  const [selected, setSelected] = useState(null);

  const fetchStats = (id_jpo) => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=stats_jpo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_jpo }),
    })
      .then(res => res.json())
      .then(data => setStats({ ...stats, [id_jpo]: data }));
  };

  return (
    <div>
      <h3>Statistiques par JPO</h3>
      <ul className="list-group">
        {jpos.map(jpo => (
          <li key={jpo.id} className="list-group-item">
            <b>{jpo.titre}</b> - {jpo.etablissement_nom} ({jpo.ville})
            <button
              className="btn btn-outline-primary btn-sm ms-3"
              onClick={() => {
                setSelected(jpo.id);
                fetchStats(jpo.id);
              }}
            >
              Voir stats
            </button>
            {selected === jpo.id && stats[jpo.id] && (
              <div className="mt-2">
                <ul>
                  <li>Nombre d'inscrits : <b>{stats[jpo.id].nb_inscrits}</b></li>
                  <li>Nombre total de personnes : <b>{stats[jpo.id].total_personnes}</b></li>
                  <li>Nombre de personnes présentes : <b>{stats[jpo.id].nb_presents}</b></li>
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatsJPO;