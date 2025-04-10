import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, TextField, Typography, Alert, SelectChangeEvent } from '@mui/material';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parseISO } from 'date-fns';
import { Controle, EPI } from '../../types';
import { controleService } from '../../services/controleService';
import { epiService } from '../../services/epiService';
import { useNavigate, useLocation } from 'react-router-dom';

const ControleForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preselectedEpiId = searchParams.get('epiId');

  const [controle, setControle] = useState<Controle>({
    date_controle: format(new Date(), 'yyyy-MM-dd'),
    gestionnaire_id: 1, // Valeur par défaut pour le gestionnaire
    epi_id: preselectedEpiId ? parseInt(preselectedEpiId) : 0,
    statut_id: 1, // Opérationnel par défaut
    remarques: ''
  });

  const [epis, setEpis] = useState<EPI[]>([]);
  const [statuts, setStatuts] = useState<{id: number, nom: string}[]>([]);
  const [gestionnaires, setGestionnaires] = useState<{id: number, nom: string, prénom: string}[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Récupérer les EPIs
        const epiResponse = await epiService.getAll();
        setEpis(epiResponse);
        
        // Récupérer les statuts
        try {
          const statutsResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/statuts`);
          if (statutsResponse.ok) {
            const statutsData = await statutsResponse.json();
            setStatuts(statutsData.data || []);
          } else {
            // Utiliser des données statiques en cas d'erreur
            setStatuts([
              { id: 1, nom: 'Opérationnel' },
              { id: 2, nom: 'À réparer' },
              { id: 3, nom: 'Mis au rebut' }
            ]);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des statuts:', error);
          // Utiliser des données statiques en cas d'erreur
          setStatuts([
            { id: 1, nom: 'Opérationnel' },
            { id: 2, nom: 'À réparer' },
            { id: 3, nom: 'Mis au rebut' }
          ]);
        }
        
        // Récupérer les gestionnaires
        try {
          const gestionnairesResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/gestionnaires`);
          if (gestionnairesResponse.ok) {
            const gestionnairesData = await gestionnairesResponse.json();
            setGestionnaires(gestionnairesData.data || []);
          } else {
            // Utiliser des données statiques en cas d'erreur
            setGestionnaires([
              { id: 1, nom: 'Sabor', prénom: 'Adam' }
            ]);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des gestionnaires:', error);
          // Utiliser des données statiques en cas d'erreur
          setGestionnaires([
            { id: 1, nom: 'Sabor', prénom: 'Adam' }
          ]);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        setError('Erreur lors du chargement des données. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setControle(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setControle(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setControle(prev => ({ ...prev, date_controle: format(date, 'yyyy-MM-dd') }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Validation des données
      if (!controle.date_controle || !controle.gestionnaire_id || !controle.epi_id || !controle.statut_id) {
        setError('Veuillez remplir tous les champs obligatoires.');
        return;
      }
      
      // Envoyer les données au serveur
      const result = await controleService.create(controle);
      
      setSuccess('Contrôle enregistré avec succès !');
      
      // Rediriger vers la page de détail de l'EPI après 2 secondes
      setTimeout(() => {
        navigate(`/epis/${controle.epi_id}`);
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du contrôle:', error);
      setError('Erreur lors de l\'enregistrement du contrôle. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Nouveau contrôle
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
          
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Date du contrôle"
              value={new Date(controle.date_controle)}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
          
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

export default ControleForm; 