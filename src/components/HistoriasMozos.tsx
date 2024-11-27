import React, { useEffect, useState } from "react";
import { Box, Typography, Modal, Paper, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

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
    <Box
      style={{
        marginTop: "20px",
        backgroundColor: "#DDC5A1", // Manteniendo el fondo con el color especificado
        padding: "20px",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h5"
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: "10px",
          marginLeft: "20px",
        }}
      >
        Conoce a nuestros mozos 🤩
      </Typography>

      <Typography
        variant="body1"
        style={{
          fontSize: "16px",
          marginBottom: "30px",
          marginLeft: "20px",
        }}
      >
        ¡Haz clic en las imágenes para conocer sus historias! 🎉
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

      {/* Contenedor para las historias */}
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {mozos.map((mozo) => (
          <Box
            key={mozo.id}
            onClick={() => setMozoSeleccionado(mozo)}
            style={{
              textAlign: "center",
              cursor: "pointer",
              maxWidth: "200px", // Tamaño máximo en pantallas grandes
              width: "30%", // Asegura que haya espacio entre las historias en pantallas pequeñas
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={mozo.imagen}
              alt={mozo.nombre}
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                objectFit: "cover",
                marginBottom: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                marginBottom: "5px",
              }}
            >
              {mozo.nombre}
            </Typography>
            <Typography
              style={{
                fontSize: "14px",
                color: "#888",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {mozo.descripcion.substring(0, 40)}...
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Modal con detalles del mozo seleccionado */}
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
            <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
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
              <Typography variant="body1" style={{ marginTop: "10px", fontStyle: "italic" }}>
                {mozoSeleccionado.descripcion}
              </Typography>
              <IconButton
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                  borderRadius: "50%",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Paper>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default HistoriasMozos;
