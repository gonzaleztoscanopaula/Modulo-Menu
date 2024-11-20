import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Importar BrowserRouter
import Bebidas from "./components/Bebidas";
import Comidas from "./components/Comidas";
import DesayunosMeriendas from "./components/DesayunosMeriendas";
import { useResumen } from "./components/ResumenContext";
import NavBar from "./components/NavBar";
import HistoriasMozos from "./components/HistoriasMozos";
import Categorias from "./components/Categorias";

const App: React.FC = () => {
  const { resumen, agregarItem } = useResumen();

  const calcularTotal = () => {
    return Object.values(resumen).reduce(
      (total, item) => total + item.cantidad * item.precio,
      0
    );
  };

  return (
    <Router> {/* Envolver todo en Router */}
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sección principal */}
        <div style={{ flex: 3, overflowY: "auto", padding: "20px" }}>
          <NavBar />
          <HistoriasMozos />
          <Categorias />
          <div>
            <Bebidas addToCart={agregarItem} />
            <Comidas addToCart={agregarItem} />
            <DesayunosMeriendas addToCart={agregarItem} />
          </div>
        </div>

        {/* Carrito de compras */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#f9f9f9",
            borderLeft: "1px solid #ddd",
            padding: "20px",
            position: "relative",
          }}
        >
          <h2>🛒 Carrito</h2>
          {Object.values(resumen).length > 0 ? (
            <div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {Object.values(resumen).map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                      borderBottom: "1px solid #ddd",
                      paddingBottom: "10px",
                    }}
                  >
                    <div>
                      <strong>{item.nombre}</strong> x {item.cantidad}
                    </div>
                    <div>${(item.cantidad * item.precio).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
              <hr />
              <h3>Total: ${calcularTotal().toFixed(2)}</h3>
            </div>
          ) : (
            <p>Tu carrito está vacío. 😞</p>
          )}
        </div>
      </div>
    </Router>  
  );
};

export default App;
