<?php
class Commentaire {
    private $conn;
    private $table = "commentaire";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function ajouter($contenu, $id_utilisateur, $id_jpo, $note = null, $id_commentaire_parent = null) {
        $query = "INSERT INTO " . $this->table . " (contenu, id_utilisateur, id_jpo, note, id_commentaire_parent) 
                  VALUES (:contenu, :id_utilisateur, :id_jpo, :note, :id_commentaire_parent)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':contenu', $contenu);
        $stmt->bindParam(':id_utilisateur', $id_utilisateur);
        $stmt->bindParam(':id_jpo', $id_jpo);
        $stmt->bindParam(':note', $note);
        $stmt->bindParam(':id_commentaire_parent', $id_commentaire_parent);
        return $stmt->execute();
    }

    public function getByJPO($id_jpo) {
        $query = "SELECT c.*, u.nom, u.prenom 
                  FROM " . $this->table . " c
                  JOIN utilisateur u ON c.id_utilisateur = u.id
                  WHERE c.id_jpo = :id_jpo AND c.modere = 0
                  ORDER BY c.date_creation DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_jpo', $id_jpo);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}