// ✅ ControleForm.tsx – corrigé complet pour gestionnaire_id & statut_id + URL fix
// ********** IMPORTS **********
import React, { useState, useEffect } from 'react';
import {
  Box, Button, CircularProgress, FormControl, Grid, InputLabel,
  MenuItem, Paper, TextField, Typography, Alert, SelectChangeEvent
} from '@mui/material';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
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
    gestionnaire_id: 1,
    epi_id: preselectedEpiId ? parseInt(preselectedEpiId) : 0,
    statut_id: 1,
    remarques: ''
  });

  const [epis, setEpis] = useState<EPI[]>([]);
  const [statuts, setStatuts] = useState<{ id: number, nom: string }[]>([]);
  const [gestionnaires, setGestionnaires] = useState<{ id: number, nom: string, prénom: string }[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const epiResponse = await epiService.getAll();
        setEpis(epiResponse);

        const [statutsRes, gestionnairesRes] = await Promise.all([
          fetch('http://localhost:3001/api/statuts'),
          fetch('http://localhost:3001/api/gestionnaires')
        ]);

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

      if (!controle.date_controle || !controle.gestionnaire_id || !controle.epi_id || !controle.statut_id) {
        setError('Veuillez remplir tous les champs obligatoires.');
        return;
      }

      await controleService.create(controle);
      setSuccess('Contrôle enregistré avec succès !');

      setTimeout(() => {
        navigate(`/epis/${controle.epi_id}`);
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de la création du contrôle :', error);
      setError('Erreur lors de la création du contrôle.');
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
                {gestionnaires.map(g => (
                  <MenuItem key={g.id} value={g.id}>
                    {g.prénom} {g.nom}
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
                {statuts.map(s => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.nom}
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