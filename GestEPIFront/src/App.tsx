import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout/Layout';
import theme from './theme';
import EPIList from './components/epi/EPIList';
import Dashboard from './components/dashboard/Dashboard';
import EPIForm from './components/epi/EPIForm';
import NotFound from './components/common/NotFound';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="epis" element={<EPIList />} />
                        <Route path="epis/new" element={<EPIForm />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
