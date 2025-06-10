-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 10 juin 2025 à 11:23
-- Version du serveur : 5.5.68-MariaDB
-- Version de PHP : 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `scott-allo_jpoconnect`
--

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE `commentaire` (
  `id` int(11) NOT NULL,
  `contenu` text NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_utilisateur` int(11) NOT NULL,
  `id_jpo` int(11) NOT NULL,
  `id_commentaire_parent` int(11) DEFAULT NULL,
  `modere` tinyint(1) NOT NULL DEFAULT '0',
  `note` tinyint(1) DEFAULT NULL COMMENT 'Note de 1 à 5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `contenu_site`
--

CREATE TABLE `contenu_site` (
  `id` int(11) NOT NULL,
  `section` varchar(50) NOT NULL,
  `contenu` text NOT NULL,
  `date_mise_a_jour` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `auteur_mise_a_jour` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `contenu_site`
--

INSERT INTO `contenu_site` (`id`, `section`, `contenu`, `date_mise_a_jour`, `auteur_mise_a_jour`) VALUES
(1, 'infos_pratiques', 'Informations pratiques pour les visiteurs...', '2025-06-10 09:20:02', 1),
(2, 'sessions_a_venir', 'Prochaines sessions de formation...', '2025-06-10 09:20:02', 1);

-- --------------------------------------------------------

--
-- Structure de la table `etablissement`
--

CREATE TABLE `etablissement` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `code_postal` varchar(10) NOT NULL,
  `pays` varchar(50) NOT NULL DEFAULT 'France',
  `description` text,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `etablissement`
--

INSERT INTO `etablissement` (`id`, `nom`, `adresse`, `ville`, `code_postal`, `pays`, `description`, `image_url`) VALUES
(1, 'La Plateforme Marseille', '8 rue d\'Hozier', 'Marseille', '13002', 'France', 'Campus principal', NULL),
(2, 'La Plateforme Cannes', '1 rue des Serbes', 'Cannes', '06400', 'France', 'Campus de Cannes', NULL),
(3, 'La Plateforme Paris', '10 rue de Penthièvre', 'Paris', '75008', 'France', 'Campus de Paris', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `inscription`
--

CREATE TABLE `inscription` (
  `id` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `id_jpo` int(11) NOT NULL,
  `date_inscription` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `present` tinyint(1) DEFAULT NULL,
  `nombre_personnes` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `jpo`
--

CREATE TABLE `jpo` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `capacite_max` int(11) NOT NULL,
  `inscrits` int(11) NOT NULL DEFAULT '0',
  `id_etablissement` int(11) NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createur_id` int(11) NOT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `log_activite`
--

CREATE TABLE `log_activite` (
  `id` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `date_action` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_utilisateur` int(11) NOT NULL,
  `details` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `contenu` text NOT NULL,
  `date_envoi` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_jpo` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL,
  `lu` tinyint(1) NOT NULL DEFAULT '0',
  `envoyee` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `nom`, `description`) VALUES
(1, 'Administrateur', 'Accès complet à toutes les fonctionnalités'),
(2, 'Responsable Marketing', 'Peut gérer les JPO et les commentaires'),
(3, 'Employé Marketing', 'Peut voir les statistiques et gérer les inscriptions'),
(4, 'Visiteur', 'Peut s\'inscrire aux JPO et laisser des commentaires');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `date_inscription` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `compte_actif` tinyint(1) NOT NULL DEFAULT '1',
  `id_role` int(11) NOT NULL,
  `provider` varchar(50) DEFAULT NULL COMMENT 'Pour connexion via réseaux sociaux',
  `provider_id` varchar(255) DEFAULT NULL COMMENT 'ID du réseau social'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `email`, `mot_de_passe`, `nom`, `prenom`, `telephone`, `date_inscription`, `compte_actif`, `id_role`, `provider`, `provider_id`) VALUES
(1, 'admin@laplateforme.io', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'Super', NULL, '2025-06-10 09:20:02', 1, 1, NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `commentaire_ibfk_1` (`id_utilisateur`),
  ADD KEY `commentaire_ibfk_2` (`id_jpo`),
  ADD KEY `commentaire_ibfk_3` (`id_commentaire_parent`);

--
-- Index pour la table `contenu_site`
--
ALTER TABLE `contenu_site`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `section` (`section`),
  ADD KEY `contenu_site_ibfk_1` (`auteur_mise_a_jour`);

--
-- Index pour la table `etablissement`
--
ALTER TABLE `etablissement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_inscription` (`id_utilisateur`,`id_jpo`),
  ADD KEY `inscription_ibfk_2` (`id_jpo`);

--
-- Index pour la table `jpo`
--
ALTER TABLE `jpo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jpo_ibfk_1` (`id_etablissement`),
  ADD KEY `jpo_ibfk_2` (`createur_id`);

--
-- Index pour la table `log_activite`
--
ALTER TABLE `log_activite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `log_activite_ibfk_1` (`id_utilisateur`);

--
-- Index pour la table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notification_ibfk_1` (`id_jpo`),
  ADD KEY `notification_ibfk_2` (`id_utilisateur`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`(191)),
  ADD KEY `utilisateur_ibfk_1` (`id_role`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `commentaire`
--
ALTER TABLE `commentaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `contenu_site`
--
ALTER TABLE `contenu_site`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `etablissement`
--
ALTER TABLE `etablissement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `inscription`
--
ALTER TABLE `inscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jpo`
--
ALTER TABLE `jpo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `log_activite`
--
ALTER TABLE `log_activite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaire`
--
ALTER TABLE `commentaire`
  ADD CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`id_jpo`) REFERENCES `jpo` (`id`),
  ADD CONSTRAINT `commentaire_ibfk_3` FOREIGN KEY (`id_commentaire_parent`) REFERENCES `commentaire` (`id`);

--
-- Contraintes pour la table `contenu_site`
--
ALTER TABLE `contenu_site`
  ADD CONSTRAINT `contenu_site_ibfk_1` FOREIGN KEY (`auteur_mise_a_jour`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `inscription`
--
ALTER TABLE `inscription`
  ADD CONSTRAINT `inscription_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `inscription_ibfk_2` FOREIGN KEY (`id_jpo`) REFERENCES `jpo` (`id`);

--
-- Contraintes pour la table `jpo`
--
ALTER TABLE `jpo`
  ADD CONSTRAINT `jpo_ibfk_1` FOREIGN KEY (`id_etablissement`) REFERENCES `etablissement` (`id`),
  ADD CONSTRAINT `jpo_ibfk_2` FOREIGN KEY (`createur_id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `log_activite`
--
ALTER TABLE `log_activite`
  ADD CONSTRAINT `log_activite_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`id_jpo`) REFERENCES `jpo` (`id`),
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
