// ********** IMPORTS **********
// Import des fonctionnalités de base de React : useState pour gérer l'état, useEffect pour les effets
import React, { useState, useEffect } from 'react';

// Import des composants Material-UI pour créer l'interface graphique
// Ces composants permettent d'avoir une interface moderne et responsive
import { 
  Box,               // Conteneur flexible
  Button,            // Boutons
  TextField,         // Champs de texte
  Typography,        // Textes et titres
  Paper,            // Surface surélevée (comme une carte)
  Grid,             // Grille pour la mise en page responsive
  FormControl,      // Conteneur de formulaire
  InputLabel,       // Label pour les champs
  Select,           // Menu déroulant
  MenuItem,         // Option dans un menu déroulant
  CircularProgress, // Indicateur de chargement circulaire
  Alert,            // Messages d'alerte
  SelectChangeEvent // Type pour les événements de sélection
} from '@mui/material';

// Import des composants pour gérer les dates
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale'; // Pour avoir les dates en français

// Import des fonctions de manipulation de dates
import { format, parse, parseISO } from 'date-fns';

// Import des services qui gèrent les appels à l'API
import { epiService } from '../../services/epiService';         // Service pour les EPIs
import { api } from '../../services/api';                       // Configuration de base de l'API
import { typeEpiService } from '../../services/typeEpiService'; // Service pour les types d'EPI

// Import des types TypeScript pour le typage des données
import { EPI, TypeEPI } from '../../types';

// Interface qui définit la structure de la réponse de l'API
interface ApiResponse<T> {
  message: string; // Message de retour (succès/erreur)
  data: T;        // Données retournées, de type générique T
}

// Interface qui définit les props (propriétés) du composant EPIForm
interface EPIFormProps {
  epiId?: number;     // ID de l'EPI (optionnel, pour l'édition)
  onSuccess?: () => void; // Fonction appelée en cas de succès
}

