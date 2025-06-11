<?php
require_once __DIR__ . '/Coeur/Database.php';

$db = new Database();
$conn = $db->getConnection();

if ($conn) {
    echo "Connexion réussie à la base de données !";
} else {
    echo "Échec de la connexion à la base de données.";
}