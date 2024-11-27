import express from 'express';
import cors from 'cors';
import mozos from './data/mozos';
import categorias from './data/categorias';

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint para obtener mozos
app.get('/mozos', (req, res) => {
    res.json(mozos);
});

// Endpoint para obtener categorías
app.get('/categorias', (req, res) => {
    res.json(categorias);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
