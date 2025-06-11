<?php
// On charge l'autoloader
require_once __DIR__ . '/../application/Coeur/ChargeurAuto.php';
require_once __DIR__ . '/../Coeur/Database.php';
require_once __DIR__ . '/../application/Controleurs/ControleurUtilisateur.php';
require_once __DIR__ . '/../application/Controleurs/ControleurJPO.php';
require_once __DIR__ . '/../application/Controleurs/ControleurInscription.php';
require_once __DIR__ . '/../application/Controleurs/ControleurCommentaire.php';

header('Content-Type: application/json');

$db = new Database();
$conn = $db->getConnection();

if ($conn) {
    // Ici tu peux gérer tes routes API, par exemple :
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action'])) {
        $data = json_decode(file_get_contents('php://input'), true);
        if ($_GET['action'] === 'register') {
            $controleur = new ControleurUtilisateur($conn);
            $controleur->register($data);
        } elseif ($_GET['action'] === 'login') {
            $controleur = new ControleurUtilisateur($conn);
            $controleur->login($data);
        } elseif ($_GET['action'] === 'inscription_jpo') {
            $controleur = new ControleurInscription($conn);
            $controleur->inscrire($data);
        } elseif ($_GET['action'] === 'desinscription_jpo') {
            $controleur = new ControleurInscription($conn);
            $controleur->desinscrire($data);
        } elseif ($_GET['action'] === 'ajouter_commentaire') {
            $controleur = new ControleurCommentaire($conn);
            $controleur->ajouter($data);
        } elseif ($_GET['action'] === 'moderer_commentaire') {
            $controleur = new ControleurCommentaire($conn);
            $controleur->moderer($data);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'jpo') {
        $controleur = new ControleurJPO($conn);
        $controleur->getAll();
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'commentaires_jpo' && isset($_GET['id_jpo'])) {
        $controleur = new ControleurCommentaire($conn);
        $controleur->getByJPO($_GET['id_jpo']);
    } else {
        echo json_encode(['success' => true, 'message' => 'API JPO Connect opérationnelle']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']);
}
