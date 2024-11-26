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
      nombre: "Hamburguesa",
      precio: 5.0,
      imagen: "https://example.com/hamburguesa.jpg", // URL de la imagen
    },
    {
      id: 5,
      nombre: "Pizza",
      precio: 8.0,
      imagen: "https://example.com/pizza.jpg", // URL de la imagen
    },
    {
      id: 6,
      nombre: "Empanadas",
      precio: 1.5,
      imagen: "https://example.com/empanadas.jpg", // URL de la imagen
    },
  ];

  return (
    <div>
      <h2>Comidas</h2>
      {comidas.map((comida) => (
        <div
          key={comida.id}
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
            src={comida.imagen}
            alt={comida.nombre}
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
              <strong>{comida.nombre}</strong> - ${comida.precio.toFixed(2)}
            </span>
          </div>
          {/* Botón para añadir al carrito */}
          <button
            onClick={() => addToCart({ ...comida, cantidad: 1 })}
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

export default Comidas;
