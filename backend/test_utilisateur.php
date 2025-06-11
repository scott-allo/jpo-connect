<?php
require_once __DIR__ . '/Coeur/Database.php';
require_once __DIR__ . '/application/Modeles/Utilisateur.php';

$db = new Database();
$conn = $db->getConnection();

$utilisateur = new Utilisateur($conn);
print_r($utilisateur->getAll());