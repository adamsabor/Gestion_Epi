// ************************************************************************
// 🎓 COMPOSANT REACT LOGIN - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// useState est un hook React qui permet de créer des variables d'état
// Quand ces variables changent, le composant se met à jour automatiquement
import { useState } from 'react';

// axios est une bibliothèque qui simplifie les appels HTTP (GET, POST, etc.)
// On l'utilise pour communiquer avec notre API backend
import axios from 'axios';

// Material-UI fournit des composants graphiques prêts à l'emploi
// Ces composants suivent les guidelines de Material Design de Google
import {
  Container,  // Conteneur responsive qui centre le contenu
  Box,        // Div améliorée avec des props de style flexbox
  Typography, // Composant pour gérer la typographie (titres, textes...)
  TextField,  // Input amélioré avec validation, états, styles...
  Button,     // Bouton stylé avec différentes variantes
  Alert,      // Composant pour afficher des messages d'erreur/succès
  Paper,      // Surface surélevée avec ombre portée
} from '@mui/material';

// Icône de connexion de Material Icons
import LoginIcon from '@mui/icons-material/Login';

// ********** COMPOSANT REACT **********
// Composant fonctionnel qui gère la page de connexion
// Pour l'E6 : Un composant fonctionnel est une fonction qui retourne du JSX
export default function Login() {
  // ********** HOOKS USESTATE **********
  // Pour l'E6 : useState renvoie un tableau avec :
  // - La valeur actuelle (email)
  // - Une fonction pour modifier cette valeur (setEmail)
  const [email, setEmail] = useState('');           // Stocke l'email
  const [motDePasse, setMotDePasse] = useState(''); // Stocke le mot de passe
  const [message, setMessage] = useState('');       // Message d'erreur
  const [erreur, setErreur] = useState(false);      // État d'erreur

  // ********** FONCTION DE CONNEXION **********
  // Pour l'E6 : Fonction asynchrone qui gère la soumission du formulaire
  // async/await permet d'attendre la réponse de l'API avant de continuer
  const handleLogin = async () => {
    try {
      // Pour l'E6 : Requête POST vers l'API
      // - URL : http://localhost:3001/api/login
      // - Body : { email: "...", mot_de_passe: "..." }
      // - Si succès : renvoie { user: {...} }
      // - Si échec : lance une erreur
      const res = await axios.post('http://localhost:3001/api/login', {
        email,
        mot_de_passe: motDePasse
      });

      // Pour l'E6 : localStorage permet de stocker des données côté client
      // On stocke l'utilisateur connecté pour le retrouver après refresh
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // Redirection vers la page d'accueil après connexion réussie
      window.location.href = '/';
      
    } catch (error) {
      // En cas d'erreur (mauvais identifiants), on affiche un message
      setErreur(true);
      setMessage("Email ou mot de passe incorrect.");
    }
  };

  // ********** RENDU JSX **********
  // Pour l'E6 : Le JSX est une syntaxe qui mélange HTML et JavaScript
  return (
    // Container limite la largeur et centre le contenu
    <Container maxWidth="sm">
      {/* Box avec Paper crée une carte surélevée */}
      <Box
        component={Paper}
        elevation={4}
        sx={{  // Styles CSS-in-JS avec le système sx de MUI
          p: 4,           // padding: 4 * 8px = 32px
          mt: 10,         // margin-top: 10 * 8px = 80px
          borderRadius: 3, // border-radius: 3 * 8px = 24px
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,         // Espace entre les éléments
        }}
      >
        {/* Icône de connexion stylée */}
        <LoginIcon sx={{ fontSize: 50, color: 'primary.main' }} />
        
        {/* Titre de la page */}
        <Typography variant="h4" component="h1" gutterBottom>
          Connexion à GestEPI
        </Typography>

        {/* Alerte conditionnelle : s'affiche uniquement si erreur=true */}
        {erreur && <Alert severity="error">{message}</Alert>}

        {/* Champ email avec gestion de l'état */}
        <TextField
          label="Adresse e-mail"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {/* Champ mot de passe avec gestion de l'état */}
        <TextField
          label="Mot de passe"
          variant="outlined"
          fullWidth
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
        />

        {/* Bouton de connexion qui déclenche handleLogin */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handleLogin}
        >
          Se connecter
        </Button>
      </Box>
    </Container>
  );
}

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est important car il :
// 1. Gère l'authentification des utilisateurs
// 2. Utilise les hooks React (useState) pour gérer l'état
// 3. Fait des appels API avec axios
// 4. Stocke les données utilisateur dans localStorage
// 5. Utilise Material-UI pour une interface professionnelle
// 6. Gère les erreurs et affiche des messages à l'utilisateur
