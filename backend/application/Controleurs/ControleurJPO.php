<?php
require_once __DIR__ . '/../Modeles/JourneePortesOuvertes.php';

class ControleurJPO {
    private $jpo;

    public function __construct($db) {
        $this->jpo = new JourneePortesOuvertes($db);
    }

    public function getAll() {
        $result = $this->jpo->getAll();
        echo json_encode($result);
    }
}