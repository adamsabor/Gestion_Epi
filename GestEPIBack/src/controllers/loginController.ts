// ✅ loginController.ts
import { Request, Response } from 'express';
import { db as pool } from '../config/database';

export const login = async (req: Request, res: Response) => {
  const { email, mot_de_passe } = req.body;

  console.log("🔥 Tentative de login :", email);

  try {
    const [rows]: any = await pool.query('SELECT * FROM Utilisateur WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Utilisateur introuvable' });
    }

    if (mot_de_passe !== user.mot_de_passe) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    req.body.user = user; // Pour les middlewares éventuels

    res.status(200).json({ message: 'Connexion réussie', user });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
