<?php
require_once __DIR__ . '/../Modeles/Utilisateur.php';

class ControleurUtilisateur {
    private $utilisateur;

    public function __construct($db) {
        $this->utilisateur = new Utilisateur($db);
    }

    public function register($data) {
        $nom = $data['nom'];
        $prenom = $data['prenom'];
        $email = $data['email'];
        // Accepte les deux pour compatibilité
        $password = isset($data['password']) ? $data['password'] : $data['mot_de_passe'];

        $user = $this->utilisateur->getByEmail($email);
        if ($user) {
            echo json_encode(['success' => false, 'message' => 'Email déjà utilisé']);
            return;
        }

        $result = $this->utilisateur->register($nom, $prenom, $email, $password);
        if ($result) {
            echo json_encode(['success' => true, 'message' => 'Inscription validée']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'inscription']);
        }
    }

    public function login($data) {
        $email = $data['email'];
        $password = $data['password']; // et pas 'mot_de_passe'
        $user = $this->utilisateur->login($email, $password);
        if ($user) {
            session_start();
            $_SESSION['user'] = [
                'id' => $user['id'],
                'id_role' => $user['id_role'],
                'nom' => $user['nom'],
                'prenom' => $user['prenom'],
                'email' => $user['email']
            ];
            echo json_encode(['success' => true, 'user' => $_SESSION['user']]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Identifiants invalides']);
        }
    }

    public function getAll($page = 1, $limit = 10) {
        echo json_encode($this->utilisateur->getAll($page, $limit));
    }

    public function getRoles() {
        echo json_encode($this->utilisateur->getRoles());
    }

    public function changerRole($data) {
        session_start();
        if (!isset($_SESSION['user']) || $_SESSION['user']['id_role'] != 1) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Accès interdit']);
            exit;
        }
        echo json_encode($this->utilisateur->changerRole($data['id'], $data['id_role']));
    }
}