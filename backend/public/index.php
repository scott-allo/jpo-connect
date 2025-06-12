<?php
// Affichage des erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// On charge l'autoloader
require_once __DIR__ . '/../application/Coeur/ChargeurAuto.php';
require_once __DIR__ . '/../Coeur/Database.php';
require_once __DIR__ . '/../application/Controleurs/ControleurUtilisateur.php';
require_once __DIR__ . '/../application/Controleurs/ControleurJPO.php';
require_once __DIR__ . '/../application/Controleurs/ControleurInscription.php';
require_once __DIR__ . '/../application/Controleurs/ControleurCommentaire.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

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
        } elseif ($_GET['action'] === 'ajouter_jpo') {
            $controleur = new ControleurJPO($conn);
            $controleur->ajouter($data);
        } elseif ($_GET['action'] === 'modifier_jpo') {
            $controleur = new ControleurJPO($conn);
            $controleur->modifier($data);
        } elseif ($_GET['action'] === 'supprimer_jpo') {
            $controleur = new ControleurJPO($conn);
            $controleur->supprimer($data);
        } elseif ($_GET['action'] === 'liste_inscrits') {
            $controleur = new ControleurInscription($conn);
            $controleur->getInscrits($data);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'supprimer_commentaire') {
            $controleur = new ControleurCommentaire($conn);
            $controleur->supprimer($data);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'modifier_inscription') {
            $controleur = new ControleurInscription($conn);
            $controleur->update($data);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'jpo') {
        $controleur = new ControleurJPO($conn);
        $controleur->getAll();
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'commentaires_jpo' && isset($_GET['id_jpo'])) {
        $controleur = new ControleurCommentaire($conn);
        $controleur->getByJPO($_GET['id_jpo']);
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'mes_inscriptions' && isset($_GET['id_utilisateur'])) {
        $inscription = new \Inscription($conn);
        $query = "SELECT i.*, j.titre, j.date_debut, j.date_fin, e.nom AS etablissement_nom, e.ville
                  FROM inscription i
                  JOIN jpo j ON i.id_jpo = j.id
                  JOIN etablissement e ON j.id_etablissement = e.id
                  WHERE i.id_utilisateur = :id_utilisateur";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id_utilisateur', $_GET['id_utilisateur']);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'etablissements') {
        $stmt = $conn->query("SELECT * FROM etablissement");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'commentaires_non_moderes') {
        $controleur = new ControleurCommentaire($conn);
        $controleur->getNonModeres();
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'tous_commentaires') {
        $controleur = new ControleurCommentaire($conn);
        $controleur->getAll();
    } else {
        echo json_encode(['success' => true, 'message' => 'API JPO Connect opérationnelle']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']);
}
