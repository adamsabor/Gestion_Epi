import React from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';

// Material-UI
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Badge,
} from '@mui/material';

// Icônes
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LogoutIcon from '@mui/icons-material/Logout';

// Alertes (custom hook)
import { useAlerts } from '../../hooks/useAlerts';

const drawerWidth = 240;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { pendingControls } = useAlerts();

  // 🔒 Vérifie si l'utilisateur est connecté
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/' },
    { text: 'EPIs', icon: <InventoryIcon />, path: '/epis' },
    { text: 'Contrôles', icon: <CheckCircleIcon />, path: '/controles/new' },
    {
      text: 'Alertes',
      icon: (
        <Badge badgeContent={pendingControls.length} color="error">
          <WarningIcon />
        </Badge>
      ),
      path: '/alertes',
    },
    {
      text: 'Déconnexion',
      icon: <LogoutIcon />,
      path: '/login',
      onClick: handleLogout,
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Barre supérieure */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            GestEPI
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menu latéral */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    navigate(item.path);
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {/* Contenu principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
