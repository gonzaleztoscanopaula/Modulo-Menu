import React, { createContext, useContext, useState, ReactNode } from "react";

// Definir los tipos de los items
interface Item {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

// Tipo del contexto
interface ResumenContextType {
  resumen: Record<number, Item>;
  agregarItem: (item: Item) => void;
  eliminarItem: (id: number) => void; // Nueva función
}

// Crear el contexto
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

  // Función para eliminar un item
  const eliminarItem = (id: number) => {
    setResumen((prev) => {
      const nuevoResumen = { ...prev };
      delete nuevoResumen[id];
      return nuevoResumen;
    });
  };

  return (
    <ResumenContext.Provider value={{ resumen, agregarItem, eliminarItem }}>
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
