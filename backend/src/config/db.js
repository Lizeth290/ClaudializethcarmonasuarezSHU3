import mongoose from 'mongoose';

// Conexión a la base de datos MongoDB con reintentos
const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Conectado: ${conn.connection.host}`);
      return;
    } catch (error) {
      retries++;
      console.error(`Error de conexión MDB (intento ${retries}/${maxRetries}): ${error.message}`);
      if (retries < maxRetries) {
        console.log(`Reintentando en 5 segundos...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error('No se pudo conectar a MongoDB después de varios intentos');
        process.exit(1);
      }
    }
  }
};

export default connectDB;