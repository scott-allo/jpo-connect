<?php
class Inscription {
    private $conn;
    private $table = "inscription";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function inscrire($id_utilisateur, $id_jpo, $nombre_personnes = 1) {
        $query = "INSERT INTO " . $this->table . " (id_utilisateur, id_jpo, nombre_personnes) VALUES (:id_utilisateur, :id_jpo, :nombre_personnes)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_utilisateur', $id_utilisateur);
        $stmt->bindParam(':id_jpo', $id_jpo);
        $stmt->bindParam(':nombre_personnes', $nombre_personnes);
        return $stmt->execute();
    }

    public function desinscrire($id_utilisateur, $id_jpo) {
        $query = "DELETE FROM " . $this->table . " WHERE id_utilisateur = :id_utilisateur AND id_jpo = :id_jpo";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_utilisateur', $id_utilisateur);
        $stmt->bindParam(':id_jpo', $id_jpo);
        return $stmt->execute();
    }

    public function getInscritsByJPO($id_jpo) {
        $query = "SELECT i.*, u.nom, u.prenom, u.email
                  FROM inscription i
                  JOIN utilisateur u ON i.id_utilisateur = u.id
                  WHERE i.id_jpo = :id_jpo";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_jpo', $id_jpo);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($id_utilisateur, $id_jpo, $nombre_personnes, $present = null) {
        $query = "UPDATE " . $this->table . " SET nombre_personnes = :nombre_personnes, present = :present WHERE id_utilisateur = :id_utilisateur AND id_jpo = :id_jpo";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nombre_personnes', $nombre_personnes);
        $stmt->bindParam(':present', $present);
        $stmt->bindParam(':id_utilisateur', $id_utilisateur);
        $stmt->bindParam(':id_jpo', $id_jpo);
        return $stmt->execute();
    }
}