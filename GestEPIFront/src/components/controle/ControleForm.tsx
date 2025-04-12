// ********** IMPORTS **********
// Import des éléments de base de React : useState pour gérer l'état, useEffect pour les effets de bord
import React, { useState, useEffect } from 'react';

// Import des composants Material-UI pour créer l'interface graphique
// Box : conteneur flexible, Button : boutons, CircularProgress : loader
// FormControl : conteneur de formulaire, Grid : grille responsive
// InputLabel : label pour les champs, MenuItem : élément de menu déroulant
// Paper : carte/surface surélevée, TextField : champ de texte
// Typography : textes/titres, Alert : messages d'alerte
import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, TextField, Typography, Alert, SelectChangeEvent } from '@mui/material';
// Import du composant Select de Material-UI pour les menus déroulants
import Select from '@mui/material/Select';
// Import du DatePicker de Material-UI pour sélectionner des dates
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Import des fonctions de date-fns pour manipuler les dates
import { format, parseISO } from 'date-fns';

// Import des types TypeScript pour les contrôles et EPIs
import { Controle, EPI } from '../../types';
// Import des services qui gèrent les appels API
import { controleService } from '../../services/controleService';
import { epiService } from '../../services/epiService';

// Import des hooks de React Router pour la navigation et l'accès aux paramètres d'URL
import { useNavigate, useLocation } from 'react-router-dom';

