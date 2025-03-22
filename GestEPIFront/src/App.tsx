import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout/Layout';
import theme from './theme';
import EPIList from './components/epi/EPIList';
import Dashboard from './components/dashboard/Dashboard';
import EPIForm from './components/epi/EPIForm';
import EPIDetail from './components/epi/EPIDetail';
import ControleForm from './components/controle/ControleForm';
import AlertesList from './components/alerte/AlertesList';
import NotFound from './components/common/NotFound';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                <CssBaseline />
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="epis" element={<EPIList />} />
                            <Route path="epis/new" element={<EPIForm />} />
                            <Route path="epis/:id" element={<EPIDetail />} />
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

export default App;
