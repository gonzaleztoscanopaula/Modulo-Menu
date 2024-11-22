import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Bebidas from "./components/Bebidas";
import Comidas from "./components/Comidas";
import DesayunosMeriendas from "./components/DesayunosMeriendas";
import NavBar from "./components/NavBar";
import HistoriasMozos from "./components/HistoriasMozos";
import Categorias from "./components/Categorias";
import { useResumen } from "./components/ResumenContext";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const App: React.FC = () => {
  const { resumen } = useResumen(); // Usamos el contexto para acceder al carrito
  const [carritoAbierto, setCarritoAbierto] = useState(false); // Controlar el estado de apertura/cierre del carrito

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return Object.values(resumen).reduce(
      (total, item) => total + item.cantidad * item.precio,
      0
    );
  };

  // Función para alternar el estado del carrito
  const toggleCarrito = () => {
    setCarritoAbierto(!carritoAbierto);
  };

  // Calcular el número total de productos en el carrito
  const totalProductos = Object.values(resumen).reduce((total, item) => total + item.cantidad, 0);

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 3, overflowY: "auto", padding: "20px" }}>
          <NavBar />
          <HistoriasMozos />
          <Categorias />
        </div>

        {/* Carrito flotante */}
        <IconButton
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#A39986",
            color: "#fff",
            borderRadius: "50%",
            padding: "10px",
            "&:hover": {
              backgroundColor: "#8D7F6F",
            },
          }}
          onClick={toggleCarrito}
        >
          {/* Mostrar el número de productos en el carrito */}
          <Badge
            badgeContent={totalProductos > 0 ? totalProductos : null}
            color="error"
            sx={{ "& .MuiBadge-dot": { backgroundColor: "#f44336" } }}
          >
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>

        {/* Carrito desplegado */}
        {carritoAbierto && (
          <div
            style={{
              position: "fixed",
              bottom: "80px", // Un poco por encima del ícono del carrito
              right: "20px",
              backgroundColor: "#fff",
              padding: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              width: "300px",
              zIndex: 1000,
              maxHeight: "400px",
              overflowY: "auto", // Hace scroll en caso de que haya muchos items
            }}
          >
            <h3>🛒 Carrito</h3>
            {Object.values(resumen).length > 0 ? (
              <div>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {Object.values(resumen).map((item) => (
                    <li
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        borderBottom: "1px solid #ddd",
                        paddingBottom: "10px",
                      }}
                    >
                      <div>
                        <strong>{item.nombre}</strong> x {item.cantidad}
                      </div>
                      <div>${(item.cantidad * item.precio).toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
                <hr />
                <h3>Total: ${calcularTotal().toFixed(2)}</h3>
              </div>
            ) : (
              <p>Tu carrito está vacío. 😞</p>
            )}
            <button
              onClick={toggleCarrito}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#A39986",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
