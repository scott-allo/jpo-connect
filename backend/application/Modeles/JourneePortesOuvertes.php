<?php
class JourneePortesOuvertes {
    private $conn;
    private $table = "jpo";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT jpo.*, etablissement.nom AS etablissement_nom, etablissement.ville 
                  FROM " . $this->table . "
                  JOIN etablissement ON jpo.id_etablissement = etablissement.id
                  WHERE jpo.actif = 1
                  ORDER BY jpo.date_debut ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function ajouter($data) {
        $query = "INSERT INTO jpo (titre, description, date_debut, date_fin, capacite_max, id_etablissement, createur_id) 
                  VALUES (:titre, :description, :date_debut, :date_fin, :capacite_max, :id_etablissement, :createur_id)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':titre' => $data['titre'],
            ':description' => $data['description'],
            ':date_debut' => $data['date_debut'],
            ':date_fin' => $data['date_fin'],
            ':capacite_max' => $data['capacite_max'],
            ':id_etablissement' => $data['id_etablissement'],
            ':createur_id' => $data['createur_id'],
        ]);
    }

    public function modifier($data) {
        $query = "UPDATE jpo SET titre=:titre, description=:description, date_debut=:date_debut, date_fin=:date_fin, capacite_max=:capacite_max, id_etablissement=:id_etablissement WHERE id=:id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            ':titre' => $data['titre'],
            ':description' => $data['description'],
            ':date_debut' => $data['date_debut'],
            ':date_fin' => $data['date_fin'],
            ':capacite_max' => $data['capacite_max'],
            ':id_etablissement' => $data['id_etablissement'],
            ':id' => $data['id'],
        ]);
    }

    public function supprimer($id) {
        $query = "DELETE FROM jpo WHERE id=:id";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([':id' => $id]);
    }

    public function getById($id) {
        $query = "SELECT jpo.*, etablissement.nom AS etablissement_nom, etablissement.ville 
                  FROM " . $this->table . "
                  JOIN etablissement ON jpo.id_etablissement = etablissement.id
                  WHERE jpo.id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}