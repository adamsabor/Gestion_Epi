  // ************************************************************************
  // 🎓 COMPOSANT REACT EPIDETAILS - PROJET GESTEPI 
  // Pour l'épreuve E6 BTS SIO SLAM
  // ************************************************************************

  // 📚 IMPORTS NÉCESSAIRES
  // React et ses hooks pour gérer l'état et les effets
  // useState : stocke des données qui peuvent changer
  // useEffect : exécute du code quand le composant est monté/mis à jour
  import React, { useEffect, useState } from 'react';

  // Outils de React Router pour la navigation
  // useParams : récupère les paramètres de l'URL (ex: /epis/123 -> id=123)
  // RouterLink : crée des liens sans recharger la page
  import { useParams, Link as RouterLink } from 'react-router-dom';

  // Service qui gère les appels à l'API backend
  // Contient les fonctions pour lire/modifier les EPIs
  import { epiService } from '../../services/epiService';

  // Interface TypeScript qui définit la structure d'un EPI
  // Pour l'E6 : C'est comme une "classe" qui garantit que l'objet a tous les champs requis
  import { EPI } from '../../types';

  // Composants Material-UI pour l'interface graphique
  import {
    Box, Typography, Paper, CircularProgress, Alert, Button, Divider
  } from '@mui/material';

  // ********** COMPOSANT REACT **********
  // Pour l'E6 : Un composant fonctionnel qui affiche les détails d'un EPI
  // FC = Function Component, un type TypeScript pour les composants React
  const EPIDetails: React.FC = () => {
    // ********** HOOKS REACT **********
    // useParams récupère l'ID dans l'URL
    // Pour l'E6 : En SQL, on va faire un SELECT * FROM epis WHERE id = {id}
    const { id } = useParams();

    // useState crée des variables d'état qui, quand modifiées, mettent à jour l'interface
    // Pour l'E6 : C'est comme des variables globales du composant
    const [epi, setEpi] = useState<EPI | null>(null);     // Stocke les données de l'EPI
    const [loading, setLoading] = useState(true);         // Indique si chargement en cours
    const [error, setError] = useState<string | null>(null); // Stocke les messages d'erreur

    // ********** EFFET DE CHARGEMENT **********
    // Pour l'E6 : useEffect s'exécute quand le composant est monté
    // Ici, il charge les données de l'EPI depuis l'API
    useEffect(() => {
      // Fonction asynchrone qui fait l'appel API
      // Pour l'E6 : async/await permet d'attendre la réponse de l'API
      const fetchEPI = async () => {
        try {
          // Appel au service qui fait la requête HTTP GET
          // Pour l'E6 : En SQL = SELECT * FROM epis WHERE id = {id}
          const epiData = await epiService.getById(Number(id));
          setEpi(epiData); // Stocke les données reçues
        } catch (err) {
          // En cas d'erreur (API indisponible, mauvais ID...)
          setError('Impossible de charger cet EPI.');
        } finally {
          // Dans tous les cas, on arrête le loader
          setLoading(false);
        }
      };
      fetchEPI(); // Lance le chargement
    }, [id]); // Se relance si l'ID change

    // ********** RENDUS CONDITIONNELS **********
    // Pour l'E6 : On affiche différentes choses selon l'état du chargement

    // Pendant le chargement : un spinner centré
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      );
    }

    // Si erreur ou pas de données : un message d'erreur
    if (error || !epi) {
      return (
        <Alert severity="error" sx={{ m: 4 }}>
          {error || "EPI introuvable."}
        </Alert>
      );
    }

    // ********** RENDU PRINCIPAL **********
    // Pour l'E6 : Affiche toutes les informations de l'EPI dans une carte
    return (
      <Paper sx={{ p: 4, m: 4 }}>
        <Typography variant="h5" gutterBottom>Détails de l'EPI</Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Affichage de chaque champ avec mise en forme */}
        {/* Pour l'E6 : On accède aux données via l'objet epi */}
        <Box mb={2}><strong>Identifiant :</strong> {epi.identifiant_custom}</Box>
        <Box mb={2}><strong>Marque :</strong> {epi.marque}</Box>
        <Box mb={2}><strong>Modèle :</strong> {epi.modèle}</Box>
        <Box mb={2}><strong>N° série :</strong> {epi.numéro_série}</Box>
        <Box mb={2}><strong>Date d'achat :</strong> {new Date(epi.date_achat).toLocaleDateString()}</Box>
        <Box mb={2}><strong>Date fabrication :</strong> {new Date(epi.date_fabrication).toLocaleDateString()}</Box>
        <Box mb={2}><strong>Date mise en service :</strong> {new Date(epi.date_mise_en_service).toLocaleDateString()}</Box>
        <Box mb={2}><strong>Périodicité contrôle :</strong> {epi.périodicité_controle} mois</Box>
        <Box mb={2}><strong>Type :</strong> {epi.type_nom || 'Non spécifié'}</Box>

        {/* Bouton de retour qui utilise React Router */}
        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          component={RouterLink}
          to="/epis"
        >
          Retour à la liste
        </Button>
      </Paper>
    );
  };

  // Export du composant
  export default EPIDetails;

  // 📝 RÉSUMÉ POUR L'ÉPREUVE E6
  // Ce fichier est important car il :
  // 1. Montre comment afficher les détails d'un élément depuis une API
  // 2. Utilise les hooks React (useState, useEffect) pour gérer les données
  // 3. Gère les états de chargement et d'erreur
  // 4. Utilise TypeScript pour le typage des données
  // 5. Intègre Material-UI pour une interface professionnelle
