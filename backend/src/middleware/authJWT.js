import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

// Middleware para proteger rutas
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // El token vendrá en el header 'Authorization' como 'Bearer <token>'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Obtener el token (quitando "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Obtener el usuario del token y adjuntarlo a la request
      // (excluyendo la contraseña)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
         res.status(401);
         throw new Error('No autorizado, usuario no encontrado');
      }

      next(); // Continuar a la siguiente función (el controlador)
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('No autorizado, token falló');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No autorizado, no hay token');
  }
});

export { protect };