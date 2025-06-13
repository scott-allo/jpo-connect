import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import AdminInscritsJPO from "../components/AdminInscritsJPO";
import AdminCommentaires from "../components/AdminCommentaires";
import AdminTousCommentaires from "../components/AdminTousCommentaires";
import StatsJPO from "../components/StatsJPO";
import AdminUtilisateurs from "../components/AdminUtilisateurs";

const AdminJPO = () => {
  const { user } = useContext(UserContext);
  const [jpos, setJpos] = useState([]);
  const [form, setForm] = useState({ titre: "", description: "", date_debut: "", date_fin: "", capacite_max: 10, id_etablissement: 1 });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [etablissements, setEtablissements] = useState([]);
  const [selectedJpo, setSelectedJpo] = useState(null);

  useEffect(() => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=jpo")
      .then(res => res.json())
      .then(setJpos);
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=etablissements")
      .then(res => res.json())
      .then(setEtablissements);
  }, [message]);

  if (!user || user.id_role !== 1) return <div className="container mt-4">Accès réservé à l'administrateur.</div>;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const action = editId ? "modifier_jpo" : "ajouter_jpo";
    const data = editId ? { ...form, id: editId } : { ...form, createur_id: user.id };
    fetch(`http://localhost/jpo-connect/backend/public/index.php?action=${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setForm({ titre: "", description: "", date_debut: "", date_fin: "", capacite_max: 10, id_etablissement: 1 });
        setEditId(null);
      });
  };

  const handleEdit = jpo => {
    setEditId(jpo.id);
    setForm({
      titre: jpo.titre,
      description: jpo.description,
      date_debut: jpo.date_debut.slice(0, 16),
      date_fin: jpo.date_fin.slice(0, 16),
      capacite_max: jpo.capacite_max,
      id_etablissement: jpo.id_etablissement,
    });
  };

  const handleDelete = id => {
    if (window.confirm("Supprimer cette JPO ?")) {
      fetch("http://localhost/jpo-connect/backend/public/index.php?action=supprimer_jpo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then(res => res.json())
        .then(data => setMessage(data.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Administration des JPO</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <ul className="nav nav-tabs mb-3" id="adminTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="jpo-tab" data-bs-toggle="tab" data-bs-target="#jpo" type="button" role="tab">JPO</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="inscrits-tab" data-bs-toggle="tab" data-bs-target="#inscrits" type="button" role="tab">Inscrits</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="mod-comment-tab" data-bs-toggle="tab" data-bs-target="#mod-comment" type="button" role="tab">Modération commentaires</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="all-comment-tab" data-bs-toggle="tab" data-bs-target="#all-comment" type="button" role="tab">Tous les commentaires</button>
        </li>
        {user.id_role <= 3 && (
          <li className="nav-item" role="presentation">
            <button className="nav-link" id="stats-tab" data-bs-toggle="tab" data-bs-target="#stats" type="button" role="tab">Statistiques</button>
          </li>
        )}
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="users-tab" data-bs-toggle="tab" data-bs-target="#users" type="button" role="tab">
            Utilisateurs
          </button>
        </li>
      </ul>
      <div className="tab-content" id="adminTabsContent">
        <div className="tab-pane fade show active" id="jpo" role="tabpanel">
          {/* CRUD JPO */}
          <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
            <div className="mb-2">
              <input name="titre" className="form-control" placeholder="Titre" value={form.titre} onChange={handleChange} required />
            </div>
            <div className="mb-2">
              <textarea name="description" className="form-control" placeholder="Description" value={form.description} onChange={handleChange} required />
            </div>
            <div className="mb-2">
              <input name="date_debut" type="datetime-local" className="form-control" value={form.date_debut} onChange={handleChange} required />
            </div>
            <div className="mb-2">
              <input name="date_fin" type="datetime-local" className="form-control" value={form.date_fin} onChange={handleChange} required />
            </div>
            <div className="mb-2">
              <input name="capacite_max" type="number" className="form-control" value={form.capacite_max} onChange={handleChange} required />
            </div>
            <div className="mb-2">
              <select name="id_etablissement" className="form-select" value={form.id_etablissement} onChange={handleChange} required>
                {etablissements.map(e => (
                  <option key={e.id} value={e.id}>{e.nom} ({e.ville})</option>
                ))}
              </select>
            </div>
            <button className="btn btn-success">{editId ? "Modifier" : "Ajouter"} la JPO</button>
            {editId && <button type="button" className="btn btn-secondary ms-2" onClick={() => { setEditId(null); setForm({ titre: "", description: "", date_debut: "", date_fin: "", capacite_max: 10, id_etablissement: 1 }); }}>Annuler</button>}
          </form>
          <hr className="my-4" />
          <ul className="list-group mb-4">
            {jpos.map(jpo => (
              <li key={jpo.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <b>{jpo.titre}</b> - {jpo.etablissement_nom} ({jpo.ville})<br />
                  {new Date(jpo.date_debut).toLocaleString()} → {new Date(jpo.date_fin).toLocaleString()}
                </div>
                <div>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(jpo)}>Modifier</button>
                  <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(jpo.id)}>Supprimer</button>
                  <button className="btn btn-info btn-sm" onClick={() => setSelectedJpo(jpo.id)}>
                    Voir inscrits
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-pane fade" id="inscrits" role="tabpanel">
          <hr className="my-4" />
          {/* Section gestion des inscrits */}
          {selectedJpo ? (
            <div className="mb-4">
              <h4>Inscrits à la JPO sélectionnée</h4>
              <button className="btn btn-secondary btn-sm mb-2" onClick={() => setSelectedJpo(null)}>Fermer</button>
              <AdminInscritsJPO idJpo={selectedJpo} />
            </div>
          ) : (
            <div className="alert alert-info">Clique sur "Voir inscrits" dans la liste des JPO.</div>
          )}
        </div>
        <div className="tab-pane fade" id="mod-comment" role="tabpanel">
          <hr className="my-4" />
          <AdminCommentaires />
        </div>
        <div className="tab-pane fade" id="all-comment" role="tabpanel">
          <hr className="my-4" />
          <AdminTousCommentaires />
        </div>
        <div className="tab-pane fade" id="stats" role="tabpanel">
          <hr className="my-4" />
          <StatsJPO jpos={jpos} />
        </div>
        <div className="tab-pane fade" id="users" role="tabpanel">
          <hr className="my-4" />
          <AdminUtilisateurs />
        </div>
      </div>
     
    </div>
  );
};

export default AdminJPO;