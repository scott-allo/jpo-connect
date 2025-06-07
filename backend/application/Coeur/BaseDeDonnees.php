<?php
namespace Application\Coeur;

use PDO;
use PDOException;

/**
 * Classe BaseDeDonnees
 * Singleton de connexion à la base de données.
 */
class BaseDeDonnees {
    private static $instance = null;
    private $pdo;

    // Constructeur privé : empêche l'instanciation directe
    private function __construct() {
        try {
            // Informations de connexion stockées dans le fichier .env
            $env = parse_ini_file(__DIR__ . '/../../.env');

            $hote = $env['DB_HOST'];   // dans le fichier .env, on peut avoir DB_HOST, DB_NAME, DB_USER, DB_PASSWORD
            $base = $env['DB_NAME'];
            $utilisateur = $env['DB_USER'];
            $motDePasse = $env['DB_PASSWORD'];

            $this->pdo = new PDO("mysql:host=$hote;dbname=$base;charset=utf8mb4", $utilisateur, $motDePasse);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Erreur de connexion à la base de données : " . $e->getMessage());
        }
    }

    // Retourne l'instance unique de connexion
    public static function obtenirInstance() {
        if (self::$instance === null) {
            self::$instance = new BaseDeDonnees();
        }
        return self::$instance->pdo;
    }
}