// Composant ControleForm : Formulaire de création/édition d'un contrôle d'EPI
const ControleForm: React.FC = () => {
  // Hook pour naviguer entre les pages
  const navigate = useNavigate();
  // Hook pour accéder aux paramètres de l'URL
  const location = useLocation();
  // Récupère les paramètres de l'URL (ex: ?epiId=123)
  const searchParams = new URLSearchParams(location.search);
  // Récupère l'ID de l'EPI s'il est présent dans l'URL
  const preselectedEpiId = searchParams.get('epiId');

  // État pour stocker les données du contrôle
  // Les valeurs par défaut sont définies ici
  const [controle, setControle] = useState<Controle>({
    date_controle: format(new Date(), 'yyyy-MM-dd'), // Date du jour formatée
    gestionnaire_id: 1, // ID du gestionnaire par défaut
    epi_id: preselectedEpiId ? parseInt(preselectedEpiId) : 0, // ID de l'EPI (depuis l'URL ou 0)
    statut_id: 1, // Statut "Opérationnel" par défaut
    remarques: '' // Champ remarques vide
  });

  // États pour stocker les listes de données
  const [epis, setEpis] = useState<EPI[]>([]); // Liste des EPIs
  const [statuts, setStatuts] = useState<{id: number, nom: string}[]>([]); // Liste des statuts
  const [gestionnaires, setGestionnaires] = useState<{id: number, nom: string, prénom: string}[]>([]); // Liste des gestionnaires

  // États pour gérer le chargement et les messages
  const [submitting, setSubmitting] = useState(false); // En cours d'envoi du formulaire
  const [loading, setLoading] = useState(true); // Chargement initial des données
  const [error, setError] = useState<string | null>(null); // Message d'erreur
  const [success, setSuccess] = useState<string | null>(null); // Message de succès

  // useEffect : Chargement des données au montage du composant
  useEffect(() => {
    // Fonction asynchrone pour charger toutes les données nécessaires
    const fetchData = async () => {
      try {
        setLoading(true); // Active l'indicateur de chargement
        
        // 1. Récupère la liste des EPIs via le service dédié
        const epiResponse = await epiService.getAll();
        setEpis(epiResponse);
        
        // 2. Récupère la liste des statuts depuis l'API
        try {
          const statutsResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/statuts`);
          if (statutsResponse.ok) {
            const statutsData = await statutsResponse.json();
            setStatuts(statutsData.data || []);
          } else {
            // Si erreur, utilise des données statiques de secours
            setStatuts([
              { id: 1, nom: 'Opérationnel' },
              { id: 2, nom: 'À réparer' },
              { id: 3, nom: 'Mis au rebut' }
            ]);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des statuts:', error);
          // Utilise les mêmes données statiques en cas d'erreur
          setStatuts([
            { id: 1, nom: 'Opérationnel' },
            { id: 2, nom: 'À réparer' },
            { id: 3, nom: 'Mis au rebut' }
          ]);
        }
        
        // 3. Récupère la liste des gestionnaires depuis l'API
        try {
          const gestionnairesResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/gestionnaires`);
          if (gestionnairesResponse.ok) {
            const gestionnairesData = await gestionnairesResponse.json();
            setGestionnaires(gestionnairesData.data || []);
          } else {
            // Si erreur, utilise des données statiques de secours
            setGestionnaires([
              { id: 1, nom: 'Sabor', prénom: 'Adam' }
            ]);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des gestionnaires:', error);
          // Utilise les mêmes données statiques en cas d'erreur
          setGestionnaires([
            { id: 1, nom: 'Sabor', prénom: 'Adam' }
          ]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
      } finally {
        setLoading(false); // Désactive l'indicateur de chargement
      }
    };

    // Lance le chargement des données
    fetchData();
  }, []); // Le tableau vide signifie "exécuter une seule fois au montage"

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

  // Gère la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    try {
      setSubmitting(true); // Active l'indicateur d'envoi
      setError(null); // Réinitialise les messages d'erreur
      
      // Vérifie que tous les champs obligatoires sont remplis
      if (!controle.date_controle || !controle.gestionnaire_id || !controle.epi_id || !controle.statut_id) {
        setError('Veuillez remplir tous les champs obligatoires.');
        return;
      }
      
      // Envoie les données au serveur via le service
      const result = await controleService.create(controle);
      
      // Affiche un message de succès
      setSuccess('Contrôle enregistré avec succès !');
      
      // Redirige vers la page de détail de l'EPI après 2 secondes
      setTimeout(() => {
        navigate(`/epis/${controle.epi_id}`);
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du contrôle:', error);
      setError('Erreur lors de l\'enregistrement du contrôle. Veuillez réessayer.');
    } finally {
      setSubmitting(false); // Désactive l'indicateur d'envoi
    }
  };

  // Rendu du composant : un formulaire dans une carte
  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Nouveau contrôle
      </Typography>
      
      {/* Affiche les messages d'erreur et de succès */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      {/* Formulaire principal */}
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Sélection de l'EPI */}
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
          
          {/* Sélection de la date */}
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
                {gestionnaires.map(gestionnaire => (
                  <MenuItem key={gestionnaire.id} value={gestionnaire.id}>
                    {gestionnaire.prénom} {gestionnaire.nom}
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
                {statuts.map(statut => (
                  <MenuItem key={statut.id} value={statut.id}>
                    {statut.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Champ de remarques */}
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

          {/* Bouton de soumission */}
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

// Exporte le composant pour l'utiliser ailleurs dans l'application
export default ControleForm; 

/*
RÉSUMÉ DU FICHIER ControleForm.tsx :

Ce composant est un formulaire qui permet de créer un nouveau contrôle d'EPI.
Il gère :
- La sélection de l'EPI concerné
- La date du contrôle
- Le gestionnaire qui effectue le contrôle
- Le statut de l'EPI après contrôle
- Les remarques éventuelles

PLACE DANS L'ARCHITECTURE :
- Situé dans components/controle/ car il gère la création des contrôles
- Utilise les services (controleService, epiService) pour communiquer avec l'API
- S'intègre dans le système de navigation avec React Router
- Utilise Material-UI pour une interface cohérente

POINTS CLÉS POUR L'ORAL :
1. Formulaire complet avec validation et gestion d'erreurs
2. Interaction avec l'API via les services
3. Gestion des états avec useState et useEffect
4. Interface utilisateur professionnelle avec Material-UI
5. Système de navigation et redirection après succès
*/