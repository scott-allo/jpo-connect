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
}