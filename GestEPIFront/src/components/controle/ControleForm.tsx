import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  CircularProgress, 
  Alert,
  SelectChangeEvent
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { format, parse } from 'date-fns';
import { controleService } from '../../services/controleService';
import { epiService } from '../../services/epiService';
import { Controle, EPI, StatutControle } from '../../types';

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
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Ajouter un nouveau contrôle
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Contrôle créé avec succès !</Alert>}
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
              <DatePicker
                label="Date du contrôle"
                value={controle.date_controle ? parse(controle.date_controle, 'yyyy-MM-dd', new Date()) : null}
                onChange={handleDateChange}
                slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Gestionnaire"
              name="gestionnaire"
              value={controle.gestionnaire}
              onChange={handleTextChange}
              required
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="epi-label">EPI</InputLabel>
              <Select
                labelId="epi-label"
                name="epi_id"
                value={controle.epi_id ? controle.epi_id.toString() : ''}
                onChange={handleSelectChange}
                label="EPI"
                required
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="statut-label">Statut</InputLabel>
              <Select
                labelId="statut-label"
                name="statut"
                value={controle.statut || ''}
                onChange={handleSelectChange}
                label="Statut"
                required
              >
                {Object.values(StatutControle).map((statut) => (
                  <MenuItem key={statut} value={statut}>
                    {statut}
                  </MenuItem>
                ))}
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
                {loading ? <CircularProgress size={24} /> : 'Ajouter'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ControleForm; 