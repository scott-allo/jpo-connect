import React from "react";

const RolesTable = () => (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Action / Page</th>
        <th>Directeur (Admin)</th>
        <th>Responsable</th>
        <th>Salarié</th>
        <th>Visiteur</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Gérer les utilisateurs</td>
        <td>✅</td><td>❌</td><td>❌</td><td>❌</td>
      </tr>
      <tr>
        <td>Gérer les rôles</td>
        <td>✅</td><td>❌</td><td>❌</td><td>❌</td>
      </tr>
      <tr>
        <td>Ajouter/modifier/supprimer JPO</td>
        <td>✅</td><td>✅</td><td>❌</td><td>❌</td>
      </tr>
      <tr>
        <td>Voir les stats</td>
        <td>✅</td><td>✅</td><td>✅</td><td>❌</td>
      </tr>
      <tr>
        <td>Gérer/modérer commentaires</td>
        <td>✅</td><td>✅</td><td>❌</td><td>❌</td>
      </tr>
      <tr>
        <td>Gérer les inscriptions</td>
        <td>✅</td><td>✅</td><td>✅</td><td>❌</td>
      </tr>
      <tr>
        <td>S’inscrire à une JPO</td>
        <td>✅</td><td>✅</td><td>✅</td><td>✅</td>
      </tr>
      <tr>
        <td>Commenter</td>
        <td>✅</td><td>✅</td><td>✅</td><td>✅</td>
      </tr>
    </tbody>
  </table>
);

export default RolesTable;