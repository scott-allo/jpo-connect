<?php
require_once __DIR__ . '/../Modeles/JourneePortesOuvertes.php';

class ControleurJPO {
    private $jpo;

    public function __construct($db) {
        $this->jpo = new JourneePortesOuvertes($db);
    }

    public function getAll() {
        $result = $this->jpo->getAll();
        echo json_encode($result);
    }

    public function ajouter($data) {
        session_start();
        if (!isset($_SESSION['user']) || $_SESSION['user']['id_role'] > 2) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Accès interdit']);
            exit;
        }
        if (
            isset($data['titre'], $data['description'], $data['date_debut'], $data['date_fin'], $data['capacite_max'], $data['id_etablissement'], $data['createur_id'])
        ) {
            $result = $this->jpo->ajouter($data);
            echo json_encode(['success' => $result, 'message' => $result ? 'JPO ajoutée' : 'Erreur ajout JPO']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Champs manquants']);
        }
    }

    public function modifier($data) {
        if (
            isset($data['id'], $data['titre'], $data['description'], $data['date_debut'], $data['date_fin'], $data['capacite_max'], $data['id_etablissement'])
        ) {
            $result = $this->jpo->modifier($data);
            echo json_encode(['success' => $result, 'message' => $result ? 'JPO modifiée' : 'Erreur modification JPO']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Champs manquants']);
        }
    }

    public function supprimer($data) {
        if (isset($data['id'])) {
            $result = $this->jpo->supprimer($data['id']);
            echo json_encode(['success' => $result, 'message' => $result ? 'JPO supprimée' : 'Erreur suppression JPO']);
        } else {
            echo json_encode(['success' => false, 'message' => 'ID manquant']);
        }
    }

    public function getRoles() {
        echo json_encode($this->utilisateur->getRoles());
    }
}