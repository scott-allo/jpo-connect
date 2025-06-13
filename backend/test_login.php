<?php
$pdo = new PDO('mysql:host=localhost;dbname=scott-allo_jpoconnect', 'root', '');
$email = 'admin@laplateforme.io';
$password = 'admin123';

$stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    if (password_verify($password, $user['mot_de_passe'])) {
        echo "Connexion OK";
    } else {
        echo "Mot de passe incorrect";
    }
} else {
    echo "Utilisateur non trouvé";
}