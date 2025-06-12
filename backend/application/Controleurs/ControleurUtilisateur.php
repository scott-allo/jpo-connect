<?php
require_once __DIR__ . '/../Modeles/Utilisateur.php';

class ControleurUtilisateur {
    private $utilisateur;

    public function __construct($db) {
        $this->utilisateur = new Utilisateur($db);
    }

    public function register($data) {
        if (
            isset($data['nom']) &&
            isset($data['prenom']) &&
            isset($data['email']) &&
            isset($data['password'])
        ) {
            $result = $this->utilisateur->register(
                $data['nom'],
                $data['prenom'],
                $data['email'],
                $data['password']
            );
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Inscription réussie']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'inscription']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Champs manquants']);
        }
    }

    public function login($data) {
        if (isset($data['email']) && isset($data['password'])) {
            $user = $this->utilisateur->login($data['email'], $data['password']);
            if ($user) {
                session_start();
                $_SESSION['user'] = [
                    'id' => $user['id'],
                    'id_role' => $user['id_role'],
                    'nom' => $user['nom'],
                    'prenom' => $user['prenom'],
                    'email' => $user['email']
                ];
                echo json_encode(['success' => true, 'user' => $user]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Identifiants invalides']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Champs manquants']);
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