<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// GESTION DES OPTIONS AVANT TOUT
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// On charge l'autoloader
require_once __DIR__ . '/../application/Coeur/ChargeurAuto.php';
require_once __DIR__ . '/../Coeur/Database.php';
require_once __DIR__ . '/../application/Controleurs/ControleurUtilisateur.php';
require_once __DIR__ . '/../application/Controleurs/ControleurJPO.php';
require_once __DIR__ . '/../application/Controleurs/ControleurInscription.php';
require_once __DIR__ . '/../application/Controleurs/ControleurCommentaire.php';

$db = new Database();
$conn = $db->getConnection();

if ($conn) {
    // POST actions
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
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'stats_jpo') {
            $controleur = new ControleurInscription($conn);
            $controleur->getStats($data);
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'changer_role') {
            $controleur = new ControleurUtilisateur($conn);
            $controleur->changerRole($data);
        }
    }
    // GET actions
    elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
        if ($_GET['action'] === 'utilisateurs') {
            $page = isset($_GET['page']) ? intval($_GET['page']) : 1;
            $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
            $controleur = new ControleurUtilisateur($conn);
            $controleur->getAll($page, $limit);
        } elseif ($_GET['action'] === 'roles') {
            $controleur = new ControleurUtilisateur($conn);
            $controleur->getRoles();
        } elseif ($_GET['action'] === 'jpo') {
            $controleur = new ControleurJPO($conn);
            $controleur->getAll();
        } elseif ($_GET['action'] === 'commentaires_jpo' && isset($_GET['id_jpo'])) {
            $controleur = new ControleurCommentaire($conn);
            $controleur->getByJPO($_GET['id_jpo']);
        } elseif ($_GET['action'] === 'mes_inscriptions' && isset($_GET['id_utilisateur'])) {
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
        } elseif ($_GET['action'] === 'etablissements') {
            $stmt = $conn->query("SELECT * FROM etablissement");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } elseif ($_GET['action'] === 'commentaires_non_moderes') {
            $controleur = new ControleurCommentaire($conn);
            $controleur->getNonModeres();
        } elseif ($_GET['action'] === 'tous_commentaires') {
            $controleur = new ControleurCommentaire($conn);
            $controleur->getAll();
        } elseif ($_GET['action'] === 'recherche_jpo') {
            $where = [];
            $params = [];
            if (!empty($_GET['ville'])) {
                $where[] = 'e.ville LIKE :ville';
                $params[':ville'] = '%' . $_GET['ville'] . '%';
            }
            if (!empty($_GET['titre'])) {
                $where[] = 'j.titre LIKE :titre';
                $params[':titre'] = '%' . $_GET['titre'] . '%';
            }
            $sql = "SELECT j.*, e.nom AS etablissement_nom, e.ville
                    FROM jpo j
                    JOIN etablissement e ON j.id_etablissement = e.id";
            if ($where) $sql .= " WHERE " . implode(' AND ', $where);
            $stmt = $conn->prepare($sql);
            foreach ($params as $k => $v) $stmt->bindValue($k, $v);
            $stmt->execute();
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        } else {
            echo json_encode(['success' => true, 'message' => 'API JPO Connect opérationnelle']);
        }
    }
    else {
        echo json_encode(['success' => true, 'message' => 'API JPO Connect opérationnelle']);
    }
} else {
    die(json_encode(['success' => false, 'message' => 'Erreur connexion base de données']));
}
