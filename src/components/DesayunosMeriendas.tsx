import React from "react";

// Define el tipo del item con la nueva propiedad "imagen"
interface Item {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string; // Nueva propiedad para la imagen
}

interface DesayunosMeriendasProps {
  addToCart: (item: Item) => void;
}

const DesayunosMeriendas: React.FC<DesayunosMeriendasProps> = ({ addToCart }) => {
  const desayunosMeriendas = [
    {
      id: 7,
      nombre: "Café ☕",
      precio: 2.0,
      imagen: "https://example.com/cafe.jpg", // URL de la imagen
    },
    {
      id: 8,
      nombre: "Tostado 🥪",
      precio: 3.5,
      imagen: "https://example.com/tostado.jpg", // URL de la imagen
    },
    {
      id: 9,
      nombre: "Medialuna 🥐",
      precio: 1.2,
      imagen: "https://example.com/medialuna.jpg", // URL de la imagen
    },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#fffbf0", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", color: "#4CAF50" }}>🥐 Desayunos y Meriendas ☕</h2>
      {desayunosMeriendas.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Imagen del producto */}
          <img
            src={item.imagen}
            alt={item.nombre}
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              borderRadius: "8px",
              marginRight: "15px",
            }}
          />
          {/* Información del producto */}
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: "18px", color: "#333" }}>{item.nombre}</strong>
            <p style={{ fontSize: "16px", color: "#777" }}>${item.precio.toFixed(2)}</p>
          </div>
          {/* Botón para añadir al carrito */}
          <button
            onClick={() => addToCart({ ...item, cantidad: 1 })}
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 15px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
          >
            Añadir al carrito 🛒
          </button>
        </div>
      ))}
    </div>
  );
};

export default DesayunosMeriendas;
