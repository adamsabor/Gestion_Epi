-- Création de la base de données
CREATE DATABASE IF NOT EXISTS gestepi;
USE gestepi;

-- Table des types d'EPI
CREATE TABLE IF NOT EXISTS epi_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT
);

-- Table des EPIs
CREATE TABLE IF NOT EXISTS epis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  identifiant_custom VARCHAR(50) NOT NULL,
  marque VARCHAR(100) NOT NULL,
  modèle VARCHAR(100) NOT NULL,
  numéro_série VARCHAR(100),
  date_achat DATE NOT NULL,
  date_fabrication DATE NOT NULL,
  date_mise_en_service DATE NOT NULL,
  périodicité_controle INT NOT NULL,
  epi_type_id INT NOT NULL,
  FOREIGN KEY (epi_type_id) REFERENCES epi_types(id)
);

-- Table des contrôles
CREATE TABLE IF NOT EXISTS controles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_controle DATE NOT NULL,
  gestionnaire VARCHAR(100) NOT NULL,
  epi_id INT NOT NULL,
  statut ENUM('Opérationnel', 'À réparer', 'Mis au rebut') NOT NULL,
  remarques TEXT,
  FOREIGN KEY (epi_id) REFERENCES epis(id)
);

-- Insertion de données de test pour les types d'EPI
INSERT INTO epi_types (nom, description) VALUES
('Harnais', 'Équipement de protection pour le travail en hauteur'),
('Corde', 'Corde d\'assurage pour le travail en hauteur'),
('Casque', 'Protection de la tête'),
('Mousqueton', 'Connecteur pour le travail en hauteur'),
('Longe', 'Équipement de liaison pour le travail en hauteur'); 