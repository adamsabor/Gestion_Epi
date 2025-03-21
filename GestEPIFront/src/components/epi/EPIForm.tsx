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
import { format, parse, parseISO } from 'date-fns';
import { epiService } from '../../services/epiService';
import { api } from '../../services/api';
import { EPI, TypeEPI } from '../../types';

// Définir un type pour la réponse de l'API
interface ApiResponse<T> {
  message: string;
  data: T;
}

interface EPIFormProps {
  epiId?: number;
  onSuccess?: () => void;
}

const EPIForm: React.FC<EPIFormProps> = ({ epiId, onSuccess }) => {
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
  
  const [typesEPI, setTypesEPI] = useState<TypeEPI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    // Charger les types d'EPI
    const fetchTypesEPI = async () => {
      try {
        const response = await api.get<ApiResponse<TypeEPI[]>>('/api/epi-types');
        if (response && response.data) {
          setTypesEPI(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des types d\'EPI:', error);
        setError('Impossible de charger les types d\'EPI. Veuillez réessayer plus tard.');
      }
    };

    fetchTypesEPI();

    // Si un ID d'EPI est fourni, charger les données de l'EPI
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
  }, [epiId]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpi({
      ...epi,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setEpi({
      ...epi,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (name: string, date: Date | null) => {
    if (date) {
      setEpi({
        ...epi,
        [name]: format(date, 'yyyy-MM-dd')
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditing && epiId) {
        // Mettre à jour un EPI existant
        await epiService.update(epiId, epi);
        setSuccess('EPI mis à jour avec succès !');
      } else {
        // Créer un nouvel EPI
        await epiService.create(epi);
        setSuccess('EPI créé avec succès !');
        
        // Réinitialiser le formulaire après la création
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

      // Appeler le callback onSuccess si fourni
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

  if (loading && isEditing) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {isEditing ? 'Modifier un EPI' : 'Ajouter un nouvel EPI'}
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      {success && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {success}
        </Typography>
      )}
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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