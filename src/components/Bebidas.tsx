import React from "react";

interface BebidasProps {
  addToCart: (item: { id: number; nombre: string; precio: number; cantidad: number }) => void;
}

const Bebidas: React.FC<BebidasProps> = ({ addToCart }) => {
  const bebidas = [
    { id: 1, nombre: "Coca-Cola", precio: 1.5 },
    { id: 2, nombre: "Fanta", precio: 1.2 },
  ];

  return (
    <div>
      <h2>Bebidas</h2>
      {bebidas.map((bebida) => (
        <div key={bebida.id} style={{ marginBottom: "10px" }}>
          <span>{bebida.nombre}</span>
          <button
            onClick={() =>
              addToCart({ ...bebida, cantidad: 1 })
            }
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
