import React, { useState } from "react";
import { IconButton, Badge, Box, Modal, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete"; // Ícono de basurero
import { useResumen } from "./ResumenContext";

interface CarritoProps {
  onPedidoConfirmado: (pedido: { id: number; items: any; total: number }) => void;
}

const Carrito: React.FC<CarritoProps> = ({ onPedidoConfirmado }) => {
  const { resumen, eliminarItem } = useResumen();
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [modalAbierto, setModalAbierto] = useState(false);

  const toggleCarrito = () => setCarritoAbierto(!carritoAbierto);

  const calcularTotal = () => {
    return Object.values(resumen).reduce(
      (total, item) => total + item.cantidad * item.precio,
      0
    );
  };

  const totalProductos = Object.values(resumen).reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const handleConfirmarPedido = () => {
    const pedido = {
      id: Date.now(),
      items: resumen,
      total: calcularTotal(),
    };
    onPedidoConfirmado(pedido);
    setModalAbierto(true);
  };

  const handleCloseModal = () => {
    setModalAbierto(false);
    setCarritoAbierto(false);
  };

  return (
    <Box>
      {/* Botón flotante con el ícono del carrito */}
      <IconButton
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#A39986",
          color: "#fff",
          borderRadius: "50%",
          padding: "10px",
          "&:hover": { backgroundColor: "#8D7F6F" },
        }}
        onClick={toggleCarrito}
      >
        <Badge badgeContent={totalProductos > 0 ? totalProductos : null} color="error">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>

      {/* Contenido del carrito */}
      {carritoAbierto && (
        <Box
          sx={{
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
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            🛒 Carrito de Compras
          </Typography>
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
                      <strong>{item.nombre}</strong> x {item.cantidad} 🍹
                    </div>
                    <div>
                      <span style={{ marginRight: "10px" }}>
                        ${(item.cantidad * item.precio).toFixed(2)} 💵
                      </span>
                      <IconButton
                        onClick={() => eliminarItem(item.id)}
                        sx={{
                          color: "red",
                          padding: "5px",
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>
              <hr />
              <Typography variant="h6">
                Total: ${calcularTotal().toFixed(2)} 💰
              </Typography>

              {/* Método de pago */}
              <div style={{ marginBottom: "10px" }}>
                <label htmlFor="metodoPago">Método de pago:</label>
                <select
                  id="metodoPago"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                  style={{
                    marginBottom: "10px",
                    padding: "5px",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                >
                  <option value="efectivo">Efectivo 💵</option>
                  <option value="debito">Débito 💳</option>
                  <option value="credito">Crédito 💳</option>
                </select>
              </div>

              {/* Botón de confirmar pedido */}
              <Button
                onClick={handleConfirmarPedido}
                variant="contained"
                color="primary"
                sx={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                }}
              >
                Confirmar Pedido 🛍️
              </Button>
            </div>
          ) : (
            <p>Tu carrito está vacío. 😞</p>
          )}
        </Box>
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
            textAlign: "center",
          }}
        >
          <Typography variant="h5" id="modal-title" gutterBottom>
            ¡Pedido Confirmado! 🎉
          </Typography>
          <Typography id="modal-description" paragraph>
            Total a pagar: <strong>${calcularTotal().toFixed(2)} 💸</strong>
          </Typography>
          <Typography paragraph>
            Método de pago: <strong>{metodoPago}</strong> 💳
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
            sx={{
              padding: "10px",
              backgroundColor: "#A39986",
              color: "#fff",
              borderRadius: "8px",
            }}
          >
            Cerrar 🛑
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Carrito;
