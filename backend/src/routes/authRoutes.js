import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/authJWT.js'; // Importamos nuestro "guardia"
import { googleLogin } from '../controllers/google.controller.js';

const router = express.Router();

// --- Rutas Públicas ---
// POST /api/users/register
router.post('/register', registerUser);
// POST /api/users/login
router.post('/login', loginUser);

router.post('/google', googleLogin);

// --- Ruta Privada ---
// GET /api/users/profile
// Cuando se llame a esta ruta, PRIMERO se ejecuta 'protect'.
// Si 'protect' tiene éxito (token válido), pasa a 'getUserProfile'.
// Si 'protect' falla, devuelve un error 401 y nunca llega a 'getUserProfile'.
router.get('/profile', protect, getUserProfile);

export default router;