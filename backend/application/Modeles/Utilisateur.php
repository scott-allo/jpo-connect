<?php
class Utilisateur {
    private $conn;
    private $table = "utilisateur";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function register($nom, $prenom, $email, $password) {
        $query = "INSERT INTO " . $this->table . " (nom, prenom, email, mot_de_passe, id_role) VALUES (:nom, :prenom, :email, :mot_de_passe, :id_role)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':email', $email);
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bindParam(':mot_de_passe', $hash);
        $role = 4; // Visiteur par défaut
        $stmt->bindParam(':id_role', $role);
        return $stmt->execute();
    }

    public function login($email, $password) {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        // Debug
        file_put_contents('login_debug.txt', print_r([$email, $user, $password], true));
        // Compare en clair
        if ($user && $password === $user['mot_de_passe']) {
            unset($user['mot_de_passe']);
            return $user;
        }
        return false;
    }
}