// ************************************************************************
// 🎓 COMPOSANT REACT CONTROLEFORM - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// useState : hook React pour gérer l'état local du composant (comme des variables qui se mettent à jour)
// useEffect : hook React pour exécuter du code quand le composant est monté/mis à jour
import React, { useState, useEffect } from 'react';

// Material-UI : bibliothèque de composants graphiques prêts à l'emploi
// Chaque import correspond à un composant visuel réutilisable :
// Box : conteneur flexible, Button : bouton cliquable, etc.
import {
  Box, Button, CircularProgress, FormControl, Grid, InputLabel,
  MenuItem, Paper, TextField, Typography, Alert, SelectChangeEvent
} from '@mui/material';

// Select : composant pour créer des menus déroulants stylisés
import Select from '@mui/material/Select';

// DatePicker : composant pour sélectionner une date avec un calendrier
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// format : fonction pour formater les dates en chaîne de caractères (ex: "2024-02-14")
import { format } from 'date-fns';

// Types TypeScript pour le typage des données
// Controle : interface qui définit la structure d'un contrôle (id, date, etc.)
// EPI : interface qui définit la structure d'un EPI (id, marque, modèle, etc.)
import { Controle, EPI } from '../../types';

// Services qui gèrent les appels à l'API backend
// controleService : fonctions pour créer/lire/modifier/supprimer des contrôles
// epiService : fonctions pour gérer les EPIs
import { controleService } from '../../services/controleService';
import { epiService } from '../../services/epiService';

// Hooks React Router pour la navigation et la gestion des URLs
// useNavigate : permet de rediriger l'utilisateur
// useLocation : donne accès aux paramètres de l'URL
import { useNavigate, useLocation } from 'react-router-dom';

