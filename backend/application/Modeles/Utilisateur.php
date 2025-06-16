<?php
class Utilisateur {
    private $conn;
    private $table = "utilisateur"; // <-- assure-toi que ce champ existe

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll($page = 1, $limit = 10) {
        $offset = ($page - 1) * $limit;
        $stmt = $this->conn->prepare(
            "SELECT u.*, r.nom AS nom_role
             FROM utilisateur u
             LEFT JOIN role r ON u.id_role = r.id
             LIMIT :limit OFFSET :offset"
        );
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();

        // Pour le total
        $total = $this->conn->query("SELECT COUNT(*) FROM utilisateur")->fetchColumn();

        return [
            'users' => $stmt->fetchAll(PDO::FETCH_ASSOC),
            'total' => intval($total)
        ];
    }

    public function register($nom, $prenom, $email, $password) {
        $sql = "INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, id_role) VALUES (:nom, :prenom, :email, :mot_de_passe, :id_role)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':email', $email);
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt->bindParam(':mot_de_passe', $hash);
        $role = 4;
        $stmt->bindParam(':id_role', $role);
        return $stmt->execute();
    }

    public function login($email, $password) {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($password, $user['mot_de_passe'])) {
            unset($user['mot_de_passe']);
            return $user;
        }
        return false;
    }

    public function getRoles() {
        $stmt = $this->conn->query("SELECT * FROM role");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function changerRole($id, $id_role) {
        $stmt = $this->conn->prepare("UPDATE utilisateur SET id_role = :id_role WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':id_role', $id_role);
        return $stmt->execute();
    }

    public function create($nom, $prenom, $email, $password) {
        $sql = "INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, id_role) VALUES (:nom, :prenom, :email, :password, 4)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        return $stmt->execute();
    }

    public function getByEmail($email) {
        $sql = "SELECT * FROM utilisateur WHERE email = :email";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getById($id) {
        $sql = "SELECT * FROM utilisateur WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}