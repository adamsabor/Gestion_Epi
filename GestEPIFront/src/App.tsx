// ********** IMPORTS **********
// React : La bibliothèque de base pour créer notre interface
import React from 'react';
// React Router : Permet de gérer la navigation entre les pages de notre application
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Material UI : Bibliothèque de composants graphiques pour un design professionnel
import { ThemeProvider } from '@mui/material/styles';
// CssBaseline : Réinitialise les styles CSS par défaut pour une meilleure cohérence
import CssBaseline from '@mui/material/CssBaseline';
// Layout : Notre composant qui définit la structure générale de l'application
import Layout from './components/layout/Layout';
// Theme : Nos paramètres de style personnalisés (couleurs, polices...)
import theme from './theme';
// Composants de notre application :
import EPIList from './components/epi/EPIList';         // Liste des EPIs
import Dashboard from './components/dashboard/Dashboard'; // Tableau de bord
import EPIForm from './components/epi/EPIForm';         // Formulaire EPI
import EPIDetail from './components/epi/EPIDetail';     // Détails d'un EPI
import ControleForm from './components/controle/ControleForm'; // Formulaire de contrôle
import AlertesList from './components/alerte/AlertesList';    // Liste des alertes
import NotFound from './components/common/NotFound';     // Page 404
// Gestion des dates en français
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';

// ********** COMPOSANT PRINCIPAL DE L'APPLICATION **********
// Ce composant App est la racine de notre application
// Il définit la structure globale et les routes disponibles
function App() {
    return (
        // ThemeProvider : Applique notre thème personnalisé à toute l'application
        <ThemeProvider theme={theme}>
            {/* LocalizationProvider : Configure les dates en français */}
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                {/* CssBaseline : Assure une base CSS cohérente */}
                <CssBaseline />
                {/* Router : Gère la navigation dans l'application */}
                <Router>
                    {/* Routes : Définit toutes les pages accessibles */}
                    <Routes>
                        {/* Route principale avec notre Layout */}
                        <Route path="/" element={<Layout />}>
                            {/* Page d'accueil : le tableau de bord */}
                            <Route index element={<Dashboard />} />
                            {/* Routes pour la gestion des EPIs */}
                            <Route path="epis" element={<EPIList />} />
                            <Route path="epis/new" element={<EPIForm />} />
                            <Route path="epis/:id" element={<EPIDetail />} />
                            <Route path="epis/edit/:id" element={<EPIForm />} />
                            {/* Route pour créer un nouveau contrôle */}
                            <Route path="controles/new" element={<ControleForm />} />
                            {/* Route pour voir les alertes */}
                            <Route path="alertes" element={<AlertesList />} />
                            {/* Route 404 pour les pages non trouvées */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Router>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

// On exporte le composant App pour l'utiliser dans index.tsx
export default App;

/*
RÉSUMÉ DU FICHIER App.tsx :
Ce fichier est le CŒUR de notre application React. Il joue plusieurs rôles essentiels :

1. STRUCTURE : 
   - Définit l'architecture générale de l'application
   - Met en place le thème et les styles de base
   - Configure la gestion des dates en français

2. NAVIGATION :
   - Définit toutes les routes (URLs) de l'application
   - Permet d'accéder aux différentes fonctionnalités :
     * Dashboard (tableau de bord)
     * Gestion des EPIs (liste, création, modification, détails)
     * Gestion des contrôles
     * Système d'alertes

3. ORGANISATION :
   - Utilise un Layout commun pour maintenir une structure cohérente
   - Gère les cas d'erreur (page 404)
   - Intègre les bibliothèques essentielles (Material UI, React Router)

C'est comme le "plan" de notre application qui organise comment 
les utilisateurs peuvent naviguer et accéder aux différentes fonctionnalités !
*/
