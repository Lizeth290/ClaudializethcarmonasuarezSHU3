import asyncHandler from 'express-async-handler';
import Item from '../models/item.model.js';

// @desc    Obtener todos los items del usuario logueado
// @route   GET /api/items
// @access  Privado
const getItems = asyncHandler(async (req, res) => {
  // Solo trae los items que pertenecen al usuario (req.user.id viene del middleware 'protect')
  const items = await Item.find({ user: req.user.id });
  res.json(items);
});

// @desc    Crear un nuevo item
// @route   POST /api/items
// @access  Privado
const createItem = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Validación de entrada
  if (!name) {
    res.status(400);
    throw new Error('El campo "name" es obligatorio');
  }

  const item = new Item({
    name,
    description: description || '',
    user: req.user.id, // Asignamos el item al usuario logueado
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);
});

// @desc    Actualizar un item
// @route   PUT /api/items/:id
// @access  Privado
const updateItem = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item no encontrado');
  }

  // Verificación de autorización:
  // Aseguramos que el usuario logueado sea el dueño del item
  if (item.user.toString() !== req.user.id) {
    res.status(401); // No autorizado
    throw new Error('Acción no autorizada');
  }

  // Actualizamos los campos
  item.name = name || item.name;
  item.description = description || item.description;

  const updatedItem = await item.save();
  res.json(updatedItem);
});

// @desc    Borrar un item
// @route   DELETE /api/items/:id
// @access  Privado
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item no encontrado');
  }

  // Verificación de autorización:
  if (item.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Acción no autorizada');
  }

  await item.deleteOne(); // Mongoose 8+
  res.json({ message: 'Item borrado exitosamente', _id: req.params.id });
});

export { getItems, createItem, updateItem, deleteItem };