import React from "react";

// Define el tipo del item
interface Item {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

// Define las props que el componente Bebidas recibirá
interface BebidasProps {
  addToCart: (item: Item) => void;
}

const Bebidas: React.FC<BebidasProps> = ({ addToCart }) => {
  const bebidas = [
    { id: 1, nombre: "Coca-Cola", precio: 1.5 },
    { id: 2, nombre: "Fanta", precio: 1.2 },
    { id: 3, nombre: "Agua", precio: 0.8 },
  ];

  return (
    <div>
      <h2>Bebidas</h2>
      {bebidas.map((bebida) => (
        <div key={bebida.id} style={{ marginBottom: "10px" }}>
          <span>{bebida.nombre} - ${bebida.precio.toFixed(2)}</span>
          <button
            onClick={() => addToCart({ ...bebida, cantidad: 1 })}
            style={{ marginLeft: "10px" }}
          >
            Añadir al carrito
          </button>
        </div>
      ))}
    </div>
  );
};

export default Bebidas;
