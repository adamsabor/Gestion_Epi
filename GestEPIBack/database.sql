-- Création de la base de données
CREATE DATABASE IF NOT EXISTS gestepi;
USE gestepi;

-- Table des types d'EPI
CREATE TABLE IF NOT EXISTS Type_EPI (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL
);

-- Table des EPIs
CREATE TABLE IF NOT EXISTS EPI (
  id INT AUTO_INCREMENT PRIMARY KEY,
  identifiant_custom VARCHAR(255) NOT NULL UNIQUE,
  marque VARCHAR(255) NOT NULL,
  modèle VARCHAR(255) NOT NULL,
  numéro_série VARCHAR(255) NOT NULL UNIQUE,
  taille VARCHAR(50) DEFAULT NULL,
  couleur VARCHAR(50) DEFAULT NULL,
  date_achat DATE NOT NULL,
  date_fabrication DATE NOT NULL,
  date_mise_en_service DATE NOT NULL,
  périodicité_controle INT NOT NULL,
  epi_type_id INT DEFAULT NULL,
  FOREIGN KEY (epi_type_id) REFERENCES Type_EPI(id)
);

-- Table des statuts d'EPI
CREATE TABLE IF NOT EXISTS Statut_EPI (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL
);

-- Table des types d'utilisateurs
CREATE TABLE IF NOT EXISTS Type_Utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL
);

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS Utilisateur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  prénom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_type_id INT DEFAULT NULL,
  FOREIGN KEY (user_type_id) REFERENCES Type_Utilisateurs(id)
);

-- Table des contrôles
CREATE TABLE IF NOT EXISTS Controle_EPI (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_controle DATE NOT NULL,
  gestionnaire_id INT DEFAULT NULL,
  epi_id INT DEFAULT NULL,
  statut_id INT DEFAULT NULL,
  remarques TEXT,
  FOREIGN KEY (gestionnaire_id) REFERENCES Utilisateur(id),
  FOREIGN KEY (epi_id) REFERENCES EPI(id),
  FOREIGN KEY (statut_id) REFERENCES Statut_EPI(id)
);

-- Insertion de données de test pour les types d'EPI
INSERT INTO Type_EPI (nom) VALUES
('Casque de protection'),
('Baudrier'),
('Corde'),
('Gants de sécurité');

-- Insertion de données de test pour les statuts d'EPI
INSERT INTO Statut_EPI (nom) VALUES
('Opérationnel'),
('À réparer'),
('Mis au rebut');

-- Insertion de données de test pour les types d'utilisateurs
INSERT INTO Type_Utilisateurs (nom) VALUES
('Gestionnaire'),
('Cordiste');

-- Insertion de données de test pour les utilisateurs
INSERT INTO Utilisateur (nom, prénom, email, user_type_id) VALUES
('Sabor', 'Adam', 'saboradam5@gmail.com', 1),
('Buntaro', 'Mori', 'Buntaro.Mori@example.com', 2);

-- Insertion de données de test pour les EPIs
INSERT INTO EPI (identifiant_custom, marque, modèle, numéro_série, taille, couleur, date_achat, date_fabrication, date_mise_en_service, périodicité_controle, epi_type_id) VALUES
('EPI-CAS-001', 'Petzl', 'Vertex Vent', 'CAS12344', NULL, 'Blanc', '2023-05-10', '2023-04-15', '2023-05-20', 12, 1),
('EPI-BAU-001', 'Black Diamond', 'Momentum', 'BAU67890', 'M', 'Noir', '2023-06-01', '2023-05-20', '2023-06-05', 6, 2),
('EPI-COR-001', 'Beal', 'Top Gun', 'COR112233', '50m', 'Rouge', '2023-07-01', '2023-06-20', '2023-07-05', 6, 3),
('EPI-GAN-001', 'Honeywell', 'WorkEasy', 'GAN445566', NULL, 'Gris', '2023-08-10', '2023-07-30', '2023-08-15', 12, 4);

-- Insertion de données de test pour les contrôles
INSERT INTO Controle_EPI (date_controle, gestionnaire_id, epi_id, statut_id, remarques) VALUES
('2025-03-04', 1, 1, 1, 'Contrôle régulier. Casque en parfait état.'),
('2025-03-04', 1, 2, 2, 'Usure sur la sangle. Réparation nécessaire.'),
('2025-03-04', 1, 3, 1, 'Contrôle effectué. Corde dynamique en bon état.'),
('2025-03-04', 1, 4, 1, 'Aucune anomalie détectée. Gants validés.'); 