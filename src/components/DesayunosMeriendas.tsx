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
      nombre: "Café",
      precio: 2.0,
      imagen: "https://example.com/cafe.jpg", // URL de la imagen
    },
    {
      id: 8,
      nombre: "Tostado",
      precio: 3.5,
      imagen: "https://example.com/tostado.jpg", // URL de la imagen
    },
    {
      id: 9,
      nombre: "Medialuna",
      precio: 1.2,
      imagen: "https://example.com/medialuna.jpg", // URL de la imagen
    },
  ];

  return (
    <div>
      <h2>Desayunos y Meriendas</h2>
      {desayunosMeriendas.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          {/* Imagen del producto */}
          <img
            src={item.imagen}
            alt={item.nombre}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          />
          {/* Información del producto */}
          <div style={{ flex: 1 }}>
            <span>
              <strong>{item.nombre}</strong> - ${item.precio.toFixed(2)}
            </span>
          </div>
          {/* Botón para añadir al carrito */}
          <button
            onClick={() => addToCart({ ...item, cantidad: 1 })}
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Añadir al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default DesayunosMeriendas;
