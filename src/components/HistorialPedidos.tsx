import React, { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

interface Pedido {
  id: number;
  items: {
    [key: number]: {
      id: number;
      nombre: string;
      precio: number;
      cantidad: number;
    };
  };
  total: number;
}

interface HistorialPedidosProps {
  pedidos: Pedido[];
}

const HistorialPedidos: React.FC<HistorialPedidosProps> = ({ pedidos }) => {
  const [openModal, setOpenModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);

  // Función para abrir el modal
  const abrirModal = (pedido: Pedido) => {
    setPedidoSeleccionado(pedido);
    setOpenModal(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setOpenModal(false);
    setPedidoSeleccionado(null);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        🛒 Historial de Pedidos 🛍️
      </Typography>
      {pedidos.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No tienes pedidos en el historial 😞
        </Typography>
      ) : (
        pedidos.map((pedido) => (
          <div
            key={pedido.id}
            style={{
              backgroundColor: "#f4f4f4",
              borderRadius: "12px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={() => abrirModal(pedido)}
          >
            <Typography variant="h5">
              Pedido #{pedido.id} <span role="img" aria-label="trophy">🏆</span>
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {Object.values(pedido.items).map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    fontWeight: "bold",
                  }}
                >
                  <span>{item.nombre} x {item.cantidad}</span>
                  <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <Typography variant="h6" color="primary">
              Total: ${pedido.total.toFixed(2)} <span role="img" aria-label="money">💸</span>
            </Typography>
          </div>
        ))
      )}

      {/* Modal de detalles del pedido */}
      <Modal
        open={openModal}
        onClose={cerrarModal}
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
            padding: "20px",
            boxShadow: 24,
            maxWidth: "600px",
            width: "80%",
            borderRadius: "12px",
          }}
        >
          {pedidoSeleccionado && (
            <>
              <Typography variant="h5" gutterBottom>
                Detalles del Pedido #{pedidoSeleccionado.id} 🛍️
              </Typography>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {Object.values(pedidoSeleccionado.items).map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  >
                    <span>{item.nombre} x {item.cantidad}</span>
                    <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <Typography variant="h6" color="primary" gutterBottom>
                Total: ${pedidoSeleccionado.total.toFixed(2)} 💵
              </Typography>
              <Button variant="contained" color="secondary" onClick={cerrarModal}>
                Cerrar <span role="img" aria-label="close">❌</span>
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default HistorialPedidos;
