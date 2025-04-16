// ************************************************************************
// 🎓 COMPOSANT PRINCIPAL - PROJET GESTEPI 
// Pour l'épreuve E6 BTS SIO SLAM
// ************************************************************************

// ===== IMPORTS NÉCESSAIRES =====
// React : bibliothèque pour créer l'interface utilisateur
// Pour l'E6 : Équivalent des templates Twig/Blade en PHP
import React from 'react';

// React Router : gestion des URLs et de la navigation
// Pour l'E6 : Comme les routes dans Symfony/Laravel
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Material UI : bibliothèque de composants graphiques
// Pour l'E6 : Équivalent de Bootstrap mais pour React
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Composants personnalisés
// Pour l'E6 : Comme des includes/requires en PHP
import Layout from './components/layout/Layout';
import theme from './theme';

// Composants des fonctionnalités
// Pour l'E6 : Chaque composant = une "vue" qui gère une page
import EPIList from './components/epi/EPIList';         // SELECT * FROM epis
import Dashboard from './components/dashboard/Dashboard'; // Vue tableau de bord
import EPIForm from './components/epi/EPIForm';         // INSERT/UPDATE epis
import EPIDetails from './components/epi/EPIDetails';   // SELECT * FROM epis WHERE id = ?
import ControleForm from './components/controle/ControleForm'; // INSERT controles
import AlertesList from './components/alerte/AlertesList';    // Vue des alertes
import Login from './components/common/Login';          // Authentification
import NotFound from './components/common/NotFound';    // Erreur 404

// Configuration des dates en français
// Pour l'E6 : Comme setlocale() en PHP
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';

// ===== COMPOSANT APP =====
// Pour l'E6 : Point d'entrée principal, comme index.php
// Gère la structure globale et le routage
function App() {
    // Le hook return renvoie le JSX (comme echo en PHP)
    return (
        // ThemeProvider : applique le thème global
        // Pour l'E6 : Comme un fichier CSS global
        <ThemeProvider theme={theme}>
            {/* LocalizationProvider : configuration des dates */}
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                {/* CssBaseline : reset CSS */}
                <CssBaseline />
                {/* Router : système de navigation */}
                <Router>
                    {/* Routes : définition des URLs */}
                    {/* Pour l'E6 : Comme les routes dans routes.php */}
                    <Routes>
                        {/* Login : accessible sans Layout */}
                        <Route path="/login" element={<Login />} />

                        {/* Routes avec Layout (header/footer) */}
                        <Route path="/" element={<Layout />}>
                            {/* Chaque Route = une URL + un composant */}
                            {/* Pour l'E6 : URL -> Controller -> Vue */}
                            <Route index element={<Dashboard />} />
                            <Route path="epis" element={<EPIList />} />
                            <Route path="epis/new" element={<EPIForm />} />
                            <Route path="/epis/:id" element={<EPIDetails />} />
                            <Route path="epis/edit/:id" element={<EPIForm />} />
                            <Route path="controles/new" element={<ControleForm />} />
                            <Route path="alertes" element={<AlertesList />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Router>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

// Export du composant pour utilisation
export default App;

// 📝 RÉSUMÉ POUR L'ÉPREUVE E6
// Ce fichier est crucial car il :
// 1. Est le point d'entrée de l'application (comme index.php)
// 2. Configure le routage (URLs -> composants)
// 3. Structure l'interface utilisateur
// 4. Gère la navigation entre les pages
// 5. Intègre les bibliothèques principales
// 
// Pour expliquer à l'examinateur :
// - Les routes correspondent aux URLs de l'application
// - Chaque composant est comme une page PHP
// - Le routage remplace les contrôleurs PHP
// - Les hooks React remplacent les méthodes PHP
// - L'interface est construite en JSX (comme du HTML)
