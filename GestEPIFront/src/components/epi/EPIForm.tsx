// ************************************************************************
// 🎓 COMPOSANT REACT EPIFORM - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// 📚 IMPORTS NÉCESSAIRES
// React et ses hooks pour gérer l'état et les effets
import React, { useEffect, useState } from 'react';
// axios pour faire des requêtes HTTP vers l'API
import axios from 'axios';

// Composants Material-UI pour l'interface graphique
import {
  Box,          // Conteneur flexible
  TextField,    // Champs de saisie
  MenuItem,     // Option de menu déroulant
  Select,       // Menu déroulant
  InputLabel,   // Label pour les champs
  FormControl,  // Conteneur de formulaire
  Button,       // Bouton
  Alert,        // Message d'alerte
  Typography,   // Texte stylé
  SelectChangeEvent, // Type pour les événements de select
} from '@mui/material';

// Hooks de React Router pour la navigation et les paramètres d'URL
import { useNavigate, useParams } from 'react-router-dom';
// Service qui gère les appels API pour les EPIs
import { epiService } from '../../services/epiService';

// ********** INTERFACE TYPESCRIPT **********
// Pour l'E6 : Cette interface définit la structure exacte d'un EPI
// C'est comme une classe qui garantit que toutes les propriétés sont présentes
interface EPIFormData {
  id: number;                    // Clé primaire en BDD
  identifiant_custom: string;    // Identifiant unique de l'EPI
  marque: string;               // Marque du fabricant
  modèle: string;               // Modèle de l'équipement
  numéro_série: string;         // Numéro de série unique
  taille: string;               // Taille de l'équipement
  couleur: string;              // Couleur de l'EPI
  date_achat: string;           // Date d'achat (YYYY-MM-DD)
  date_fabrication: string;     // Date de fabrication
  date_mise_en_service: string; // Date de première utilisation
  périodicité_controle: number; // Intervalle entre les contrôles (mois)
  epi_type_id: number;          // Clé étrangère vers types_epi
  statut_id: number;            // Clé étrangère vers statuts
}

// ********** FONCTION UTILITAIRE **********
// Pour l'E6 : Formate une date en YYYY-MM-DD pour les champs date
const formatDate = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  return date.toISOString().split('T')[0];
};

