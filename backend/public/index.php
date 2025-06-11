<?php
// On charge l'autoloader
require_once __DIR__ . '/../application/Coeur/ChargeurAuto.php';
require_once __DIR__ . '/../Coeur/Database.php';
require_once __DIR__ . '/../application/Controleurs/ControleurUtilisateur.php';

header('Content-Type: application/json');

$db = new Database();
$conn = $db->getConnection();

if ($conn) {
    // Ici tu peux gérer tes routes API, par exemple :
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'register') {
        $data = json_decode(file_get_contents('php://input'), true);
        $controleur = new ControleurUtilisateur($conn);
        $controleur->register($data);
    } else {
        echo json_encode(['success' => true, 'message' => 'API JPO Connect opérationnelle']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion à la base de données']);
}
