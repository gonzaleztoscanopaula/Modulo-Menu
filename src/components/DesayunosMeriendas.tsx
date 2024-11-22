import React from "react";

interface Item {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface DesayunosMeriendasProps {
  addToCart: (item: Item) => void;
}

const DesayunosMeriendas: React.FC<DesayunosMeriendasProps> = ({ addToCart }) => {
  const desayunosMeriendas = [
    { id: 7, nombre: "Café", precio: 2.0 },
    { id: 8, nombre: "Tostado", precio: 3.5 },
    { id: 9, nombre: "Medialuna", precio: 1.2 },
  ];

  return (
    <div>
      <h2>Desayunos y Meriendas</h2>
      {desayunosMeriendas.map((item) => (
        <div key={item.id} style={{ marginBottom: "10px" }}>
          <span>{item.nombre} - ${item.precio.toFixed(2)}</span>
          <button
            onClick={() =>
              addToCart({ ...item, cantidad: 1 })
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

export default DesayunosMeriendas;
