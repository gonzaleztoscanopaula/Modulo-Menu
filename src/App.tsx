import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Bebidas from "./components/Bebidas";
import Comidas from "./components/Comidas";
import DesayunosMeriendas from "./components/DesayunosMeriendas";
import NavBar from "./components/NavBar";
import HistoriasMozos from "./components/HistoriasMozos";
import Categorias from "./components/Categorias";
import { useResumen } from "./components/ResumenContext";
import { IconButton, Badge, Modal, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const App: React.FC = () => {
  const { resumen, eliminarItem } = useResumen();
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [metodoPago, setMetodoPago] = useState("efectivo"); // Estado para el método de pago
  const [modalAbierto, setModalAbierto] = useState(false); // Estado para el modal de confirmación

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

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setModalAbierto(false);
  };

  // Calcular el número total de productos en el carrito
  const totalProductos = Object.values(resumen).reduce(
    (total, item) => total + item.cantidad,
    0
  );

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
              bottom: "80px",
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
                        alignItems: "center",
                        marginBottom: "10px",
                        borderBottom: "1px solid #ddd",
                        paddingBottom: "10px",
                      }}
                    >
                      <div>
                        <strong>{item.nombre}</strong> x {item.cantidad}
                      </div>
                      <div>
                        <span style={{ marginRight: "10px" }}>
                          ${(item.cantidad * item.precio).toFixed(2)}
                        </span>
                        <button
                          onClick={() => eliminarItem(item.id)} // Eliminar producto
                          style={{
                            backgroundColor: "#ff4d4f",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <hr />
                <h3>Total: ${calcularTotal().toFixed(2)}</h3>

                {/* Selector de método de pago */}
                <div style={{ marginBottom: "10px" }}>
                  <label htmlFor="metodoPago" style={{ marginRight: "10px" }}>
                    Método de pago:
                  </label>
                  <select
                    id="metodoPago"
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <option value="efectivo">Efectivo</option>
                    <option value="debito">Débito</option>
                    <option value="credito">Crédito</option>
                  </select>
                </div>

                {/* Botón para confirmar pedido */}
                <button
                  onClick={() => setModalAbierto(true)} // Abrir el modal al confirmar
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Confirmar Pedido
                </button>
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

        {/* Modal de confirmación */}
        <Modal
          open={modalAbierto}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: 24,
              padding: "20px",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h2 id="modal-title">¡Pedido Confirmado! 🎉</h2>
            <p id="modal-description">
              Total a pagar: <strong>${calcularTotal().toFixed(2)}</strong>
            </p>
            <p>
              Método de pago: <strong>{metodoPago}</strong>
            </p>
            <button
              onClick={handleCloseModal}
              style={{
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
          </Box>
        </Modal>
      </div>
    </Router>
  );
};

export default App;
