import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import externalRoutes from './routes/externalRoutes.js';

// Configuración inicial
dotenv.config();
connectDB(); // Conecta a la base de datos
const app = express();

// Middlewares
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

// Rutas de autenticación
app.use('/api/users', authRoutes);

// Rutas de items (CRUD)
app.use('/api/items', itemRoutes);

// Rutas de API externa
app.use('/api/external', externalRoutes);


// Middlewares de manejo de errores (DEBEN IR AL FINAL)
app.use(notFound);
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});