<?php
/**
 * Classe ChargeurAuto
 * Permet de charger automatiquement les classes de l'application.
 */

spl_autoload_register(function ($classe) {
    // On définit le namespace de base de notre projet
    $prefixe = "Application\\";

    // Chemin de base vers les fichiers source
    $dossierBase = __DIR__ . "/../";

    // Vérifie si la classe utilise notre namespace
    $longueurPrefixe = strlen($prefixe);
    if (strncmp($prefixe, $classe, $longueurPrefixe) !== 0) {
        return;
    }

    // Supprime le namespace de base du nom de la classe
    $classeRelative = substr($classe, $longueurPrefixe);

    // Convertit les namespaces en chemins de fichiers
    $fichier = $dossierBase . str_replace("\\", "/", $classeRelative) . ".php";

    // Si le fichier existe, on l'inclut
    if (file_exists($fichier)) {
        require $fichier;
    }
});