// ********** COMPOSANT REACT **********
// Pour l'E6 : Composant qui gère le formulaire de création/modification d'EPI
const EPIForm: React.FC = () => {
  // Hook pour la navigation programmatique
  const navigate = useNavigate();
  // Récupère l'ID dans l'URL si on est en mode édition
  const { id } = useParams();
  // Détermine si on est en création ou modification
  const isEdit = Boolean(id);

  // ********** ÉTATS (VARIABLES RÉACTIVES) **********
  // Pour l'E6 : useState crée des variables qui, quand modifiées, 
  // déclenchent une mise à jour de l'interface

  // État principal : données du formulaire
  // En SQL : SELECT * FROM epis WHERE id = ?
  const [formData, setFormData] = useState<EPIFormData>({
    id: 0,
    identifiant_custom: '',
    marque: '',
    modèle: '',
    numéro_série: '',
    taille: '',
    couleur: '',
    date_achat: '',
    date_fabrication: '',
    date_mise_en_service: '',
    périodicité_controle: 0,
    epi_type_id: 0,
    statut_id: 0,
  });

  // État pour les messages d'erreur
  const [error, setError] = useState<string | null>(null);

  // États pour les listes déroulantes
  // En SQL : SELECT * FROM gestionnaires; SELECT * FROM statuts;
  const [gestionnaires, setGestionnaires] = useState<any[]>([]);
  const [statuts, setStatuts] = useState<any[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // ********** EFFETS (ACTIONS AUTOMATIQUES) **********
  // Pour l'E6 : useEffect exécute du code quand certaines valeurs changent

  // Effet 1 : Charge les listes déroulantes au démarrage
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Appels API parallèles avec Promise.all
        const [resGestionnaires, resStatuts] = await Promise.all([
          axios.get('http://localhost:3001/api/gestionnaires'),
          axios.get('http://localhost:3001/api/statuts'),
        ]);
        setGestionnaires(resGestionnaires.data);
        setStatuts(resStatuts.data);
      } catch (error) {
        console.error("Erreur lors du chargement des options :", error);
      } finally {
        setLoadingOptions(false);
      }
    };
    fetchOptions();
  }, []); // [] = exécution unique au montage

  // Effet 2 : Charge les données de l'EPI en mode édition
  // En SQL : SELECT * FROM epis WHERE id = ?
  useEffect(() => {
    if (isEdit && id) {
      epiService.getById(Number(id))
        .then((epi: any) => {
          setFormData({
            id: epi.id ?? 0,
            identifiant_custom: epi.identifiant_custom ?? '',
            marque: epi.marque ?? '',
            modèle: epi.modèle ?? '',
            numéro_série: epi.numéro_série ?? '',
            taille: epi.taille ?? '',
            couleur: epi.couleur ?? '',
            date_achat: formatDate(epi.date_achat),
            date_fabrication: formatDate(epi.date_fabrication),
            date_mise_en_service: formatDate(epi.date_mise_en_service),
            périodicité_controle: epi.périodicité_controle ?? 0,
            epi_type_id: epi.epi_type_id ?? 0,
            statut_id: epi.statut_id ?? 0,
          });
        })
        .catch(() => setError("Erreur lors du chargement de l'EPI."));
    }
  }, [id, isEdit]); // Se relance si id ou isEdit change

  // ********** GESTIONNAIRES D'ÉVÉNEMENTS **********
  // Pour l'E6 : Fonctions appelées quand l'utilisateur interagit

  // Gère les changements dans les champs texte
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'périodicité_controle' ? Number(value) : value
    }));
  };

  // Gère les changements dans les menus déroulants
  const handleSelectChange = (e: SelectChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  // Gère la soumission du formulaire
  // En SQL : INSERT INTO epis (...) VALUES (...) 
  // ou UPDATE epis SET ... WHERE id = ?
  const handleSubmit = async () => {
    try {
      if (isEdit && id) {
        await epiService.update(Number(id), formData);
      } else {
        await epiService.create(formData);
      }
      navigate('/epis'); // Retour à la liste après succès
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Erreur lors de l'enregistrement de l'EPI.");
    }
  };

  // ********** RENDU CONDITIONNEL **********
  if (loadingOptions) {
    return <p>Chargement des données...</p>;
  }

  // ********** RENDU DU FORMULAIRE **********
  // Pour l'E6 : Structure JSX qui définit l'interface utilisateur
  return (
    <Box maxWidth="sm" mx="auto" mt={4} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">{isEdit ? 'Modifier un EPI' : 'Ajouter un EPI'}</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Champs de saisie pour chaque propriété de l'EPI */}
      <TextField label="Identifiant" name="identifiant_custom" value={formData.identifiant_custom} onChange={handleChange} fullWidth />
      <TextField label="Marque" name="marque" value={formData.marque} onChange={handleChange} fullWidth />
      <TextField label="Modèle" name="modèle" value={formData.modèle} onChange={handleChange} fullWidth />
      <TextField label="N° de série" name="numéro_série" value={formData.numéro_série} onChange={handleChange} fullWidth />
      <TextField label="Taille" name="taille" value={formData.taille} onChange={handleChange} fullWidth />
      <TextField label="Couleur" name="couleur" value={formData.couleur} onChange={handleChange} fullWidth />
      <TextField label="Date d'achat" name="date_achat" type="date" value={formData.date_achat} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
      <TextField label="Date de fabrication" name="date_fabrication" type="date" value={formData.date_fabrication} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
      <TextField label="Date de mise en service" name="date_mise_en_service" type="date" value={formData.date_mise_en_service} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
      <TextField label="Périodicité de contrôle (mois)" name="périodicité_controle" type="number" value={formData.périodicité_controle} onChange={handleChange} fullWidth />

      {/* Menus déroulants pour les relations */}
      <FormControl fullWidth>
        <InputLabel id="epi-type-label">Type d'EPI</InputLabel>
        <Select labelId="epi-type-label" name="epi_type_id" value={formData.epi_type_id || ""} onChange={handleSelectChange} displayEmpty>
          <MenuItem value="">Sélectionner</MenuItem>
          <MenuItem value={1}>Casque</MenuItem>
          <MenuItem value={2}>Harnais</MenuItem>
          <MenuItem value={3}>Corde</MenuItem>
          <MenuItem value={4}>Gants</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="statut-label">Statut</InputLabel>
        <Select labelId="statut-label" name="statut_id" value={formData.statut_id || ""} onChange={handleSelectChange} displayEmpty>
          <MenuItem value="">Sélectionner</MenuItem>
          <MenuItem value={1}>En service</MenuItem>
          <MenuItem value={2}>Hors service</MenuItem>
          <MenuItem value={3}>En contrôle</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {isEdit ? 'Mettre à jour' : 'Créer'}
      </Button>
    </Box>
  );
};

export default EPIForm;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est crucial car il :
// 1. Gère la création et modification des EPIs (CRUD)
// 2. Utilise les hooks React (useState, useEffect) pour la réactivité
// 3. Communique avec l'API via axios et epiService
// 4. Utilise TypeScript pour la sécurité du code
// 5. Intègre Material-UI pour une interface professionnelle
// 6. Gère les erreurs et la validation des données
