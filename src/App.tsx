import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importamos Routes y Route
import NavBar from "./components/NavBar";
import Categorias from "./components/Categorias";
import HistoriasMozos from "./components/HistoriasMozos";
import Carrito from "./components/Carrito";
import HistorialPedidos from "./components/HistorialPedidos";
import QuienesSomos from "./components/QuienesSomos";
import ColaboraConNosotros from "./components/ColaboraConNosotros";
import Desarrolladoras from "./components/Desarrolladoras";

const App: React.FC = () => {
  const [pedidos, setPedidos] = useState<
    { id: number; items: any; total: number }[]
  >([]);

  const agregarPedido = (pedido: { id: number; items: any; total: number }) => {
    setPedidos((prevPedidos) => [...prevPedidos, pedido]);
  };

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <div style={{ flex: 3, overflowY: "auto", padding: "20px" }}>
          {/* NavBar con React Router sin alterar el flujo de vistas */}
          <NavBar />

          {/* Rutas para las vistas */}
          <Routes>
            <Route path="/" element={<><HistoriasMozos /><Categorias /></>} />
            <Route path="/historial" element={<HistorialPedidos pedidos={pedidos} />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/colabora-con-nosotros" element={<ColaboraConNosotros />} />
            <Route path="/desarrolladoras" element={<Desarrolladoras />} />
          </Routes>
        </div>
        <Carrito onPedidoConfirmado={agregarPedido} />
      </div>
    </Router>
  );
};

export default App;