// ********** COMPOSANT REACT **********
// Pour l'E6 : Un composant fonctionnel qui crée un formulaire de contrôle d'EPI
const ControleForm: React.FC = () => {
  // Hook pour la navigation - Permet de rediriger après la soumission du formulaire
  const navigate = useNavigate();
  
  // Récupère l'ID de l'EPI depuis l'URL si présent (ex: ?epiId=123)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preselectedEpiId = searchParams.get('epiId');

  // ********** ÉTATS (VARIABLES RÉACTIVES) **********
  // Pour l'E6 : useState crée des variables qui, quand modifiées, mettent à jour l'interface
  
  // État principal : les données du contrôle
  // Structure définie par l'interface Controle
  const [controle, setControle] = useState<Controle>({
    date_controle: format(new Date(), 'yyyy-MM-dd'), // Date du jour
    gestionnaire_id: 1,                              // ID gestionnaire par défaut
    epi_id: preselectedEpiId ? parseInt(preselectedEpiId) : 0, // EPI présélectionné ou 0
    statut_id: 1,                                    // Statut par défaut
    remarques: ''                                    // Remarques vides
  });

  // États pour les listes de données (chargées depuis l'API)
  const [epis, setEpis] = useState<EPI[]>([]); // Liste des EPIs disponibles
  const [statuts, setStatuts] = useState<{ id: number, nom: string }[]>([]); // Statuts possibles
  const [gestionnaires, setGestionnaires] = useState<{ id: number, nom: string, prénom: string }[]>([]); 

  // États pour l'interface utilisateur
  const [submitting, setSubmitting] = useState(false); // Formulaire en cours d'envoi ?
  const [loading, setLoading] = useState(true);        // Données en cours de chargement ?
  const [error, setError] = useState<string | null>(null);    // Message d'erreur
  const [success, setSuccess] = useState<string | null>(null); // Message de succès

  // ********** EFFET DE CHARGEMENT DES DONNÉES **********
  // Pour l'E6 : useEffect s'exécute quand le composant est monté
  // Il charge toutes les données nécessaires depuis l'API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Active le loader
        
        // Appel au service EPI pour récupérer la liste des EPIs
        // En SQL : SELECT * FROM epis
        const epiResponse = await epiService.getAll();
        setEpis(epiResponse);

        // Appels API parallèles pour les statuts et gestionnaires
        // Promise.all permet d'attendre que tous les appels soient terminés
        const [statutsRes, gestionnairesRes] = await Promise.all([
          // En SQL : SELECT * FROM statuts
          fetch('http://localhost:3001/api/statuts'),
          // En SQL : SELECT * FROM gestionnaires
          fetch('http://localhost:3001/api/gestionnaires')
        ]);

        // Traitement des réponses si OK (status 200)
        if (statutsRes.ok) {
          const statutsData = await statutsRes.json();
          setStatuts(statutsData.data || []);
        }
        if (gestionnairesRes.ok) {
          const gestionnairesData = await gestionnairesRes.json();
          setGestionnaires(gestionnairesData.data || []);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setError('Erreur lors du chargement des données.');
      } finally {
        setLoading(false); // Désactive le loader
      }
    };

    fetchData(); // Lance le chargement
  }, []); // [] = exécution unique au montage

  // ********** GESTIONNAIRES D'ÉVÉNEMENTS **********
  // Pour l'E6 : Fonctions qui réagissent aux actions de l'utilisateur

  // Gère les changements dans les champs texte
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setControle(prev => ({ ...prev, [name]: value }));
  };

  // Gère les changements dans les menus déroulants
  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setControle(prev => ({ ...prev, [name]: Number(value) }));
  };

  // Gère les changements de date
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setControle(prev => ({ ...prev, date_controle: format(date, 'yyyy-MM-dd') }));
    }
  };

  // ********** SOUMISSION DU FORMULAIRE **********
  // Pour l'E6 : Fonction appelée quand l'utilisateur clique sur "Enregistrer"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      setSubmitting(true); // Active l'indicateur d'envoi
      setError(null);      // Réinitialise les erreurs

      // Validation des champs obligatoires
      if (!controle.date_controle || !controle.gestionnaire_id || !controle.epi_id || !controle.statut_id) {
        setError('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      // Appel API pour créer le contrôle
      // En SQL : INSERT INTO controles (date_controle, gestionnaire_id, epi_id, statut_id, remarques) 
      //          VALUES (?, ?, ?, ?, ?)
      await controleService.create(controle);
      setSuccess('Contrôle enregistré avec succès !');

      // Redirection après 2 secondes vers la page de l'EPI
      setTimeout(() => {
        navigate(`/epis/${controle.epi_id}`);
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de la création du contrôle :', error);
      setError('Erreur lors de la création du contrôle.');
    } finally {
      setSubmitting(false); // Désactive l'indicateur d'envoi
    }
  };

  // ********** RENDU DU COMPOSANT **********
  // Pour l'E6 : Structure JSX qui définit l'interface utilisateur
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Nouveau contrôle
      </Typography>

      {/* Affichage des messages d'erreur/succès */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Formulaire principal avec grille Material-UI */}
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Sélection de l'EPI avec menu déroulant */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="epi-label">EPI</InputLabel>
              <Select
                labelId="epi-label"
                id="epi_id"
                name="epi_id"
                value={controle.epi_id || ''}
                onChange={handleSelectChange}
                label="EPI"
                disabled={loading || !!preselectedEpiId}
              >
                {epis.map(epi => (
                  <MenuItem key={epi.id} value={epi.id}>
                    {epi.identifiant_custom} - {epi.marque} {epi.modèle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sélecteur de date avec calendrier */}
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Date du contrôle"
              value={new Date(controle.date_controle)}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          {/* Sélection du gestionnaire */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="gestionnaire-label">Gestionnaire</InputLabel>
              <Select
                labelId="gestionnaire-label"
                id="gestionnaire_id"
                name="gestionnaire_id"
                value={controle.gestionnaire_id || ''}
                onChange={handleSelectChange}
                label="Gestionnaire"
              >
                {gestionnaires.map(g => (
                  <MenuItem key={g.id} value={g.id}>
                    {g.prénom} {g.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Sélection du statut */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="statut-label">Statut</InputLabel>
              <Select
                labelId="statut-label"
                id="statut_id"
                name="statut_id"
                value={controle.statut_id || ''}
                onChange={handleSelectChange}
                label="Statut"
              >
                {statuts.map(s => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Champ de remarques (texte libre) */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="remarques"
              name="remarques"
              label="Remarques"
              multiline
              rows={4}
              value={controle.remarques || ''}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Bouton de soumission avec loader */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : 'Enregistrer le contrôle'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

// Export du composant
export default ControleForm;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est crucial car il :
// 1. Crée un formulaire complet pour saisir les contrôles d'EPI
// 2. Utilise les hooks React (useState, useEffect) pour gérer l'état et les effets
// 3. Fait des appels API (GET pour charger les données, POST pour créer un contrôle)
// 4. Utilise TypeScript pour le typage des données
// 5. Gère les erreurs et la validation des données
// 6. Utilise Material-UI pour une interface professionnelle
// 7. Montre l'interaction avec une base de données via des requêtes SQL