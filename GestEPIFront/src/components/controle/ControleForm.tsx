import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, parseISO } from 'date-fns';
import { Controle, EPI, StatutControle } from '../../types';
import { controleService } from '../../services/controleService';
import { epiService } from '../../services/epiService';

// Props du composant
interface ControleFormProps {
  onSuccess?: () => void;
}

const ControleForm: React.FC<ControleFormProps> = ({ onSuccess }) => {
  const [controle, setControle] = useState<Partial<Controle>>({
    date_controle: format(new Date(), 'yyyy-MM-dd'),
    gestionnaire: '',
    epi_id: 0,
    statut: StatutControle.OPERATIONNEL,
    remarques: ''
  });
  
  const [epis, setEpis] = useState<EPI[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEPIs = async () => {
      try {
        const episData = await epiService.getAll();
        setEpis(episData);
      } catch (error) {
        console.error('Erreur lors de la récupération des EPIs:', error);
        setError('Impossible de charger les EPIs. Veuillez réessayer plus tard.');
      }
    };

    fetchEPIs();
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setControle({
      ...controle,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setControle({
      ...controle,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setControle({
        ...controle,
        date_controle: format(date, 'yyyy-MM-dd')
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Vérifier que tous les champs requis sont remplis
      if (!controle.date_controle || !controle.gestionnaire || !controle.epi_id || !controle.statut) {
        setError('Veuillez remplir tous les champs obligatoires.');
        setLoading(false);
        return;
      }
      
      // Créer un nouveau contrôle
      await controleService.create(controle as Controle);
      setSuccess(true);
      
      // Réinitialiser le formulaire
      setControle({
        date_controle: format(new Date(), 'yyyy-MM-dd'),
        gestionnaire: '',
        epi_id: 0,
        statut: StatutControle.OPERATIONNEL,
        remarques: ''
      });
      
      // Appeler le callback onSuccess si fourni
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      setError('Une erreur est survenue lors de la création du contrôle. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Ajouter un nouveau contrôle
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      {success && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          Contrôle créé avec succès !
        </Typography>
      )}
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Date du contrôle"
              value={parseISO(controle.date_controle || format(new Date(), 'yyyy-MM-dd'))}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Gestionnaire"
              name="gestionnaire"
              value={controle.gestionnaire || ''}
              onChange={handleTextChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="epi-label">EPI à contrôler</InputLabel>
              <Select
                labelId="epi-label"
                name="epi_id"
                value={controle.epi_id ? controle.epi_id.toString() : ''}
                onChange={handleSelectChange}
                label="EPI à contrôler"
              >
                {epis.map((epi) => (
                  <MenuItem key={epi.id} value={epi.id?.toString()}>
                    {epi.identifiant_custom} - {epi.marque} {epi.modèle}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="statut-label">Statut après contrôle</InputLabel>
              <Select
                labelId="statut-label"
                name="statut"
                value={controle.statut || ''}
                onChange={handleSelectChange}
                label="Statut après contrôle"
              >
                <MenuItem value={StatutControle.OPERATIONNEL}>Opérationnel</MenuItem>
                <MenuItem value={StatutControle.A_REPARER}>À réparer</MenuItem>
                <MenuItem value={StatutControle.MIS_AU_REBUT}>Mis au rebut</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarques"
              name="remarques"
              value={controle.remarques || ''}
              onChange={handleTextChange}
              multiline
              rows={4}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Enregistrer le contrôle'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ControleForm; 