import mongoose from 'mongoose';

// Esquema para un "Item" (o dispositivo, o lo que prefieras)
const itemSchema = mongoose.Schema(
  {
    // Relación con el usuario que lo creó
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Esto conecta este modelo con el modelo 'User'
    },
    name: {
      type: String,
      required: [true, 'Por favor, añade un nombre'],
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // Crea campos createdAt y updatedAt automáticamente
  }
);

const Item = mongoose.model('Item', itemSchema);
export default Item;