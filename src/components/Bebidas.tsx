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
    <div>
      <h2>Bebidas</h2>
      {bebidas.map((bebida) => (
        <div
          key={bebida.id}
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
            src={bebida.imagen}
            alt={bebida.nombre}
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
              <strong>{bebida.nombre}</strong> - ${bebida.precio.toFixed(2)}
            </span>
          </div>
          {/* Botón para añadir al carrito */}
          <button
            onClick={() => addToCart({ ...bebida, cantidad: 1 })}
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

export default Bebidas;
