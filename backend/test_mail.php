<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require __DIR__ . '/vendor/autoload.php';

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.ethereal.email';
    $mail->SMTPAuth = true;
    $mail->Username = 'amalia.rippin94@ethereal.email';
    $mail->Password = '9ggCNWAVrz33xrw9XY';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('amalia.rippin94@ethereal.email', 'JPO Connect');
    $mail->addAddress('ton.email@exemple.com', 'Test');
    $mail->Subject = 'Test';
    $mail->Body = 'Ceci est un test';

    $mail->send();
    echo "OK";
} catch (Exception $e) {
    echo "Erreur : " . $mail->ErrorInfo;
}