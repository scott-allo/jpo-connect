import React, { useEffect, useState } from "react";
import RolesTable from "./RolesTable";

const AdminUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetch(`http://localhost/jpo-connect/backend/public/index.php?action=utilisateurs&page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setTotal(data.total);
      });
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=roles")
      .then(res => res.json())
      .then(setRoles);
  }, [page]);

  const handleRoleChange = (id, id_role) => {
    fetch("http://localhost/jpo-connect/backend/public/index.php?action=changer_role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, id_role }),
    })
      .then(res => res.json())
      .then(() => window.location.reload());
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h3>Gestion des utilisateurs</h3>
      <RolesTable />
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Rôle</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map(u => (
              <tr key={u.id}>
                <td>{u.nom}</td>
                <td>{u.prenom}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    className="form-select"
                    value={u.id_role}
                    onChange={e => handleRoleChange(u.id, e.target.value)}
                    disabled={u.id === 1}
                  >
                    {roles.map(r => (
                      <option key={r.id} value={r.id}>{r.nom}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">Aucun utilisateur à afficher.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center my-3">
        <button className="btn btn-secondary me-2" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Précédent</button>
        <span>Page {page} / {totalPages}</span>
        <button className="btn btn-secondary ms-2" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Suivant</button>
      </div>
      <button className="btn btn-warning mb-3">Modifier rôles utilisateurs</button>
    </div>
  );
};

export default AdminUtilisateurs;