// Composant principal EPIForm : Formulaire de création/modification d'un EPI
// Ce composant est utilisé à la fois pour créer un nouvel EPI et pour modifier un EPI existant
const EPIForm: React.FC<EPIFormProps> = ({ epiId, onSuccess }) => {
  // État pour stocker les données du formulaire
  // Les valeurs par défaut sont définies ici
  const [epi, setEpi] = useState<EPI>({
    identifiant_custom: '',
    marque: '',
    modèle: '',
    numéro_série: '',
    date_achat: format(new Date(), 'yyyy-MM-dd'),
    date_fabrication: format(new Date(), 'yyyy-MM-dd'),
    date_mise_en_service: format(new Date(), 'yyyy-MM-dd'),
    périodicité_controle: 12,
    epi_type_id: 1
  });
  
  // États pour gérer l'interface utilisateur
  const [typesEPI, setTypesEPI] = useState<TypeEPI[]>([]); // Liste des types d'EPI
  const [loading, setLoading] = useState<boolean>(false);   // Indicateur de chargement
  const [error, setError] = useState<string | null>(null);  // Message d'erreur
  const [success, setSuccess] = useState<string | null>(null); // Message de succès
  const [isEditing, setIsEditing] = useState<boolean>(false); // Mode édition ou création

  // useEffect : Se déclenche au chargement du composant
  // Charge les types d'EPI et les données de l'EPI si on est en mode édition
  useEffect(() => {
    // Fonction qui charge la liste des types d'EPI depuis l'API
    const fetchTypesEPI = async () => {
      try {
        const response = await typeEpiService.getAll();
        if (response && response.length > 0) {
          setTypesEPI(response);
        } else {
          // Si pas de données, utilise une liste statique par défaut
          setTypesEPI([
            { id: 1, nom: 'Casque de protection' },
            { id: 2, nom: 'Baudrier' },
            { id: 3, nom: 'Corde' },
            { id: 4, nom: 'Gants de sécurité' }
          ]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des types d\'EPI:', error);
        setError('Impossible de charger les types d\'EPI. Utilisation de données statiques.');
        // En cas d'erreur, utilise la même liste statique
        setTypesEPI([
          { id: 1, nom: 'Casque de protection' },
          { id: 2, nom: 'Baudrier' },
          { id: 3, nom: 'Corde' },
          { id: 4, nom: 'Gants de sécurité' }
        ]);
      }
    };

    // Appelle la fonction pour charger les types d'EPI
    fetchTypesEPI();

    // Si un ID est fourni, on est en mode édition
    // Dans ce cas, charge les données de l'EPI existant
    if (epiId) {
      setIsEditing(true);
      const fetchEPI = async () => {
        try {
          setLoading(true);
          const epiData = await epiService.getById(epiId);
          setEpi(epiData);
        } catch (error) {
          console.error(`Erreur lors de la récupération de l'EPI avec l'ID ${epiId}:`, error);
          setError(`Impossible de charger l'EPI avec l'ID ${epiId}. Veuillez réessayer plus tard.`);
        } finally {
          setLoading(false);
        }
      };

      fetchEPI();
    }
  }, [epiId]); // Se déclenche quand epiId change

  // Fonction qui gère les changements dans les champs texte
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpi({
      ...epi,
      [e.target.name]: e.target.value
    });
  };

  // Fonction qui gère les changements dans les menus déroulants
  const handleSelectChange = (e: SelectChangeEvent) => {
    setEpi({
      ...epi,
      [e.target.name]: e.target.value
    });
  };

  // Fonction qui gère les changements de date
  const handleDateChange = (name: string, date: Date | null) => {
    if (date) {
      setEpi({
        ...epi,
        [name]: format(date, 'yyyy-MM-dd')
      });
    }
  };

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditing && epiId) {
        // Mode édition : met à jour l'EPI existant
        await epiService.update(epiId, epi);
        setSuccess('EPI mis à jour avec succès !');
      } else {
        // Mode création : crée un nouvel EPI
        await epiService.create(epi);
        setSuccess('EPI créé avec succès !');
        
        // Réinitialise le formulaire après création
        setEpi({
          identifiant_custom: '',
          marque: '',
          modèle: '',
          numéro_série: '',
          date_achat: format(new Date(), 'yyyy-MM-dd'),
          date_fabrication: format(new Date(), 'yyyy-MM-dd'),
          date_mise_en_service: format(new Date(), 'yyyy-MM-dd'),
          périodicité_controle: 12,
          epi_type_id: 1
        });
      }

      // Si une fonction onSuccess a été fournie, l'appelle
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      setError('Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Affiche un indicateur de chargement pendant l'édition
  if (loading && isEditing) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  // Rendu du formulaire
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      {/* Titre du formulaire qui change selon le mode (création/édition) */}
      <Typography variant="h5" component="h2" gutterBottom>
        {isEditing ? 'Modifier un EPI' : 'Ajouter un nouvel EPI'}
      </Typography>
      
      {/* Affichage des messages d'erreur */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      {/* Affichage des messages de succès */}
      {success && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {success}
        </Typography>
      )}
      
      {/* Formulaire principal */}
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Champs pour l'identifiant personnalisé */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Identifiant personnalisé"
              name="identifiant_custom"
              value={epi.identifiant_custom}
              onChange={handleTextChange}
              required
              margin="normal"
            />
          </Grid>
          {/* Champ pour la marque */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Marque"
              name="marque"
              value={epi.marque}
              onChange={handleTextChange}
              required
              margin="normal"
            />
          </Grid>
          {/* Champ pour le modèle */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Modèle"
              name="modèle"
              value={epi.modèle}
              onChange={handleTextChange}
              required
              margin="normal"
            />
          </Grid>
          {/* Champ pour le numéro de série */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Numéro de série"
              name="numéro_série"
              value={epi.numéro_série}
              onChange={handleTextChange}
              required
              margin="normal"
            />
          </Grid>
          {/* Champ pour la taille (optionnel) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Taille"
              name="taille"
              value={epi.taille || ''}
              onChange={handleTextChange}
              margin="normal"
            />
          </Grid>
          {/* Champ pour la couleur (optionnel) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Couleur"
              name="couleur"
              value={epi.couleur || ''}
              onChange={handleTextChange}
              margin="normal"
            />
          </Grid>
          {/* Sélecteurs de date */}
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Date d'achat"
              value={parseISO(epi.date_achat)}
              onChange={(date) => handleDateChange('date_achat', date)}
              slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Date de fabrication"
              value={parseISO(epi.date_fabrication)}
              onChange={(date) => handleDateChange('date_fabrication', date)}
              slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Date de mise en service"
              value={parseISO(epi.date_mise_en_service)}
              onChange={(date) => handleDateChange('date_mise_en_service', date)}
              slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
            />
          </Grid>
          {/* Champ pour la périodicité de contrôle */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Périodicité de contrôle (mois)"
              name="périodicité_controle"
              type="number"
              value={epi.périodicité_controle}
              onChange={handleTextChange}
              required
              margin="normal"
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
          {/* Menu déroulant pour le type d'EPI */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="epi-type-label">Type d'EPI</InputLabel>
              <Select
                labelId="epi-type-label"
                name="epi_type_id"
                value={epi.epi_type_id.toString()}
                onChange={handleSelectChange}
                label="Type d'EPI"
                required
              >
                {typesEPI.map((type) => (
                  <MenuItem key={type.id} value={type.id.toString()}>
                    {type.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Bouton de soumission */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : (isEditing ? 'Mettre à jour' : 'Ajouter')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default EPIForm;