import React from "react";

// Define el tipo del item con la nueva propiedad "imagen"
interface Item {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string; // Nueva propiedad para la imagen
}

interface ComidasProps {
  addToCart: (item: Item) => void;
}

const Comidas: React.FC<ComidasProps> = ({ addToCart }) => {
  const comidas = [
    {
      id: 4,
      nombre: "Hamburguesa 🍔",
      precio: 5.0,
      imagen: "https://example.com/hamburguesa.jpg", // URL de la imagen
    },
    {
      id: 5,
      nombre: "Pizza 🍕",
      precio: 8.0,
      imagen: "https://example.com/pizza.jpg", // URL de la imagen
    },
    {
      id: 6,
      nombre: "Empanadas 🥟",
      precio: 1.5,
      imagen: "https://example.com/empanadas.jpg", // URL de la imagen
    },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#fff3e6", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", color: "#4CAF50" }}>🍽️ Comidas</h2>
      {comidas.map((comida) => (
        <div
          key={comida.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          {/* Imagen del producto */}
          <img
            src={comida.imagen}
            alt={comida.nombre}
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
            <strong style={{ fontSize: "18px", color: "#333" }}>{comida.nombre}</strong>
            <p style={{ fontSize: "16px", color: "#777" }}>${comida.precio.toFixed(2)}</p>
          </div>
          {/* Botón para añadir al carrito */}
          <button
            onClick={() => addToCart({ ...comida, cantidad: 1 })}
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 15px",
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

export default Comidas;
