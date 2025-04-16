// ************************************************************************
// 🎓 CONTRÔLEUR D'AUTHENTIFICATION - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// Request et Response sont des types TypeScript fournis par Express
// Ils permettent de typer les paramètres des fonctions du contrôleur
import { Request, Response } from 'express';

// On importe la connexion à la base de données configurée dans database.ts
// Le pool de connexions permet de gérer efficacement les requêtes SQL
import { db as pool } from '../config/database';

// 🔐 FONCTION D'AUTHENTIFICATION
// Cette fonction est le point d'entrée pour la connexion des utilisateurs
// async/await permet d'attendre les réponses de la base de données
export const login = async (req: Request, res: Response) => {
  // On extrait email et mot_de_passe du corps de la requête (req.body)
  // Ces données sont envoyées par le formulaire de connexion du front-end
  const { email, mot_de_passe } = req.body;

  // Log pour tracer les tentatives de connexion (utile pour le debug)
  console.log("🔥 Tentative de login :", email);

  try {
    // REQUÊTE SQL SÉCURISÉE
    // 1. On cherche l'utilisateur par son email dans la table Utilisateur
    // 2. Le ? est un paramètre qui protège contre les injections SQL
    // 3. [rows] utilise la destructuration pour récupérer les résultats
    const [rows]: any = await pool.query('SELECT * FROM Utilisateur WHERE email = ?', [email]);
    
    // On récupère le premier (et normalement unique) utilisateur trouvé
    const user = rows[0];

    // VÉRIFICATION 1 : L'UTILISATEUR EXISTE-T-IL ?
    // Si aucun utilisateur trouvé avec cet email, on renvoie une erreur 401
    // 401 = "Non autorisé" en HTTP
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur introuvable' });
    }

    // VÉRIFICATION 2 : MOT DE PASSE CORRECT ?
    // ⚠️ NOTE IMPORTANTE POUR L'E6 : 
    // Cette comparaison directe n'est pas sécurisée !
    // En production, il faudrait utiliser bcrypt pour hasher les mots de passe
    if (mot_de_passe !== user.mot_de_passe) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // AUTHENTIFICATION RÉUSSIE
    // 1. On stocke l'utilisateur dans req.body pour une utilisation future
    // 2. Cela permet aux autres parties de l'application de savoir qui est connecté
    req.body.user = user;

    // RÉPONSE AU CLIENT
    // 1. Status 200 = succès en HTTP
    // 2. On renvoie un message de succès et les données de l'utilisateur
    res.status(200).json({ message: 'Connexion réussie', user });

  } catch (error) {
    // GESTION DES ERREURS
    // Si une erreur technique survient (ex: base de données inaccessible)
    // 1. On log l'erreur pour le debugging
    // 2. On renvoie une erreur 500 (erreur serveur) au client
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce contrôleur est crucial car il gère la sécurité de l'application :
// 1. Authentification des utilisateurs
// 2. Vérification des identifiants
// 3. Gestion des erreurs
// 4. Communication avec la base de données
//
// Points techniques à souligner :
// - Utilisation de TypeScript pour la sécurité du typage
// - Requêtes SQL paramétrées contre les injections
// - Gestion asynchrone avec async/await
// - Codes HTTP standards (200, 401, 500)
