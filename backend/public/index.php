<?php
// On charge l'autoloader
require_once __DIR__ . '/../application/Coeur/ChargeurAuto.php';

// Utilisation du namespace
use Application\Coeur\BaseDeDonnees;

// Test de connexion
try {
    $pdo = BaseDeDonnees::obtenirInstance();
    echo "✅ Connexion à la base de données réussie.";
} catch (Exception $e) {
    echo "❌ Échec de connexion : " . $e->getMessage();
}
