import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware (pre-save hook) para encriptar la contraseña ANTES de guardarla
userSchema.pre('save', async function (next) {
  // Si la contraseña no fue modificada, no hagas nada
  if (!this.isModified('password')) {
    next();
  }
  // Genera "salt" y "hash" de la contraseña
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar la contraseña ingresada con la de la BD
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;