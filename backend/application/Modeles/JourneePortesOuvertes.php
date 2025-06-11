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
}