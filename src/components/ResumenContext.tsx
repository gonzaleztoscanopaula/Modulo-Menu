import React, { createContext, useContext, useState, ReactNode } from "react";

// Define los tipos de los items
interface Item {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

// Tipo del contexto
interface ResumenContextType {
  resumen: Record<number, Item>; // Usamos un objeto para manejar los items
  agregarItem: (item: Item) => void;
}

// Crear contexto
const ResumenContext = createContext<ResumenContextType | undefined>(undefined);

// Props del proveedor
interface ResumenProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const ResumenProvider: React.FC<ResumenProviderProps> = ({ children }) => {
  const [resumen, setResumen] = useState<Record<number, Item>>({});

  // Función para agregar o actualizar un item
  const agregarItem = (item: Item) => {
    setResumen((prev) => {
      const itemExistente = prev[item.id];
      if (itemExistente) {
        return {
          ...prev,
          [item.id]: {
            ...itemExistente,
            cantidad: itemExistente.cantidad + item.cantidad,
          },
        };
      } else {
        return { ...prev, [item.id]: item };
      }
    });
  };

  return (
    <ResumenContext.Provider value={{ resumen, agregarItem }}>
      {children}
    </ResumenContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useResumen = () => {
  const context = useContext(ResumenContext);
  if (!context) {
    throw new Error("useResumen debe ser usado dentro de un ResumenProvider");
  }
  return context;
};
