import React, { useState, useEffect } from 'react';
import {
  Box, Button, TextField, Grid, MenuItem, Paper, Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { epiService } from '../../services/epiService';
import { typeEpiService } from '../../services/typeEpiService';
import type { EPI, TypeEPI } from '../../types';

const defaultEPI: EPI = {
  identifiant_custom: '',
  marque: '',
  modèle: '',
  numéro_série: '',
  date_achat: '',
  date_fabrication: '',
  date_mise_en_service: '',
  périodicité_controle: 12,
  epi_type_id: 0
};

const EPIForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [epi, setEpi] = useState<EPI>(defaultEPI);
  const [types, setTypes] = useState<TypeEPI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const typeData = await typeEpiService.getAll();
      setTypes(typeData);
      if (id) {
        const epiData = await epiService.getById(Number(id));
        setEpi(epiData);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEpi(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await epiService.update(Number(id), epi);
    } else {
      await epiService.create(epi);
    }
    navigate('/epis');
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        {id ? 'Modifier un EPI' : 'Ajouter un EPI'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {[
            { name: 'identifiant_custom', label: 'Identifiant' },
            { name: 'marque', label: 'Marque' },
            { name: 'modèle', label: 'Modèle' },
            { name: 'numéro_série', label: 'Numéro de série' }
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              <TextField
                name={field.name}
                label={field.label}
                value={(epi as any)[field.name] || ''}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          ))}

          {[
            { name: 'date_achat', label: 'Date d\'achat' },
            { name: 'date_fabrication', label: 'Date de fabrication' },
            { name: 'date_mise_en_service', label: 'Date mise en service' }
          ].map((field) => (
            <Grid item xs={12} sm={4} key={field.name}>
              <TextField
                name={field.name}
                label={field.label}
                type="date"
                value={epi[field.name as keyof EPI]?.toString().substring(0, 10) || ''}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={4}>
            <TextField
              name="périodicité_controle"
              label="Périodicité (mois)"
              type="number"
              value={epi.périodicité_controle}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              select
              name="epi_type_id"
              label="Type d'EPI"
              value={epi.epi_type_id}
              onChange={handleChange}
              fullWidth
            >
              {types.map((type) => (
                <MenuItem key={type.id} value={type.id}>{type.nom}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              {id ? 'Mettre à jour' : 'Créer'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default EPIForm;
