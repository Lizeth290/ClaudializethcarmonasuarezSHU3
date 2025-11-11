import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // El token expirará en 30 días
  });
};

/**
 * @desc    Login con Google (verifica ID token y retorna tu JWT)
 * @route   POST /api/users/google
 * @access  Público
 */
const googleLogin = asyncHandler(async (req, res) => {
  const { credential } = req.body; // ID token JWT que entrega GSI en el cliente
  if (!credential) {
    res.status(400);
    throw new Error('Falta el credential de Google');
  }

  // 1) Verificar el ID token con Google
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  // Campos útiles
  const googleId = payload.sub;
  const email = (payload.email || '').toLowerCase().trim();
  const name = payload.name || email.split('@')[0];
  const picture = payload.picture;

  // 2) Buscar o crear usuario en tu DB
  //    Asumo que tu modelo User soporta username/password. Si no tienes email,
  //    podemos mapear 'username' = email y marcar un flag 'googleId'.
  let user = await User.findOne({ username: email });
  if (!user) {
    user = await User.create({
      username: email,
      // Password dummy aleatorio: no se usa para Google, pero satisface el esquema.
      password: jwt.sign({ googleId }, process.env.JWT_SECRET).slice(0, 20),
      googleId, // <- añade este campo a tu esquema si aún no existe
      name,
      picture,
    });
  } else if (!user.googleId) {
    // Vincula cuenta existente con Google si hace falta
    user.googleId = googleId;
    if (!user.name) user.name = name;
    if (!user.picture) user.picture = picture;
    await user.save();
  }

  // 3) Responder con tu JWT (mismo formato que login clásico)
  res.json({
    _id: user._id,
    username: user.username,
    token: generateToken(user._id),
  });
});

export { googleLogin };