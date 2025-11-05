import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// --- Función Auxiliar ---
// Genera un token JWT firmado con el ID del usuario
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // El token expirará en 30 días
  });
};

// --- Controladores ---

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
// @access  Público
const registerUser = asyncHandler(async (req, res) => {
  // Validación de entrada (básica)
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400); // 400 = Bad Request
    throw new Error('Por favor, incluye username y password');
  }

  // Sanitización XSS (básica) - Mongoose ayuda escapando, pero evitamos espacios y mayúsculas.
  const sanitizedUsername = username.toLowerCase().trim();

  // 1. Verificar si el usuario ya existe
  const userExists = await User.findOne({ username: sanitizedUsername });
  if (userExists) {
    res.status(400);
    throw new Error('El usuario ya existe');
  }

  // 2. Crear el usuario
  // (Al hacer .create(), el 'pre-save' hook en user.model.js se dispara y encripta el password)
  const user = await User.create({
    username: sanitizedUsername,
    password,
  });

  // 3. Responder con el usuario creado y su token
  if (user) {
    res.status(201).json({ // 201 = Creado exitosamente
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Datos de usuario inválidos');
  }
});

// @desc    Autenticar (login) un usuario
// @route   POST /api/users/login
// @access  Público
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // 1. Encontrar al usuario por su username
  const user = await User.findOne({ username: username.toLowerCase().trim() });

  // 2. Verificar si el usuario existe Y si la contraseña es correcta
  //    (usamos el método 'matchPassword' que creamos en el modelo)
  if (user && (await user.matchPassword(password))) {
    // 3. Responder con los datos del usuario y un nuevo token
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // 401 = No autorizado
    throw new Error('Username o password incorrecto');
  }
});

// @desc    Obtener perfil del usuario (Ruta protegida)
// @route   GET /api/users/profile
// @access  Privado
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user fue adjuntado por nuestro middleware 'protect'
  const user = req.user;
  res.json({
    _id: user._id,
    username: user.username,
  });
});

export { registerUser, loginUser, getUserProfile };