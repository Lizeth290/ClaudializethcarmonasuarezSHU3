import express from 'express';
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/crud.controller.js';
import { protect } from '../middleware/authJWT.js'; // Importamos nuestro "guardia"

const router = express.Router();

// --- Rutas Protegidas ---

// GET /api/items  (Obtener todos mis items)
// POST /api/items (Crear un nuevo item)
router.route('/').get(protect, getItems).post(protect, createItem);

// PUT /api/items/:id  (Actualizar un item por ID)
// DELETE /api/items/:id (Borrar un item por ID)
router.route('/:id').put(protect, updateItem).delete(protect, deleteItem);

export default router;