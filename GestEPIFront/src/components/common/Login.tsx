// ✅ Login.tsx – page stylée d'accueil avec Material UI
import { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const [erreur, setErreur] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/login', {
        email,
        mot_de_passe: motDePasse
      });

      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/';
    } catch (error) {
      setErreur(true);
      setMessage("Email ou mot de passe incorrect.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={Paper}
        elevation={4}
        sx={{
          p: 4,
          mt: 10,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <LoginIcon sx={{ fontSize: 50, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Connexion à GestEPI
        </Typography>

        {erreur && <Alert severity="error">{message}</Alert>}

        <TextField
          label="Adresse e-mail"
          variant="outlined"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mot de passe"
          variant="outlined"
          fullWidth
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
        />

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
