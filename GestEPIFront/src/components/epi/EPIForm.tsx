// ✅ EPIForm.tsx – version finale et stable pour production
import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Alert,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { epiService } from '../../services/epiService';

interface EPIFormData {
  id: number;
  identifiant_custom: string;
  marque: string;
  modèle: string;
  numéro_série: string;
  taille: string;
  couleur: string;
  date_achat: string;
  date_fabrication: string;
  date_mise_en_service: string;
  périodicité_controle: number;
  epi_type_id: number;
  statut_id: number;
}

const formatDate = (value: string) => {
  if (!value) return '';
  const date = new Date(value);
  return date.toISOString().split('T')[0];
};

const EPIForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

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

  const [error, setError] = useState<string | null>(null);

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
  }, [id, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'périodicité_controle' ? Number(value) : value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEdit && id) {
        await epiService.update(Number(id), formData);
      } else {
        await epiService.create(formData);
      }
      navigate('/epis');
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Erreur lors de l'enregistrement de l'EPI.");
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={4} display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5">{isEdit ? 'Modifier un EPI' : 'Ajouter un EPI'}</Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Identifiant"
        name="identifiant_custom"
        value={formData.identifiant_custom}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Marque"
        name="marque"
        value={formData.marque}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Modèle"
        name="modèle"
        value={formData.modèle}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="N° de série"
        name="numéro_série"
        value={formData.numéro_série}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Taille"
        name="taille"
        value={formData.taille}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Couleur"
        name="couleur"
        value={formData.couleur}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Date d'achat"
        name="date_achat"
        type="date"
        value={formData.date_achat}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label="Date de fabrication"
        name="date_fabrication"
        type="date"
        value={formData.date_fabrication}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label="Date de mise en service"
        name="date_mise_en_service"
        type="date"
        value={formData.date_mise_en_service}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />
      <TextField
        label="Périodicité de contrôle (mois)"
        name="périodicité_controle"
        type="number"
        value={formData.périodicité_controle}
        onChange={handleChange}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="epi-type-label">Type d'EPI</InputLabel>
        <Select
          labelId="epi-type-label"
          name="epi_type_id"
          value={formData.epi_type_id}
          onChange={handleSelectChange}
        >
          <MenuItem value={0}>Sélectionner</MenuItem>
          <MenuItem value={1}>Casque</MenuItem>
          <MenuItem value={2}>Harnais</MenuItem>
          <MenuItem value={3}>Corde</MenuItem>
          <MenuItem value={4}>Gants</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="statut-label">Statut</InputLabel>
        <Select
          labelId="statut-label"
          name="statut_id"
          value={formData.statut_id}
          onChange={handleSelectChange}
        >
          <MenuItem value={0}>Sélectionner</MenuItem>
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