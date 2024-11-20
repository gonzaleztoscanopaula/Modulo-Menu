import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, Paper } from "@mui/material";

// Definimos el tipo para los mozos
interface Mozo {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const HistoriasMozos = () => {
  const [mozos, setMozos] = useState<Mozo[]>([]);
  const [mozoSeleccionado, setMozoSeleccionado] = useState<Mozo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/mozos")
      .then((response) => response.json())
      .then((data) => {
        setMozos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar los mozos.");
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    setMozoSeleccionado(null);
  };

  return (
    <Box style={{ marginTop: "20px", backgroundColor: "#DDC5A1", padding: "20px" }}>
      <Typography variant="h5" style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px", marginLeft: "20px" }}>
        Antes de realizar el pedido, conocenos un poco...
      </Typography>

      <Typography variant="body1" style={{ fontSize: "16px", marginBottom: "30px", marginLeft: "20px" }}>
        Seleccione sus perfiles para conocerlos mejor.
      </Typography>

      {loading && (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          Cargando mozos...
        </Typography>
      )}

      {error && (
        <Typography variant="body1" style={{ color: "red", textAlign: "center" }}>
          {error}
        </Typography>
      )}

      <Box style={{ display: "flex", justifyContent: "space-around" }}>
        {mozos.map((mozo) => (
          <Box key={mozo.id} onClick={() => setMozoSeleccionado(mozo)} style={{ textAlign: "center", cursor: "pointer" }}>
            <img
              src={mozo.imagen}
              alt={mozo.nombre}
              style={{
                borderRadius: "50%",
                width: "300px",
                height: "300px",
                objectFit: "cover",
              }}
            />
            <Typography style={{ marginTop: "10px", fontWeight: "bold", fontSize: "16px" }}>
              {mozo.nombre}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box style={{ marginTop: "40px", textAlign: "center" }}>
        <Typography variant="h5" style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "10px", marginLeft: "20px" }}>
          Realizar Pedido
        </Typography>
        <Typography variant="body1" style={{ fontSize: "16px", marginBottom: "30px", marginLeft: "20px" }}>
          Seleccione la categoría de su preferencia
        </Typography>
      </Box>

      <Modal open={!!mozoSeleccionado} onClose={handleClose}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "500px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          {mozoSeleccionado && (
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center", backgroundColor: "#fff" }}>
              <img
                src={mozoSeleccionado.imagen}
                alt={mozoSeleccionado.nombre}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
              <Typography variant="h5">{mozoSeleccionado.nombre}</Typography>
              <Typography variant="body1" style={{ marginTop: "10px" }}>
                {mozoSeleccionado.descripcion}
              </Typography>
            </Paper>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default HistoriasMozos;
