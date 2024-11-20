import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  // Estado para controlar la apertura y cierre del menú
  const [open, setOpen] = useState(false);

  // Función para abrir el menú
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Función para cerrar el menú
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {/* Barra de navegación */}
      <AppBar position="static" style={{ backgroundColor: '#EEDEB8' }}> {/* Fondo del AppBar sin cambiar */}
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <img src="/logo.png" alt="Sosneado" style={{ height: '80px' }} />
          </Typography>

          {/* Icono del menú hamburguesa con color negro */}
          <IconButton edge="end" onClick={handleDrawerOpen}>
            <MenuIcon style={{ color: '#000000' }} /> {/* Solo el icono negro */}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer: Menú hamburguesa */}
      <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
        <Box
          role="presentation"
          style={{ width: 250, backgroundColor: '#EEDEB8', height: '100%' }}
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List>
            {/* Usando ListItemButton para los elementos del menú */}
            <ListItemButton>
              <ListItemText primary="Inicio" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Historial de Pedidos" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Mesas" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Pedidos Pendientes" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
