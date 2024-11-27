import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const NavBar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate(); // Usar useNavigate

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#EEDEB8" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo y título */}
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo.png"
              alt="Sosneado"
              style={{ height: "80px", marginRight: "10px" }}
            />
          </Typography>

          {/* Botón de menú hamburguesa */}
          <IconButton edge="end" onClick={() => toggleDrawer(true)}>
            <MenuIcon sx={{ color: "#000000" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer del menú */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#EEDEB8",
            padding: "20px",
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          role="presentation"
          sx={{ height: "100%", padding: "10px" }}
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <List sx={{ padding: 0 }}>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemText primary="🏠 Inicio" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/historial")}>
              <ListItemText primary="📜 Historial de Pedidos" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/quienes-somos")}>
              <ListItemText primary="👥 ¿Quiénes Somos?" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/colabora-con-nosotros")}>
              <ListItemText primary="🤝 Colabora con Nosotros" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/desarrolladoras")}>
              <ListItemText primary="💻 Desarrolladoras" />
            </ListItemButton>
            <ListItemButton
              component="a"
              href="https://www.instagram.com/coopdetrabajogenerandosonrisas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon sx={{ color: "#000000", marginRight: "10px" }} />
              <ListItemText primary="Instagram" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavBar;
