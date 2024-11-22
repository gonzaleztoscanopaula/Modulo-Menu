import React, { useState } from "react";
import { Box, Button, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Bebidas from "./Bebidas";
import Comidas from "./Comidas";
import DesayunosMeriendas from "./DesayunosMeriendas";
import { useResumen } from "./ResumenContext";

const Categorias = () => {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [carritoAbierto, setCarritoAbierto] = useState(false); // Estado para controlar si el carrito está abierto o cerrado
  const { resumen, agregarItem } = useResumen();

  // Función para manejar la categoría activa
  const handleMostrarCategoria = (categoria: string) => {
    setCategoriaActiva(categoria === categoriaActiva ? null : categoria);
  };

  // Función para manejar la apertura y cierre del carrito
  const toggleCarrito = () => {
    setCarritoAbierto(!carritoAbierto);
  };

  // Calcular el número total de productos en el carrito
  const totalProductos = Object.values(resumen).reduce((total, item) => total + item.cantidad, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#DDC5A1",
      }}
    >
      {/* Contenedor de los botones, que se alinea en fila */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centra los botones horizontalmente
          gap: "15px", // Espacio entre los botones
          width: "100%",
          flexWrap: "wrap", // Asegura que los botones se ajusten en pantallas pequeñas
        }}
      >
        {/* Botón Desayunos/Meriendas */}
        <Button
          onClick={() => handleMostrarCategoria("desayunos")}
          sx={{
            backgroundColor: "#A39986",
            color: "#000",
            width: "230px",
            height: "50px",
            fontWeight: "bold",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#8D7F6F",
            },
          }}
          aria-label="Ir a Desayunos/Meriendas"
        >
          Desayunos/Meriendas
        </Button>

        {/* Botón Comidas */}
        <Button
          onClick={() => handleMostrarCategoria("comidas")}
          sx={{
            backgroundColor: "#A39986",
            color: "#000",
            width: "230px",
            height: "50px",
            fontWeight: "bold",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#8D7F6F",
            },
          }}
          aria-label="Ir a Comidas"
        >
          Comidas
        </Button>

        {/* Botón Bebidas */}
        <Button
          onClick={() => handleMostrarCategoria("bebidas")}
          sx={{
            backgroundColor: "#A39986",
            color: "#000",
            width: "230px",
            height: "50px",
            fontWeight: "bold",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#8D7F6F",
            },
          }}
          aria-label="Mostrar Bebidas"
        >
          Bebidas
        </Button>
      </Box>

      {/* Mostrar productos según la categoría activa */}
      {categoriaActiva === "bebidas" && (
        <Box sx={{ marginTop: "20px" }}>
          <Bebidas addToCart={agregarItem} />
        </Box>
      )}
      {categoriaActiva === "comidas" && (
        <Box sx={{ marginTop: "20px" }}>
          <Comidas addToCart={agregarItem} />
        </Box>
      )}
      {categoriaActiva === "desayunos" && (
        <Box sx={{ marginTop: "20px" }}>
          <DesayunosMeriendas addToCart={agregarItem} />
        </Box>
      )}

      {/* Carrito minimizado */}
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
        {/* Mostrar el número de productos en rojo */}
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
        <Box
          sx={{
            position: "fixed",
            bottom: "80px", // Ubicación del carrito cuando está abierto
            right: "20px",
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            width: "250px",
            zIndex: 1000,
            maxHeight: "400px",
            overflowY: "auto", // Añadido para hacer scroll en caso de que haya muchos items
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
              <h3>Total: ${Object.values(resumen).reduce(
                (total, item) => total + item.cantidad * item.precio,
                0
              ).toFixed(2)}</h3>
            </div>
          ) : (
            <p>Tu carrito está vacío. 😞</p>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={toggleCarrito}
            sx={{ width: "100%", marginTop: "10px" }}
          >
            Cerrar
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Categorias;
