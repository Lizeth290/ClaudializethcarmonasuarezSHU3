import mongoose from 'mongoose';

// Conexión a la base de datos MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión MDB: ${error.message}`);
    process.exit(1); // Salir del proceso con error
  }
};

export default connectDB;