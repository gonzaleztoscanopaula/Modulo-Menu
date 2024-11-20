export interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  cantidad: number;
}

export type ResumenState = Record<number, Producto>;
