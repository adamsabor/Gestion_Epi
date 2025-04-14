-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : lun. 14 avr. 2025 à 07:10
-- Version du serveur : 5.7.39
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `GESTEPI`
--

-- --------------------------------------------------------

--
-- Structure de la table `Controle_EPI`
--

CREATE TABLE `Controle_EPI` (
  `id` int(11) NOT NULL,
  `date_controle` date NOT NULL,
  `gestionnaire_id` int(11) DEFAULT NULL,
  `epi_id` int(11) DEFAULT NULL,
  `statut_id` int(11) DEFAULT NULL,
  `remarques` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Controle_EPI`
--

INSERT INTO `Controle_EPI` (`id`, `date_controle`, `gestionnaire_id`, `epi_id`, `statut_id`, `remarques`) VALUES
(2, '2025-03-04', 1, 2, 2, 'Usure sur la sangle. Réparation nécessaire.');

-- --------------------------------------------------------

--
-- Structure de la table `EPI`
--

CREATE TABLE `EPI` (
  `id` int(11) NOT NULL,
  `identifiant_custom` varchar(255) NOT NULL,
  `marque` varchar(255) NOT NULL,
  `modèle` varchar(255) NOT NULL,
  `numéro_série` varchar(255) NOT NULL,
  `taille` varchar(50) DEFAULT NULL,
  `couleur` varchar(50) DEFAULT NULL,
  `date_achat` date NOT NULL,
  `date_fabrication` date NOT NULL,
  `date_mise_en_service` date NOT NULL,
  `périodicité_controle` int(11) NOT NULL,
  `epi_type_id` int(11) DEFAULT NULL,
  `statut_id` int(11) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `EPI`
--

INSERT INTO `EPI` (`id`, `identifiant_custom`, `marque`, `modèle`, `numéro_série`, `taille`, `couleur`, `date_achat`, `date_fabrication`, `date_mise_en_service`, `périodicité_controle`, `epi_type_id`, `statut_id`) VALUES
(2, 'EPI-BAU-001', 'Black Diamond', 'Momentu', 'BAU67890', 'M', 'Noir', '2023-05-30', '2023-05-18', '2023-06-03', 6, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `Statut_EPI`
--

CREATE TABLE `Statut_EPI` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Statut_EPI`
--

INSERT INTO `Statut_EPI` (`id`, `nom`) VALUES
(1, 'Opérationnel'),
(2, 'À réparer'),
(3, 'Mis au rebut');

-- --------------------------------------------------------

--
-- Structure de la table `Type_EPI`
--

CREATE TABLE `Type_EPI` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Type_EPI`
--

INSERT INTO `Type_EPI` (`id`, `nom`) VALUES
(1, 'Casque de protection'),
(2, 'Baudrier'),
(3, 'Corde'),
(4, 'Gants de sécurité');

-- --------------------------------------------------------

--
-- Structure de la table `Type_Utilisateurs`
--

CREATE TABLE `Type_Utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Type_Utilisateurs`
--

INSERT INTO `Type_Utilisateurs` (`id`, `nom`) VALUES
(1, 'Gestionnaire'),
(2, 'Cordiste');

-- --------------------------------------------------------

--
-- Structure de la table `Utilisateur`
--

CREATE TABLE `Utilisateur` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prénom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Utilisateur`
--

INSERT INTO `Utilisateur` (`id`, `nom`, `prénom`, `email`, `user_type_id`, `mot_de_passe`) VALUES
(1, 'Sabor', 'Adam', 'saboradam5@gmail.com', 1, 'mdp123'),
(2, 'Buntaro', 'Mori', 'Buntaro.Mori@example.com', 2, 'mdp456');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Controle_EPI`
--
ALTER TABLE `Controle_EPI`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gestionnaire_id` (`gestionnaire_id`),
  ADD KEY `epi_id` (`epi_id`),
  ADD KEY `statut_id` (`statut_id`);

--
-- Index pour la table `EPI`
--
ALTER TABLE `EPI`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `identifiant_custom` (`identifiant_custom`),
  ADD UNIQUE KEY `numéro_série` (`numéro_série`),
  ADD KEY `epi_type_id` (`epi_type_id`);

--
-- Index pour la table `Statut_EPI`
--
ALTER TABLE `Statut_EPI`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Type_EPI`
--
ALTER TABLE `Type_EPI`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Type_Utilisateurs`
--
ALTER TABLE `Type_Utilisateurs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_type_id` (`user_type_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Controle_EPI`
--
ALTER TABLE `Controle_EPI`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `EPI`
--
ALTER TABLE `EPI`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Statut_EPI`
--
ALTER TABLE `Statut_EPI`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `Type_EPI`
--
ALTER TABLE `Type_EPI`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Type_Utilisateurs`
--
ALTER TABLE `Type_Utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Controle_EPI`
--
ALTER TABLE `Controle_EPI`
  ADD CONSTRAINT `controle_epi_ibfk_1` FOREIGN KEY (`gestionnaire_id`) REFERENCES `Utilisateur` (`id`),
  ADD CONSTRAINT `controle_epi_ibfk_2` FOREIGN KEY (`epi_id`) REFERENCES `EPI` (`id`),
  ADD CONSTRAINT `controle_epi_ibfk_3` FOREIGN KEY (`statut_id`) REFERENCES `Statut_EPI` (`id`);

--
-- Contraintes pour la table `EPI`
--
ALTER TABLE `EPI`
  ADD CONSTRAINT `epi_ibfk_1` FOREIGN KEY (`epi_type_id`) REFERENCES `Type_EPI` (`id`);

--
-- Contraintes pour la table `Utilisateur`
--
ALTER TABLE `Utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `Type_Utilisateurs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;