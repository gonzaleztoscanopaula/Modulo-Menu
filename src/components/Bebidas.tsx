import React from "react";

// Define el tipo del item con la nueva propiedad "imagen"
interface Item {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string; // Nueva propiedad para la imagen
}

// Define las props que el componente Bebidas recibirá
interface BebidasProps {
  addToCart: (item: Item) => void;
}

const Bebidas: React.FC<BebidasProps> = ({ addToCart }) => {
  const bebidas = [
    {
      id: 1,
      nombre: "Coca-Cola",
      precio: 1.5,
      imagen: "https://example.com/coca-cola.jpg", // URL de la imagen
    },
    {
      id: 2,
      nombre: "Fanta",
      precio: 1.2,
      imagen: "https://example.com/fanta.jpg", // URL de la imagen
    },
    {
      id: 3,
      nombre: "Agua",
      precio: 0.8,
      imagen: "https://example.com/agua.jpg", // URL de la imagen
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>
        🥤 **Bebidas** para Todos ¡Elige tu Favorita! 🍹
      </h2>
      {bebidas.map((bebida) => (
        <div
          key={bebida.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
          }}
        >
          {/* Imagen del producto */}
          <img
            src={bebida.imagen}
            alt={bebida.nombre}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "10px",
              marginRight: "20px",
            }}
          />
          {/* Información del producto */}
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {bebida.nombre} 🍻 - <span style={{ fontWeight: "normal" }}>${bebida.precio.toFixed(2)}</span>
            </span>
          </div>
          {/* Botón para añadir al carrito */}
          <button
            onClick={() => addToCart({ ...bebida, cantidad: 1 })}
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

export default Bebidas;
