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

    public function desinscrire($data) {
        if (isset($data['id_utilisateur'], $data['id_jpo'])) {
            $result = $this->inscription->desinscrire($data['id_utilisateur'], $data['id_jpo']);
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Désinscription réussie']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erreur lors de la désinscription']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Champs manquants']);
        }
    }

    public function getInscrits($data) {
        if (isset($data['id_jpo'])) {
            $result = $this->inscription->getInscritsByJPO($data['id_jpo']);
            echo json_encode($result);
        } else {
            echo json_encode([]);
        }
    }

    public function update($data) {
        if (isset($data['id_utilisateur'], $data['id_jpo'], $data['nombre_personnes'])) {
            $present = isset($data['present']) ? $data['present'] : null;
            $result = $this->inscription->update($data['id_utilisateur'], $data['id_jpo'], $data['nombre_personnes'], $present);
            echo json_encode(['success' => $result, 'message' => $result ? 'Inscription modifiée' : 'Erreur modification']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Champs manquants']);
        }
    }

    public function getStats($data) {
        if (isset($data['id_jpo'])) {
            $result = $this->inscription->getStatsByJPO($data['id_jpo']);
            echo json_encode($result);
        } else {
            echo json_encode([]);
        }
    }
}