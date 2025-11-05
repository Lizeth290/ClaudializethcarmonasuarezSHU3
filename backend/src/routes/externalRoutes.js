import express from 'express';
import { getRandomPublicAPI } from '../controllers/external.controller.js';

const router = express.Router();

// --- Ruta Pública ---
// GET /api/external/random-api
router.get('/random-api', getRandomPublicAPI);

export default router;