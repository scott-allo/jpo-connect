<?php
require_once __DIR__ . '/../Modeles/Inscription.php';

class ControleurInscription {
    private $inscription;

    public function __construct($db) {
        $this->inscription = new Inscription($db);
    }

    public function inscrire($data) {
        if (isset($data['id_utilisateur'], $data['id_jpo'])) {
            $nb = isset($data['nombre_personnes']) ? $data['nombre_personnes'] : 1;
            $result = $this->inscription->inscrire($data['id_utilisateur'], $data['id_jpo'], $nb);
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Inscription à la JPO réussie']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'inscription']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Champs manquants']);
        }
    }
}