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
}