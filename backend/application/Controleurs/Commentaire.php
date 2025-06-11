<?php
require_once __DIR__ . '/../Modeles/Commentaire.php';

class ControleurCommentaire {
    private $commentaire;

    public function __construct($db) {
        $this->commentaire = new Commentaire($db);
    }

    public function ajouter($data) {
        if (isset($data['contenu'], $data['id_utilisateur'], $data['id_jpo'])) {
            $note = isset($data['note']) ? $data['note'] : null;
            $parent = isset($data['id_commentaire_parent']) ? $data['id_commentaire_parent'] : null;
            $result = $this->commentaire->ajouter($data['contenu'], $data['id_utilisateur'], $data['id_jpo'], $note, $parent);
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Commentaire ajouté']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'ajout']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Champs manquants']);
        }
    }

    public function getByJPO($id_jpo) {
        $result = $this->commentaire->getByJPO($id_jpo);
        echo json_encode($result);
    }

    public function moderer($data) {
        if (isset($data['id_commentaire'], $data['modere'])) {
            $result = $this->commentaire->moderer($data['id_commentaire'], $data['modere']);
            if ($result) {
                echo json_encode(['success' => true, 'message' => 'Commentaire modéré']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erreur lors de la modération']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Champs manquants']);
        }
    }
}